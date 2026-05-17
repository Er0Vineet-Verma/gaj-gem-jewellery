# GAJ Mobile High-Fidelity Design Prompt

## 1. Mobile Design Goal

Design a **mobile-first high-fidelity experience** for **GAJ / GEM & JEWELLERY**, a family-run Indian custom jewellery studio.

The mobile website must feel:

- premium
- calm
- tactile
- cinematic
- easy to browse with one hand
- carefully maintained rather than squeezed down from desktop

It should preserve the existing brand direction:

**Refined Indian Atelier**

But on mobile, the feeling should come from:

- elegant vertical rhythm
- strong image sequencing
- clear text hierarchy
- graceful scroll transitions
- polished touch interactions
- quiet, intentional color shifts between sections

Do not design a desktop site that merely collapses. Design a true mobile experience.

## 2. One-Line Direction for Design AI

Create a premium mobile-first jewellery website for GAJ / GEM & JEWELLERY that feels like a private Indian atelier on a phone: cinematic, product-led, warm, elegant, scroll-driven, easy to use with one hand, and visually refined from top to bottom.

## 3. Target Devices and Canvas Sizes

Design and test for:

- primary canvas: `390 x 844`
- compact mobile: `360 x 800`
- large mobile: `430 x 932`

Respect:

- safe areas around notches and rounded corners
- thumb reach zones
- sticky interface elements
- bottom browser bars

All layouts must look intentional at each width, not stretched or compressed.

## 4. Mobile Experience Principles

### Product first

- jewellery photography must dominate
- mobile hero images should feel immersive and inspectable
- product cards must keep enough image size to feel luxurious

### One clear action at a time

- avoid dense desktop-style navigation
- every screen should have one obvious next action
- secondary actions should be available, but quieter

### Scroll as storytelling

- the user should feel guided while scrolling
- sections should arrive with smooth transitions and gentle tonal changes
- scrolling should feel like moving through a showroom, not jumping between boxes

### Touch comfort

- all tap targets minimum `44 x 44`
- primary controls within easy reach
- no tiny filter chips or cramped icon clusters
- sticky purchase actions on high-intent pages

### Calm luxury

- avoid visual noise
- avoid too many shadows, glows, and cards
- let spacing, photography, and typography create the premium feel

## 5. Mobile Visual Language

### Colors

Use the same palette as desktop:

- Ink black: `#0B0A0C`
- Deep maroon: `#16090D`
- Antique gold: `#C6A86B`
- Deep gold: `#A88445`
- Ivory: `#F7F2EA`
- Warm ivory: `#FBF8F3`
- Emerald: `#214338`
- Ruby: `#7A1E1E`
- Sapphire: `#243E73`
- Copper: `#B87554`

### Mobile color behavior

- Use subtle section-to-section tonal shifts instead of abrupt cuts
- Let dark sections warm slightly near CTA or craft areas
- In light mode, use warm ivory instead of pure white
- Keep gold accents selective
- Use gemstone color only for meaningful highlights

### Suggested section color flow

1. dark hero
2. near-black trust strip
3. warm ivory collections
4. deep maroon custom section
5. warm neutral featured pieces
6. darker craft story
7. ivory testimonials
8. rich dark CTA
9. lifted dark footer

The transitions should feel smooth, like material changes under showroom light.

## 6. Typography on Mobile

Use:

- high-contrast serif for titles
- elegant readable body type
- Devanagari as a secondary poetic layer
- mono or restrained sans only for labels, prices, and utility UI

### Recommended mobile type scale

- Hero title: `38-48px`
- Section heading: `28-34px`
- Product name: `20-24px`
- Body copy: `15-17px`
- Supporting copy: `13-15px`
- Labels / eyebrow text: `10-11px`

### Typography rules

- avoid giant desktop headlines wrapping awkwardly
- no negative letter spacing on body text
- limit all-caps labels so they remain special
- line length should stay comfortable
- never let Hindi text become too small to read
- preserve strong text contrast in both dark and light themes

## 7. Mobile Motion and Scroll Direction

Motion should feel like:

- silk
- unveiling
- glint
- slow camera movement

### Use these scroll transitions

- hero image slow scale-in on first load
- content fade-up with `8-16px` travel
- staggered card entrance
- image crossfade or reveal wipe for editorial photos
- section dividers that softly brighten as they enter view
- product card image swap on tap / hover alternative only when useful
- horizontal carousels with inertial scroll and scroll snap
- subtle parallax only on large imagery, never on dense UI

### Do not use

- bouncing
- excessive parallax
- dramatic zooms
- constant shimmer
- too many independent animations at once

### Motion timing guidance

- micro interactions: `160-220ms`
- standard reveals: `450-700ms`
- hero entrance: `700-1000ms`
- stagger between sibling items: `60-120ms`

### Accessibility

- support reduced motion
- when reduced motion is on, remove transforms and keep simple fades only

## 8. Mobile Header and Navigation

### Header behavior

Use a compact sticky header:

- logo on the left
- menu icon
- search icon
- wishlist or bag icon
- WhatsApp/contact access

On scroll:

- header shrinks slightly
- background gains blur and opacity
- border becomes visible

### Announcement strip

On mobile:

- keep one line only
- use horizontal ticker or rotate between short trust messages
- never allow it to become visually dominant

### Menu

Use a full-screen or side-sheet mobile menu with:

- Jewellery
- Custom
- Gemstones
- Studio
- Wishlist
- Bag
- WhatsApp

The menu should feel elegant, not app-generic.

## 9. Mobile Homepage Structure

### 1. Hero

Design:

- full-bleed image
- `72-82svh`
- image remains visible behind text but jewellery must stay inspectable
- dark overlay tuned for readability
- headline short and emotionally strong
- one primary CTA and one secondary CTA stacked vertically

Include:

- small trust row below CTA
- optional scroll cue

### 2. Trust strip

Use a slim horizontal scroll strip or compact 2x2 grid:

- BIS hallmark
- certified stones
- lifetime polish
- designer consultation

### 3. Collection paths

Use:

- full-width cards
- stacked vertically or horizontal snap cards around `82-88vw`
- each card should have image, title, and a very short descriptor

### 4. Custom design visualiser

On mobile:

- place copy first
- then selector controls
- then a large live preview
- then one clear CTA

Do not place a tiny desktop-style preview beside the controls.

### 5. Four-step atelier process

Use:

- vertical timeline or snap carousel
- one step per card
- strong numeral and icon
- concise copy

### 6. Featured jewellery

Use:

- 2-column product cards if imagery stays legible
- 1-column editorial cards for featured pieces
- horizontal tabs as scrollable chips
- generous photo ratio

### 7. Craftsmanship story

Use:

- alternating image and copy blocks
- full-width editorial images
- soft section transitions
- at most one image and one story beat per viewport

### 8. Testimonials

Use:

- swipeable testimonial carousel
- large readable quote
- concise attribution
- avoid tiny multi-column desktop adaptations

### 9. CTA

Use:

- full-width dark panel
- one strong headline
- stacked action buttons
- visible WhatsApp and phone actions

### 10. Footer

Use:

- more spacing than desktop compressed layouts
- collapsible groups if the footer becomes tall
- social icons, trust points, contact, newsletter
- enough bottom padding to clear sticky UI and browser chrome

## 10. Catalogue Page on Mobile

### Core layout

- compact title area
- sticky filter / sort bar
- horizontal chips for active filters
- full-screen filter drawer
- product grid: `2 columns` on common devices, `1 column` for premium editorial variants

### Product cards

Show:

- image
- name
- stone / metal
- starting price
- wishlist

### Interaction

- filter drawer should be fast and clear
- avoid forcing users through too many nested controls
- make active filters obvious
- keep reset filters easy to reach

## 11. Product Detail Page on Mobile

### Layout

- swipeable image gallery first
- clear title and price
- concise trust markers
- metal and size selectors
- story, specs, care in accordions

### Sticky purchase bar

At the bottom:

- `Add to bag`
- `WhatsApp`
- price or selected variant summary

Must remain visible without covering key content.

### Gallery behavior

- swipe images
- tap to open immersive image viewer
- dots or thumbnails kept minimal

## 12. Custom Design Flow on Mobile

### Layout

- sticky progress indicator
- one question per screen or one clearly separated section at a time
- large tap targets
- visible live preview
- summary card before submit

### Feel

- more like a guided studio consultation than a form
- elegant step transitions
- reassuring copy
- no cramped controls

## 13. Mobile Footer Behavior

The footer should feel deliberately designed, not leftover desktop content.

Use:

- rich dark surface
- visible spacing above content
- strong contrast
- optional accordions for Collections / Promise / Contact
- newsletter field with comfortable height
- social icons large enough for touch
- enough bottom padding for safe-area devices

## 14. Mobile Interaction Details

Include:

- scroll snap on image carousels
- sticky filter controls where useful
- animated accordions
- visible pressed states
- smooth theme transitions
- focus states for accessibility
- skeleton loading states that match final layout

Avoid:

- hover-dependent information
- text hidden under sticky controls
- floating buttons that block important content
- tiny badges and cramped pills

## 15. Responsive Behavior Rules

### At `360px`

- single-column story layouts
- no text smaller than `13px`
- CTA buttons full width
- icon clusters simplified

### At `390px`

- default design reference
- 2-column product cards allowed
- spacious hero and sections

### At `430px`

- slightly larger margins
- broader imagery
- preserve same proportions, do not simply stretch everything

## 16. Performance and Accessibility

Require:

- lazy loading for below-fold images
- compressed responsive images
- reduced-motion mode
- strong contrast
- body text never below readable size
- no CLS from late-loading images
- buttons and links accessible by keyboard and screen reader

## 17. Mobile Deliverables for Design AI

Ask for:

1. mobile homepage
2. mobile menu
3. catalogue page
4. filter drawer
5. product detail page
6. image lightbox
7. custom-design flow
8. cart / bag
9. wishlist
10. gemstones page
11. footer states
12. dark mode and light mode versions
13. motion references or transition notes
14. component library with mobile states

## 18. Mobile Negative Prompt

Do not create:

- a desktop layout merely scaled down
- giant empty white areas
- unreadable text over imagery
- hidden buttons in dark panels
- tiny chips or tiny tap targets
- excessive rounded cards everywhere
- random gradients and blobs
- generic SaaS mobile UI
- overcrowded bottom navigation
- motion-heavy pages that feel slow

## 19. Master Prompt for Mobile Design AI

Design a complete high-fidelity mobile-first website for GAJ / GEM & JEWELLERY, a family-run Indian custom jewellery studio. The visual direction is "Refined Indian Atelier": luxurious, warm, tactile, culturally rooted, product-led, and premium without being flashy. Build specifically for phone screens at 360px, 390px, and 430px widths rather than shrinking a desktop layout. Use cinematic jewellery photography, deep maroon-black surfaces, warm ivory sections, antique gold accents, elegant serif typography, highly readable body text, and subtle Devanagari support text. Create a polished mobile experience with graceful scroll transitions, smooth tonal shifts between sections, sticky but unobtrusive navigation, full-bleed hero imagery, thumb-friendly controls, visible trust signals, mobile-optimized product cards, a swipeable gallery, a sticky purchase bar on product detail, a refined custom-design flow, and a spacious readable footer. Motion should feel like silk, unveiling, and glint: gentle fade-ups, staggered reveals, slow image scale, soft crossfades, and restrained parallax only where it helps storytelling. Keep tap targets large, spacing elegant, colors smooth, and text highly legible in both dark and light mode. Avoid generic mobile ecommerce patterns, desktop leftovers, overuse of cards, tiny controls, noisy gradients, hidden CTAs, excessive animation, and any design choice that makes the jewellery less important than the interface.

## 20. Short Prompt Variant

Create a luxury mobile-first GAJ jewellery website in the "Refined Indian Atelier" style: cinematic product photography, deep maroon-black and warm ivory sections, antique gold accents, elegant serif typography, excellent legibility, smooth scroll-driven transitions, thumb-friendly controls, sticky but subtle navigation, swipeable galleries, refined product cards, strong WhatsApp conversion, and a spacious premium footer. Design for 360px, 390px, and 430px widths from scratch, not as a compressed desktop page.

