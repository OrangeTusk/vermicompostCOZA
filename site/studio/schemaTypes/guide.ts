import { defineArrayMember, defineField, defineType } from 'sanity';

export const guide = defineType({
  name: 'guide', title: 'Guide', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Main image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'sections', title: 'Sections', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'heading', title: 'Heading', type: 'string' }),
      defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] }),
      defineField({ name: 'steps', title: 'Numbered steps', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    ], preview: { select: { title: 'heading' } } })] }),
    defineField({ name: 'relatedProducts', title: 'Related products', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'product' }] })] }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary', media: 'image' } },
});
