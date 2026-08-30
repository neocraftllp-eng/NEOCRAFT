/**
 * AI Community Post Generator Engine for NEOCRAFT X
 * Generates realistic viral posts with curated high-res imagery, hashtags, upvotes, and comments.
 */

const NEON_IMAGE_LIBRARY = [
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80'
];

const USER_PROFILES = [
  { name: 'u/Aarav_TechDesk', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80', location: 'Bengaluru' },
  { name: 'u/Kavya_StudioInteriors', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', location: 'Mumbai' },
  { name: 'u/Rohan_Cyberpunk', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80', location: 'Delhi NCR' },
  { name: 'u/TheSocialBistro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', location: 'Pune' },
  { name: 'u/Ananya_Aesthetics', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', location: 'Hyderabad' },
  { name: 'u/Vikram_Nightlife', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', location: 'Goa' },
  { name: 'u/Isha_ZenSpaces', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', location: 'Chandigarh' }
];

const POST_TEMPLATES = [
  {
    subreddit: 'r/RoomSetups',
    titleTemplates: [
      'My 120cm "STAY WEIRD" Cyber Cyan sign completely transformed my midnight gaming battlestation! 🎮✨',
      'Dual-tone "HUSTLE & HEART" neon above my bedroom workspace. The dimming range is incredible.',
      'Completed my minimal Tokyo-inspired study wall with this warm gold acrylic sign. Thoughts? #DeskSetup'
    ],
    contentTemplates: [
      'Used the included stainless standoffs for floating 1.5 inches off the wall. The wall halo reflection is super diffuse with 0 hot spots! #CustomNeon #GamingSetup #RoomInspiration #NEOCRAFT',
      'Plugged it into my Apple HomeKit smart plug so it turns on at sunset automatically. Solid 12V build quality! #SmartHome #InteriorDesign #CyberpunkAesthetics',
      'Delivered in 3 days via BlueDart in a heavy wooden crate. Couldn\'t be happier with the 6mm cast acrylic cut! #AestheticVibes #HomeDecor'
    ],
    hashtags: ['#CustomNeon', '#GamingSetup', '#RoomInspiration', '#DeskGoals', '#NeonVibes'],
    product: { name: 'Custom Dual-Tone Script Neon Sign', price: 7999 }
  },
  {
    subreddit: 'r/CafeAndClubs',
    titleTemplates: [
      'Our specialty coffee roastery photo spot in Indiranagar! Customers take 80+ reels every single day ☕🔥',
      'Custom VIP Neon Logo for our rooftop lounge in Mumbai. 14 hours daily burn-in with 0 heat buildup.',
      'Installed this 150cm "COFFEE FIRST" warm white sign. The acrylic outline is ultra sharp! 🥐✨'
    ],
    contentTemplates: [
      'The solid-state 12V LED neon keeps our monthly energy cost negligible. The wireless remote lets our barista change brightness based on sunset lighting. #CafeDecor #CommercialSignage #BaristaLife',
      'Our architect recommended NEOCRAFT for the cut-to-shape backplate. The laser polish on the edges looks like glass! #HospitalityDesign #RooftopBar',
      'Super impressed with the insured freight packaging and 2-year warranty support. Best investment for our branding! #BistroVibes #BrandIdentity'
    ],
    hashtags: ['#CafeDecor', '#CommercialSignage', '#BaristaLife', '#RestaurantDesign', '#NeonSigns'],
    product: { name: 'Commercial Weatherproof Cafe Sign (Warm White)', price: 12999 }
  },
  {
    subreddit: 'r/SpiritualArt',
    titleTemplates: [
      'Unboxing the 3-Piece Triptych Mahadev Shiva Textured Giclée Canvas. The gold leaf foil is breathtaking 🕉️🔱',
      'Placed the Golden Buddha 5-Panel Panoramic Canvas in our meditation room. Museum-grade depth!',
      'Radha Krishna 300 DPI Textured Canvas arrived. The textured brush strokes look hand-painted. 🌸'
    ],
    contentTemplates: [
      'The floating matte black aluminum frame makes the triptych pop off the neutral wall. The canvas texture feels super premium! #SpiritualCanvas #MahadevArt #SacredGeometry',
      '100% moisture resistant and fade proof. Everyone who visits our home asks where we got it! #HomeTemple #ZenLiving #FineArtCanvas',
      'Shipped in a custom wooden corner-protected crate. 10/10 craftsmanship by NEOCRAFT Studio! #VastuDecor #SpiritualVibes'
    ],
    hashtags: ['#SpiritualArt', '#MahadevShiva', '#MuseumCanvas', '#VastuHome', '#ArtGallery'],
    product: { name: 'Mahadev Shiva Museum Textured Giclée Canvas (3-Piece Split)', price: 8999 }
  },
  {
    subreddit: 'r/DesignFeedback',
    titleTemplates: [
      'Which neon color looks better for my tattoo studio entrance? Cyber Cyan vs Tokyo Pink? 💡',
      'Designing a custom sign for my YouTube podcast backdrop. Should I go with 80cm or 120cm?',
      'Font selection feedback: "Script Luxury" vs "Cyber Matrix" for a high-end streetwear boutique.'
    ],
    contentTemplates: [
      'Testing the colors on our dark concrete wall. What do you all think reflects best on camera? #DesignFeedback #Typography #Signmaking',
      'The 3D studio preview tool showed both sizes, but wanted to get real creator opinions before ordering! #CreativeCommunity #StudioBuild',
      'Appreciate any advice on standoff distance and ambient Kelvin matching for warm interiors! #LightingDesign #Architecture'
    ],
    hashtags: ['#DesignFeedback', '#Typography', '#GraphicDesign', '#Signmaking', '#CreativeHub'],
    product: { name: 'Custom Creator Studio Neon (Dual Color)', price: 6999 }
  }
];

const SAMPLE_COMMENTS = [
  'The acrylic cut line is so clean! Did you use the screws or 3M tape?',
  'That wall glow diffusion is unreal! Definitely adding this to my wishlist.',
  'Looks incredible! How long did delivery take to your city?',
  'The warm gold kelvin matches your room theme 100%. Great choice!',
  'Love the font! Custom studio 2.0 makes it super easy to customize.',
  'Just ordered mine for my cafe after seeing this post! Can\'t wait.'
];

/**
 * Generate a single high-quality realistic AI community post
 */
export function generateSingleAIPost() {
  const template = POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
  const user = USER_PROFILES[Math.floor(Math.random() * USER_PROFILES.length)];
  const image = NEON_IMAGE_LIBRARY[Math.floor(Math.random() * NEON_IMAGE_LIBRARY.length)];
  
  const title = template.titleTemplates[Math.floor(Math.random() * template.titleTemplates.length)];
  const content = template.contentTemplates[Math.floor(Math.random() * template.contentTemplates.length)];
  const upvotes = Math.floor(Math.random() * 850) + 120; // 120 - 970 upvotes

  const numComments = Math.floor(Math.random() * 4) + 1;
  const comments = [];
  for (let i = 0; i < numComments; i++) {
    const commenter = USER_PROFILES[Math.floor(Math.random() * USER_PROFILES.length)];
    comments.push({
      id: `c-ai-${Date.now()}-${i}`,
      author: commenter.name,
      avatar: commenter.avatar,
      timeAgo: `${Math.floor(Math.random() * 45) + 5}m ago`,
      text: SAMPLE_COMMENTS[Math.floor(Math.random() * SAMPLE_COMMENTS.length)],
      upvotes: Math.floor(Math.random() * 25) + 3,
      isVerified: Math.random() > 0.3
    });
  }

  return {
    id: `post-ai-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    subreddit: template.subreddit,
    author: user.name,
    avatar: user.avatar,
    location: user.location,
    timeAgo: 'Just now (AI Live Drop)',
    isVerifiedBuyer: true,
    isAIGenerated: true,
    title: title,
    content: content,
    imageUrl: image,
    hashtags: template.hashtags,
    upvotes: upvotes,
    userVote: 0,
    commentsCount: comments.length + Math.floor(Math.random() * 15),
    linkedProduct: template.product,
    comments: comments,
    createdAt: new Date().toISOString()
  };
}

/**
 * Generate a batch of N posts (default 10)
 */
export function generateAIBatch(count = 10) {
  const batch = [];
  for (let i = 0; i < count; i++) {
    batch.push(generateSingleAIPost());
  }
  return batch;
}
