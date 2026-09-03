import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site settings', type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone number', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number', type: 'string' }),
    defineField({ name: 'email', title: 'Email address', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({ name: 'mapUrl', title: 'Directions link', type: 'url' }),
    defineField({ name: 'hours', title: 'Operating / collection hours', type: 'array', of: [defineArrayMember({ type: 'object', fields: [
      defineField({ name: 'days', title: 'Days', type: 'string' }), defineField({ name: 'times', title: 'Times', type: 'string' }),
    ], preview: { select: { title: 'days', subtitle: 'times' } } })] }),
    defineField({ name: 'fulfilmentMessage', title: 'Collection and delivery note', type: 'text', rows: 3 }),
    defineField({ name: 'socialLinks', title: 'Social links', type: 'array', of: [defineArrayMember({ type: 'url' })] }),
  ],
});
