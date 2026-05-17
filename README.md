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
    App.tsx                 Router shell · branches on useIsMobile() for mobile vs desktop tree
    main.tsx                Providers + bootstrap · imports index.css and mobile/mobile.css
    index.css               Desktop design tokens + component classes
    lib/api.ts              Typed API client with x-session-id
    lib/format.ts           inr() · waLink() · WhatsApp constants
    lib/seedProducts.ts     Fallback products so featured surfaces never render empty
    hooks/useReveal.ts      Scroll-reveal
    hooks/useIsMobile.ts    matchMedia('(max-width: 720px)') with live resize listener
    contexts/               Toast · Wishlist · Cart (session-backed) · Theme
    components/             Icon · Header · Footer · MobileNav · CartDrawer · SearchModal · Ticker · WhatsAppFAB · ProductCard
    sections/               Hero · Marquee · CorePaths · HowItWorks · FeaturedGrid · CraftTrust · Gallery · Testimonials · CTA
    pages/                  Home · ProductList · ProductDetail · CustomDesign · Cart · Wishlist · Gems · About · NotFound
    mobile/                 mobile.css · MobileShared.tsx · MobileShell.tsx · MobileHome.tsx
AZURE_DEPLOY.md             Two-tier Azure deploy (Static Web App + App Service)
HIGH_FIDELITY_DESIGN_BRIEF.md
MOBILE_HIGH_FIDELITY_DESIGN_PROMPT.md
PROJECT_REVIEW.md           Step-by-step history of design / build passes
```

## Responsive behaviour

The site renders two different React trees depending on viewport width — a clean break, not a media-query collapse.

- **`> 720 px` (desktop):** the existing `Header` + `Hero` + `Marquee` + section flow + `Footer`, exactly as designed in the Refined Atelier desktop brief.
- **`≤ 720 px` (mobile):** `MobileHeader` (compact sticky) + `MobileTicker` (rotating trust line) + `MobileHome` (full mobile scroll: full-bleed hero → trust grid → collection stack → custom visualiser → atelier timeline → 2-col products + editorial card → craft story → testimonial → CTA) + `MobileFooter` (accordion).

The switch is driven by `hooks/useIsMobile.ts` and rebinds live on resize, so users dragging a desktop window narrower see the layout swap in real time. Tap targets, hero height, and section padding are all tuned for the 360 / 390 / 430 px canvases from the mobile design bundle.

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
