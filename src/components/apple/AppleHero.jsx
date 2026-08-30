import React, { useState } from 'react';
import { ChevronRight, Sparkles, Camera, Power, Zap, ShieldCheck } from 'lucide-react';
import { playClickSound, playSwitchSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleHero({
  onOpenStudio,
  onOpenVisualizer,
  onOpenCatalog,
  selectedCurrency = 'INR'
}) {
  const [isNeonOn, setIsNeonOn] = useState(true);
  const [activeFinish, setActiveFinish] = useState({ name: 'Cyber Cyan', hex: '#00F0FF' });

  const finishes = [
    { name: 'Cyber Cyan', hex: '#00F0FF' },
    { name: 'Tokyo Magenta', hex: '#FF1493' },
    { name: 'Warm Champagne', hex: '#FFE4B5' },
    { name: 'Matrix Lime', hex: '#39FF14' },
    { name: 'Pure Ice White', hex: '#FFFFFF' }
  ];

  const handleTogglePower = () => {
    const next = !isNeonOn;
    playSwitchSound(next);
    setIsNeonOn(next);
  };

  const handleSelectFinish = (f) => {
    playClickSound();
    setActiveFinish(f);
    if (!isNeonOn) {
      setIsNeonOn(true);
      playSwitchSound(true);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-[#000000] text-center select-none border-b border-[#222225]">
      
      {/* Top Pro Kicker */}
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <p className="text-xs font-semibold tracking-widest text-[#f56300] uppercase">
          NEOCRAFT PRO
        </p>

        {/* Apple Iconic Titanium Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter apple-text-headline">
          Titanium of Light.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-[#86868b] font-normal max-w-2xl mx-auto tracking-tight pt-1">
          Optical silicone flex. 3D halo-backlit acrylic. Infinite custom shapes.
        </p>

        {/* Pricing Kicker */}
        <p className="text-sm sm:text-base text-[#86868b] font-normal pt-1">
          From {formatPrice(4999, selectedCurrency)} or {formatPrice(833, selectedCurrency)}/mo. for 6 mo. with No-Cost EMI.
        </p>

        {/* Dual Apple Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { playClickSound(); onOpenStudio(); }}
            className="apple-btn-primary px-6 py-2.5 text-sm font-medium cursor-pointer"
          >
            Buy Custom Neon
          </button>

          <button
            onClick={() => { playClickSound(); onOpenCatalog(); }}
            className="apple-link text-sm cursor-pointer"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => { playClickSound(); onOpenVisualizer(); }}
            className="apple-link text-sm cursor-pointer ml-2"
          >
            <Camera className="w-3.5 h-3.5 mr-1 text-[#2997ff]" />
            <span>View in your space (AR)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero 3D Neon Showcase Stage */}
      <div className="relative max-w-5xl mx-auto px-4 mt-12 sm:mt-16">
        
        {/* Dynamic Background Radial Illumination */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full blur-[140px] opacity-40 pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: isNeonOn ? activeFinish.hex : 'transparent'
          }}
        />

        {/* Center Stage Box */}
        <div className="relative rounded-[32px] bg-[#101012] border border-[#262629] p-8 sm:p-14 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          
          {/* Top Stage Toolbar */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#222225] text-xs text-[#86868b]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Live Ambient Simulation:</span>
              <button
                onClick={handleTogglePower}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  isNeonOn 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                {isNeonOn ? 'Power: On' : 'Power: Off'}
              </button>
            </div>

            {/* Finish Swatches */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Finish:</span>
              {finishes.map((f) => (
                <button
                  key={f.name}
                  onClick={() => handleSelectFinish(f)}
                  style={{ backgroundColor: f.hex }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    activeFinish.name === f.name && isNeonOn
                      ? 'scale-125 ring-2 ring-white shadow-md'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={f.name}
                />
              ))}
            </div>
          </div>

          {/* Central Luminescent Typography Display */}
          <div className="py-14 sm:py-20 flex flex-col items-center justify-center relative select-none">
            
            {/* Acrylic Backplate Simulation */}
            <div className="absolute inset-x-8 inset-y-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-[2px] shadow-2xl pointer-events-none">
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-slate-600 border border-white/20" />
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-slate-600 border border-white/20" />
              <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-slate-600 border border-white/20" />
              <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-slate-600 border border-white/20" />
            </div>

            {/* Glowing Neon Tubes */}
            <div className="relative z-10 space-y-2 text-center">
              <p
                className={`text-4xl sm:text-6xl md:text-7xl font-bold font-['Satisfy',cursive] transition-all duration-300 ${
                  isNeonOn ? 'neon-tube-glow' : 'neon-off'
                }`}
                style={{
                  color: isNeonOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                  textShadow: isNeonOn
                    ? `0 0 4px #ffffff, 0 0 10px ${activeFinish.hex}, 0 0 25px ${activeFinish.hex}, 0 0 60px ${activeFinish.hex}`
                    : 'none'
                }}
              >
                Dream In Neon
              </p>
              <p
                className={`text-xs sm:text-base uppercase tracking-[0.3em] font-mono font-bold transition-all duration-300 ${
                  isNeonOn ? 'neon-tube-glow' : 'neon-off'
                }`}
                style={{
                  color: isNeonOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                  textShadow: isNeonOn
                    ? `0 0 3px #ffffff, 0 0 8px ${activeFinish.hex}, 0 0 20px ${activeFinish.hex}`
                    : 'none'
                }}
              >
                NEOCRAFT PRO • 2026
              </p>
            </div>

          </div>

          {/* Bottom Feature Tags */}
          <div className="pt-6 border-t border-[#222225] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left text-xs text-[#86868b]">
            <div>
              <div className="font-semibold text-white">50,000h Lifespan</div>
              <div className="text-[11px]">10+ years daily runtime</div>
            </div>
            <div>
              <div className="font-semibold text-white">12V Silent Touch</div>
              <div className="text-[11px]">Safe low voltage</div>
            </div>
            <div>
              <div className="font-semibold text-white">2-Year Warranty</div>
              <div className="text-[11px]">Direct replacement</div>
            </div>
            <div>
              <div className="font-semibold text-white">Pan-India Delivery</div>
              <div className="text-[11px]">Insured wooden crate</div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
