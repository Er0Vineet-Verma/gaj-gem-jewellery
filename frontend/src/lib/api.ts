const API = import.meta.env.VITE_API_URL || '/api';

function sessionId(): string {
  let id = localStorage.getItem('gaj-session');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('gaj-session', id);
  }
  return id;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-session-id': sessionId(),
    ...(init?.headers as Record<string, string> | undefined),
  };
  const r = await fetch(`${API}${path}`, { ...init, headers });
  if (!r.ok) {
    let detail = '';
    try { detail = JSON.stringify(await r.json()); } catch {}
    throw new Error(`${r.status} ${r.statusText}${detail ? ' — ' + detail : ''}`);
  }
  return r.json() as Promise<T>;
}

export const api = {
  gems:        () => request<{ gems: any[] }>('/gems'),
  gem:         (id: string) => request<any>(`/gems/${id}`),
  products:    (params?: Record<string, string | undefined>) => {
    const q = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([k, v]) => { if (v) q.set(k, v); });
    const qs = q.toString();
    return request<{ products: any[]; total: number }>(`/products${qs ? '?' + qs : ''}`);
  },
  product:     (slug: string) => request<{ product: any; related: any[] }>(`/products/${slug}`),
  rates:       () => request<{ rates: any[]; updatedAt: string }>('/rates'),
  contactInfo: () => request<any>('/contact/info'),

  custom:      (body: any) => request<{ ok: true; id: string; whatsappUrl: string }>('/custom', { method: 'POST', body: JSON.stringify(body) }),
  contact:     (body: any) => request<{ ok: true; id: string }>('/contact', { method: 'POST', body: JSON.stringify(body) }),
  subscribe:   (email: string, name?: string) => request<{ ok: true }>('/newsletter', { method: 'POST', body: JSON.stringify({ email, name }) }),

  cart: {
    get:    () => request<{ items: any[]; subtotal: number; count: number }>('/cart'),
    add:    (body: { productId: string; qty?: number; metal?: string; size?: string }) => request<{ ok: true }>('/cart', { method: 'POST', body: JSON.stringify(body) }),
    update: (productId: string, qty: number) => request<{ ok: true }>(`/cart/${productId}`, { method: 'PATCH', body: JSON.stringify({ qty }) }),
    remove: (productId: string) => request<{ ok: true }>(`/cart/${productId}`, { method: 'DELETE' }),
    clear:  () => request<{ ok: true }>('/cart', { method: 'DELETE' }),
  },

  wishlist: {
    get:    () => request<{ items: any[]; count: number }>('/wishlist'),
    add:    (productId: string) => request<{ ok: true }>('/wishlist', { method: 'POST', body: JSON.stringify({ productId }) }),
    remove: (productId: string) => request<{ ok: true }>(`/wishlist/${productId}`, { method: 'DELETE' }),
  },
};
