/* ─────────────────────────────────────────────────────────────
   GAJ — Product, gemstone, and content data
   ───────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 'mehr-ruby-ring',
    name: 'Mehr Ruby Solitaire',
    deva: 'मेहर रूबी सॉलिटेयर',
    category: 'rings',
    stone: 'Ruby',
    metal: '22K Yellow Gold',
    occasion: 'Bridal',
    wear: 'Statement',
    price: 184000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop'
    ],
    tag: 'Bridal',
    badge: '',
    spec: { 'Stone': 'Burmese Ruby, 2.4ct', 'Cut': 'Cushion', 'Setting': 'Bezel, Halo', 'Metal': '22K Yellow Gold, 8.6g', 'Certificate': 'GIA Origin Report', 'Hallmark': 'BIS 916' },
    story: "The centre stone is a cushion-cut Burmese ruby — a pigeon-blood red set into a halo of pavé diamonds. Held by a delicate beaded bezel, finished by hand in our Jaipur atelier. Mehr is built around stillness — a ring that does not announce itself, only its light."
  },
  {
    id: 'amrita-emerald-necklace',
    name: 'Amrita Emerald Chain',
    deva: 'अमृता पन्ना हार',
    category: 'necklaces',
    stone: 'Emerald',
    metal: '18K Yellow Gold',
    occasion: 'Bridal',
    wear: 'Statement',
    price: 326000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop'
    ],
    tag: 'New',
    spec: { 'Stone': 'Zambian Emerald, 6.2ct', 'Cut': 'Old Mine, Cabochon ends', 'Length': '16 in. adj.', 'Metal': '18K Yellow Gold, 22.4g', 'Certificate': 'GRS Origin', 'Hallmark': 'BIS 750' },
    story: "Eleven Zambian emerald cabochons, hand-graded for an even moss-green and threaded onto a chain that softens against the collarbone. Made for the moment a bride first steps out of the doli."
  },
  {
    id: 'jharokha-jhumka',
    name: 'Jharokha Jhumka',
    deva: 'झरोखा झुमका',
    category: 'earrings',
    stone: 'Pearl',
    metal: '22K Yellow Gold',
    occasion: 'Festive',
    wear: 'Statement',
    price: 96000,
    images: [
      'https://images.unsplash.com/photo-1535632066274-c4c20cda8b80?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop'
    ],
    tag: '',
    spec: { 'Stone': 'South Sea Pearls, 7mm', 'Style': 'Dome jhumka with jaali', 'Drop': '52mm', 'Metal': '22K Yellow Gold, 12.8g', 'Closure': 'Screw-back', 'Hallmark': 'BIS 916' },
    story: "A jhumka traced from a window we sketched in Bundi. The jaali is cut by hand, set with twelve South Sea pearls and finished with a brushed inner dome that catches lamplight from below."
  },
  {
    id: 'kohl-sapphire-band',
    name: 'Kohl Sapphire Band',
    deva: 'काजल नीलम बैंड',
    category: 'rings',
    stone: 'Sapphire',
    metal: '18K White Gold',
    occasion: 'Everyday',
    wear: 'Subtle',
    price: 142000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066274-c4c20cda8b80?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85&auto=format&fit=crop'
    ],
    tag: '',
    spec: { 'Stone': 'Ceylon Sapphire, 1.1ct', 'Cut': 'Step', 'Setting': 'Channel, flush', 'Metal': '18K White Gold, 4.2g', 'Certificate': 'IGI', 'Hallmark': 'BIS 750' },
    story: "A flush-set Ceylon sapphire in a half-channel band — fine enough to stack under a wedding ring, deep enough to wear alone."
  },
  {
    id: 'champa-everyday-chain',
    name: 'Champa Everyday Chain',
    deva: 'चंपा दैनिक चेन',
    category: 'necklaces',
    stone: 'None',
    metal: '22K Yellow Gold',
    occasion: 'Everyday',
    wear: 'Subtle',
    price: 64000,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066274-c4c20cda8b80?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop'
    ],
    tag: '',
    spec: { 'Style': 'Foxtail link', 'Length': '18 in.', 'Weight': '8.2g 22K', 'Closure': 'Lobster, gold-set', 'Hallmark': 'BIS 916' },
    story: "A foxtail chain woven to lie flat, intended to live on skin. Stamped on the back of the clasp with the date of the sketch it came from."
  },
  {
    id: 'roop-bridal-set',
    name: 'Roop Bridal Suite',
    deva: 'रूप दुल्हन सूट',
    category: 'sets',
    stone: 'Mixed',
    metal: '22K Yellow Gold',
    occasion: 'Bridal',
    wear: 'Statement',
    price: 1240000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=85&auto=format&fit=crop'
    ],
    tag: 'Heirloom',
    spec: { 'Includes': 'Choker, rani-haar, jhumka, tikka, bajuband', 'Stones': 'Ruby, Emerald, Polki, Pearl', 'Metal': '22K Yellow Gold, 184g total', 'Build time': '14–18 weeks', 'Hallmark': 'BIS 916' },
    story: "A five-piece bridal suite built around a single, untreated Burmese ruby found at our supplier in Mogok. Every other stone in the suite was chosen to support its colour temperature."
  },
  {
    id: 'baadshah-polki-haar',
    name: 'Baadshah Polki Haar',
    deva: 'बादशाह पोलकी हार',
    category: 'necklaces',
    stone: 'Polki Diamond',
    metal: '22K Yellow Gold',
    occasion: 'Heirloom',
    wear: 'Statement',
    price: 542000,
    images: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop'
    ],
    tag: 'Heirloom',
    spec: { 'Stones': 'Uncut Polki, 38ct', 'Setting': 'Closed-back kundan', 'Length': 'Bib, 14 in.', 'Metal': '22K Yellow Gold, 64g', 'Reverse': 'Hand-painted meenakari', 'Hallmark': 'BIS 916' },
    story: "Set in the traditional closed-back kundan technique. The reverse carries a hand-painted meenakari of peacocks — visible only when the necklace is held in the hand."
  },
  {
    id: 'inara-rose-stud',
    name: 'Inara Rose Studs',
    deva: 'इनारा गुलाब बाली',
    category: 'earrings',
    stone: 'Pink Sapphire',
    metal: '18K Rose Gold',
    occasion: 'Everyday',
    wear: 'Subtle',
    price: 48000,
    images: [
      'https://images.unsplash.com/photo-1535632066274-c4c20cda8b80?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85&auto=format&fit=crop'
    ],
    tag: 'New',
    spec: { 'Stone': 'Pink Sapphire, 0.4ct × 2', 'Cut': 'Round brilliant', 'Setting': 'Six-prong', 'Metal': '18K Rose Gold, 1.8g', 'Closure': 'Screw-back', 'Hallmark': 'BIS 750' },
    story: "Six-prong rose-gold studs in soft pink Madagascan sapphire. The most-worn piece in our catalogue — built to live on the ear, not in the box."
  }
];

const COLLECTIONS = [
  { id: 'bridal', name: 'Bridal', deva: 'दुल्हन', span: 'span-7', count: '24 pieces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&q=85&auto=format&fit=crop' },
  { id: 'everyday', name: 'Everyday Gold', deva: 'दैनिक स्वर्ण', span: 'span-5', count: '36 pieces', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop' },
  { id: 'gemstone', name: 'Gemstone', deva: 'रत्न', span: 'span-5', count: '28 pieces', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop' },
  { id: 'heirloom', name: 'Custom Heirloom', deva: 'कुलधरोहर', span: 'span-7', count: 'Made to order', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=85&auto=format&fit=crop' }
];

const GEMS = [
  { id: 'ruby',     name: 'Ruby',          deva: 'माणिक',    color: '#9A1F2A', astro: 'Sun · Surya',     hardness: '9.0',   origin: 'Mogok, Burma',
    body: "We grade rubies first by colour temperature and only then by carat. A small, evenly-coloured Burmese stone outperforms a larger Mozambique most of the time. Our buyer travels to Mogok twice a year." },
  { id: 'emerald',  name: 'Emerald',       deva: 'पन्ना',    color: '#1B6E4F', astro: 'Mercury · Budh',  hardness: '7.5–8', origin: 'Muzo, Colombia · Zambia',
    body: "Emeralds are read for clarity and for the type of inclusion they carry. We avoid stones that have been heavily oiled and we will always tell you what the stone has been through before it reached us." },
  { id: 'sapphire', name: 'Sapphire',      deva: 'नीलम',     color: '#1D3A6E', astro: 'Saturn · Shani',  hardness: '9.0',   origin: 'Kashmir · Ceylon',
    body: "The cornflower blue of a Kashmir sapphire is the colour we measure others against. Ceylon stones give us the everyday band — same hardness, more transparency, half the wait." },
  { id: 'pearl',    name: 'Pearl',         deva: 'मोती',     color: '#EFE7D7', astro: 'Moon · Chandra',  hardness: '2.5–4', origin: 'South Sea · Akoya',
    body: "Pearls are sorted on a velvet tray in north-light. We pick by lustre first, then by surface, then by shape. Anything that catches the eye for the wrong reason goes back." },
  { id: 'polki',    name: 'Polki',         deva: 'पोलकी',    color: '#D4C8A4', astro: 'Uncut · Hand-set', hardness: '10',   origin: 'Surat',
    body: "Polki is the uncut, unfaceted form of the diamond — closer to how the stone left the earth. It sits flat and quiet, gathering light from the back of the setting." },
  { id: 'tanzanite',name: 'Tanzanite',     deva: 'तंजानाइट', color: '#3A2E6E', astro: 'Trichroic blue',   hardness: '6.5',   origin: 'Merelani, Tanzania',
    body: "Cut to favour the blue axis. A single-locality stone — what we have now is what we have." },
  { id: 'topaz',    name: 'Yellow Topaz',  deva: 'पुखराज',   color: '#C99E3C', astro: 'Jupiter · Brihaspati', hardness: '8', origin: 'Minas Gerais',
    body: "Pukhraj is bought for both colour and astrological intent. We can pair you with a Vedic jyotishi if you would like a stone-on-finger reading before you commit." },
  { id: 'coral',    name: 'Coral',         deva: 'मूंगा',    color: '#B73B2B', astro: 'Mars · Mangal',    hardness: '3.5',   origin: 'Sardinian, Mediterranean',
    body: "Sardinian moonga — the only coral we use. Sourced from a single co-operative and traceable to the dive boat." }
];

const TESTIMONIALS = [
  { quote: "We had a stone my grandmother left us. They re-set it into a necklace for my wedding without telling me it had cracked — they replaced it from their own stock and told me afterwards. That is the studio.", name: "Aanya Mehra", what: "Bridal commission · 2025" },
  { quote: "I went in for a band and left, six months later, with the ring I'd been drawing on napkins for fifteen years. They never once tried to upsell. They asked questions until they understood it.", name: "Karan & Yashasvi", what: "Engagement ring · 2024" },
  { quote: "Two generations of my family have bought gold from this house. The price card is still hand-written and the tea is still good. Some things should not change.", name: "Devika R.", what: "Everyday gold · 2023" }
];

const CRAFT = [
  { num: '01', name: 'Sketched by hand', desc: 'Every commission begins on paper, in the studio, with the person who will wear it. No CAD until the line is right.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop' },
  { num: '02', name: 'Stones, certified', desc: 'GIA / GRS reports on every coloured stone above one carat. Our buyer travels to the source twice a year for the rough.', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop' },
  { num: '03', name: 'BIS 916 hallmarked', desc: '22K and 18K, struck to standard at the Mumbai assay office. Every gram of gold accounted for, on paper, on request.', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85&auto=format&fit=crop' }
];

const STUDIO_IMAGES = [
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=85&auto=format&fit=crop'
];

const CUSTOM_FORMS = [
  { id: 'ring', name: 'Ring', deva: 'अंगूठी', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop' },
  { id: 'necklace', name: 'Necklace', deva: 'हार', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85&auto=format&fit=crop' },
  { id: 'earrings', name: 'Earrings', deva: 'बाली', image: 'https://images.unsplash.com/photo-1535632066274-c4c20cda8b80?w=600&q=85&auto=format&fit=crop' },
  { id: 'bracelet', name: 'Bracelet', deva: 'कंगन', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=85&auto=format&fit=crop' },
  { id: 'mangalsutra', name: 'Mangalsutra', deva: 'मंगलसूत्र', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85&auto=format&fit=crop' },
  { id: 'suite', name: 'Bridal Suite', deva: 'दुल्हन सूट', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=85&auto=format&fit=crop' }
];

const CUSTOM_METALS = [
  { id: 'yg22', name: '22K Yellow Gold', deva: '२२ कैरट सोना', cls: 'swatch-yg', note: 'Traditional, warm tone' },
  { id: 'yg18', name: '18K Yellow Gold', deva: '१८ कैरट सोना', cls: 'swatch-yg', note: 'Harder, more durable' },
  { id: 'wg18', name: '18K White Gold',  deva: '१८ कैरट सफेद',  cls: 'swatch-wg', note: 'Cool, contemporary' },
  { id: 'rg18', name: '18K Rose Gold',   deva: '१८ कैरट गुलाबी', cls: 'swatch-rg', note: 'Soft, warm pink' },
  { id: 'pt',   name: 'Platinum 950',     deva: 'प्लेटिनम',     cls: 'swatch-pt', note: 'Hypoallergenic' }
];

const CUSTOM_STONES = [
  { id: 's-ruby',     name: 'Ruby',     deva: 'माणिक',    color: '#9A1F2A' },
  { id: 's-emerald',  name: 'Emerald',  deva: 'पन्ना',    color: '#1B6E4F' },
  { id: 's-sapphire', name: 'Sapphire', deva: 'नीलम',     color: '#1D3A6E' },
  { id: 's-diamond',  name: 'Diamond',  deva: 'हीरा',     color: '#E8E5DC' },
  { id: 's-pearl',    name: 'Pearl',    deva: 'मोती',     color: '#EFE7D7' },
  { id: 's-polki',    name: 'Polki',    deva: 'पोलकी',    color: '#D4C8A4' },
  { id: 's-none',     name: 'No stone', deva: 'बिना रत्न', color: '#666' }
];

const formatINR = (n) => '₹ ' + n.toLocaleString('en-IN');

window.GAJ_DATA = { PRODUCTS, COLLECTIONS, GEMS, TESTIMONIALS, CRAFT, STUDIO_IMAGES, CUSTOM_FORMS, CUSTOM_METALS, CUSTOM_STONES, formatINR };
