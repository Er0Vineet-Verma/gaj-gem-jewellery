export const WHATSAPP = '919816024887';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`;
export const PHONE = '+91 9816024887';
export const EMAIL = 'hello@gemandjewellery.in';

export function inr(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function pct(n: number): string {
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
