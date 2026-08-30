import React, { useState } from 'react';
import { Sparkles, Camera, ArrowRight, Eye } from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    title: 'The Vault Speakeasy Bar, Bandra',
    category: 'Cafe & Bar',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    signText: 'Cocktails & Dreams',
    glowColor: '#FF6B00',
    signType: 'Custom 3-Color Neon & Standoff Acrylic',
    specs: '140cm Width • Amber & Ruby Red'
  },
  {
    id: 'look-2',
    title: 'Minimalist Penthouse Bedroom, Delhi',
    category: 'Bedroom & Home',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1000&q=80',
    signText: 'L’Amour Toujours',
    glowColor: '#FFE4B5',
    signType: 'Satisfy Cursive Script Neon',
    specs: '90cm Width • Warm 2700K Champagne'
  },
  {
    id: 'look-3',
    title: 'Grand Palace Destination Wedding, Udaipur',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    signText: 'Better Together',
    glowColor: '#FFE4B5',
    signType: 'Archangel Hanging Neon Arch Sign',
    specs: '120cm Width • Floral Mesh Mounted'
  },
  {
    id: 'look-4',
    title: 'Pro Esports Streamer Studio, Bengaluru',
    category: 'Gaming & Studio',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    signText: 'LEVEL UP // CYBER KATANA',
    glowColor: '#00F0FF',
    signType: 'Acoustic Felt + Dual-tone Cyan & Magenta',
    specs: '100cm Width • Sound Absorbing Tile'
  },
  {
    id: 'look-5',
    title: 'Haute Fashion Boutique, South Mumbai',
    category: 'Commercial HQ',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    signText: 'ATELIER NOIR',
    glowColor: '#FFD700',
    signType: '3D Halo Backlit Acrylic & Laser Metal',
    specs: '240cm Facade • Brushed Brass PVD'
  },
  {
    id: 'look-6',
    title: 'Artisan Coffee Roastery, Goa',
    category: 'Cafe & Bar',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    signText: 'Good Vibes & Espresso',
    glowColor: '#39FF14',
    signType: 'Cut-to-Shape Botanical Foliage Neon',
    specs: '110cm Width • Lime & Ice White'
  }
];

export default function LookbookGallery({
  onOpenStudio,
  onOpenVisualizer
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cafe & Bar', 'Bedroom & Home', 'Weddings', 'Gaming & Studio', 'Commercial HQ'];

  const filteredLooks = selectedCategory === 'All'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="lookbook-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
          <Camera className="w-3.5 h-3.5" /> REAL INSTALLATIONS ACROSS INDIA
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
          THE NEOCRAFT <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">LOOKBOOK</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Explore real client spaces—from Mumbai cocktail lounges and Goa cafes to luxury weddings and streaming battlestations.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar text-xs font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { playClickSound(); setSelectedCategory(cat); }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Lookbook Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLooks.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-[#0a0c16] border border-slate-800 hover:border-purple-500/50 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
          >
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-black/40" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-cyan-300">
                {item.category}
              </div>

              {/* Glowing Sign Text Tag */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <div 
                  className="inline-block px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-xs font-extrabold text-white shadow-lg"
                  style={{ textShadow: `0 0 10px ${item.glowColor}` }}
                >
                  ✨ {item.signText}
                </div>
                <h4 className="text-white font-bold text-sm sm:text-base line-clamp-1">{item.title}</h4>
              </div>
            </div>

            {/* Bottom Details & Customize CTA */}
            <div className="p-4 bg-[#090b13] border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-400 text-[11px]">{item.signType}</div>
                <div className="text-[10px] text-slate-500 font-medium">{item.specs}</div>
              </div>

              <button
                onClick={() => { playClickSound(); onOpenStudio(); }}
                className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Customize</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
