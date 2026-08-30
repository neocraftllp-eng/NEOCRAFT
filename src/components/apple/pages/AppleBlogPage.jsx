import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  X, 
  Tag, 
  Share2, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { playClickSound } from '../../../audio/soundEffects';

const BLOG_POSTS = [
  {
    id: 'vastu-lighting-guide',
    title: 'Vastu Shastra & Directional Lighting: How Sacred Art Balances Living Spaces in 2026',
    excerpt: 'Explore how placing cosmic Mahadev Shiva art in North-East Ishanya and Seven Running White Horses on East walls creates wealth and mental clarity.',
    category: 'Spatial Energy',
    readTime: '5 min read',
    date: 'August 24, 2026',
    image: '/images/canvas/seven-horses.jpg',
    content: `Vastu Shastra has guided sacred spatial harmony for millennia. When paired with calibrated illumination, the energetic balance of your home or workspace multiplies exponentially.

1. The North-East Corner (Ishanya): Zone of Clarity & Higher Consciousness
Placing spiritual artworks such as Cosmic Mahadev Shiva or Golden Dhyana Buddha in the North-East invites serene cosmic flow. Illuminate this zone with pure Arctic White or 2700K Warm Gold to clear mental fatigue.

2. The East Wall (Surya Zone): Career Momentum & Vitality
The East direction is governed by the rising sun. Positioning our Museum Giclée "Seven Running White Horses" painting on an uninterrupted East wall stimulates business expansion, recognition, and financial momentum.

3. The North Wall (Kubera Zone): Wealth & Financial Abundance
Governed by Lord Kubera, the North sector thrives on Green and Emerald frequencies. Combining a lush botanical green canvas or Shree Ganesha artwork enhances savings and steady investment growth.`
  },
  {
    id: 'bottle-presenters-nightlife',
    title: 'Nightclub VIP Bottle Presenters: How Luxury Letterboards Elevate Table Spends by 300%',
    excerpt: 'Inside the high-stakes world of VIP bottle service in Dubai, Mumbai, and Las Vegas — and why animated LED letterboards drive record table bookings.',
    category: 'Nightlife ROI',
    readTime: '4 min read',
    date: 'August 18, 2026',
    image: '/images/presenters/aurora-diamond.jpg',
    content: `In modern luxury nightlife, VIP guests do not simply buy champagne — they buy visibility, status, and unforgettable celebration moments.

1. The Psychology of the Marquee Letterboard
When a cocktail server marches through a packed venue carrying a high-luminance NEOCRAFT LED Letterboard spelling out the VIP guest's name, every phone in the room points toward their booth. This FOMO triggers adjacent tables to upgrade their bottle packages immediately.

2. Rechargeable 8-Hour Solid Lithium Battery Architecture
Legacy presenters suffered from dimming after 90 minutes. NEOCRAFT VIP Presenters utilize 4500mAh lithium-ion cells with continuous 8-hour ultra-bright illumination, ensuring peak strobe power through the 4:00 AM closing set.

3. Custom Branding & Club Logos
From the Ace of Spades Champagne Shield to custom CNC laser club badges, venue branding reinforces premium positioning across thousands of viral Instagram stories every weekend.`
  },
  {
    id: 'solid-state-vs-glass-neon',
    title: 'Custom 12V Solid-State Neon vs Obsolete 220V Glass Neon: The 90% Energy Revolution',
    excerpt: 'Why commercial interior designers and sustainable hospitality groups are permanently retiring hazardous glass neon tubes in favor of 12V silicone flex.',
    category: 'Technology',
    readTime: '6 min read',
    date: 'August 10, 2026',
    image: '/images/canvas/abstract-gold.jpg',
    content: `For nearly a century, traditional glass neon defined nightlife signage. However, high maintenance costs, fragile glass fragility, and dangerous high voltages (2,000V–15,000V transformers) have made it obsolete.

1. Safety First: 12V DC vs 15,000V AC
NEOCRAFT operates on safe-touch 12V DC power supplies. They are completely safe for children's bedrooms, pet-friendly households, and high-traffic restaurant aisles without electrocution risks.

2. 90% Lower Electricity Bills
While traditional glass neon consumes between 150W to 400W of power, our precision 12V silicone flex signs draw only 18W to 36W. Running a NEOCRAFT sign 8 hours daily costs less than ₹60 per month in electricity.

3. Zero Toxic Mercury or Lead Gas
Glass tubes rely on hazardous mercury vapor and pressurized neon gas. NEOCRAFT utilizes pure solid-state LEDs embedded in food-grade silicone jackets that emit zero toxic fumes and zero UV degradation.`
  }
];

export default function AppleBlogPage({
  onNavigate
}) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="bg-[#000000] text-white select-none pb-24">
      
      {/* Breadcrumb Navigation Header */}
      <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
          <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Store</button>
          <span>/</span>
          <span className="text-white font-semibold">Blog & Architectural Stories</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" /> ARCHITECTURAL STORIES & GUIDES
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight apple-text-headline">
          Insights on light, art & energy.
        </h1>

        <p className="text-sm sm:text-base text-[#86868b] max-w-xl mx-auto">
          Deep-dive design guides, Vastu spatial rules, nightlife case studies, and engineering breakdowns from our studio.
        </p>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => { playClickSound(); setSelectedPost(post); }}
              className="apple-card border border-[#262629] overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-white/40 transition-all"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="h-48 w-full bg-[#121214] relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white">
                    {post.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] text-[#86868b]">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-semibold text-white text-base group-hover:text-[#2997ff] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#86868b] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-[#2997ff] font-semibold">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal Reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
          <div className="relative w-full max-w-3xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2997ff]">
                {selectedPost.category}
              </span>

              <button
                onClick={() => { playClickSound(); setSelectedPost(null); }}
                className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#86868b]">
                  <span>Published {selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="h-64 w-full rounded-2xl overflow-hidden border border-white/10">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-xs sm:text-sm text-[#d1d1d6] leading-relaxed space-y-4 whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-[#262629] flex items-center justify-between">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedPost(null);
                    onNavigate('custom-studio');
                  }}
                  className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer"
                >
                  Explore Studio
                </button>

                <button
                  onClick={() => { playClickSound(); setSelectedPost(null); }}
                  className="apple-btn-secondary py-2.5 px-6 text-xs font-medium cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
