import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Zap, 
  Box, 
  Layers, 
  Wrench, 
  Eye,
  Maximize2,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenAR,
  selectedCurrency = 'INR'
}) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Default standard
  const [selectedColor, setSelectedColor] = useState(product?.glowColor || '#00F0FF');
  const [selectedBacking, setSelectedBacking] = useState('cut-to-shape');
  const [brightness, setBrightness] = useState(100);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'in-box' | 'specs' | 'install'
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const sizes = [
    { label: 'Compact (50cm)', multiplier: 0.75 },
    { label: 'Standard (80cm)', multiplier: 1.0 },
    { label: 'Statement (120cm)', multiplier: 1.45 },
    { label: 'Grand (160cm)', multiplier: 1.95 }
  ];

  const currentPrice = Math.round(product.price * sizes[selectedSizeIndex].multiplier);
  const originalPrice = Math.round(product.originalPrice * sizes[selectedSizeIndex].multiplier);

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `${product.id}-${Date.now()}`,
      name: `${product.name} (${sizes[selectedSizeIndex].label})`,
      category: product.category,
      price: currentPrice,
      originalPrice: originalPrice,
      quantity: 1,
      image: product.image || '⚡',
      specs: {
        dimensions: sizes[selectedSizeIndex].label,
        color: selectedColor,
        backing: selectedBacking,
        dimmer: '12V Remote Included'
      }
    };
    onAddToCart(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2997ff] bg-[#2997ff]/10 px-2.5 py-0.5 rounded-full border border-[#2997ff]/20">
              {product.subcategory || product.category}
            </span>
            <h3 className="font-semibold text-sm tracking-tight text-white truncate max-w-xs sm:max-w-md">
              {product.name}
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
          
          {/* Left Column: Interactive Stage & Lighting Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Visual Stage */}
            <div className="h-64 sm:h-80 w-full rounded-3xl bg-[#09090b] border border-[#262629] relative overflow-hidden flex items-center justify-center p-6 group">
              
              {/* Radial Glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedColor}35 0%, transparent 70%)`,
                  opacity: isPowerOn ? brightness / 100 : 0.05
                }}
              />

              {/* Product Visual */}
              {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div 
                  className="text-4xl sm:text-5xl font-black text-center tracking-wider transition-all duration-300"
                  style={{
                    color: selectedColor,
                    opacity: isPowerOn ? brightness / 100 : 0.2,
                    textShadow: isPowerOn 
                      ? `0 0 10px ${selectedColor}, 0 0 30px ${selectedColor}`
                      : 'none'
                  }}
                >
                  {product.name}
                </div>
              )}

              {/* AR Quick Look Button */}
              <button
                onClick={() => {
                  playClickSound();
                  if (onOpenAR) onOpenAR(product.name, selectedColor);
                }}
                className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] text-white flex items-center gap-1.5 hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>View in Your Room (AR)</span>
              </button>

              {/* Power Toggle Button */}
              <button
                onClick={() => { playClickSound(); setIsPowerOn(!isPowerOn); }}
                className={`absolute top-3 right-3 px-3 py-1 rounded-full border text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  isPowerOn 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-black/80 text-[#86868b] border-white/10'
                }`}
              >
                {isPowerOn ? '● 12V ON' : '○ OFF'}
              </button>
            </div>

            {/* Dimmer Slider */}
            <div className="p-3 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-3 text-xs">
              <span className="text-[#86868b] font-medium flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" /> Dimmer:
              </span>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="flex-1 h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
              <span className="font-mono text-white text-[11px] font-semibold">{brightness}%</span>
            </div>

          </div>

          {/* Right Column: Customization Tabs, Sizes, Specs, and Buy (6 cols) */}
          <div className="lg:col-span-6 space-y-5 text-xs">
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 border-b border-[#262629] pb-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'in-box', label: "What's in Box" },
                { id: 'specs', label: 'Tech Specs' },
                { id: 'install', label: 'Installation' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playClickSound(); setActiveTab(tab.id); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-950 font-bold'
                      : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW & SIZE SELECTOR */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-[#86868b] leading-relaxed">
                  {product.shortDesc || 'Handcrafted with optical-grade cast acrylic and pure silicone 12V LED flex.'}
                </p>

                {/* Size Selector */}
                <div>
                  <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-1.5">
                    Select Dimensions:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {sizes.map((sz, idx) => (
                      <button
                        key={sz.label}
                        onClick={() => { playClickSound(); setSelectedSizeIndex(idx); }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedSizeIndex === idx
                            ? 'bg-[#1f1f25] border-white text-white shadow-sm'
                            : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-white">{sz.label.split(' ')[0]}</div>
                        <div className="text-[10px] text-[#2997ff] font-mono">
                          {formatPrice(Math.round(product.price * sz.multiplier), selectedCurrency)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Backing Style */}
                <div>
                  <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-1.5">
                    Acrylic Backing Finish:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'cut-to-shape', label: 'Cut to Shape' },
                      { id: 'full-rectangle', label: 'Rectangle Board' },
                      { id: 'stand-base', label: 'Tabletop Stand' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => { playClickSound(); setSelectedBacking(b.id); }}
                        className={`p-2 rounded-lg border text-center text-[11px] cursor-pointer transition-all ${
                          selectedBacking === b.id
                            ? 'bg-white text-slate-950 font-bold border-white'
                            : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#86868b]">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>50,000h Lifespan Tested</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2997ff]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>2-Year Replacement Warranty</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: WHAT'S IN THE BOX */}
            {activeTab === 'in-box' && (
              <div className="space-y-3">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Complete Unboxing Package:
                </span>

                <div className="space-y-2">
                  {[
                    { title: 'Handcrafted Signboard Unit', desc: 'Pre-assembled with silicone flex & diamond cast acrylic' },
                    { title: '12V DC UL-Certified Power Adapter', desc: '6ft cord length with standard Indian 3-pin plug' },
                    { title: 'Wireless RF Dimmer Controller', desc: '10-step brightness & strobe pulse modes' },
                    { title: 'Stainless Steel Standoff Mounts', desc: 'Wall anchors, screws, and template spacer pins' },
                    { title: 'Heavy-Duty 3M Adhesive Strips', desc: 'For damage-free renter-friendly glass/tile mounting' },
                    { title: 'Certificate of Authenticity', desc: 'Verified 50,000-hour stress testing serial card' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#121214] border border-[#222225] flex items-start gap-2.5">
                      <Box className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-[10px] text-[#86868b]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: TECH SPECS */}
            {activeTab === 'specs' && (
              <div className="space-y-2">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                  Technical Specifications:
                </span>

                <div className="divide-y divide-[#222225] border border-[#222225] rounded-2xl bg-[#121214] overflow-hidden">
                  {[
                    { label: 'Operating Voltage', val: '12V DC Safe Touch' },
                    { label: 'Power Consumption', val: '24W - 48W (High Efficiency)' },
                    { label: 'LED Lifespan', val: '50,000+ Continuous Hours' },
                    { label: 'Acrylic Backplate', val: '6mm Cast Clear Acrylic' },
                    { label: 'Waterproof Rating', val: 'IP67 Weatherproof Silicone' },
                    { label: 'Color Rendering (CRI)', val: '>90 High Fidelity Saturation' },
                    { label: 'Operating Noise', val: '0 dB (Silent Solid-State)' }
                  ].map((row, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between text-xs">
                      <span className="text-[#86868b]">{row.label}</span>
                      <span className="font-semibold text-white font-mono">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: INSTALLATION WALKTHROUGH */}
            {activeTab === 'install' && (
              <div className="space-y-3">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  3 Simple Ways to Mount:
                </span>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#121214] border border-[#222225]">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#2997ff] text-slate-950 flex items-center justify-center font-bold text-[10px]">1</span>
                      <span>Stainless Standoff Screws (Recommended)</span>
                    </div>
                    <p className="text-[11px] text-[#86868b] mt-1">
                      Drill 2 small guide holes using pre-drilled acrylic holes and screw in the brushed metal standoff pins for a floating gallery effect.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121214] border border-[#222225]">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#2997ff] text-slate-950 flex items-center justify-center font-bold text-[10px]">2</span>
                      <span>3M Heavy-Duty Adhesive (No Drilling)</span>
                    </div>
                    <p className="text-[11px] text-[#86868b] mt-1">
                      Peel and stick provided 3M command strips onto clean tile, glass, or smooth wooden panels.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#121214] border border-[#222225]">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#2997ff] text-slate-950 flex items-center justify-center font-bold text-[10px]">3</span>
                      <span>Ceiling Wire Suspension</span>
                    </div>
                    <p className="text-[11px] text-[#86868b] mt-1">
                      Thread stainless aircraft wire through top eyelets for glass storefronts and cafe windows.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Sticky Price & Buy Actions */}
            <div className="pt-4 border-t border-[#222225] flex items-center justify-between gap-4">
              <div>
                <span className="text-[#86868b] text-[11px] block">Total Configured Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    {formatPrice(currentPrice, selectedCurrency)}
                  </span>
                  <span className="text-xs text-[#86868b] line-through font-mono">
                    {formatPrice(originalPrice, selectedCurrency)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBuy}
                className={`apple-btn-primary py-3 px-6 text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
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
