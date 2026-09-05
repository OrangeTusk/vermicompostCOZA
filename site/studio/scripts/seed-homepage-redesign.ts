import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-09-01' });
const windrowsAsset = await client.fetch<string | null>('*[_type == "sanity.imageAsset" && originalFilename == "windrows.jpg"] | order(_createdAt asc)[0]._id');

const fields = {
  featuredEyebrow: 'From the farm',
  featuredTitle: 'A few good things for better soil.',
  featuredIntro: 'Farm-made compost, worms and liquid plant food for gardens of every size.',
  featuredProducts: [
    { _key: 'sifted-vermicompost', _type: 'reference', _ref: 'product-sifted-vermicompost' },
    { _key: 'red-wiggler-worms', _type: 'reference', _ref: 'product-red-wiggler-worms' },
    { _key: 'vermicompost-tea', _type: 'reference', _ref: 'product-vermicompost-tea' },
  ],
  valueEyebrow: 'Why vermicompost',
  valueTitle: 'Healthy soil is alive.',
  valueBody: 'Red wigglers turn prepared organic matter into a gentle, microbe-rich soil conditioner. A little goes a long way in pots, beds and new planting.',
  ...(windrowsAsset ? { valueImage: { _type: 'image', asset: { _type: 'reference', _ref: windrowsAsset } } } : {}),
  valueImageAlt: 'Rows of vermicomposting beds on the farm',
  benefits: [
    { _key: 'nutrition', _type: 'object', title: 'Gentle nutrition', text: 'Steady plant nutrition in a natural form.' },
    { _key: 'structure', _type: 'object', title: 'Better structure', text: 'Helps soil balance drainage and moisture.' },
    { _key: 'biology', _type: 'object', title: 'Living biology', text: 'Adds beneficial organisms to the root zone.' },
  ],
  contactTitle: 'Collect from the farm in Pretoria.',
  contactBody: 'Send Nico a message to check availability, arrange collection or ask about local delivery.',
};

await client.patch('homeHero').setIfMissing(fields).commit();
console.log('Added the new homepage fields without changing existing hero content.');
