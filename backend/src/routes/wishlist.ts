import { Router } from 'express';
import { products } from '../data/products.js';

const router = Router();

const wishlists = new Map<string, Set<string>>();

function sessionId(req: any): string | null {
  const id = req.header('x-session-id');
  return typeof id === 'string' && id.length >= 8 ? id : null;
}

router.get('/', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const ids = wishlists.get(sid) ?? new Set();
  const items = [...ids].map(id => products.find(p => p.id === id)).filter(Boolean);
  res.json({ items, count: items.length });
});

router.post('/', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const productId = String(req.body?.productId ?? '');
  if (!products.find(p => p.id === productId)) return res.status(404).json({ error: 'Product not found' });
  const set = wishlists.get(sid) ?? new Set<string>();
  set.add(productId);
  wishlists.set(sid, set);
  res.status(201).json({ ok: true });
});

router.delete('/:productId', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const set = wishlists.get(sid);
  if (set) set.delete(req.params.productId);
  res.json({ ok: true });
});

export default router;
