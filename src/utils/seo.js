/**
 * SEO & Dynamic Meta Management Engine for NEOCRAFT X
 * Automatically updates Document Title, Meta Description, Open Graph & Canonical Tags per route
 */

const SEO_MAP = {
  home: {
    title: 'NEOCRAFT X | Luxury Custom Neon Signs, Museum Canvas & VIP Signage',
    description: 'Design custom 12V LED neon signs in real-time. 18 luxury fonts, 14 silicone colors, 300 DPI museum giclée canvas paintings, VIP nightclub bottle presenters, and pan-India insured wooden crate shipping.',
    keywords: 'custom neon signs, neon lights india, buy neon light online, custom led neon sign, wedding neon signs, neon signs for bedroom, acrylic signage'
  },
  'custom-studio': {
    title: 'Custom Neon Sign Builder Online | 18 Fonts & 14 Colors | NEOCRAFT X',
    description: 'Create your custom neon sign with live 3D wall preview, instant pricing, acrylic backplate options (cut-to-shape/hollow), and complimentary WhatsApp vector proof.',
    keywords: 'custom neon builder, design your own neon, custom name neon sign, neon generator, custom acrylic neon signboard'
  },
  paintings: {
    title: '300 DPI Museum Giclée Canvas Paintings | Vastu & Spiritual Art | NEOCRAFT X',
    description: 'Explore high-definition textured canvas paintings including Vastu Seven Running White Horses, Cosmic Mahadev Shiva, Golden Buddha, and Radha Krishna with gold foil accents.',
    keywords: 'vastu seven running horses painting, lord shiva canvas painting, golden buddha wall art, ganesha gold canvas, textured giclee canvas prints'
  },
  'bottle-presenters': {
    title: 'VIP Nightclub Bottle Presenters & Letterboards | NEOCRAFT X',
    description: 'Commercial-grade LED VIP bottle presenters for nightclubs, lounges, and luxury events. Featuring Batwings, Aurora Diamond Strobe, Letterboard Marquee, and custom club logo engraving.',
    keywords: 'vip bottle presenters, nightclub bottle sparkler presenter, letterboard marquee presenter, batwings champagne presenter, led bottle tray'
  },
  weddings: {
    title: 'Wedding Neon Sign Keepsake vs Rental Calculator | NEOCRAFT X',
    description: 'Compare custom forever bedroom keepsake wedding neons vs 3-day flight case event rental. Dimmable warm gold lighting for photo backdrops.',
    keywords: 'wedding neon sign, wedding backdrop neon lights, better together neon sign, happily ever after neon, wedding rental neon'
  },
  dreamcolor: {
    title: 'RGB DreamColor Pixel Chasing Neon Studio | WS2812B IC | NEOCRAFT X',
    description: 'Next-gen addressable RGB LED neon signs with WS2812B micro-chips. 4 animated lighting presets (Rainbow Wave, Cyberpunk Split, Nordic Aurora, 24K Starlight).',
    keywords: 'dreamcolor neon sign, addressable rgb neon, ws2812b pixel chasing neon, cyberpunk neon lights, multi color led neon'
  },
  safety: {
    title: 'Sign Weight & Wall Load Mounting Safety Calculator | NEOCRAFT X',
    description: 'Calculate sign weight, acrylic thickness (6mm vs 10mm), and certified safety margins across Drywall, Brick, Glass, and Wood Slats with 3M Command Strips or Stainless Standoffs.',
    keywords: 'neon sign weight calculator, wall mounting safety, acrylic sign installation, 3m command strip neon'
  },
  battery: {
    title: '12V Battery Runtime & Inverter Calculator | NEOCRAFT X',
    description: 'Calculate cordless battery runtime for outdoor events, weddings, pop-ups, and food trucks with 12V lithium rechargeable power stations.',
    keywords: 'portable neon battery, 12v neon battery runtime, cordless neon sign, rechargeable led neon'
  },
  about: {
    title: 'About NEOCRAFT X | Flagship Architectural Neon & LED Craftsmanship',
    description: 'Learn about NEOCRAFT X — India’s premier bespoke architectural neon studio. Over 15,000+ custom installations with optical silicone neon flex and Japanese solid-state engineering.',
    keywords: 'about neocraft, neon sign manufacturer india, bespoke neon art studio, architectural signage company'
  },
  blog: {
    title: 'Neon & Fine Art Lighting Journal | Vastu, VIP ROI & Guides | NEOCRAFT X',
    description: 'Read expert guides on Vastu direction lighting, nightclub bottle presenter revenue multipliers, and 12V solid-state vs 220V traditional glass neon.',
    keywords: 'neon lighting blog, vastu direction lights, nightclub bottle presenter roi, led vs glass neon guide'
  },
  contact: {
    title: 'Contact Us & Free 3D Proof Request | WhatsApp Concierge | NEOCRAFT X',
    description: 'Get in touch with NEOCRAFT X engineers. Request a free photorealistic 3D proof or WhatsApp our 24/7 Priority Concierge at +91 91666 91274.',
    keywords: 'contact neocraft, request 3d neon proof, custom neon quote whatsapp, neon customer service'
  },
  'refund-policy': {
    title: '2-Year Direct Replacement Warranty & Cancellation Policy | NEOCRAFT X',
    description: 'Our 2-Year Direct Replacement Warranty, 100% BlueDart insured transit damage protection, and hassle-free cancellation and return guidelines.',
    keywords: 'neocraft warranty, 2 year neon warranty, return policy neon signs, insured transit protection'
  },
  terms: {
    title: 'Terms & Conditions | 12V Safety & Commercial Licensing | NEOCRAFT X',
    description: 'Read NEOCRAFT X terms of service, vector IP rights, 12V electrical safety compliance, and 256-bit SSL encrypted checkout policies.',
    keywords: 'neocraft terms, neon safety compliance, ip licensing custom signs'
  },
  tracker: {
    title: 'Track Your Order Status | Live CNC & BlueDart Dispatch | NEOCRAFT X',
    description: 'Track your NEOCRAFT order in real-time through our 5-stage production pipeline: CNC Milling, Silicone Wiring, 24H Burn-In, and BlueDart Air Express Dispatch.',
    keywords: 'track neocraft order, neon order tracking, bluedart air express tracking'
  },
  admin: {
    title: 'Studio Admin & Production Pipeline | NEOCRAFT X',
    description: 'Internal NEOCRAFT Studio Admin Portal for production management, Kanban order dispatch, and B2B trade approvals.',
    keywords: 'neocraft admin'
  },
  community: {
    title: 'r/NEOCRAFT Community | Creators, Gaming Setups, Cafe Neon Reviews & Karma | NEOCRAFT X',
    description: 'Join the r/NEOCRAFT illuminated creator community! Share your bedroom neon setups, cafe buildout photos, ask for typography design feedback, upvote setups, and earn Neon Karma rewards.',
    keywords: 'neocraft community, reddit neocraft, neon room setup reddit, custom neon reviews, neon gaming battlestations'
  }
};

export function updatePageSEO(pageId = 'home') {
  const seoData = SEO_MAP[pageId] || SEO_MAP.home;

  // 1. Update Document Title
  document.title = seoData.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seoData.description);

  // 3. Update Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords && seoData.keywords) {
    metaKeywords.setAttribute('content', seoData.keywords);
  }

  // 4. Update Open Graph Meta
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seoData.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seoData.description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    const cleanPath = pageId === 'home' ? '' : pageId;
    ogUrl.setAttribute('content', `https://neocraftx.com/${cleanPath}`);
  }

  // 5. Update Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const cleanPath = pageId === 'home' ? '' : pageId;
    canonical.setAttribute('href', `https://neocraftx.com/${cleanPath}`);
  }

  // 6. Send Dynamic Google Analytics 4 (GA4) Pageview
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const cleanPath = pageId === 'home' ? '/' : `/${pageId}`;
    window.gtag('config', 'G-E1RLXCG4NF', {
      page_title: seoData.title,
      page_path: cleanPath
    });
  }
}
