/**
 * Frontend fallback for the product catalogue. Used when the API is
 * unreachable (e.g. backend not running locally, deploys in degraded mode)
 * so featured / catalogue surfaces don't render empty.
 *
 * Keep in sync with `backend/src/data/products.ts`.
 */
export const SEED_PRODUCTS = [
  {
    id: 'p001', slug: 'roop-ruby-ring', name: 'Roop Ruby Ring', hindi: 'रूप माणिक अंगूठी',
    category: 'ring', metals: ['22K Gold', '18K Gold'], stones: [{ en: 'Ruby', hi: 'माणिक' }],
    sizes: ['10', '12', '14', '16', '18'], basePrice: 68500, badge: 'best-seller',
    shortDesc: 'A regal Burmese ruby cradled in hand-finished 22K gold.',
    images: [
      'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p002', slug: 'panna-leaf-pendant', name: 'Panna Leaf Pendant', hindi: 'पन्ना पत्ती लटकन',
    category: 'pendant', metals: ['22K Gold', 'White Gold'], stones: [{ en: 'Emerald', hi: 'पन्ना' }],
    sizes: ['Standard'], basePrice: 52000, badge: 'gemstone',
    shortDesc: 'A leaf-cut emerald held in a delicate vine of gold.',
    images: [
      'https://images.unsplash.com/photo-1685489802596-673d1b55bd38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p003', slug: 'neelam-drop-earrings', name: 'Neelam Drop Earrings', hindi: 'नीलम बूंद बालियाँ',
    category: 'earring', metals: ['18K Gold', 'White Gold'], stones: [{ en: 'Sapphire', hi: 'नीलम' }],
    sizes: ['Standard'], basePrice: 78900, badge: 'new',
    shortDesc: 'Twin Ceylon blue sapphires that move like raindrops.',
    images: [
      'https://images.unsplash.com/photo-1671644730555-916aa8d8157f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p004', slug: 'moti-classic-set', name: 'Moti Classic Set', hindi: 'मोती क्लासिक सेट',
    category: 'necklace', metals: ['22K Gold'], stones: [{ en: 'Pearl', hi: 'मोती' }],
    sizes: ['Standard'], basePrice: 42000, badge: 'custom-ready',
    shortDesc: 'A heritage-strung pearl set, made to be worn for decades.',
    images: [
      'https://images.unsplash.com/photo-1591523734506-bc7d280f2719?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1685489802596-673d1b55bd38?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p005', slug: 'heera-solitaire-band', name: 'Heera Solitaire Band', hindi: 'हीरा सॉलिटेयर बैंड',
    category: 'ring', metals: ['18K White Gold', '18K Rose Gold'], stones: [{ en: 'Diamond', hi: 'हीरा' }],
    sizes: ['10', '12', '14', '16', '18', '20'], basePrice: 124500, badge: 'best-seller',
    shortDesc: 'A clean-line solitaire on a knife-edge band.',
    images: [
      'https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1723802205505-2f88b2227718?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p006', slug: 'pukhraj-statement-ring', name: 'Pukhraj Statement Ring', hindi: 'पुखराज स्टेटमेंट अंगूठी',
    category: 'ring', metals: ['22K Gold'], stones: [{ en: 'Yellow Sapphire', hi: 'पुखराज' }],
    sizes: ['12', '14', '16', '18'], basePrice: 88000, badge: 'gemstone',
    shortDesc: 'A bold pukhraj chowki cut in a sturdy 22K mounting.',
    images: [
      'https://images.unsplash.com/photo-1723802205505-2f88b2227718?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p007', slug: 'moonga-coral-pendant', name: 'Moonga Coral Pendant', hindi: 'मूंगा लटकन',
    category: 'pendant', metals: ['22K Gold'], stones: [{ en: 'Coral', hi: 'मूंगा' }],
    sizes: ['Standard'], basePrice: 36000, badge: 'gemstone',
    shortDesc: 'Italian red coral wrapped in a slender gold cap.',
    images: [
      'https://images.unsplash.com/photo-1685489802596-673d1b55bd38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'p008', slug: 'kangan-everyday-bracelet', name: 'Kangan Everyday Bracelet', hindi: 'कंगन',
    category: 'bracelet', metals: ['22K Gold'], stones: [{ en: 'Diamond', hi: 'हीरा' }],
    sizes: ['Standard'], basePrice: 96500,
    shortDesc: 'A daily bracelet — milgrain edges, hidden clasp.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=80',
    ],
  },
];
