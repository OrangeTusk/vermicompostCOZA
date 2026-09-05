import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Vermicompost Farm',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'w4y9k676',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool({
    structure: (S) => S.list().title('Content').items([
      S.listItem().title('Homepage').child(S.document().schemaType('homeHero').documentId('homeHero')),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('guide').title('Guides'),
      S.divider(),
      S.listItem().title('Contact & hours').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]),
  }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !['homeHero', 'siteSettings'].includes(schemaType)),
  },
});
