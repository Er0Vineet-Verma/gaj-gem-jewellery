import { Router } from 'express';
import { products } from '../data/products.js';

const router = Router();

router.get('/', (req, res) => {
  const { category, stone, metal, q, sort } = req.query as Record<string, string | undefined>;
  let list = [...products];

  if (category && category !== 'all') {
    list = list.filter(p => p.category === category);
  }
  if (stone) {
    list = list.filter(p => p.stones.some(s => s.en.toLowerCase() === stone.toLowerCase()));
  }
  if (metal) {
    list = list.filter(p => p.metals.some(m => m.toLowerCase().includes(metal.toLowerCase())));
  }
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(needle) ||
      p.hindi.includes(q) ||
      p.shortDesc.toLowerCase().includes(needle) ||
      p.stones.some(s => s.en.toLowerCase().includes(needle) || s.hi.includes(q))
    );
  }
  if (sort === 'price-asc') list.sort((a, b) => a.basePrice - b.basePrice);
  else if (sort === 'price-desc') list.sort((a, b) => b.basePrice - a.basePrice);
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

  res.json({ products: list, total: list.length });
});

router.get('/:slug', (req, res) => {
  const product = products.find(p => p.slug === req.params.slug || p.id === req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.stones.some(s => product.stones.some(ps => ps.en === s.en))))
    .slice(0, 4);

  res.json({ product, related });
});

export default router;
