import { defineField, defineType } from 'sanity';

const linkValidation = (rule: any) => rule.required().custom((value: string | undefined) => {
  if (!value || value.startsWith('/') || /^https?:\/\//i.test(value)) return true;
  return 'Use a site path such as /shop or a complete https:// address.';
});

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'products', title: 'Featured products' },
    { name: 'story', title: 'Why vermicompost' },
    { name: 'contact', title: 'Contact prompt' },
  ],
  fields: [
    defineField({ name: 'kicker', title: 'Small heading', type: 'string', group: 'hero', validation: (rule) => rule.required() }),
    defineField({
      name: 'heading',
      title: 'Main heading',
      description: 'Press Enter where you want a deliberate line break.',
      type: 'text',
      rows: 2,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Introduction', type: 'text', rows: 3, group: 'hero', validation: (rule) => rule.required() }),
    defineField({ name: 'posterImage', title: 'Fallback image', description: 'Shown on mobile, with reduced motion, while the video loads, or when video playback is unavailable.', type: 'image', group: 'hero', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'posterAlt', title: 'Fallback image description', type: 'string', group: 'hero', validation: (rule) => rule.required() }),
    defineField({ name: 'videoUrl', title: 'YouTube video URL', type: 'url', group: 'hero', validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'videoStart', title: 'Clip starts at (seconds)', type: 'number', group: 'hero', validation: (rule) => rule.required().integer().min(0) }),
    defineField({
      name: 'videoEnd',
      title: 'Clip ends at (seconds)',
      type: 'number',
      group: 'hero',
      validation: (rule) => rule.required().integer().positive().custom((value, context) => {
        const start = (context.document?.videoStart as number | undefined) ?? 0;
        return typeof value !== 'number' || value > start ? true : 'The end time must be after the start time.';
      }),
    }),
    defineField({ name: 'primaryLabel', title: 'Primary button label', type: 'string', group: 'hero', validation: (rule) => rule.required() }),
    defineField({ name: 'primaryHref', title: 'Primary button link', type: 'string', group: 'hero', validation: linkValidation }),
    defineField({ name: 'secondaryLabel', title: 'Secondary link label', type: 'string', group: 'hero', validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryHref', title: 'Secondary link', type: 'string', group: 'hero', validation: linkValidation }),
    defineField({ name: 'videoLinkLabel', title: 'Full video link label', type: 'string', group: 'hero', hidden: true }),
    defineField({ name: 'scrollLabel', title: 'Scroll prompt', type: 'string', group: 'hero', hidden: true }),
    defineField({ name: 'featuredEyebrow', title: 'Small heading', type: 'string', group: 'products', validation: (rule) => rule.required() }),
    defineField({ name: 'featuredTitle', title: 'Heading', type: 'string', group: 'products', validation: (rule) => rule.required() }),
    defineField({ name: 'featuredIntro', title: 'Introduction', type: 'text', rows: 2, group: 'products', validation: (rule) => rule.required() }),
    defineField({ name: 'featuredProducts', title: 'Products', description: 'Choose three products and drag them into the order you want.', type: 'array', group: 'products', of: [{ type: 'reference', to: [{ type: 'product' }] }], validation: (rule) => rule.required().min(3).max(3).unique() }),
    defineField({ name: 'valueEyebrow', title: 'Small heading', type: 'string', group: 'story', validation: (rule) => rule.required() }),
    defineField({ name: 'valueTitle', title: 'Heading', type: 'string', group: 'story', validation: (rule) => rule.required() }),
    defineField({ name: 'valueBody', title: 'Introduction', type: 'text', rows: 3, group: 'story', validation: (rule) => rule.required() }),
    defineField({ name: 'valueImage', title: 'Farm image', type: 'image', group: 'story', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'valueImageAlt', title: 'Image description', type: 'string', group: 'story', validation: (rule) => rule.required() }),
    defineField({ name: 'benefits', title: 'Three benefits', type: 'array', group: 'story', of: [{ type: 'object', fields: [defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }), defineField({ name: 'text', title: 'Short explanation', type: 'string', validation: (rule) => rule.required() })] }], validation: (rule) => rule.required().min(3).max(3) }),
    defineField({ name: 'contactTitle', title: 'Heading', type: 'string', group: 'contact', validation: (rule) => rule.required() }),
    defineField({ name: 'contactBody', title: 'Introduction', type: 'text', rows: 2, group: 'contact', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'kicker', media: 'posterImage' },
    prepare: ({ subtitle, media }) => ({ title: 'Homepage', subtitle, media }),
  },
});
