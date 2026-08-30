import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  Type, 
  Palette, 
  Maximize2, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  Camera,
  CheckCircle2,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Info
} from 'lucide-react';
import NeonCanvas from './NeonCanvas';
import { NEON_FONTS } from '../../data/fonts';
import { NEON_COLORS } from '../../data/colors';
import { ROOM_SCENES } from '../../data/roomScenes';
import { SIZES, BACKING_TYPES, calculateCustomNeonPrice, formatPrice } from '../../utils/pricing';
import { playClickSound, playChimeSound, playSwitchSound } from '../../audio/soundEffects';

export default function CustomNeonStudio({
  onAddToCart,
  onOpenVisualizer,
  selectedCurrency = 'INR'
}) {
  // Studio States
  const [customText, setCustomText] = useState('Dream In Neon');
  const [selectedFont, setSelectedFont] = useState(NEON_FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(NEON_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Medium 75cm
  const [selectedBacking, setSelectedBacking] = useState(BACKING_TYPES[0]); // Cut-to-Shape
  const [selectedRoom, setSelectedRoom] = useState(ROOM_SCENES[0]);
  const [textAlign, setTextAlign] = useState('center');

  // Lighting & Power States
  const [isPowered, setIsPowered] = useState(true);
  const [dimmer, setDimmer] = useState(100);
  const [lightMode, setLightMode] = useState('steady');

  // Add-ons
  const [hasRemoteDimmer, setHasRemoteDimmer] = useState(true);
  const [isOutdoorWaterproof, setIsOutdoorWaterproof] = useState(false);

  // Tab filters
  const [fontCategory, setFontCategory] = useState('All');
  const [colorCategory, setColorCategory] = useState('All');

  // Active studio step (Text, Style, Size & Backing, Add-ons)
  const [activeTab, setActiveTab] = useState('text-style');

  // Filtered Fonts
  const fontCategories = ['All', 'Cursive & Script', 'Modern Bold', 'Cyberpunk & Tech', 'Retro & Vintage', 'Luxury Minimal', 'Handwritten'];
  const filteredFonts = fontCategory === 'All' 
    ? NEON_FONTS 
    : NEON_FONTS.filter(f => f.category === fontCategory);

  // Filtered Colors
  const colorCategories = ['All', 'Vibrant', 'Elegance', 'Moody', 'Warm', 'Multi-Color'];
  const filteredColors = colorCategory === 'All'
    ? NEON_COLORS
    : NEON_COLORS.filter(c => c.category === colorCategory);

  // Compute calculated dynamic price
  const totalPriceINR = calculateCustomNeonPrice({
    text: customText,
    sizeId: selectedSize.id,
    backingId: selectedBacking.id,
    hasRemoteDimmer,
    isOutdoorWaterproof,
    isMultiColor: selectedColor.isGradient
  });

  const formattedTotal = formatPrice(totalPriceINR, selectedCurrency);

  // Handle Add To Cart
  const handleAddToCart = () => {
    playChimeSound();
    const customItem = {
      id: `custom-neon-${Date.now()}`,
      name: `Custom Neon: "${customText.replace(/\n/g, ' ')}"`,
      category: 'custom-text',
      price: totalPriceINR,
      originalPrice: Math.round(totalPriceINR * 1.35),
      image: '⚡',
      specs: {
        text: customText,
        font: selectedFont.name,
        color: selectedColor.name,
        colorHex: selectedColor.hex,
        size: selectedSize.label,
        backing: selectedBacking.name,
        dimmerRemote: hasRemoteDimmer ? 'Included' : 'No',
        waterproof: isOutdoorWaterproof ? 'IP67 Outdoor' : 'Indoor Standard',
      },
      quantity: 1
    };

    onAddToCart(customItem);
  };

  // Handle WhatsApp Direct Order
  const handleWhatsAppOrder = () => {
    playClickSound();
    const message = encodeURIComponent(
      `Hello Neocraft Studio! ⚡ I want to order a custom neon sign:\n\n` +
      `• Custom Text: "${customText.replace(/\n/g, ' ')}"\n` +
      `• Font Style: ${selectedFont.name}\n` +
      `• Neon Color: ${selectedColor.name}\n` +
      `• Size: ${selectedSize.label}\n` +
      `• Acrylic Backing: ${selectedBacking.name}\n` +
      `• Remote Dimmer: ${hasRemoteDimmer ? 'Yes' : 'No'}\n` +
      `• Outdoor Waterproof: ${isOutdoorWaterproof ? 'Yes (IP67)' : 'No'}\n` +
      `• Estimated Price: ₹${totalPriceINR.toLocaleString('en-IN')}\n\n` +
      `Please provide the final 3D production mockup & payment link!`
    );
    window.open(`https://wa.me/919166691274?text=${message}`, '_blank');
  };

  return (
    <section id="custom-studio-section" className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> LIVE NEON BUILDER 2.0
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
          CUSTOMIZE YOUR <span className="text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text">NEON MASTERPIECE</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Type your words, switch fonts, dial in 18+ neon colors, and preview on 6 realistic room backdrops with instant dynamic quotation.
        </p>
      </div>

      {/* Main Studio Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE CANVAS VIEWPORT (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          <NeonCanvas
            text={customText}
            font={selectedFont}
            color={selectedColor}
            size={selectedSize}
            backing={selectedBacking}
            isPowered={isPowered}
            onTogglePower={setIsPowered}
            dimmer={dimmer}
            onChangeDimmer={setDimmer}
            lightMode={lightMode}
            onChangeLightMode={setLightMode}
            selectedRoom={selectedRoom}
            textAlign={textAlign}
            onOpenVisualizer={onOpenVisualizer}
          />

          {/* Wall Scene Quick Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Switch Wall Environment:
              </span>
              <span className="text-[11px] text-slate-400">{selectedRoom.category}</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {ROOM_SCENES.map((room) => (
                <button
                  key={room.id}
                  onClick={() => { playClickSound(); setSelectedRoom(room); }}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedRoom.id === room.id
                      ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{room.name}</div>
                  <div className="text-[9px] text-slate-500 truncate">{room.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CONTROL PANEL (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 bg-[#0c0f18] p-6 rounded-2xl border border-slate-800 shadow-2xl">
          
          {/* STEP 1: CUSTOM TEXT INPUT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-4 h-4 text-pink-400" /> 1. Enter Your Text:
              </label>
              
              {/* Text Alignment */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`p-1 rounded cursor-pointer ${textAlign === 'left' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`p-1 rounded cursor-pointer ${textAlign === 'center' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTextAlign('right')}
                  className={`p-1 rounded cursor-pointer ${textAlign === 'right' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your name, quote or brand name here..."
              rows={2}
              maxLength={60}
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white font-medium text-base focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
            />
            <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
              <span>Press Enter for multi-line neon layout</span>
              <span>{customText.length}/60 chars</span>
            </div>
          </div>

          {/* STEP 2: FONT SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> 2. Choose Typography ({filteredFonts.length} styles):
              </label>
            </div>

            {/* Font Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 no-scrollbar text-xs">
              {fontCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { playClickSound(); setFontCategory(cat); }}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                    fontCategory === cat
                      ? 'bg-purple-500 text-white shadow-sm font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Font Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredFonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => { playClickSound(); setSelectedFont(f); }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedFont.id === f.id
                      ? 'bg-purple-500/20 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <span 
                    className="text-base truncate font-semibold block" 
                    style={{ fontFamily: f.family }}
                  >
                    {customText || f.sample}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: COLOR PALETTE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-cyan-400" /> 3. Neon Color: <span className="text-cyan-300 font-bold ml-1">{selectedColor.name}</span>
              </label>
            </div>

            {/* Color Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 no-scrollbar text-xs">
              {colorCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { playClickSound(); setColorCategory(cat); }}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                    colorCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {filteredColors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { playClickSound(); setSelectedColor(c); }}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    selectedColor.id === c.id
                      ? 'border-white bg-slate-800 shadow-[0_0_12px_rgba(255,255,255,0.4)] scale-105'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div
                    style={{ background: c.hex }}
                    className="w-7 h-7 rounded-full shadow-inner border border-white/30"
                  />
                  <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">
                    {c.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: SIZING */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Maximize2 className="w-4 h-4 text-emerald-400" /> 4. Size: <span className="text-emerald-300 font-bold">{selectedSize.label}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SIZES.map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => { playClickSound(); setSelectedSize(sz); }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSize.id === sz.id
                      ? 'border-emerald-400 bg-emerald-500/15 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">{sz.label}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold">{sz.id}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{sz.suitableFor}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 5: ACRYLIC BACKING */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Layers className="w-4 h-4 text-amber-400" /> 5. Acrylic Backing Style:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BACKING_TYPES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { playClickSound(); setSelectedBacking(b); }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedBacking.id === b.id
                      ? 'border-amber-400 bg-amber-500/15 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">{b.name}</span>
                    <span className="text-[10px] text-amber-400 font-bold">
                      {b.price === 0 ? 'FREE' : `+₹${b.price}`}
                    </span>
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 6: SMART ADD-ONS & POWER */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
              Smart Upgrades & Options:
            </span>
            
            {/* Dimmer remote checkbox */}
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasRemoteDimmer}
                  onChange={(e) => { playClickSound(); setHasRemoteDimmer(e.target.checked); }}
                  className="w-4 h-4 rounded text-pink-500 accent-pink-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-white">Wireless Dimmer & Flasher Remote</div>
                  <div className="text-[10px] text-slate-400">10-step brightness + party pulse mode</div>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-400">+₹799</span>
            </label>

            {/* Waterproof checkbox */}
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isOutdoorWaterproof}
                  onChange={(e) => { playClickSound(); setIsOutdoorWaterproof(e.target.checked); }}
                  className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-white">IP67 Outdoor Weatherproof Rating</div>
                  <div className="text-[10px] text-slate-400">Sun & monsoon heavy-duty silicone seal</div>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-400">+₹999</span>
            </label>
          </div>

          {/* PRICE BREAKDOWN & FINAL ACTIONS */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            
            {/* Total Price Display */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Investment:</div>
                <div className="text-3xl sm:text-4xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text">
                  {formattedTotal}
                </div>
              </div>

              <div className="text-right text-[11px] text-emerald-400 font-semibold space-y-0.5">
                <div className="flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Pan-India Shipping
                </div>
                <div>2-Year Replacement Warranty</div>
              </div>
            </div>

            {/* Conversion Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Add Custom Sign to Cart</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-200 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Spec</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
