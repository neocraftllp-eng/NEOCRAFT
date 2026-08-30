import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Sliders, 
  Zap, 
  Layers, 
  ShoppingBag, 
  Check, 
  Activity,
  Maximize2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const PIXEL_PATTERNS = [
  {
    id: 'rainbow-flow',
    name: 'Rainbow Wave Flow',
    desc: 'Full spectrum 16.8M color flowing gradient chasing along the curves of your sign.',
    bgGradient: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
    badge: 'Signature FX'
  },
  {
    id: 'cyber-pulse',
    name: 'Cyberpunk Dual Split',
    desc: 'Tokyo Neon Magenta and Cyber Cyan racing back and forth in sync with sound beats.',
    bgGradient: 'linear-gradient(90deg, #00f0ff, #ff1493, #00f0ff)',
    badge: 'Popular'
  },
  {
    id: 'aurora-borealis',
    name: 'Nordic Aurora Dream',
    desc: 'Smooth breathing transition between deep emerald green, glacier cyan, and violet.',
    bgGradient: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)',
    badge: 'Relaxing'
  },
  {
    id: 'gold-starlight',
    name: '24K Golden Shimmer',
    desc: 'Warm 2700K champagne gold with dynamic twinkling starlight ripple.',
    bgGradient: 'linear-gradient(90deg, #ffd700, #ffffff, #ffd700)',
    badge: 'Luxury'
  }
];

export default function ApplePixelChasingStudio({
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedPattern, setSelectedPattern] = useState(PIXEL_PATTERNS[0]);
  const [signText, setSignText] = useState('DREAMCOLOR PRO');
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  // Animation Offset
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 2) % 200);
    }, 1000 / (animationSpeed * 6));
    return () => clearInterval(interval);
  }, [isPlaying, animationSpeed]);

  const currentPrice = 7999;
  const originalPrice = 11999;

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `dreamcolor-${Date.now()}`,
      name: `RGB DreamColor Pixel Neon ("${signText}")`,
      category: 'RGB Pixel Chasing Edition',
      price: currentPrice,
      originalPrice: originalPrice,
      quantity: 1,
      image: '🌈',
      specs: {
        dimensions: '90 cm × 40 cm',
        pattern: selectedPattern.name,
        icChip: 'WS2812B Addressable IC',
        dimmer: 'Smartphone App + RF Remote Included'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <section id="pixel-studio-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-amber-500/20 border border-white/20 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> ADDRESSABLE RGB DREAMCOLOR IC EDITION
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Chasing light with individual pixel control.
          </h2>
          <p className="text-sm text-[#86868b]">
            Beyond solid static neon. Each centimeter contains an individually addressable micro-IC chip capable of flowing rainbow waves, meteor pulses, and music-synchronized acoustics.
          </p>
        </div>

        {/* 2-Column Split: Stage on Left, Pattern Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Rainbow Animation Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden p-8">
            
            {/* Dynamic Multi-Color Ambient Diffusion */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-40 blur-3xl"
              style={{
                background: selectedPattern.bgGradient,
                transform: `translateX(${offset - 100}%)`,
                transition: 'transform 0.1s linear'
              }}
            />

            {/* Glowing Pixel Animated Text */}
            <div
              className="font-['Satisfy',cursive] font-bold text-center tracking-wider z-10 select-none transition-all"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                background: selectedPattern.bgGradient,
                backgroundSize: '200% auto',
                backgroundPosition: `${offset}% center`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.8)) drop-shadow(0 0 35px rgba(0,240,255,0.6))'
              }}
            >
              {signText}
            </div>

            {/* Top Text Input Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <input
                type="text"
                value={signText}
                onChange={(e) => setSignText(e.target.value.toUpperCase())}
                placeholder="TYPE SIGN TEXT..."
                className="bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-white font-mono focus:outline-none focus:border-cyan-400 w-48 sm:w-64"
              />

              <button
                onClick={() => { playClickSound(); setIsPlaying(!isPlaying); }}
                className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-1.5 hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? 'Pause FX' : 'Play FX'}</span>
              </button>
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#86868b] z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white font-mono text-[11px]">
                  FX: {selectedPattern.name.toUpperCase()} • {animationSpeed}x SPEED
                </span>
              </div>

              <span className="text-[10px] text-amber-300 font-mono">
                App + Bluetooth + RF Remote
              </span>
            </div>

          </div>

          {/* Right Column: Pattern Switcher & Speed Slider (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              Select Addressable IC Animation:
            </span>

            <div className="space-y-2">
              {PIXEL_PATTERNS.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => { playClickSound(); setSelectedPattern(pat); }}
                  className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedPattern.id === pat.id
                      ? 'bg-[#1a1a20] border-white text-white shadow-lg'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3.5 h-3.5 rounded-full" 
                        style={{ background: pat.bgGradient }} 
                      />
                      <span className="font-semibold text-white text-xs">{pat.name}</span>
                    </div>
                    <span className="text-[9px] font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {pat.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#86868b] leading-relaxed">{pat.desc}</p>
                </button>
              ))}
            </div>

            {/* Animation Speed Slider */}
            <div className="p-3 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868b] font-medium flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> Animation Flow Speed:
                </span>
                <span className="font-mono text-white font-bold">{animationSpeed}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Price & Buy Action */}
            <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
              <div>
                <span className="text-[#86868b] text-[10px] block">Complete RGB Kit Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(currentPrice, selectedCurrency)}
                  </span>
                  <span className="text-xs text-[#86868b] line-through font-mono">
                    {formatPrice(originalPrice, selectedCurrency)}
                  </span>
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
    </section>
  );
}
