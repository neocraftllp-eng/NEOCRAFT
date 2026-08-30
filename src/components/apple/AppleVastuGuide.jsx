import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Sun, Moon } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const VASTU_DIRECTIONS = [
  {
    id: 'north-east',
    name: 'North-East (Ishanya / Ishan Corner)',
    element: 'Water & Spiritual Energy',
    idealArt: 'Cosmic Lord Shiva, Sacred Golden Buddha, Waterfalls',
    benefits: 'Enhances clarity of mind, deep spiritual focus, and supreme peace in master bedrooms and meditation sanctuaries.',
    lighting: 'Soft Warm White (3000K) or Ethereal Ice Cyan (6500K)',
    recommendedPainting: 'Cosmic Mahadev Shiva in Meditation',
    image: '/images/canvas/lord-shiva.jpg'
  },
  {
    id: 'east',
    name: 'East (Purva / Sun Energy)',
    element: 'Solar Vitality & Social Influence',
    idealArt: 'Vastu Seven Running White Horses, Rising Sun Landscapes',
    benefits: 'Attracts rapid career advancement, fame, leadership vitality, and financial breakthrough.',
    lighting: 'Warm Golden Dawn (2700K - 3500K)',
    recommendedPainting: 'Vastu Seven Running White Horses',
    image: '/images/canvas/seven-horses.jpg'
  },
  {
    id: 'north',
    name: 'North (Uttara / Kubera Corner)',
    element: 'Wealth, Abundance & Business Opportunity',
    idealArt: 'Lord Ganesha, Emerald Green Geode, Running Water',
    benefits: 'Governed by Lord Kubera and Mercury. Activates unstoppable commercial cash flow, lucrative investments, and new business clients.',
    lighting: 'Pure Ice White (4000K) or Cyber Cyan Glow',
    recommendedPainting: 'Shree Ganesha Sacred Gold Blessings',
    image: '/images/canvas/golden-ganesha.jpg'
  },
  {
    id: 'south-west',
    name: 'South-West (Nairutya / Earth Energy)',
    element: 'Stability, Relationships & Authority',
    idealArt: 'Eternal Radha Krishna, Sovereign Crowned Lion, Heavy Mountains',
    benefits: 'Anchors family harmony, marital bliss, decision-making confidence, and organizational stability.',
    lighting: 'Warm Ambient Glow (2700K)',
    recommendedPainting: 'Eternal Radha Krishna Moonlight Melody',
    image: '/images/canvas/radha-krishna.jpg'
  }
];

export default function AppleVastuGuide({
  onSelectArtwork
}) {
  const [selectedDirection, setSelectedDirection] = useState(VASTU_DIRECTIONS[1]); // East by default

  const handleSelectDir = (dir) => {
    playClickSound();
    setSelectedDirection(dir);
  };

  return (
    <section id="vastu-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1120px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" /> VASTU SHASTRA & SPATIAL HARMONY
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Align your art with positive energy.
          </h2>
          <p className="text-sm text-[#86868b]">
            Discover the ideal directional placement for sacred canvas paintings and ambient neon illumination according to authentic Vastu principles.
          </p>
        </div>

        {/* 2-Column Split: Direction Selector on Left, Interactive Room Layout on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Direction Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
              Select Wall Facing Direction:
            </span>

            <div className="space-y-2.5">
              {VASTU_DIRECTIONS.map((dir) => (
                <button
                  key={dir.id}
                  onClick={() => handleSelectDir(dir)}
                  className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedDirection.id === dir.id
                      ? 'bg-[#1c1c1f] border-amber-400/80 shadow-lg text-white ring-1 ring-amber-400/40'
                      : 'bg-[#121214] border-[#222225] text-[#86868b] hover:border-[#333]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{dir.name}</span>
                    <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {dir.element.split('&')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1a6] mt-1.5 line-clamp-2 leading-relaxed">
                    {dir.benefits}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Recommendation Viewport (7 cols) */}
          <div className="lg:col-span-7 apple-card p-6 sm:p-10 border border-[#2d2d30] space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#262629]">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Recommended Masterpiece
                </span>
                <h3 className="text-2xl font-semibold text-white mt-0.5">
                  {selectedDirection.recommendedPainting}
                </h3>
              </div>

              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Compass className="w-5 h-5" />
              </div>
            </div>

            {/* Visual Canvas Artwork View */}
            <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-black border border-[#262629] overflow-hidden group">
              <img
                src={selectedDirection.image}
                alt={selectedDirection.recommendedPainting}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">Vastu Direction</span>
                  <span className="text-sm font-semibold text-white">{selectedDirection.name}</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-white">
                  380 GSM Pure Cotton
                </div>
              </div>
            </div>

            {/* Vastu Parameters Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#121214] border border-[#222225] space-y-1">
                <span className="text-[#86868b] block font-semibold">Energy Alignment</span>
                <span className="text-white font-medium">{selectedDirection.element}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121214] border border-[#222225] space-y-1">
                <span className="text-[#86868b] block font-semibold">Lighting Kelvin Spectrum</span>
                <span className="text-amber-300 font-medium">{selectedDirection.lighting}</span>
              </div>
            </div>

            <p className="text-xs text-[#a1a1a6] leading-relaxed">
              <strong>Vastu Rationale:</strong> {selectedDirection.benefits}
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
