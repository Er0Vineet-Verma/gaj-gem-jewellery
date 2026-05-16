import { Router } from 'express';
import { gems } from '../data/gems.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ gems });
});

router.get('/:id', (req, res) => {
  const gem = gems.find(g => g.id === req.params.id);
  if (!gem) return res.status(404).json({ error: 'Gem not found' });
  res.json(gem);
});

export default router;
