import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Sun, 
  Moon, 
  Sunset, 
  Sliders, 
  Layers, 
  Eye, 
  ShoppingBag, 
  Check,
  Maximize2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const WALL_TEXTURES = [
  { id: 'slate', name: 'Dark Slate Stone', bg: 'bg-[#121316]', style: { backgroundImage: 'radial-gradient(#1f2128 1px, transparent 1px)', backgroundSize: '16px 16px' } },
  { id: 'brick', name: 'Industrial Loft Brick', bg: 'bg-[#2b1810]', style: { backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 16px' } },
  { id: 'oak-slats', name: 'Nordic Oak Slats', bg: 'bg-[#1e1711]', style: { backgroundImage: 'repeating-linear-gradient(90deg, #2b2118, #2b2118 18px, #140e0a 18px, #140e0a 24px)' } },
  { id: 'marble', name: 'Carrara Marble', bg: 'bg-[#1c1c1f]', style: { backgroundImage: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.08), transparent 70%)' } },
  { id: 'concrete', name: 'Minimalist Concrete', bg: 'bg-[#1e1e20]', style: { backgroundImage: 'radial-gradient(#2c2c30 1px, transparent 1px)', backgroundSize: '8px 8px' } },
  { id: 'emerald', name: 'VIP Emerald Velvet', bg: 'bg-[#061c14]', style: { backgroundImage: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 80%)' } }
];

const LIGHTING_MODES = [
  { id: 'daylight', label: 'Daylight (Noon)', icon: Sun, ambientOpacity: 0.45, glowIntensity: 0.9 },
  { id: 'sunset', label: 'Golden Sunset', icon: Sunset, ambientOpacity: 0.25, glowIntensity: 1.15 },
  { id: 'midnight', label: 'Midnight Glow', icon: Moon, ambientOpacity: 0.05, glowIntensity: 1.4 }
];

export default function AppleRoomSimulatorModal({
  isOpen,
  onClose,
  initialText = 'Dream In Neon',
  initialColor = '#00F0FF',
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [text, setText] = useState(initialText);
  const [color, setColor] = useState(initialColor);
  const [selectedWall, setSelectedWall] = useState(WALL_TEXTURES[0]);
  const [lightingMode, setLightingMode] = useState(LIGHTING_MODES[2]); // Midnight by default
  const [glowBrightness, setGlowBrightness] = useState(100);
  const [signScale, setSignScale] = useState(100);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const colorPalette = [
    { label: 'Cyber Cyan', hex: '#00F0FF' },
    { label: 'Tokyo Magenta', hex: '#FF1493' },
    { label: 'Electric Lime', hex: '#39FF14' },
    { label: 'Warm 2700K Gold', hex: '#FFD700' },
    { label: 'Sapphire Blue', hex: '#1E90FF' },
    { label: 'Pure Arctic White', hex: '#FFFFFF' }
  ];

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `simulator-${Date.now()}`,
      name: `Custom Neon ("${text}")`,
      category: 'Custom Neon Studio',
      price: 5499,
      originalPrice: 7999,
      quantity: 1,
      image: '⚡',
      specs: {
        dimensions: '80 cm × 35 cm',
        color: color,
        simulatedWall: selectedWall.name,
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
            <div className="w-7 h-7 rounded-full bg-[#2997ff]/20 border border-[#2997ff]/40 flex items-center justify-center text-[#2997ff]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm tracking-tight text-white">
                3D Room Material & Ambient Lighting Simulator
              </h3>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Stage + Controls */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive 3D Room Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* The Wall Canvas */}
            <div 
              className={`h-72 sm:h-96 w-full rounded-3xl ${selectedWall.bg} border border-[#262629] relative overflow-hidden flex items-center justify-center p-8 transition-all duration-500`}
              style={selectedWall.style}
            >
              {/* Day / Night Ambient Lighting Overlay */}
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none"
                style={{ opacity: 1 - lightingMode.ambientOpacity }}
              />

              {/* Radial Neon Glow Casting on Wall */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${color}45 0%, transparent 65%)`,
                  opacity: (glowBrightness / 100) * lightingMode.glowIntensity
                }}
              />

              {/* Floor Shadow Reflection */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"
              />

              {/* Glowing Sign */}
              <div
                className="font-['Satisfy',cursive] font-bold text-center tracking-wider transition-all duration-300 relative z-10 select-none"
                style={{
                  fontSize: `${Math.round(44 * (signScale / 100))}px`,
                  color: '#ffffff',
                  textShadow: `0 0 4px #ffffff, 0 0 12px ${color}, 0 0 28px ${color}, 0 0 55px ${color}`
                }}
              >
                {text || 'DREAM IN NEON'}
              </div>

              {/* Active Room & Lighting Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 z-20">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px]">
                  Wall: <strong className="text-white">{selectedWall.name}</strong>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-amber-300">
                  {lightingMode.label}
                </div>
              </div>

            </div>

            {/* Ambient Lighting Mode Switcher (Day / Sunset / Midnight) */}
            <div className="p-3 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-2">
              <span className="text-xs text-[#86868b] font-medium hidden sm:inline">Ambient Time:</span>
              <div className="grid grid-cols-3 gap-1.5 flex-1">
                {LIGHTING_MODES.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => { playClickSound(); setLightingMode(mode); }}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        lightingMode.id === mode.id
                          ? 'bg-white text-slate-950 shadow-md'
                          : 'bg-[#18181b] text-[#86868b] hover:text-white border border-[#222225]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{mode.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-xs">
            
            {/* Text Input */}
            <div>
              <label className="font-semibold text-white block mb-1.5">Sign Text to Simulate:</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text..."
                className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#2997ff]"
              />
            </div>

            {/* Neon Color Palette */}
            <div>
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                Neon Color Spectrum:
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {colorPalette.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => { playClickSound(); setColor(c.hex); }}
                    className={`h-9 rounded-xl border flex items-center justify-center cursor-pointer transition-transform ${
                      color === c.hex
                        ? 'scale-110 border-white shadow-lg ring-2 ring-white/30'
                        : 'border-[#333] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  >
                    {color === c.hex && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Material Selector */}
            <div>
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                Select Wall Material:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {WALL_TEXTURES.map((wall) => (
                  <button
                    key={wall.id}
                    onClick={() => { playClickSound(); setSelectedWall(wall); }}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedWall.id === wall.id
                        ? 'bg-[#1f1f25] border-white text-white shadow-md'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-[11px] text-white">{wall.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimmer & Scale Sliders */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[#86868b]">Glow Dimmer:</span>
                <span className="font-mono text-white">{glowBrightness}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                value={glowBrightness}
                onChange={(e) => setGlowBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
            </div>

            {/* Buy Action */}
            <div className="pt-4 border-t border-[#222225] flex items-center justify-between">
              <div>
                <span className="text-[#86868b] text-[11px] block">Configured Price</span>
                <div className="text-xl font-bold text-white">
                  {formatPrice(5499, selectedCurrency)}
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
