import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const subscribers = new Set<string>();

const schema = z.object({
  email: z.string().email().max(120),
  name: z.string().max(80).optional(),
});

router.post('/', (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid email' });
  subscribers.add(parsed.data.email.toLowerCase());
  res.status(201).json({ ok: true });
});

router.get('/_admin/list', (_req, res) => {
  res.json({ count: subscribers.size, subscribers: [...subscribers] });
});

export default router;
