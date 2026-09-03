import { defineArrayMember, defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product', title: 'Product', type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [
      { title: 'Compost & soil', value: 'compost-soil' }, { title: 'Worms & care', value: 'worms-care' },
      { title: 'Liquids', value: 'liquids' }, { title: 'Farm experiences', value: 'experiences' },
    ] }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', title: 'Card summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 3 })] }),
    defineField({ name: 'image', title: 'Main image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
    defineField({ name: 'variants', title: 'Options and prices', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'id', title: 'Short ID', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'label', title: 'Size or label', type: 'string', validation: (rule) => rule.required() }),
      defineField({ name: 'price', title: 'Price in rand', type: 'number' }),
      defineField({ name: 'unit', title: 'Unit', type: 'string' }),
      defineField({ name: 'availability', title: 'Availability note', type: 'string' }),
      defineField({ name: 'displayOrder', title: 'Display order', type: 'number' }),
    ], preview: { select: { title: 'label', subtitle: 'price' } } })] }),
    defineField({ name: 'availability', title: 'Product availability', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured product', type: 'boolean', initialValue: false }),
    defineField({ name: 'usage', title: 'Usage notes', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'benefits', title: 'Benefits', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'image' } },
});
