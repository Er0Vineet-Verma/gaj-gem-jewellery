# GEM & JEWELLERY

A premium site for a small, family-run custom jewellery studio.

- **WhatsApp:** +91 9816024887
- **Stack:** Node + Express + TypeScript (backend) · Vite + React + TypeScript + Tailwind (frontend)

## Run it locally

Two terminals:

```
# terminal 1 — backend
cd backend
copy .env.example .env     (Windows)  OR  cp .env.example .env   (mac/linux)
npm install
npm run dev
# then open http://localhost:4000/api/health

# terminal 2 — frontend
cd frontend
npm install
npm run dev
# then open http://localhost:5173
```

Run each line on its own — don't paste the comment tail after `npm run dev`,
PowerShell will try to pass it as an argument to vite.

The Vite dev server proxies `/api/*` to `http://localhost:4000` automatically, so you don't need to set `VITE_API_URL` in development.

## What is where

```
backend/
  src/
    index.ts            Express app · helmet · cors · rate-limit · routes
    config.ts           Typed env loader
    types.ts            Shared Gem, Product, Rate, CustomRequest types
    data/               Seed gems + products (edit me)
    routes/
      gems.ts           GET /api/gems
      products.ts       GET /api/products (filters + sort) · GET /api/products/:slug
      rates.ts          GET /api/rates (live metals, 60s cache)
      custom.ts         POST /api/custom (Zod-validated · returns wa.me URL)
      contact.ts        POST /api/contact · GET /api/contact/info
      cart.ts           Per-session GET/POST/PATCH/DELETE
      wishlist.ts       Per-session GET/POST/DELETE
      newsletter.ts     POST /api/newsletter
frontend/
  src/
    App.tsx             Router shell
    main.tsx            Providers + bootstrap
    index.css           Design tokens + utilities
    lib/api.ts          Typed API client with x-session-id
    lib/format.ts       inr() · waLink() · WhatsApp constants
    hooks/useReveal.ts  Scroll-reveal
    contexts/           Toast · Wishlist · Cart (session-backed)
    components/         Icon · Header · Footer · MobileNav · CartDrawer · SearchModal · Ticker · WhatsAppFAB · ProductCard
    sections/           Hero · GemStrip · Builder · HowItWorks · CorePaths · FeaturedGrid · CraftTrust · Gallery · CTA
    pages/              Home · ProductList · ProductDetail · CustomDesign · Cart · Wishlist · Gems · About · NotFound
AZURE_DEPLOY.md         Two-tier Azure deploy (Static Web App + App Service)
```

## Design system

| Token | Value |
|---|---|
| Ink | `#0B0B0C` |
| Ivory | `#F6F2EC` |
| Warm | `#FBF8F3` |
| Soft gold | `#C6A86B` |
| Deep gold | `#A88445` |
| Emerald brand | `#1F3D36` |
| Ruby brand | `#7A1E1E` |

Fonts: Playfair Display · Inter · Noto Serif Devanagari.

## Editing content

- Add or remove products: `backend/src/data/products.ts`
- Add or remove gemstones: `backend/src/data/gems.ts`
- Change WhatsApp / phone / email: `backend/.env` (then restart backend) *and* `frontend/src/lib/format.ts`
- Tune the live rate simulation: `backend/src/routes/rates.ts` (base prices `goldBase`, `silverBase`, etc.)
- Wire real live rates: set `METALS_API_KEY` and `METALS_API_URL` in `backend/.env`

## Deploy

See [`AZURE_DEPLOY.md`](./AZURE_DEPLOY.md).
