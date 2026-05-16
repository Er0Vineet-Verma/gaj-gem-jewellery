# GAJ Project Review

## Step 1 - Architecture walkthrough

Date: 2026-05-16

### Product shape

GAJ is a full-stack jewellery studio website:

- Frontend: React 18 + Vite + TypeScript + Tailwind CSS
- Backend: Express + TypeScript
- Main experience: premium catalogue, product detail pages, custom-design wizard, cart, wishlist, gemstone education, and WhatsApp-led conversion

### Frontend architecture

Key entry points:

- `frontend/src/main.tsx`: app bootstrap and providers
- `frontend/src/App.tsx`: shell, routing, global chrome
- `frontend/src/index.css`: design tokens, global styles, dark mode, aurora/glass effects

Main route groups:

- Home: `pages/Home.tsx`
- Catalogue: `pages/ProductList.tsx`
- Product detail: `pages/ProductDetail.tsx`
- Custom flow: `pages/CustomDesign.tsx`
- Utility commerce pages: `Cart.tsx`, `Wishlist.tsx`
- Brand/content pages: `Gems.tsx`, `About.tsx`

State and data flow:

- `lib/api.ts` is the frontend API client
- `CartContext.tsx` and `WishlistContext.tsx` persist by browser session id
- `ThemeContext.tsx` controls light/dark mode
- `ToastContext.tsx` handles user feedback

Reusable UI:

- Global chrome: `Header`, `Footer`, `Ticker`, `MobileNav`, `CartDrawer`
- Commerce UI: `ProductCard`, `SearchModal`, `Skeleton`
- Marketing sections: hero, gemstone strip, builder, trust, gallery, testimonials, CTA

### Backend architecture

Main entry:

- `backend/src/index.ts`: Express app, security middleware, CORS, rate limiting, route wiring

Routes:

- `gems.ts`: gemstone catalogue
- `products.ts`: product listing, search, filtering, detail, related products
- `rates.ts`: live/simulated precious metal rates
- `custom.ts`: validated custom-design requests plus WhatsApp URL generation
- `contact.ts`: contact submissions and business info
- `cart.ts`: in-memory session cart
- `wishlist.ts`: in-memory session wishlist
- `newsletter.ts`: newsletter signup

Data:

- `data/products.ts`
- `data/gems.ts`

### Frontend-backend contract

The frontend talks to `/api/*` through `lib/api.ts`.

Important current behaviors:

- Cart and wishlist use `x-session-id`
- Product filters are partly server-side and partly client-side
- Custom-design submissions are validated server-side and converted into a prefilled WhatsApp conversation
- Metal rates are cached and can use multiple sources before falling back to simulated data

### Current project maturity

Strengths:

- Clear separation between presentation, state, and API access
- Good route coverage for a small commerce site
- Custom-design flow is a real differentiator
- Backend is compact and understandable

Current limits:

- Cart and wishlist are in-memory only, so data disappears on backend restart
- Product and gem data are seed arrays, not database-backed
- No authentication or admin workflow beyond a simple dev list route
- There is visible text encoding corruption in multiple files
- Frontend build is currently failing on TypeScript errors

## Step 2 - Review of the recent Claude changes

### What appears to have changed

The recent May 16, 2026 frontend pass added or expanded:

- Dark mode as the default theme
- Site-wide aurora backgrounds and section spotlights
- Glassmorphism-style header and cards
- More motion via Framer Motion
- New testimonials section
- A richer footer
- More elaborate collection and product-detail presentation
- Extra polish in the custom-design flow

The backend changes from the same day are much narrower:

- `routes/rates.ts` was substantially upgraded to fetch live metals data from multiple sources, cache it, and fall back to simulated values
- `data/gems.ts` was refreshed with imagery/content

### Strong parts worth keeping

- The site now has a much clearer luxury identity than a plain ecommerce template
- The custom-design flow is a strong conversion path and feels specific to this business
- Product detail UX is noticeably better: image gallery, lightbox, sticky summary, tabs, WhatsApp action
- Dark mode is thoughtfully integrated across many surfaces
- The footer has real utility instead of being decorative filler
- The rate service is more robust than a single-source implementation

### Main concerns

1. Visual repetition

The design leans very heavily on the same aurora/spotlight treatment across almost every section. This gives the site atmosphere, but too much repetition reduces hierarchy and makes different sections feel less distinct.

2. Luxury signal is partly decorative rather than product-led

The best luxury jewellery sites foreground:

- large, precise product photography
- material detail
- craftsmanship
- restraint

This site currently gets some of its premium feeling from effects rather than from the jewellery itself. That is attractive at first glance, but less convincing over a long browse.

3. Typography is not yet fully premium

`Playfair Display` helps, but the body font is still `Inter`, and many pages rely on the same eyebrow labels, same tracking, and same rounded pills. The result is polished but somewhat templated.

4. Roundedness is overused

There are many `rounded-2xl` and `rounded-3xl` surfaces. For jewellery, a slightly sharper system often feels more refined and more expensive.

5. Real implementation issues remain

- Frontend build currently fails in `Skeleton.tsx` and `Testimonials.tsx`
- Multiple files contain mojibake / encoding corruption
- Some generated copy is generic or synthetic, especially testimonials
- Some UI decisions are inconsistent with the otherwise refined direction, such as very busy aurora layering plus many glass cards

### Bottom line

The Claude work moved the site from "functional small-storefront" toward "premium studio experience." The next step should not be adding more effects. It should be:

1. make the jewellery itself more dominant,
2. reduce repeated decoration,
3. sharpen the typography and layout system,
4. repair the technical rough edges,
5. then add richer brand storytelling where it helps conversion.

## Step 3 - How to make this jewellery website more appealing

### Design direction to pursue

The strongest direction for GAJ is:

**Refined Indian atelier**

That means:

- product-led, not effect-led
- warm, tactile, ceremonial, but still modern
- rich enough to feel special, restrained enough to feel expensive

### What to improve first

#### 1. Make photography the hero

The quickest way to make a jewellery site feel premium is not another gradient. It is better imagery.

Priorities:

- close-up product photography with crisp highlights
- model/lifestyle imagery showing scale on hand, ear, neck, or wrist
- macro craftsmanship shots: prongs, clasps, stone setting, polishing
- consistent backgrounds and color treatment across all product photos

For GAJ specifically:

- keep the current hero composition, but use a stronger jewellery image with richer detail
- reduce placeholder-like stock variation across product cards
- add one image type per product page beyond packshot: worn shot, macro detail, side profile, scale shot

#### 2. Build a stronger hierarchy

Right now many sections compete at similar intensity.

Recommended hierarchy:

1. Hero with one unforgettable product image
2. Featured collections
3. Custom-design proposition
4. Craft / trust proof
5. Product catalogue
6. Gem education
7. Testimonials and CTA

The page should breathe between these moments. Not every section needs glow, animation, a card, and a headline treatment.

#### 3. Sharpen the typography system

Suggested system:

- Display serif: keep a high-contrast serif for product names and headlines
- Body serif or refined sans: use a calmer companion than plain Inter for narrative text
- Use fewer uppercase eyebrow labels
- Reduce repeated letter spacing
- Let product names and craftsmanship copy carry more of the luxury feeling

Concrete changes:

- reserve large expressive serif only for hero and major section titles
- use tighter, quieter headings inside cards and filters
- consider pairing a display serif with a warmer humanist sans or elegant serif body

#### 4. Simplify the surface language

Jewellery looks more expensive when the UI is quieter.

Improve by:

- reducing the number of glass cards
- using fewer large corner radii
- giving product cards cleaner edges and subtler shadows
- using aurora effects only at key moments, not continuously
- introducing deliberate plain sections so decorative sections feel special again

#### 5. Increase tactile trust

People buying jewellery want proof.

Add or strengthen:

- hallmark details
- certification details
- material origin
- craftsmanship process
- care instructions
- return / alteration / resize policy
- delivery timeline
- appointment / consultation flow

This should be woven into pages, not hidden in one generic footer.

#### 6. Make product browsing more seductive

Improve the catalogue by:

- adding larger product hover states or alternate image on hover
- showing material/stone cues more clearly
- offering filters that match how people shop: occasion, price range, stone, metal, wear type
- adding quick-view or compare only if it stays elegant
- curating groups like "bridal", "daily wear", "astrological", "heritage"

#### 7. Give the brand more personality

The current copy is pleasant, but the brand voice could become more specific.

Good directions:

- family atelier
- hand-finishing
- regional craft
- gemstone sourcing
- bridal rituals
- heirloom making

The site should feel like this studio could only exist in one place, with one history, rather than as a generic luxury theme.

### Recommended design sequence

1. Fix technical issues and encoding
2. Upgrade image strategy
3. Reduce repeated aurora/glass styling
4. Tighten typography and spacing
5. Rework homepage hierarchy
6. Improve catalogue/product-detail storytelling
7. Add stronger trust and brand-content modules

### What not to do next

- Do not keep adding more gradients
- Do not add more cards just because a section needs emphasis
- Do not let effects overpower product imagery
- Do not make every section feel like a hero
- Do not keep expanding the UI before the content quality is stronger

## Step 4 - Technical repair pass

### What was checked

- Frontend build
- Backend typecheck
- File bytes for several apparently corrupted strings

### Findings

- The visible `Â`, `à¤`, and similar characters seen in terminal output are not necessarily file corruption. Byte inspection shows UTF-8 sequences in the source files; the issue is PowerShell console rendering, not damaged repository text.
- The actual frontend build failures were:
  - `Skeleton.tsx`: `Bone` did not accept a `style` prop
  - `Testimonials.tsx`: Framer Motion variants were inferred too loosely for the `ease` value

### Fixes made

- Extended `Bone` to accept an optional `CSSProperties` `style` prop
- Typed testimonial animation objects as `Variants`
- Replaced the string easing value with a numeric cubic-bezier easing tuple accepted by Framer Motion's types

### Verification

- `frontend`: `npm run build` now succeeds
- `backend`: `npm run lint` succeeds

## Step 5 - High-fidelity design brief

A dedicated design brief was created at:

- `HIGH_FIDELITY_DESIGN_BRIEF.md`

It translates the current GAJ direction into a from-scratch high-fidelity design system for use with design AI, including:

- creative direction
- audience and brand personality
- color and typography guidance
- photography rules
- homepage structure
- page-by-page requirements
- component system
- motion and accessibility guidance
- image-generation prompts
- a master prompt for design AI tools

## Step 6 - Typography and contrast diagnosis

### What was reported

- In dark mode, several headings, labels, and card texts were nearly invisible against the maroon background
- In light mode, supporting text felt lighter than desired

### Root cause found

The light-mode token rule in `frontend/src/index.css` used:

- `html:not(.dark) body, body:not(.dark)`

Because the `dark` class is applied to the `html` element rather than the `body`, `body:not(.dark)` still matched during dark mode. That later rule overwrote the dark text tokens with light-mode values, producing dark text on a dark background.

### Additional finding

- The legacy `--muted` token stayed brown in both themes, which made some secondary labels too dim in dark mode and a little too soft in light mode

### Fixes made

- Removed the accidental `body:not(.dark)` selector so light-mode text tokens no longer override dark mode
- Brightened dark-mode supporting text tokens for better readability
- Darkened light-mode body, muted, and faint text tokens for stronger contrast
- Made the legacy `--muted` token theme-aware instead of using one brown value in both themes
- Added dark-mode overrides for legacy `text-ink` / `text-ink-2` utility usage so older components do not disappear against dark surfaces

### Verification

- Reloaded the local app in dark mode and checked previously low-contrast homepage sections including gemstones, path cards, visualiser, and atelier steps
- Toggled to light mode and confirmed supporting text now reads darker while preserving the warm palette
- `frontend`: `npm run build` succeeds
- `backend`: `npm run lint` succeeds

## Step 7 - Footer polish

### What changed

- Replaced the flat near-black footer with a slightly lifted dark gradient surface
- Added more top padding so the footer content no longer feels pinned to the upper edge
- Brightened footer headings, body copy, links, social icons, and form text for better readability
- Strengthened the footer divider and form field treatment so the block feels more intentional in both themes

### Why

- In light mode the footer looked visually cramped at the top
- In dark mode the footer read too flat and dim against the rest of the page

### Follow-up adjustment

- Normalized the new footer opacity utilities to valid Tailwind values / explicit arbitrary opacity syntax so the intended visual treatment is preserved by the build

## Step 8 - Appointment CTA polish

### What changed

- Replaced the generic dark CTA surface with a brighter theme-aware panel treatment
- Added a dedicated `btn-on-dark` style for secondary actions inside dark surfaces
- Switched the WhatsApp and phone actions to that dedicated style so they stay visible in light mode and still look refined in dark mode

### Why

- The CTA panel is intentionally dark in both themes
- The old secondary buttons inherited light-mode text tokens, which made them nearly disappear on the dark panel

### Verification

- Checked the homepage in light mode and confirmed all three appointment actions are visible
- Checked the homepage in dark mode and confirmed the CTA panel now reads a little brighter while preserving text contrast
- Verified the footer now has clearer spacing and brighter content in both themes
- `frontend`: `npm run build` succeeds
- `backend`: `npm run lint` succeeds
