import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Eye, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const BACKING_STYLES = [
  {
    id: 'cut-to-shape',
    name: 'Contour Cut-to-Shape',
    desc: 'Precision laser cut following the exact contours of your text within 5mm. Sleekest, nearly invisible on wall.',
    borderStyle: 'rounded-full border-2 border-white/20',
    extraCost: 0,
    badge: 'Most Popular'
  },
  {
    id: 'full-rectangle',
    name: 'Full Acrylic Board',
    desc: 'Solid rectangle 6mm cast acrylic board with polished bevel edges and 4 pre-drilled standoff corner holes.',
    borderStyle: 'rounded-2xl border-2 border-white/30',
    extraCost: 0,
    badge: 'Classic Mount'
  },
  {
    id: 'hollow-cut',
    name: 'Cut-to-Letter (Hollow)',
    desc: 'Acrylic cut tightly behind individual letters for an ultra-clean floating tube illusion with zero excess acrylic.',
    borderStyle: 'border border-dashed border-cyan-400/40',
    extraCost: 750,
    badge: 'Ultra Clean'
  },
  {
    id: 'matte-black',
    name: 'Matte Obsidian Black',
    desc: 'Opaque matte black acrylic base that absorbs 99% wall reflection. Creates maximum contrast in daylight.',
    borderStyle: 'bg-black/90 border-2 border-[#333]',
    extraCost: 990,
    badge: 'Daylight High Contrast'
  },
  {
    id: 'gold-mirror',
    name: '24K Gold Mirror Acrylic',
    desc: 'Ultra-reflective 24K gold mirror acrylic backing plate. Doubles as luxury reflective mirror decor.',
    borderStyle: 'bg-gradient-to-br from-amber-500/30 via-yellow-300/20 to-amber-600/30 border-2 border-amber-400/60',
    extraCost: 1490,
    badge: 'Luxury Spec'
  },
  {
    id: 'tabletop-stand',
    name: 'Tabletop Acrylic Base',
    desc: 'Equipped with heavy solid acrylic slotted stand base. Freestanding on desks, bars, or bedside tables.',
    borderStyle: 'rounded-2xl border-b-8 border-cyan-500/50',
    extraCost: 650,
    badge: 'No Wall Drilling'
  }
];

export default function AppleBackingSimulatorModal({
  isOpen,
  onClose,
  initialText = 'ICONIC',
  initialColor = '#00F0FF',
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedBacking, setSelectedBacking] = useState(BACKING_STYLES[0]);
  const [color, setColor] = useState(initialColor);
  const [text, setText] = useState(initialText);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const basePrice = 4999;
  const totalPrice = basePrice + selectedBacking.extraCost;

  const colors = [
    { label: 'Cyber Cyan', hex: '#00F0FF' },
    { label: 'Tokyo Magenta', hex: '#FF1493' },
    { label: 'Electric Lime', hex: '#39FF14' },
    { label: 'Warm 2700K Gold', hex: '#FFD700' },
    { label: 'Pure Arctic White', hex: '#FFFFFF' }
  ];

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `backing-${Date.now()}`,
      name: `Custom Neon ("${text}")`,
      category: 'Custom Acrylic Studio',
      price: totalPrice,
      originalPrice: totalPrice + 2500,
      quantity: 1,
      image: '⚡',
      specs: {
        dimensions: '75 cm × 30 cm',
        color: color,
        backingOption: selectedBacking.name,
        dimmer: 'Included'
      }
    };
    onAddToCart(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-5xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Acrylic Backing & Laser Cut-to-Shape Simulator
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
          
          {/* Left Column: Visual Backing Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Stage */}
            <div className="h-72 sm:h-96 w-full rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden flex items-center justify-center p-8 transition-all duration-300">
              
              {/* Radial Glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${color}35 0%, transparent 65%)`
                }}
              />

              {/* Simulated Acrylic Backplate Silhouette */}
              <div 
                className={`p-6 sm:p-8 flex items-center justify-center transition-all duration-300 relative ${selectedBacking.borderStyle}`}
                style={{
                  boxShadow: selectedBacking.id === 'gold-mirror' 
                    ? '0 10px 40px rgba(251, 191, 36, 0.25)'
                    : '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                {/* Neon Sign Text */}
                <div
                  className="font-['Satisfy',cursive] font-bold text-center tracking-wider transition-all duration-300 select-none z-10"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: '#ffffff',
                    textShadow: `0 0 4px #ffffff, 0 0 10px ${color}, 0 0 25px ${color}, 0 0 50px ${color}`
                  }}
                >
                  {text || 'ICONIC'}
                </div>
              </div>

              {/* Backing Badge HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 z-20">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                  <span>Backing: <strong className="text-white">{selectedBacking.name}</strong></span>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-amber-300">
                  {selectedBacking.badge}
                </div>
              </div>

            </div>

            {/* Live Text Input & Colors */}
            <div className="p-3.5 rounded-2xl bg-[#121214] border border-[#222225] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="TYPE SIGN TEXT..."
                className="w-full sm:w-56 px-3 py-1.5 bg-[#1a1a1d] border border-[#2d2d30] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#2997ff]"
              />

              <div className="flex items-center gap-1.5">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => { playClickSound(); setColor(c.hex); }}
                    className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                      color === c.hex ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Backing Option Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              Choose Acrylic Backing Plate:
            </span>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {BACKING_STYLES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { playClickSound(); setSelectedBacking(b); }}
                  className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedBacking.id === b.id
                      ? 'bg-[#1f1f25] border-white text-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-white text-xs">{b.name}</div>
                    <span className="text-[10px] font-mono text-[#2997ff]">
                      {b.extraCost === 0 ? 'Included' : `+${formatPrice(b.extraCost, selectedCurrency)}`}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#86868b] leading-relaxed">{b.desc}</p>
                </button>
              ))}
            </div>

            {/* Price & Buy Action */}
            <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
              <div>
                <span className="text-[#86868b] text-[10px] block">Total Configured Price</span>
                <div className="text-xl font-bold text-white">
                  {formatPrice(totalPrice, selectedCurrency)}
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
