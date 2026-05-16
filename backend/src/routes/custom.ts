import { Router } from 'express';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { config } from '../config.js';
import type { CustomRequest } from '../types.js';

const router = Router();

const requests: CustomRequest[] = [];

const schema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(7).max(20),
  type: z.string().min(2).max(40),
  stone: z.string().min(2).max(40),
  stoneHi: z.string().max(40).optional().default(''),
  metal: z.string().min(2).max(40),
  size: z.string().min(1).max(20),
  budget: z.coerce.number().int().min(5000).max(10_000_000),
  notes: z.string().max(800).optional(),
  referenceUrl: z.string().url().max(500).optional(),
});

router.post('/', (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
  }
  const data = parsed.data;
  const entry: CustomRequest = {
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    type: data.type,
    stone: data.stone,
    stoneHi: data.stoneHi || '',
    metal: data.metal,
    size: data.size,
    budget: data.budget,
    notes: data.notes,
    referenceUrl: data.referenceUrl,
  };
  requests.push(entry);

  const lines = [
    `Hello GEM & JEWELLERY,`,
    ``,
    `I would like a custom *${data.type}*.`,
    `• Stone: ${data.stone}${data.stoneHi ? ` (${data.stoneHi})` : ''}`,
    `• Metal: ${data.metal}`,
    `• Size: ${data.size}`,
    `• Budget: ₹${data.budget.toLocaleString('en-IN')}`,
    data.notes ? `• Notes: ${data.notes}` : '',
    data.referenceUrl ? `• Reference: ${data.referenceUrl}` : '',
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    ``,
    `Ref: ${entry.id}`,
  ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/${config.business.whatsapp}?text=${encodeURIComponent(lines)}`;

  res.status(201).json({ ok: true, id: entry.id, whatsappUrl });
});

router.get('/_admin/list', (_req, res) => {
  // In production you'd protect this — kept open in dev for ease.
  res.json({ requests });
});

export default router;
