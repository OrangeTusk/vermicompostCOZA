interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  ENQUIRY_TO_EMAIL?: string;
  ENQUIRY_FROM_EMAIL?: string;
}

interface EnquiryItem {
  productName: string;
  variantLabel: string;
  quantity: number;
  displayedPrice: number | null;
}

interface EnquiryBody {
  name?: string;
  phone?: string;
  email?: string;
  fulfilment?: string;
  suburb?: string;
  note?: string;
  items?: EnquiryItem[];
  'cf-turnstile-response'?: string;
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' },
});

const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character] ?? character));

const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let body: EnquiryBody;
  try {
    body = await request.json() as EnquiryBody;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const name = body.name?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];

  if (!name || !phone || !validEmail(email) || items.length === 0) {
    return json({ error: 'Please provide contact details and at least one product.' }, 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: body['cf-turnstile-response'] ?? '',
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    });
    const result = await verification.json() as { success?: boolean };
    if (!result.success) return json({ error: 'Security check failed. Please try again.' }, 403);
  }

  if (!env.RESEND_API_KEY || !env.ENQUIRY_TO_EMAIL || !env.ENQUIRY_FROM_EMAIL) {
    return json({ error: 'Email delivery is not configured.' }, 503);
  }

  const productRows = items.map((item) => {
    const price = item.displayedPrice === null ? 'Price on enquiry' : `R${Number(item.displayedPrice).toLocaleString('en-ZA')}`;
    return `<tr><td>${escapeHtml(item.quantity)} × ${escapeHtml(item.productName)}</td><td>${escapeHtml(item.variantLabel)}</td><td>${price}</td></tr>`;
  }).join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL,
      to: [env.ENQUIRY_TO_EMAIL],
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      html: `<h1>New Vermicompost Farm enquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Phone:</strong> ${escapeHtml(phone)}<br><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Preference:</strong> ${escapeHtml(body.fulfilment)}<br><strong>Suburb:</strong> ${escapeHtml(body.suburb)}</p>
        <table cellpadding="8" cellspacing="0" border="1"><thead><tr><th>Product</th><th>Option</th><th>Displayed price</th></tr></thead><tbody>${productRows}</tbody></table>
        <p><strong>Note:</strong><br>${escapeHtml(body.note).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!response.ok) return json({ error: 'Email delivery failed. Please use WhatsApp.' }, 502);
  return json({ ok: true });
};

export const onRequestGet = () => json({ error: 'Method not allowed.' }, 405);
