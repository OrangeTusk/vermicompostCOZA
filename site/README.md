# Vermicompost Farm website

Astro website for Vermicompost Farm, designed for static deployment on Cloudflare Pages. The product basket stays in the visitor's browser and creates either a structured WhatsApp message or an email enquiry. It is intentionally not a payment checkout.

## Local development

```powershell
pnpm install
pnpm dev
```

The production build is created with `pnpm build` in `dist`.

## Cloudflare Pages

- Framework preset: **Astro**
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `22`
- Start with a free `*.pages.dev` address; attach the production domain only after approval.

Add the variables from `.env.example` in **Workers & Pages → Settings → Variables and Secrets**. `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` must be encrypted secrets. The enquiry email function remains unavailable until a Resend sending domain is verified.

## Sanity Studio

The `studio` directory contains the client-editable product, guide and site-settings schemas. Create or select a Sanity project, copy `studio/.env.example` to `studio/.env`, then run `pnpm install` and `pnpm dev` inside that directory.

The demo currently has a local content fallback so it can be reviewed before Sanity credentials and final client content are available. When content is published, configure a Sanity webhook to trigger the Cloudflare Pages deploy hook. Use the filter `_type in ["product", "guide", "siteSettings"]` and enable drafts only if preview builds are added later.

## Before the live-domain switch

Confirm the farm address, hours, phone, email, prices and fulfilment notes; create Turnstile and Resend credentials; connect Sanity; and replace the temporary Pages URL with the live URL for `SITE_URL`.
