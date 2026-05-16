import { Router } from 'express';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { config } from '../config.js';

const router = Router();

interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const messages: ContactMessage[] = [];

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(20).optional(),
  subject: z.string().min(2).max(120),
  message: z.string().min(5).max(2000),
});

router.post('/', (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
  }
  const entry: ContactMessage = {
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };
  messages.push(entry);
  res.status(201).json({ ok: true, id: entry.id });
});

router.get('/info', (_req, res) => {
  res.json({
    whatsapp: config.business.whatsapp,
    whatsappUrl: `https://wa.me/${config.business.whatsapp}`,
    phone: config.business.phone,
    email: config.business.email,
    hours: 'Mon–Sat · 11:00–20:00 IST',
  });
});

export default router;
