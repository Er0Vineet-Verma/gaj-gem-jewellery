import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';

import gemsRouter from './routes/gems.js';
import productsRouter from './routes/products.js';
import ratesRouter from './routes/rates.js';
import customRouter from './routes/custom.js';
import contactRouter from './routes/contact.js';
import cartRouter from './routes/cart.js';
import wishlistRouter from './routes/wishlist.js';
import newsletterRouter from './routes/newsletter.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (config.corsOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'x-session-id', 'Authorization'],
}));
app.use(express.json({ limit: '256kb' }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

const limiter = rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true, legacyHeaders: false });
app.use('/api', limiter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: config.nodeEnv, time: new Date().toISOString() });
});

app.use('/api/gems', gemsRouter);
app.use('/api/products', productsRouter);
app.use('/api/rates', ratesRouter);
app.use('/api/custom', customRouter);
app.use('/api/contact', contactRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/newsletter', newsletterRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal error' });
});

app.listen(config.port, () => {
  console.log(`GEM & JEWELLERY API · http://localhost:${config.port}  · env=${config.nodeEnv}`);
});
