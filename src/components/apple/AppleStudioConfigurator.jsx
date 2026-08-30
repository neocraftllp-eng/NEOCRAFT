import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Type, 
  Palette, 
  Maximize2, 
  Layers, 
  Sliders, 
  Power, 
  Sun, 
  Camera, 
  Download, 
  CheckCircle2,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { NEON_FONTS } from '../../data/fonts';
import { NEON_COLORS } from '../../data/colors';
import { ROOM_SCENES } from '../../data/roomScenes';
import { SIZES, BACKING_TYPES, calculateCustomNeonPrice, formatPrice } from '../../utils/pricing';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';

export default function AppleStudioConfigurator({
  onAddToCart,
  onOpenVisualizer,
  selectedCurrency = 'INR'
}) {
  // Configurator States
  const [customText, setCustomText] = useState('Dream In Neon');
  const [selectedFont, setSelectedFont] = useState(NEON_FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(NEON_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // M 75cm
  const [selectedBacking, setSelectedBacking] = useState(BACKING_TYPES[0]);
  const [selectedRoom, setSelectedRoom] = useState(ROOM_SCENES[0]);
  
  // Power & Lighting
  const [isPowered, setIsPowered] = useState(true);
  const [dimmer, setDimmer] = useState(100);
  
  // Accessories
  const [hasRemoteDimmer, setHasRemoteDimmer] = useState(true);
  const [isOutdoorWaterproof, setIsOutdoorWaterproof] = useState(false);

  // Active step tab in configurator: 'text' | 'font' | 'finish' | 'size' | 'backing'
  const [activeStep, setActiveStep] = useState('text');

  const totalPriceINR = calculateCustomNeonPrice({
    text: customText,
    sizeId: selectedSize.id,
    backingId: selectedBacking.id,
    hasRemoteDimmer,
    isOutdoorWaterproof,
    isMultiColor: selectedColor.isGradient
  });

  const handleTogglePower = () => {
    const next = !isPowered;
    playSwitchSound(next);
    setIsPowered(next);
  };

  const handleAddToCart = () => {
    playChimeSound();
    const item = {
      id: `apple-custom-${Date.now()}`,
      name: `NEOCRAFT Studio: "${customText.replace(/\n/g, ' ')}"`,
      category: 'custom-text',
      price: totalPriceINR,
      originalPrice: Math.round(totalPriceINR * 1.35),
      quantity: 1,
      image: '⚡',
      specs: {
        text: customText,
        font: selectedFont.name,
        color: selectedColor.name,
        size: selectedSize.label,
        backing: selectedBacking.name,
        dimmerRemote: hasRemoteDimmer ? 'Included' : 'No',
        waterproof: isOutdoorWaterproof ? 'IP67 Outdoor' : 'Standard Indoor'
      }
    };
    onAddToCart(item);
  };

  const handleWhatsAppOrder = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft! ⚡ I configured my custom sign in the Studio:\n\n` +
      `• Text: "${customText.replace(/\n/g, ' ')}"\n` +
      `• Font: ${selectedFont.name}\n` +
      `• Finish: ${selectedColor.name}\n` +
      `• Scale: ${selectedSize.label}\n` +
      `• Backplate: ${selectedBacking.name}\n` +
      `• Total: ₹${totalPriceINR.toLocaleString('en-IN')}\n\n` +
      `Please provide the production proof!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  const lines = customText ? customText.split('\n') : ['Your Custom Sign'];

  return (
    <section id="custom-studio-section" className="py-16 md:py-24 bg-[#0a0a0c] border-b border-[#222225] select-none text-white">
      <div className="max-w-[1180px] mx-auto px-4">
        
        {/* Apple Configurator Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#2997ff] uppercase">
            NEOCRAFT STUDIO CONFIGURATOR
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Design your sign. Exact to your vision.
          </h2>
          <p className="text-sm text-[#86868b]">
            Choose your typography, finish, backplate cut, and scale. Every piece is handcrafted and tested for 50,000 hours.
          </p>
        </div>

        {/* 2-Column Split: Stage on Left, Configurator Steps on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INTERACTIVE STAGE & WALL SIMULATOR (7 cols) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            
            {/* Main Stage Viewport */}
            <div 
              style={selectedRoom?.bgStyle || { backgroundColor: '#0e0f14' }}
              className="relative w-full h-[380px] sm:h-[480px] rounded-[32px] border border-[#2d2d32] p-8 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500"
            >
              {/* Dynamic Ambient Wall Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  background: isPowered
                    ? `radial-gradient(circle at 50% 50%, rgba(${selectedColor.ambientRgb}, ${(dimmer / 100) * 0.4}) 0%, transparent 75%)`
                    : 'transparent'
                }}
              />

              {/* Top Controls Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <button
                  onClick={handleTogglePower}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer backdrop-blur-md ${
                    isPowered
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                      : 'bg-red-500/30 text-red-300 border border-red-500/50'
                  }`}
                >
                  {isPowered ? 'Power: On' : 'Power: Off'}
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    onOpenVisualizer(customText, selectedColor.hex);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>View in your room (AR)</span>
                </button>
              </div>

              {/* The Acrylic Backplate & Glowing Typography */}
              <div
                className={`relative z-10 p-6 sm:p-10 transition-all duration-300 max-w-[90%] flex flex-col items-center justify-center ${
                  selectedBacking.id === 'full-rect'
                    ? 'rounded-2xl bg-white/[0.03] border border-white/20 backdrop-blur-[2px] shadow-2xl'
                    : selectedBacking.id === 'stand-off'
                    ? 'rounded-2xl bg-white/[0.04] border border-amber-400/20 backdrop-blur-[2px] shadow-2xl'
                    : selectedBacking.id === 'cut-to-shape'
                    ? 'rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-[1px]'
                    : 'bg-transparent'
                }`}
              >
                {/* Brass Standoff Pins in corners if enabled */}
                {(selectedBacking.id === 'stand-off' || selectedBacking.id === 'full-rect') && (
                  <>
                    <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-amber-400/80 border border-black/40 shadow-sm" />
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-400/80 border border-black/40 shadow-sm" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-amber-400/80 border border-black/40 shadow-sm" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-amber-400/80 border border-black/40 shadow-sm" />
                  </>
                )}

                <div 
                  className="space-y-1 text-center"
                  style={{
                    fontFamily: selectedFont.family,
                    letterSpacing: selectedFont.letterSpacing,
                    lineHeight: selectedFont.lineHeight
                  }}
                >
                  {lines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`text-2xl sm:text-4xl md:text-5xl font-bold transition-all duration-200 ${
                        !isPowered ? 'neon-off' : ''
                      }`}
                      style={{
                        color: isPowered ? '#ffffff' : 'rgba(255,255,255,0.15)',
                        textShadow: isPowered
                          ? `0 0 3px #ffffff, 0 0 8px ${selectedColor.hex}, 0 0 ${18 * (dimmer / 100)}px ${selectedColor.hex}, 0 0 ${40 * (dimmer / 100)}px ${selectedColor.hex}`
                          : 'none',
                        opacity: isPowered ? Math.max(0.3, dimmer / 100) : 0.35
                      }}
                    >
                      {line || ' '}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stage Tags */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#86868b] border border-white/10">
                <span className="text-white font-medium">{selectedSize.label}</span>
                <span className="mx-1.5">•</span>
                <span>{selectedBacking.name}</span>
              </div>
            </div>

            {/* Wall Environment Selector Bar */}
            <div className="p-4 rounded-2xl bg-[#141416] border border-[#262629] flex items-center justify-between gap-2 overflow-x-auto text-xs text-[#86868b]">
              <span className="font-semibold text-white whitespace-nowrap">Wall Texture:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {ROOM_SCENES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { playClickSound(); setSelectedRoom(r); }}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedRoom.id === r.id
                        ? 'bg-white text-slate-950 font-bold'
                        : 'bg-[#1f1f23] text-[#86868b] hover:text-white'
                    }`}
                  >
                    {r.name.split(' ')[0]} {r.name.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimmer Brightness Slider */}
            <div className="p-4 rounded-2xl bg-[#141416] border border-[#262629] flex items-center gap-4 text-xs text-[#86868b]">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium text-white whitespace-nowrap">Dimmer: {dimmer}%</span>
              <input
                type="range"
                min="10"
                max="100"
                value={dimmer}
                onChange={(e) => setDimmer(Number(e.target.value))}
                className="w-full h-1 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
            </div>

          </div>

          {/* RIGHT: APPLE STEP-BY-STEP CONFIGURATOR (5 cols) */}
          <div className="lg:col-span-5 space-y-6 apple-card p-6 sm:p-8">
            
            {/* Step Navigation Pills */}
            <div className="flex items-center gap-1 bg-[#0e0f14] p-1 rounded-full border border-[#222225] overflow-x-auto no-scrollbar text-xs">
              {[
                { id: 'text', label: '1. Text' },
                { id: 'font', label: '2. Font' },
                { id: 'finish', label: '3. Finish' },
                { id: 'size', label: '4. Scale' },
                { id: 'backing', label: '5. Backplate' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playClickSound(); setActiveStep(tab.id); }}
                  className={`flex-1 px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                    activeStep === tab.id
                      ? 'bg-white text-slate-950 font-bold'
                      : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Step 1: Text Input */}
            {activeStep === 'text' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                  Enter Custom Words / Phrase:
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={2}
                  maxLength={60}
                  className="w-full px-4 py-3 bg-[#0e0f14] border border-[#2d2d32] rounded-2xl text-white font-medium text-base focus:outline-none focus:border-[#2997ff] transition-all resize-none"
                  placeholder="Type your sign..."
                />
                <div className="flex justify-between text-[11px] text-[#86868b]">
                  <span>Press Enter for multi-line layout</span>
                  <span>{customText.length}/60 characters</span>
                </div>
              </div>
            )}

            {/* Step 2: Font Selection */}
            {activeStep === 'font' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Typography ({NEON_FONTS.length} curated styles):
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {NEON_FONTS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { playClickSound(); setSelectedFont(f); }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedFont.id === f.id
                          ? 'bg-[#1f1f25] border-white text-white shadow-md'
                          : 'bg-[#0e0f14] border-[#222225] text-[#86868b] hover:border-[#333]'
                      }`}
                    >
                      <div className="text-base truncate font-semibold" style={{ fontFamily: f.family }}>
                        {customText || f.sample}
                      </div>
                      <div className="text-[10px] text-[#86868b] mt-1">{f.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Finish & Color */}
            {activeStep === 'finish' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Select Finish:
                  </label>
                  <span className="text-xs font-semibold text-white">{selectedColor.name}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {NEON_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { playClickSound(); setSelectedColor(c); }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        selectedColor.id === c.id
                          ? 'border-white bg-[#1f1f25] shadow-md scale-105'
                          : 'border-[#222225] bg-[#0e0f14] hover:border-[#333]'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ background: c.hex }} />
                      <span className="text-[10px] text-[#a1a1a6] font-medium truncate w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Sizing */}
            {activeStep === 'size' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Scale / Dimension:
                </label>
                <div className="space-y-2">
                  {SIZES.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => { playClickSound(); setSelectedSize(sz); }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedSize.id === sz.id
                          ? 'bg-[#1f1f25] border-white text-white shadow-md'
                          : 'bg-[#0e0f14] border-[#222225] text-[#86868b] hover:border-[#333]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm text-white">{sz.label}</div>
                        <div className="text-[11px] text-[#86868b]">{sz.suitableFor}</div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#2997ff]">{sz.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Backplate */}
            {activeStep === 'backing' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Backplate Option:
                </label>
                <div className="space-y-2">
                  {BACKING_TYPES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { playClickSound(); setSelectedBacking(b); }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedBacking.id === b.id
                          ? 'bg-[#1f1f25] border-white text-white shadow-md'
                          : 'bg-[#0e0f14] border-[#222225] text-[#86868b] hover:border-[#333]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm text-white">{b.name}</div>
                        <div className="text-[11px] text-[#86868b]">{b.desc}</div>
                      </div>
                      <span className="text-xs font-semibold text-[#2997ff]">
                        {b.price === 0 ? 'Included' : `+₹${b.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary & Apple Buy Bar */}
            <div className="pt-6 border-t border-[#222225] space-y-4">
              
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#86868b] block">Total Investment</span>
                  <div className="text-3xl font-semibold text-white tracking-tight">
                    {formatPrice(totalPriceINR, selectedCurrency)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-400 font-medium">
                  Free Pan-India Delivery • 2-Yr Warranty
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full apple-btn-primary py-3.5 text-sm font-semibold cursor-pointer shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full apple-btn-secondary py-3 text-xs font-medium cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Order via WhatsApp Spec</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
