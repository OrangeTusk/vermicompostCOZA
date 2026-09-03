import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'w4y9k676',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    appId: 'imi2t5nmggpckt5qh3kd3jrx',
  },
});
