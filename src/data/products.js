export const PRODUCT_CATEGORIES = [
  { id: 'all', name: 'All Collections' },
  { id: 'custom-text', name: 'Custom Neon Studio' },
  { id: 'canvas-paintings', name: 'Museum Canvas Prints' },
  { id: 'bottle-presenters', name: 'VIP Bottle Presenters' },
  { id: 'neon-art', name: 'Signature Neon Art' },
  { id: 'acrylic-letters', name: '3D Acrylic Signage' },
  { id: 'metal-signage', name: 'Laser Metal & Brass' },
  { id: 'rgb-matrix', name: 'RGB Pixel Matrices' },
  { id: 'acoustic-panels', name: 'Acoustic Neon Panels' },
];

export const PRODUCTS = [
  // MUSEUM GICLÉE CANVAS PRINTS
  {
    id: 'prod-canvas-seven-horses',
    name: 'Vastu Seven Running White Horses',
    category: 'canvas-paintings',
    subcategory: 'Vastu & Prosperity',
    price: 6290,
    originalPrice: 9499,
    rating: 4.99,
    reviewsCount: 230,
    tag: 'Bestseller',
    badge: '380 GSM Cotton Canvas',
    shortDesc: 'Seven powerful white horses galloping through sunrise dawn mist over oceanic waves. Revered in Vastu for bringing wealth and momentum.',
    glowColor: '#FFD700',
    accentColor: '#FFFFFF',
    image: '/images/canvas/seven-horses.jpg',
    dimensions: '48" × 48" (122cm × 122cm)',
    features: [
      'Archival 12-Color Epson Ultrachrome HDR Giclée Print (100+ years fade-proof)',
      '380 GSM 100% Pure Virgin Cotton Canvas with textured matte varnish',
      'Hand-stretched on 1.5-inch seasoned European Pinewood stretcher bars',
      'Ready to hang with heavy-duty metal sawtooth brackets & wall hooks'
    ],
    includedInBox: [
      'Hand-Stretched Museum Canvas Painting',
      'Wall Hanging Anchors & Screws',
      'Certificate of Authenticity'
    ],
    powerSpecs: { voltage: 'N/A', wattage: 'N/A', lifespan: '100+ Years Archival', lumens: 'N/A' },
    warranty: '5 Years Color Fade Guarantee'
  },
  {
    id: 'prod-canvas-lord-shiva',
    name: 'Cosmic Mahadev Shiva in Meditation',
    category: 'canvas-paintings',
    subcategory: 'Spiritual Art',
    price: 6499,
    originalPrice: 9999,
    rating: 5.0,
    reviewsCount: 195,
    tag: 'Trending',
    badge: 'Himalayan Radiance',
    shortDesc: 'Lord Shiva in deep cosmic meditation atop Himalayan peaks with crescent moon and celestial river.',
    glowColor: '#00F0FF',
    accentColor: '#FFD700',
    image: '/images/canvas/lord-shiva.jpg',
    dimensions: '48" × 48" (122cm × 122cm)',
    features: [
      'Ultra-deep sapphire blues and luminous golden cosmic halo',
      'UV-resistant protective matte coating against moisture and dust',
      'Seasoned warp-free solid wood interior frame',
      'Museum-grade gallery wrap border styling'
    ],
    includedInBox: [
      'Lord Shiva Canvas Art',
      'Mounting Brackets & Screws'
    ],
    powerSpecs: { voltage: 'N/A', wattage: 'N/A', lifespan: '100+ Years Archival', lumens: 'N/A' },
    warranty: '5 Years Color Fade Guarantee'
  },
  {
    id: 'prod-canvas-golden-buddha',
    name: 'Sacred Golden Buddha Lotus Dhyana',
    category: 'canvas-paintings',
    subcategory: 'Zen Serenity',
    price: 6290,
    originalPrice: 8999,
    rating: 4.94,
    reviewsCount: 148,
    tag: 'Zen Art',
    badge: 'Gold Leaf Texture',
    shortDesc: 'Meditating golden Buddha surrounded by sacred blooming lotus blossoms with 24K gold foil textured highlights.',
    glowColor: '#FFE4B5',
    accentColor: '#FFD700',
    image: '/images/canvas/golden-buddha.jpg',
    dimensions: '48" × 48" (122cm × 122cm)',
    features: [
      'Intricate 24K gold foil textured highlights',
      '380 GSM heavyweight virgin cotton canvas',
      'Warp-resistant pinewood framing with corner wedges',
      'Zero-reflection museum matte finish'
    ],
    includedInBox: [
      'Golden Buddha Canvas Art',
      'Wall Hanging Anchors'
    ],
    powerSpecs: { voltage: 'N/A', wattage: 'N/A', lifespan: '100+ Years Archival', lumens: 'N/A' },
    warranty: '5 Years Color Fade Guarantee'
  },

  // VIP LED BOTTLE PRESENTERS
  {
    id: 'prod-presenter-aurora-diamond',
    name: 'Aurora Diamond LED Bottle Presenter',
    category: 'bottle-presenters',
    subcategory: 'VIP Nightlife',
    price: 11999,
    originalPrice: 16999,
    rating: 4.98,
    reviewsCount: 186,
    tag: 'Club Favorite 🔥',
    badge: '8h Rechargeable Battery',
    shortDesc: 'Iconic multifaceted diamond acrylic frame with high-density RGB chasing perimeter lighting, center bottle cradle, and rechargeable lithium battery.',
    glowColor: '#00F0FF',
    accentColor: '#FF1493',
    dimensions: '60cm × 55cm (Handheld)',
    features: [
      'Rechargeable 4500mAh Lithium-ion battery (6-8 hrs runtime)',
      'RF Remote with Strobe, Flash, Pulse, and Solid RGB color modes',
      'Double-sided high-contrast illumination with center bottle spotlight',
      'Dual ergonomic rubberized grip handles with sparkler safety clamps',
      'High-grade shatterproof optical acrylic chassis'
    ],
    includedInBox: [
      'Aurora Diamond Presenter Unit',
      'Fast USB-C Charger & Cable',
      'RF Multi-Mode Wireless Remote',
      'Dual Sparkler Safety Mount Clamps'
    ],
    powerSpecs: { voltage: '12V Rechargeable Li-ion', wattage: '36W', lifespan: '50,000+ Hours', lumens: '3,800 lm' },
    warranty: '2 Years Replacement Warranty'
  },
  {
    id: 'prod-presenter-vip-letterboard',
    name: 'VIP Letterboard Marquee Bottle Presenter',
    category: 'bottle-presenters',
    subcategory: 'VIP Nightlife',
    price: 13499,
    originalPrice: 18999,
    rating: 4.95,
    reviewsCount: 142,
    tag: 'Bestseller',
    badge: '150+ Tiles Included',
    shortDesc: 'Double-sided backlit acrylic board with interchangeable slide-in letters & numbers to display custom guest names, birthdays, and table celebrations.',
    glowColor: '#FFE4B5',
    accentColor: '#FF6B00',
    dimensions: '65cm × 45cm (Handheld)',
    features: [
      'Complete 150+ piece letter, number & emoji tile kit included',
      'Rechargeable 5000mAh battery with fast charging port',
      'Double-sided ultra-uniform backlight with zero shadow lines',
      'Lightweight aluminum reinforced frame with safety handles'
    ],
    includedInBox: [
      'Marquee Letterboard Unit',
      '150+ Slide-in Letter/Number Tiles in Storage Box',
      'Protective Padded Travel Bag',
      'Fast Power Charger'
    ],
    powerSpecs: { voltage: '12V Rechargeable', wattage: '28W', lifespan: '50,000+ Hours', lumens: '3,400 lm' },
    warranty: '2 Years Replacement Warranty'
  },
  {
    id: 'prod-presenter-royal-shield',
    name: 'Ace of Spades Royal Champagne Shield',
    category: 'bottle-presenters',
    subcategory: 'VIP Nightlife',
    price: 14999,
    originalPrice: 21999,
    rating: 5.0,
    reviewsCount: 98,
    tag: 'Flagship Edition 👑',
    badge: 'Mirror Gold PVD Finish',
    shortDesc: 'Luxury spade emblem bottle presenter in mirror gold acrylic with flashing perimeter strobes and quadruple sparkler clips for flagship bottle drops.',
    glowColor: '#FFD700',
    accentColor: '#FFFFFF',
    dimensions: '62cm × 50cm',
    features: [
      'PVD Mirror Gold metallic finish with ultra-bright cold white rim lights',
      'Dual-bottle clamp for standard & Magnum 1.5L champagne bottles',
      'Multi-speed strobe & pulse modes via wireless remote',
      'Integrated heavy-duty sparkler safety brackets'
    ],
    includedInBox: [
      'Royal Shield Presenter Unit',
      'RF Wireless Strobe Controller',
      '2A Fast Charger'
    ],
    powerSpecs: { voltage: '12V Rechargeable Li-ion', wattage: '42W', lifespan: '50,000+ Hours', lumens: '4,200 lm' },
    warranty: '2 Years Replacement Warranty'
  },
  {
    id: 'prod-presenter-batwings-pro',
    name: 'Archangel Batwings LED Bottle Presenter',
    category: 'bottle-presenters',
    subcategory: 'VIP Nightlife',
    price: 12499,
    originalPrice: 17999,
    rating: 4.92,
    reviewsCount: 114,
    tag: 'High Strobe',
    badge: 'Dual Wing Lighting',
    shortDesc: 'Dynamic wing silhouette bottle presenter with dual neon flex borders and center bottle clamp with under-bottle lighting for electrifying club processions.',
    glowColor: '#00F0FF',
    accentColor: '#FF003C',
    dimensions: '70cm × 40cm',
    features: [
      'Dual neon flex wing contours with multi-color strobe flashing',
      'Center bottle bottom-lit LED coaster module',
      'Lightweight balanced ergonomic design (only 1.6 kg)',
      'Rechargeable 4000mAh battery'
    ],
    includedInBox: [
      'Batwings Presenter Unit',
      'RF Remote Dimmer',
      'Fast Charger'
    ],
    powerSpecs: { voltage: '12V Rechargeable', wattage: '32W', lifespan: '50,000+ Hours', lumens: '3,600 lm' },
    warranty: '2 Years Replacement Warranty'
  },
  {
    id: 'prod-presenter-crown-imperial',
    name: 'Royal Crown Imperial LED Glorifier',
    category: 'bottle-presenters',
    subcategory: 'VIP Nightlife',
    price: 10999,
    originalPrice: 15499,
    rating: 4.88,
    reviewsCount: 89,
    tag: 'Royalty Edition',
    badge: '360° Amber & Gold',
    shortDesc: '3D laser-crafted imperial crown bottle presenter with warm amber and 24K gold illumination with bottom-firing LED glorifier disc.',
    glowColor: '#FFE4B5',
    accentColor: '#FFD700',
    dimensions: '50cm × 45cm',
    features: [
      'Intricate 3D crown laser engravings with edge-lit radiance',
      'Bottom-firing LED glorifier disc that illuminates liquid inside the bottle',
      'Rechargeable compact lithium battery'
    ],
    includedInBox: [
      'Crown Presenter Unit',
      'Wireless Controller',
      'Charging Adapter'
    ],
    powerSpecs: { voltage: '12V Rechargeable', wattage: '24W', lifespan: '50,000+ Hours', lumens: '3,000 lm' },
    warranty: '2 Years Replacement Warranty'
  },
  {
    id: 'prod-presenter-custom-club-logo',
    name: 'Custom Nightclub Logo Bottle Presenter',
    category: 'bottle-presenters',
    subcategory: 'Bespoke Nightlife',
    price: 15999,
    originalPrice: 22999,
    rating: 5.0,
    reviewsCount: 164,
    tag: 'B2B Club Custom',
    badge: 'Custom Logo 3D Acrylic',
    shortDesc: 'Custom handcrafted bottle presenter featuring your nightclub or lounge logo in double-sided illuminated 3D acrylic and high-speed RGB strobes.',
    glowColor: '#00F0FF',
    accentColor: '#FF1493',
    dimensions: 'Custom Shape (~60cm × 50cm)',
    features: [
      '100% custom shaped according to your club/bar logo',
      'High-output RGB chasing perimeter LEDs with app or remote control',
      'Heavy-duty commercial build engineered for high-volume nightly service'
    ],
    includedInBox: [
      'Custom Logo Presenter Unit',
      'Fast Charging Base Dock',
      '2x RF Wireless Remotes',
      '1:1 Custom Proof Certification'
    ],
    powerSpecs: { voltage: '12V High-Capacity Lithium Pack', wattage: '45W', lifespan: '60,000+ Hours', lumens: '4,500 lm' },
    warranty: '3 Years Commercial Warranty'
  },

  // NEON ART: WINGS
  {
    id: 'prod-wings-celestial',
    name: 'Celestial Archangel Wings',
    category: 'neon-art',
    subcategory: 'Wings & Backdrops',
    price: 9499,
    originalPrice: 13999,
    rating: 4.95,
    reviewsCount: 384,
    tag: 'Bestseller',
    badge: 'Instagram Viral 🔥',
    shortDesc: 'Life-sized radiant dual angel wings. The ultimate photo backdrop for luxury cafes, weddings, and aesthetic bedrooms.',
    glowColor: '#00F0FF',
    accentColor: '#FF1493',
    dimensions: '120cm × 85cm (47" × 33")',
    features: [
      'Dual-Wing Split Structure for easy wall mounting',
      'Multi-mode Remote Dimmer with 10 brightness steps & pulse mode',
      '6mm High-Grade Optical Cast Acrylic Backing',
      'Ultra-silent 12V 60W power transformer with 3m transparent cable',
      'Shatterproof IP65 waterproof silicone LED flex'
    ],
    includedInBox: [
      'Pair of Archangel LED Neon Wings',
      'RF Wireless Touch Remote Dimmer',
      '12V Power Adapter & Pan-India Plug',
      'Heavy-duty Standoff Wall Mounting Screws & Spacers',
      'Hanging Stainless Wire Kit & Free Installation Template'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '48W', lifespan: '50,000+ Hours', lumens: '3,200 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // NEON ART: ANIME / GAMING
  {
    id: 'prod-cyber-katana',
    name: 'Cyber Katana & Kanji',
    category: 'neon-art',
    subcategory: 'Anime & Gaming',
    price: 4999,
    originalPrice: 7499,
    rating: 4.9,
    reviewsCount: 242,
    tag: 'Trending',
    badge: 'Cyberpunk Edition ⚡',
    shortDesc: 'Futuristic glowing Japanese katana blade wrapped in neon lightning and Kanji calligraphy.',
    glowColor: '#FF003C',
    accentColor: '#00F0FF',
    dimensions: '90cm × 35cm (35" × 14")',
    features: [
      'Dual-color High-Contrast Red & Cyan Flex',
      'Laser Cut-to-Shape Clear Acrylic Contour',
      'Plug & Play 12V Adapter with in-line switch',
      'Low heat emission, safe for overnight battlestation lighting'
    ],
    includedInBox: [
      'Cyber Katana Neon Sign',
      'Power Supply Adapter',
      'Wall Mount Hardware & Adhesive Pads',
      'Dimmer Controller'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '32W', lifespan: '50,000+ Hours', lumens: '2,400 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // NEON ART: BAR & COCKTAILS
  {
    id: 'prod-cocktails-dreams',
    name: 'Cocktails & Dreams Speakeasy',
    category: 'neon-art',
    subcategory: 'Bar & Hospitality',
    price: 6299,
    originalPrice: 8999,
    rating: 4.98,
    reviewsCount: 512,
    tag: 'Bestseller',
    badge: 'Bar Favorite 🍸',
    shortDesc: 'Vintage 80s cocktail glass silhouette with cursive script. Perfect for home bars, dining areas, and lounges.',
    glowColor: '#FF6B00',
    accentColor: '#FF1493',
    dimensions: '80cm × 60cm (31" × 24")',
    features: [
      'Tri-color Vibrant Amber, Hot Pink & Lime Green glow',
      'Flame-retardant silicone tubes with uniform diffused light',
      'Free RF Wireless Dimmer for mellow ambient lounge dimming',
      'Drilled mounting holes with flush wall spacers'
    ],
    includedInBox: [
      'Cocktails & Dreams Neon Artwork',
      'Wireless Remote Controller',
      '12V Heavy Duty Power Supply',
      'Stainless Standoff Kit'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '38W', lifespan: '50,000+ Hours', lumens: '2,900 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // NEON ART: ROMANTIC & WEDDINGS
  {
    id: 'prod-better-together',
    name: 'Better Together Script Sign',
    category: 'neon-art',
    subcategory: 'Weddings & Celebrations',
    price: 5499,
    originalPrice: 7999,
    rating: 5.0,
    reviewsCount: 680,
    tag: 'Bestseller',
    badge: 'Wedding Essential 💍',
    shortDesc: 'Timeless cursive script in warm champagne glow. The #1 chosen sign for wedding backdrops, photobooths, and master bedrooms.',
    glowColor: '#FFE4B5',
    accentColor: '#FFFFFF',
    dimensions: '100cm × 45cm (39" × 18")',
    features: [
      'Warm 2700K Champagne Glow for flattering event photos',
      'Lightweight rigid acrylic backing (only 1.8 kg)',
      'Compatible with event metal flower arches & backdrop mesh',
      'Free hanging chain kit & transparent power cabling'
    ],
    includedInBox: [
      'Better Together Script Neon',
      'Hanging Arch Chain Kit & Wall Mount Screws',
      '12V Adapter with dimmer',
      'Travel Protective Hard Case'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '28W', lifespan: '50,000+ Hours', lumens: '2,600 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // NEON ART: MOTIVATION & GYM
  {
    id: 'prod-hustle-harder',
    name: 'Hustle Harder High-Voltage',
    category: 'neon-art',
    subcategory: 'Office & Gym Motivation',
    price: 4799,
    originalPrice: 6999,
    rating: 4.88,
    reviewsCount: 190,
    tag: 'Hot Drop',
    badge: 'CEO Energy ⚡',
    shortDesc: 'Bold geometric motivational typography in intense Ice White and Electric Cyan.',
    glowColor: '#00F0FF',
    accentColor: '#F0F8FF',
    dimensions: '85cm × 38cm (33" × 15")',
    features: [
      'High-impact modern architectural typography',
      'Anti-glare optical silicone for crisp photos and video backgrounds',
      'Smart plug compatible for automated office routines'
    ],
    includedInBox: [
      'Hustle Harder Neon Sign',
      'Power Supply Adapter',
      'Mounting Kit & Wall Template'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '30W', lifespan: '50,000+ Hours', lumens: '2,700 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // 3D ACRYLIC LETTERS
  {
    id: 'prod-acrylic-halo-3d',
    name: '3D Halo Backlit Acrylic Letters',
    category: 'acrylic-letters',
    subcategory: 'Commercial & Storefront',
    price: 12999,
    originalPrice: 18999,
    rating: 4.97,
    reviewsCount: 145,
    tag: 'Luxury Commercial',
    badge: 'Haute Storefront 🏢',
    shortDesc: 'Solid 20mm CNC-machined acrylic letters with rear embedded waterproof LEDs casting a soft luxury 360° halo glow on walls.',
    glowColor: '#FFE4B5',
    accentColor: '#FFD700',
    dimensions: 'Custom sizing (15cm to 60cm letter height)',
    features: [
      'Solid virgin cast acrylic with matte black or brushed gold front face',
      'Rear diffused halo illumination in 3000K, 4000K or 6000K',
      'IP67 Weatherproof rating for outdoor facade installation',
      'Concealed stud mounting system with zero visible wires'
    ],
    includedInBox: [
      'Custom 3D Acrylic Letter Set',
      'Industrial 1:1 Scale Installation Drilling Template',
      'MeanWell IP67 Waterproof 12V Power Driver',
      'Stainless Threaded Wall Studs & Spacers'
    ],
    powerSpecs: { voltage: '12V/24V DC', wattage: '75W-150W', lifespan: '60,000+ Hours', lumens: '4,500 lm' },
    warranty: '3 Years Comprehensive Warranty'
  },

  // 3D ACRYLIC LETTERS: EDGE-LIT
  {
    id: 'prod-acrylic-edgelit',
    name: 'Crystal Edge-Lit Reception Board',
    category: 'acrylic-letters',
    subcategory: 'Office Reception',
    price: 8999,
    originalPrice: 12999,
    rating: 4.92,
    reviewsCount: 98,
    tag: 'Luxury Commercial',
    badge: 'Corporate Elite 💼',
    shortDesc: 'Optically clear 10mm glass-grade acrylic with precision laser engraved text and top/bottom hidden LED light bars.',
    glowColor: '#00F0FF',
    accentColor: '#FFFFFF',
    dimensions: '60cm × 40cm (24" × 16")',
    features: [
      'Laser-engraved light-guiding micro-grooves',
      'Anodized brushed aluminum mounting rail',
      'Low power consumption (under 18W)'
    ],
    includedInBox: [
      'Engraved Crystal Acrylic Panel',
      'Brushed Aluminum LED Channel Bar',
      '12V Power Adapter',
      'Wall Anchors'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '18W', lifespan: '50,000+ Hours', lumens: '1,800 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // METAL SIGNAGE: BRUSHED BRASS
  {
    id: 'prod-metal-brass-backlit',
    name: 'Laser-Cut Brushed Brass Backlit Sign',
    category: 'metal-signage',
    subcategory: 'Architectural & Villa',
    price: 15499,
    originalPrice: 21999,
    rating: 4.99,
    reviewsCount: 112,
    tag: 'Luxury Commercial',
    badge: 'Architectural Grade 🏛️',
    shortDesc: 'Solid 2mm PVD-coated stainless steel & brushed brass with precision fiber laser cutouts and warm ambient backlighting.',
    glowColor: '#FFD700',
    accentColor: '#FFE4B5',
    dimensions: '60cm × 30cm or Custom',
    features: [
      'PVD Brass / Rose Gold / Titanium Black coating (Anti-Rust & Anti-Tarnish)',
      'Precision laser-cut typography with acrylic diffuser insert',
      '100% Outdoor weatherproof rated (Sun, Rain, Humidity proof)'
    ],
    includedInBox: [
      'Laser-Cut Metal Signboard',
      'Heavy Duty Brass Mounting Standoffs',
      'Waterproof Driver & Wiring Kit'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '36W', lifespan: '70,000+ Hours', lumens: '3,000 lm' },
    warranty: '5 Years Finish & 2 Years LED Warranty'
  },

  // RGB SCROLLING PIXEL MATRIX
  {
    id: 'prod-rgb-pixel-matrix',
    name: 'Smart RGB Pixel Matrix Signboard',
    category: 'rgb-matrix',
    subcategory: 'Smart Retail & Streaming',
    price: 7999,
    originalPrice: 11999,
    rating: 4.86,
    reviewsCount: 167,
    tag: 'Trending',
    badge: 'App Controlled 📱',
    shortDesc: 'Ultra-bright programmable full-color LED matrix board. Program scrolling text, logos, animations, and sound visualizers via smartphone app.',
    glowColor: '#39FF14',
    accentColor: '#FF003C',
    dimensions: '68cm × 16cm (27" × 6.3")',
    features: [
      'Bluetooth & WiFi App Control (iOS & Android)',
      '100+ Pre-loaded animations, clock mode, audio reactive equalizer',
      'Daylight visible 4000 nits high-density LED matrix',
      'Flexible silicone backing that can stick or hang on store glass'
    ],
    includedInBox: [
      'Flexible RGB Pixel Display Board',
      'USB 5V/3A Power Adapter with 4m cable',
      'Adhesive mounting strips & suction cups',
      'Companion App QR Code'
    ],
    powerSpecs: { voltage: '5V USB', wattage: '20W', lifespan: '50,000+ Hours', lumens: '3,500 lm' },
    warranty: '2 Years Replacement Warranty'
  },

  // ACOUSTIC FELT NEON PANEL
  {
    id: 'prod-acoustic-neon-panel',
    name: 'Acoustic Sound-Dampening Neon Panel',
    category: 'acoustic-panels',
    subcategory: 'Studio & Workspace',
    price: 10999,
    originalPrice: 15999,
    rating: 4.94,
    reviewsCount: 88,
    tag: 'Hot Drop',
    badge: 'Acoustic Pro 🎙️',
    shortDesc: 'High-density 12mm recycled acoustic polyester felt tile with integrated flush neon art. Absorbs studio echo while lighting up your stream.',
    glowColor: '#A855F7',
    accentColor: '#00F0FF',
    dimensions: '80cm × 80cm (31.5" × 31.5")',
    features: [
      'NRC 0.85 Sound Absorption Rating to eliminate room reverb',
      'Beveled geometric grooved felt surface in Charcoal Gray',
      'Embedded flush neon flex with zero glare',
      'Effortless mounting with included magnetic wall plates'
    ],
    includedInBox: [
      'Acoustic Felt Panel with embedded Neon',
      'Magnetic Quick-Mount Wall Brackets',
      'Remote Dimmer & 12V Power Adapter'
    ],
    powerSpecs: { voltage: '12V DC', wattage: '35W', lifespan: '50,000+ Hours', lumens: '2,500 lm' },
    warranty: '2 Years Replacement Warranty'
  }
];
