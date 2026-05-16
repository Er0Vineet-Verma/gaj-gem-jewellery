export interface Gem {
  id: string;
  en: string;
  hi: string;
  short: string;
  description: string;
  uses: string[];
  color: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindi: string;
  category: 'ring' | 'pendant' | 'earring' | 'bracelet' | 'necklace' | 'bangle';
  metals: string[];
  stones: { en: string; hi: string }[];
  sizes: string[];
  basePrice: number;
  badge?: 'new' | 'best-seller' | 'custom-ready' | 'gemstone';
  shortDesc: string;
  description: string;
  specs: Record<string, string>;
  care: string;
  images: string[];
}

export interface Rate {
  label: string;
  hi: string;
  pricePerGram: number;
  changePct: number;
  unit: string;
}

export interface CartItem {
  productId: string;
  qty: number;
  metal?: string;
  size?: string;
  addedAt: string;
  product: { id: string; slug: string; name: string; hindi: string; basePrice: number; category: string } | null;
  lineTotal: number;
}
