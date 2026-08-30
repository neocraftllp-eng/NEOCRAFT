import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Sliders, 
  Eye, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const PANEL_LAYOUTS = [
  {
    id: '3-triptych',
    name: '3-Piece Triptych (Equal Split)',
    panels: 3,
    heights: ['100%', '100%', '100%'],
    desc: 'Classic balanced 3-panel split. Ideal for hanging above 3-seater sofas and console tables.',
    basePrice: 8999
  },
  {
    id: '5-cascade',
    name: '5-Piece Stepped Cascade',
    panels: 5,
    heights: ['70%', '85%', '100%', '85%', '70%'],
    desc: 'Dramatic architectural centerpiece with taller center panel and cascading outer wings.',
    basePrice: 12999
  },
  {
    id: '4-quad',
    name: '4-Panel Modern Quad',
    panels: 4,
    heights: ['100%', '100%', '100%', '100%'],
    desc: 'Contemporary 4-vertical slat format for wide loft walls and luxury dining spaces.',
    basePrice: 10499
  }
];

const FEATURED_ARTWORKS = [
  { id: 'horses', name: 'Seven Running Vastu Horses', image: '/images/canvas/seven-horses.jpg' },
  { id: 'shiva', name: 'Lord Shiva Cosmic Tandav', image: '/images/canvas/lord-shiva.jpg' },
  { id: 'buddha', name: 'Golden Dhyana Buddha', image: '/images/canvas/golden-buddha.jpg' },
  { id: 'abstract', name: 'Obsidian & Gold Veins', image: '/images/canvas/abstract-gold.jpg' }
];

export default function AppleMultiPanelCanvasModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedLayout, setSelectedLayout] = useState(PANEL_LAYOUTS[0]);
  const [selectedArt, setSelectedArt] = useState(FEATURED_ARTWORKS[0]);
  const [gapSpacing, setGapSpacing] = useState(1.5); // inches
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const currentPrice = selectedLayout.basePrice;

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `multipanel-${Date.now()}`,
      name: `${selectedLayout.name} — ${selectedArt.name}`,
      category: 'Multi-Panel Canvas Split',
      price: currentPrice,
      originalPrice: currentPrice + 4500,
      quantity: 1,
      image: selectedArt.image,
      specs: {
        layout: selectedLayout.name,
        artwork: selectedArt.name,
        gapSpacing: `${gapSpacing} Inches`,
        material: '380 GSM Cotton Canvas on Solid Pinewood'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-5xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Panoramic Multi-Panel Canvas Split Configurator (Triptych & Cascade)
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Wall Simulation (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* The Wall Stage */}
            <div className="h-72 sm:h-96 w-full rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden flex items-center justify-center p-8">
              
              {/* Radial Lighting */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
                }}
              />

              {/* Multi-Panel Panels Container */}
              <div 
                className="flex items-center justify-center h-full max-h-56 sm:max-h-72 w-full z-10"
                style={{ gap: `${gapSpacing * 12}px` }}
              >
                {selectedLayout.heights.map((heightPercent, idx) => (
                  <div
                    key={idx}
                    className="h-full rounded-xl overflow-hidden border border-white/20 shadow-2xl relative transition-all duration-300 flex-1"
                    style={{
                      height: heightPercent,
                      backgroundImage: `url(${selectedArt.image})`,
                      backgroundSize: `${selectedLayout.panels * 100}% 100%`,
                      backgroundPosition: `${(idx / (selectedLayout.panels - 1)) * 100}% center`
                    }}
                  />
                ))}
              </div>

              {/* HUD Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 z-20">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px]">
                  Layout: <strong className="text-white">{selectedLayout.name}</strong>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-amber-300">
                  Gap: {gapSpacing}" Inch Spacing
                </div>
              </div>

            </div>

            {/* Gap Spacing Slider */}
            <div className="p-3 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-3 text-xs">
              <span className="text-[#86868b] font-medium flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-amber-400" /> Wall Gap Spacing:
              </span>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.5"
                value={gapSpacing}
                onChange={(e) => setGapSpacing(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="font-mono text-white text-[11px] font-semibold">{gapSpacing}"</span>
            </div>

          </div>

          {/* Right Column: Layouts & Artwork Switcher (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            {/* Layout Options */}
            <div>
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                Choose Split Format:
              </span>
              <div className="space-y-2">
                {PANEL_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => { playClickSound(); setSelectedLayout(layout); }}
                    className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedLayout.id === layout.id
                        ? 'bg-[#1f1f25] border-amber-400 text-white shadow-md'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-white text-xs">{layout.name}</span>
                      <span className="font-mono text-amber-300 font-bold">{formatPrice(layout.basePrice, selectedCurrency)}</span>
                    </div>
                    <p className="text-[10px] text-[#86868b]">{layout.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Artwork Selector */}
            <div>
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                Select Artwork to Split:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FEATURED_ARTWORKS.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => { playClickSound(); setSelectedArt(art); }}
                    className={`p-2 rounded-xl border flex items-center gap-2 text-left cursor-pointer transition-all ${
                      selectedArt.id === art.id
                        ? 'bg-[#1f1f25] border-white text-white shadow-sm'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                    }`}
                  >
                    <img src={art.image} alt={art.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-[11px] font-semibold text-white truncate">{art.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Buy Action */}
            <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
              <div>
                <span className="text-[#86868b] text-[10px] block">Complete Set Price</span>
                <div className="text-xl font-bold text-white">
                  {formatPrice(currentPrice, selectedCurrency)}
                </div>
              </div>

              <button
                onClick={handleBuy}
                className={`apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Set to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
