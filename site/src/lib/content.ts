import { createClient } from '@sanity/client';
import { guides as fallbackGuides } from '../data/guides';
import { products as fallbackProducts } from '../data/products';
import type { Guide, HomePageContent, Product, ProductCategory, SiteSettings } from './types';

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

const fetchProducts = async (): Promise<Product[]> => {
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
  } catch {
    console.warn('Sanity products unavailable; using local demo content.');
    return fallbackProducts;
  }
};
let productsPromise: Promise<Product[]> | undefined;
export const getProducts = () => productsPromise ??= fetchProducts();

const fetchGuides = async (): Promise<Guide[]> => {
  if (!client) return fallbackGuides;
  try {
    const records = await client.fetch<Guide[]>(guideQuery);
    if (!records.length) return fallbackGuides;
    return records.map((guide) => ({ ...guide, image: guide.image || '/farm/worm-bins-open.jpg', sections: guide.sections || [], relatedProducts: guide.relatedProducts || [] }));
  } catch {
    console.warn('Sanity guides unavailable; using local demo content.');
    return fallbackGuides;
  }
};
let guidesPromise: Promise<Guide[]> | undefined;
export const getGuides = () => guidesPromise ??= fetchGuides();

const fallbackHomePage: HomePageContent = {
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
  featuredEyebrow: 'From the farm',
  featuredTitle: 'A few good things for better soil.',
  featuredIntro: 'Farm-made compost, worms and liquid plant food for gardens of every size.',
  featuredProductIds: [],
  valueEyebrow: 'Why vermicompost',
  valueTitle: 'Healthy soil is alive.',
  valueBody: 'Red wigglers turn prepared organic matter into a gentle, microbe-rich soil conditioner. A little goes a long way in pots, beds and new planting.',
  valueImage: '/farm/windrows.jpg',
  valueImageAlt: 'Rows of vermicomposting beds on the farm',
  benefits: [
    { title: 'Gentle nutrition', text: 'Steady plant nutrition in a natural form.' },
    { title: 'Better structure', text: 'Helps soil balance drainage and moisture.' },
    { title: 'Living biology', text: 'Adds beneficial organisms to the root zone.' },
  ],
  contactTitle: 'Collect from the farm in Pretoria.',
  contactBody: 'Send Nico a message to check availability, arrange collection or ask about local delivery.',
};

const fetchHomePage = async (): Promise<HomePageContent> => {
  if (!client) return fallbackHomePage;
  try {
    const page = await client.fetch<Partial<HomePageContent> | null>(`*[_type == "homeHero"][0] {
      kicker, heading, description, "posterImage": posterImage.asset->url, posterAlt,
      videoUrl, videoStart, videoEnd, primaryLabel, primaryHref,
      secondaryLabel, secondaryHref, videoLinkLabel, scrollLabel,
      featuredEyebrow, featuredTitle, featuredIntro, "featuredProductIds": featuredProducts[]._ref,
      valueEyebrow, valueTitle, valueBody, "valueImage": valueImage.asset->url, valueImageAlt,
      benefits[]{title, text}, contactTitle, contactBody
    }`);
    return page ? {
      ...fallbackHomePage, ...page,
      kicker: page.kicker || fallbackHomePage.kicker,
      heading: page.heading || fallbackHomePage.heading,
      description: page.description || fallbackHomePage.description,
      posterImage: page.posterImage || fallbackHomePage.posterImage,
      posterAlt: page.posterAlt || fallbackHomePage.posterAlt,
      videoUrl: page.videoUrl || fallbackHomePage.videoUrl,
      videoStart: page.videoStart ?? fallbackHomePage.videoStart,
      videoEnd: page.videoEnd ?? fallbackHomePage.videoEnd,
      primaryLabel: page.primaryLabel || fallbackHomePage.primaryLabel,
      primaryHref: page.primaryHref || fallbackHomePage.primaryHref,
      secondaryLabel: page.secondaryLabel || fallbackHomePage.secondaryLabel,
      secondaryHref: page.secondaryHref || fallbackHomePage.secondaryHref,
      videoLinkLabel: page.videoLinkLabel || fallbackHomePage.videoLinkLabel,
      scrollLabel: page.scrollLabel || fallbackHomePage.scrollLabel,
      featuredEyebrow: page.featuredEyebrow || fallbackHomePage.featuredEyebrow,
      featuredTitle: page.featuredTitle || fallbackHomePage.featuredTitle,
      featuredIntro: page.featuredIntro || fallbackHomePage.featuredIntro,
      valueImage: page.valueImage || fallbackHomePage.valueImage,
      valueImageAlt: page.valueImageAlt || fallbackHomePage.valueImageAlt,
      valueEyebrow: page.valueEyebrow || fallbackHomePage.valueEyebrow,
      valueTitle: page.valueTitle || fallbackHomePage.valueTitle,
      valueBody: page.valueBody || fallbackHomePage.valueBody,
      featuredProductIds: page.featuredProductIds || [],
      benefits: page.benefits?.length ? page.benefits : fallbackHomePage.benefits,
      contactTitle: page.contactTitle || fallbackHomePage.contactTitle,
      contactBody: page.contactBody || fallbackHomePage.contactBody,
    } : fallbackHomePage;
  } catch {
    console.warn('Sanity homepage unavailable; using local demo content.');
    return fallbackHomePage;
  }
};
let homePagePromise: Promise<HomePageContent> | undefined;
export const getHomePage = () => homePagePromise ??= fetchHomePage();

export const getHomeHero = getHomePage;

const fallbackSettings: SiteSettings = {
  phone: '082 854 7255', whatsapp: '27828547255', email: 'nico@vermicompostfarm.co.za',
  address: 'Cnr 3rd & Dr van der Merwe\nMontana, Pretoria\nSouth Africa',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cnr+3rd+and+Dr+van+der+Merwe+Montana+Pretoria',
  hours: [{ days: 'Collections', times: 'By arrangement' }],
  fulfilmentMessage: 'Contact Nico before travelling so your order can be prepared.', socialLinks: [],
};

const fetchSiteSettings = async (): Promise<SiteSettings> => {
  if (!client) return fallbackSettings;
  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>('*[_type == "siteSettings"][0]');
    return settings ? { ...fallbackSettings, ...settings } : fallbackSettings;
  } catch {
    console.warn('Sanity settings unavailable; using local demo content.');
    return fallbackSettings;
  }
};
let siteSettingsPromise: Promise<SiteSettings> | undefined;
export const getSiteSettings = () => siteSettingsPromise ??= fetchSiteSettings();
