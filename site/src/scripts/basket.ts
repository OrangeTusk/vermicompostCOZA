import type { BasketItem } from '../lib/types';

const STORAGE_KEY = 'vermicompostfarm-enquiry-v1';
const WHATSAPP_NUMBER = '27828547255';

const readBasket = (): BasketItem[] => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};

let basket = readBasket();

const saveBasket = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
  document.dispatchEvent(new CustomEvent('basket:updated', { detail: basket }));
};

const money = (value: number) => `R${value.toLocaleString('en-ZA')}`;
const total = () => basket.reduce((sum, item) => sum + (item.displayedPrice || 0) * item.quantity, 0);
const count = () => basket.reduce((sum, item) => sum + item.quantity, 0);
const isAfrikaans = () => document.documentElement.lang === 'af';

const productNamesAf: Record<string, string> = {
  'Sifted vermicompost': 'Gesifte vermikompos',
  'Unsifted vermicompost': 'Ongesifte vermikompos',
  'Potting soil': 'Potgrond',
  'Organic mulch': 'Organiese deklaag',
  'Aged horse manure': 'Verouderde perdemis',
  'Red wiggler worms': 'Rooi komposwurms',
  'Worm bedding & food': 'Wurmbeddegoed & kos',
  'Vermicompost tea': 'Vermikompostee',
  'Worm farm information tour': 'Wurmplaas-inligtingstoer',
};

const variantLabelsAf: Record<string, string> = {
  '25 dm³ bag': '25 dm³-sak',
  '60 dm³ bag': '60 dm³-sak',
  '1 m³ bulk': '1 m³-grootmaat',
  'Populated starter tray': 'Bevolkte beginbak',
  'Standard bag': 'Standaardsak',
  'Per litre': 'Per liter',
  '5 litre container': '5-liter-houer',
  '30-minute tour · per person': '30-minute-toer · per persoon',
};

const basketCopy = () => isAfrikaans() ? {
  decrease: 'Verminder', increase: 'Vermeerder', quantity: 'hoeveelheid', remove: 'Verwyder', enquire: 'Doen navraag',
  empty: 'Jou navraagmandjie is leeg.', browse: 'Blaai deur plaasprodukte',
} : {
  decrease: 'Decrease', increase: 'Increase', quantity: 'quantity', remove: 'Remove', enquire: 'Enquire',
  empty: 'Your enquiry basket is empty.', browse: 'Browse farm products',
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));

const basketMarkup = (item: BasketItem, index: number) => {
  const copy = basketCopy();
  const productName = isAfrikaans() ? productNamesAf[item.productName] || item.productName : item.productName;
  const variantLabel = isAfrikaans() ? variantLabelsAf[item.variantLabel] || item.variantLabel : item.variantLabel;
  return `
  <article class="basket-line">
    <div><h3>${escapeHtml(productName)}</h3><p>${escapeHtml(variantLabel)}</p>
      <div class="basket-line-controls"><button type="button" data-basket-decrease="${index}" aria-label="${copy.decrease} ${escapeHtml(productName)} ${copy.quantity}">−</button><span>${item.quantity}</span><button type="button" data-basket-increase="${index}" aria-label="${copy.increase} ${escapeHtml(productName)} ${copy.quantity}">+</button><button type="button" class="basket-remove" data-basket-remove="${index}">${copy.remove}</button></div>
    </div>
    <span class="basket-line-price">${item.displayedPrice === null ? copy.enquire : money(item.displayedPrice * item.quantity)}</span>
  </article>`;
};

const render = () => {
  document.querySelectorAll<HTMLElement>('[data-basket-count]').forEach((element) => { element.textContent = String(count()); });
  document.querySelectorAll<HTMLElement>('[data-basket-total]').forEach((element) => { element.textContent = money(total()); });
  document.querySelectorAll<HTMLElement>('[data-basket-items], [data-enquiry-items]').forEach((element) => {
    const copy = basketCopy();
    element.innerHTML = basket.length ? basket.map(basketMarkup).join('') : `<p class="basket-empty">${copy.empty} <a href="/shop">${copy.browse}</a>.</p>`;
  });
  document.querySelectorAll<HTMLElement>('[data-basket-json]').forEach((element) => { element.dataset.basketJson = JSON.stringify(basket); });
  const wa = document.querySelector<HTMLAnchorElement>('[data-whatsapp-enquiry]');
  if (wa) {
    const lines = basket.map((item) => `• ${item.quantity} × ${isAfrikaans() ? productNamesAf[item.productName] || item.productName : item.productName} — ${isAfrikaans() ? variantLabelsAf[item.variantLabel] || item.variantLabel : item.variantLabel}`);
    const message = isAfrikaans()
      ? ['Hallo Nico, ek wil graag navraag doen oor:', '', ...lines, '', `Beraamde produktotaal: ${money(total())}`, '', 'Bevestig asseblief beskikbaarheid, afhaal of aflewering.'].join('\n')
      : ['Hello Nico, I would like to enquire about:', '', ...lines, '', `Estimated product total: ${money(total())}`, '', 'Please confirm availability, collection or delivery.'].join('\n');
    wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    wa.toggleAttribute('aria-disabled', basket.length === 0);
  }
};

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const add = target.closest<HTMLElement>('[data-add-to-basket]');
  if (add) {
    const variantSelect = add.closest('form')?.querySelector<HTMLSelectElement>('[data-variant-select]');
    const selected = variantSelect?.selectedOptions[0];
    const item: BasketItem = {
      productId: add.dataset.productId || '', productName: add.dataset.productName || '',
      variantId: selected?.value || add.dataset.variantId || '', variantLabel: selected?.dataset.label || add.dataset.variantLabel || '',
      displayedPrice: selected ? (selected.dataset.price ? Number(selected.dataset.price) : null) : (add.dataset.price ? Number(add.dataset.price) : null), quantity: 1,
    };
    const existing = basket.find((entry) => entry.productId === item.productId && entry.variantId === item.variantId);
    if (existing) existing.quantity += 1; else basket.push(item);
    saveBasket(); render();
    const toast = document.querySelector<HTMLElement>('[data-basket-toast]');
    if (toast) { toast.hidden = false; window.setTimeout(() => { toast.hidden = true; }, 2200); }
  }
  const increase = target.closest<HTMLElement>('[data-basket-increase]');
  const decrease = target.closest<HTMLElement>('[data-basket-decrease]');
  const remove = target.closest<HTMLElement>('[data-basket-remove]');
  if (increase) basket[Number(increase.dataset.basketIncrease)].quantity += 1;
  if (decrease) { const i = Number(decrease.dataset.basketDecrease); basket[i].quantity -= 1; if (basket[i].quantity <= 0) basket.splice(i, 1); }
  if (remove) basket.splice(Number(remove.dataset.basketRemove), 1);
  if (increase || decrease || remove) { saveBasket(); render(); }
});
document.addEventListener('basket:updated', render);
document.addEventListener('language:changed', render);
render();

const enquiryForm = document.querySelector<HTMLFormElement>('[data-enquiry-form]');
enquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = enquiryForm.querySelector<HTMLElement>('[data-form-status]');
  const submit = enquiryForm.querySelector<HTMLButtonElement>('button[type="submit"]');
  submit?.setAttribute('disabled', 'true'); if (status) status.textContent = isAfrikaans() ? 'Jou navraag word gestuur…' : 'Sending your enquiry…';
  const data = Object.fromEntries(new FormData(enquiryForm).entries());
  try {
    const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...data, items: basket }) });
    if (!response.ok) throw new Error('Delivery unavailable');
    if (status) status.textContent = isAfrikaans() ? 'Dankie. Jou navraag is aan die plaas gestuur.' : 'Thank you. Your enquiry has been sent to the farm.';
    basket = []; saveBasket(); render(); enquiryForm.reset();
  } catch {
    if (status) status.innerHTML = isAfrikaans()
      ? 'E-posaflewering is nie in hierdie voorskou gekoppel nie. Gebruik asseblief WhatsApp of <a href="mailto:nico@vermicompostfarm.co.za">stuur direk vir Nico ’n e-pos</a>.'
      : 'Email delivery is not connected in this preview. Please use WhatsApp or <a href="mailto:nico@vermicompostfarm.co.za">email Nico directly</a>.';
  } finally { submit?.removeAttribute('disabled'); }
});
