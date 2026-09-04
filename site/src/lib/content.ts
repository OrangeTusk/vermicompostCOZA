import { createClient } from '@sanity/client';
import { guides as fallbackGuides } from '../data/guides';
import { products as fallbackProducts } from '../data/products';
import type { Guide, HomeHero, Product, ProductCategory, SiteSettings } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'w4y9k676';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const configured = Boolean(projectId && projectId !== 'replace-me');
const client = configured ? createClient({ projectId, dataset, apiVersion: '2026-09-01', useCdn: true }) : null;

const categoryLabels: Record<ProductCategory, string> = {
  'compost-soil': 'Compost & soil',
  'worms-care': 'Worms & care',
  liquids: 'Liquids',
  experiences: 'Farm experiences',
};

const productQuery = `*[_type == "product"] | order(featured desc, name asc) {
  "id": _id, "slug": slug.current, name, category, summary, description,
  "image": image.asset->url, "gallery": gallery[].asset->url,
  "variants": variants[] | order(displayOrder asc) { id, label, price, unit, availability },
  availability, featured, usage, benefits
}`;

const guideQuery = `*[_type == "guide"] | order(title asc) {
  "slug": slug.current, title, summary, intro, "image": image.asset->url,
  sections[]{ heading, paragraphs, steps },
  "relatedProducts": relatedProducts[]->slug.current
}`;

export const getProducts = async (): Promise<Product[]> => {
  if (!client) return fallbackProducts;
  try {
    const records = await client.fetch<Array<Omit<Product, 'categoryLabel'>>>(productQuery);
    if (!records.length) return fallbackProducts;
    return records.map((product) => ({
      ...product,
      categoryLabel: categoryLabels[product.category] || 'Farm product',
      image: product.image || '/farm/vermicompost.jpg',
      description: product.description || [], variants: product.variants || [], usage: product.usage || [], benefits: product.benefits || [],
    }));
  } catch (error) {
    console.warn('Sanity products unavailable; using local demo content.', error);
    return fallbackProducts;
  }
};

export const getGuides = async (): Promise<Guide[]> => {
  if (!client) return fallbackGuides;
  try {
    const records = await client.fetch<Guide[]>(guideQuery);
    if (!records.length) return fallbackGuides;
    return records.map((guide) => ({ ...guide, image: guide.image || '/farm/worm-bins-open.jpg', sections: guide.sections || [], relatedProducts: guide.relatedProducts || [] }));
  } catch (error) {
    console.warn('Sanity guides unavailable; using local demo content.', error);
    return fallbackGuides;
  }
};

const fallbackHomeHero: HomeHero = {
  kicker: 'Vermicompost Farm · Pretoria',
  heading: 'Good things\ngrow from soil.',
  description: 'Earthworm-powered compost, living microbes and honest soil care—made slowly, naturally and right here on the farm.',
  posterImage: '/farm/worm-bins-open.jpg',
  posterAlt: 'Rows of working worm bins at Vermicompost Farm',
  videoUrl: 'https://www.youtube.com/watch?v=mBTYp-bA-Ag',
  videoStart: 84,
  videoEnd: 105,
  primaryLabel: 'Shop farm products',
  primaryHref: '/shop',
  secondaryLabel: 'Visit the farm',
  secondaryHref: '/visit',
  videoLinkLabel: 'Watch the full farm film',
  scrollLabel: 'Scroll to dig deeper',
};

export const getHomeHero = async (): Promise<HomeHero> => {
  if (!client) return fallbackHomeHero;
  try {
    const hero = await client.fetch<Partial<HomeHero> | null>(`*[_type == "homeHero"][0] {
      kicker, heading, description, "posterImage": posterImage.asset->url, posterAlt,
      videoUrl, videoStart, videoEnd, primaryLabel, primaryHref,
      secondaryLabel, secondaryHref, videoLinkLabel, scrollLabel
    }`);
    return hero ? { ...fallbackHomeHero, ...hero, posterImage: hero.posterImage || fallbackHomeHero.posterImage } : fallbackHomeHero;
  } catch (error) {
    console.warn('Sanity homepage hero unavailable; using local demo content.', error);
    return fallbackHomeHero;
  }
};

const fallbackSettings: SiteSettings = {
  phone: '082 854 7255', whatsapp: '27828547255', email: 'nico@vermicompostfarm.co.za',
  address: 'Cnr 3rd & Dr van der Merwe\nMontana, Pretoria\nSouth Africa',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cnr+3rd+and+Dr+van+der+Merwe+Montana+Pretoria',
  hours: [{ days: 'Collections', times: 'By arrangement' }],
  fulfilmentMessage: 'Contact Nico before travelling so your order can be prepared.', socialLinks: [],
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (!client) return fallbackSettings;
  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>('*[_type == "siteSettings"][0]');
    return settings ? { ...fallbackSettings, ...settings } : fallbackSettings;
  } catch (error) {
    console.warn('Sanity settings unavailable; using local demo content.', error);
    return fallbackSettings;
  }
};
