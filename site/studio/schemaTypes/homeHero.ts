import { defineField, defineType } from 'sanity';

const linkValidation = (rule: any) => rule.required().custom((value: string | undefined) => {
  if (!value || value.startsWith('/') || /^https?:\/\//i.test(value)) return true;
  return 'Use a site path such as /shop or a complete https:// address.';
});

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Homepage hero',
  type: 'document',
  fields: [
    defineField({ name: 'kicker', title: 'Small heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'heading',
      title: 'Main heading',
      description: 'Press Enter where you want a deliberate line break.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Introduction', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'posterImage', title: 'Fallback image', description: 'Shown on mobile, with reduced motion, while the video loads, or when video playback is unavailable.', type: 'image', options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: 'posterAlt', title: 'Fallback image description', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'videoUrl', title: 'YouTube video URL', type: 'url', validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'videoStart', title: 'Clip starts at (seconds)', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
    defineField({
      name: 'videoEnd',
      title: 'Clip ends at (seconds)',
      type: 'number',
      validation: (rule) => rule.required().integer().positive().custom((value, context) => {
        const start = (context.document?.videoStart as number | undefined) ?? 0;
        return typeof value !== 'number' || value > start ? true : 'The end time must be after the start time.';
      }),
    }),
    defineField({ name: 'primaryLabel', title: 'Primary button label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'primaryHref', title: 'Primary button link', type: 'string', validation: linkValidation }),
    defineField({ name: 'secondaryLabel', title: 'Secondary link label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'secondaryHref', title: 'Secondary link', type: 'string', validation: linkValidation }),
    defineField({ name: 'videoLinkLabel', title: 'Full video link label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'scrollLabel', title: 'Scroll prompt', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'kicker', media: 'posterImage' },
    prepare: ({ title, subtitle, media }) => ({ title: title?.replace(/\n/g, ' ') || 'Homepage hero', subtitle, media }),
  },
});
