import { createReadStream } from 'node:fs';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCliClient } from 'sanity/cli';
import { products } from '../../src/data/products.ts';
import { guides } from '../../src/data/guides.ts';

const client = getCliClient({ apiVersion: '2026-09-01' });
const studioDirectory = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const publicDirectory = resolve(studioDirectory, '..', 'public');
const uploadedAssets = new Map<string, string>();

const key = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 96);

async function uploadImage(publicPath: string, title: string) {
  const existing = uploadedAssets.get(publicPath);
  if (existing) return { _type: 'image', asset: { _type: 'reference', _ref: existing } };

  const absolutePath = resolve(publicDirectory, publicPath.replace(/^\//, ''));
  const asset = await client.assets.upload('image', createReadStream(absolutePath), {
    filename: basename(absolutePath),
    title,
  });
  uploadedAssets.set(publicPath, asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

for (const product of products) {
  const image = await uploadImage(product.image, product.name);
  const gallery = await Promise.all((product.gallery || []).map((path, index) => uploadImage(path, `${product.name} ${index + 1}`)));
  await client.createOrReplace({
    _id: `product-${product.id}`,
    _type: 'product',
    name: product.name,
    slug: { _type: 'slug', current: product.slug },
    category: product.category,
    summary: product.summary,
    description: product.description,
    image,
    gallery,
    variants: product.variants.map((variant, index) => ({
      _key: key(variant.id), _type: 'object', ...variant, displayOrder: index,
    })),
    availability: product.availability,
    featured: product.featured || false,
    usage: product.usage,
    benefits: product.benefits,
  });
  console.log(`Imported product: ${product.name}`);
}

for (const guide of guides) {
  await client.createOrReplace({
    _id: `guide-${guide.slug}`,
    _type: 'guide',
    title: guide.title,
    slug: { _type: 'slug', current: guide.slug },
    summary: guide.summary,
    intro: guide.intro,
    image: await uploadImage(guide.image, guide.title),
    sections: guide.sections.map((section, index) => ({ _key: `section-${index + 1}`, _type: 'object', ...section })),
    relatedProducts: guide.relatedProducts.map((slug) => ({ _key: key(slug), _type: 'reference', _ref: `product-${slug}` })),
  });
  console.log(`Imported guide: ${guide.title}`);
}

await client.createOrReplace({
  _id: 'siteSettings',
  _type: 'siteSettings',
  phone: '082 854 7255',
  whatsapp: '27828547255',
  email: 'nico@vermicompostfarm.co.za',
  address: 'Cnr 3rd & Dr van der Merwe\nMontana, Pretoria\nSouth Africa',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cnr+3rd+and+Dr+van+der+Merwe+Montana+Pretoria',
  hours: [{ _key: 'collections', _type: 'object', days: 'Collections', times: 'By arrangement' }],
  fulfilmentMessage: 'Contact Nico before travelling so your order can be prepared.',
  socialLinks: [],
});

console.log('Imported site settings.');
