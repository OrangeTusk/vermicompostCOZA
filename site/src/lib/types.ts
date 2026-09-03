export type ProductCategory = 'compost-soil' | 'worms-care' | 'liquids' | 'experiences';

export interface ProductVariant {
  id: string;
  label: string;
  price: number | null;
  unit?: string;
  availability?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  summary: string;
  description: string[];
  image: string;
  gallery?: string[];
  variants: ProductVariant[];
  availability: string;
  featured?: boolean;
  usage: string[];
  benefits: string[];
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  image: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs?: string[]; steps?: string[] }>;
  relatedProducts: string[];
}

export interface BasketItem {
  productId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  displayedPrice: number | null;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  hours: Array<{ days: string; times: string }>;
  fulfilmentMessage: string;
  socialLinks: string[];
}
