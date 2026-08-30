import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Wand2, 
  RefreshCw, 
  ShoppingBag, 
  Check, 
  Layers, 
  Download, 
  Sliders,
  Send,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const AI_PROMPT_PRESETS = [
  {
    id: 'cyber-samurai',
    title: 'Cyberpunk Samurai Oni Mask',
    prompt: 'Futuristic neon oni mask with sharp horns and cyber blade accents',
    color: '#00F0FF',
    accentColor: '#FF1493',
    svgType: 'mask',
    price: 8499
  },
  {
    id: 'coffee-steam',
    title: 'Artisan Espresso & Steam',
    prompt: 'Minimalist continuous line espresso cup with glowing aromatic steam swirls',
    color: '#FFD700',
    accentColor: '#FFFFFF',
    svgType: 'coffee',
    price: 5499
  },
  {
    id: 'astro-cat',
    title: 'Cosmic Astro-Cat with Boba',
    prompt: 'Cute spaceman cat helmet floating with constellation stars and boba tea',
    color: '#FF1493',
    accentColor: '#00F0FF',
    svgType: 'astro',
    price: 7999
  },
  {
    id: 'wings-crest',
    title: 'Imperial Royal Falcon Crest',
    prompt: 'Symmetrical geometric eagle wings spreading over a 24K gold crown',
    color: '#FFD700',
    accentColor: '#39FF14',
    svgType: 'crest',
    price: 9999
  }
];

export default function AppleAINeonGeneratorModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [promptText, setPromptText] = useState('Cyberpunk Samurai Oni Mask with glowing katana horns');
  const [selectedPreset, setSelectedPreset] = useState(AI_PROMPT_PRESETS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeColor, setActiveColor] = useState('#00F0FF');
  const [accentColor, setAccentColor] = useState('#FF1493');
  const [glowIntensity, setGlowIntensity] = useState(85);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;

    playClickSound();
    setIsGenerating(true);

    setTimeout(() => {
      playChimeSound();
      setIsGenerating(false);
      
      // Select preset or match prompt keywords
      const lower = promptText.toLowerCase();
      if (lower.includes('coffee') || lower.includes('cup') || lower.includes('cafe')) {
        setSelectedPreset(AI_PROMPT_PRESETS[1]);
        setActiveColor('#FFD700');
        setAccentColor('#FFFFFF');
      } else if (lower.includes('cat') || lower.includes('space') || lower.includes('astro')) {
        setSelectedPreset(AI_PROMPT_PRESETS[2]);
        setActiveColor('#FF1493');
        setAccentColor('#00F0FF');
      } else if (lower.includes('crown') || lower.includes('crest') || lower.includes('eagle') || lower.includes('royal')) {
        setSelectedPreset(AI_PROMPT_PRESETS[3]);
        setActiveColor('#FFD700');
        setAccentColor('#39FF14');
      } else {
        setSelectedPreset(AI_PROMPT_PRESETS[0]);
        setActiveColor('#00F0FF');
        setAccentColor('#FF1493');
      }

      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ff1493', '#ffd700']
      });
    }, 1400);
  };

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `ai-neon-${Date.now()}`,
      name: `AI Custom Neon Design ("${selectedPreset.title}")`,
      category: 'AI Generated Neon Art',
      price: selectedPreset.price,
      originalPrice: selectedPreset.price + 3500,
      quantity: 1,
      image: '✨',
      specs: {
        dimensions: '80 cm × 65 cm',
        primaryColor: activeColor,
        accentColor: accentColor,
        aiPrompt: promptText,
        acrylic: '6mm Cut-to-Shape Cast Acrylic'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  const handleWhatsAppProof = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft CAD Team! ✨\n\n` +
      `I generated an AI Neon Design on the Studio App:\n` +
      `• Prompt: ${promptText}\n` +
      `• Style: ${selectedPreset.title}\n` +
      `• Primary Color: ${activeColor}\n` +
      `• Estimated Price: ₹${selectedPreset.price.toLocaleString('en-IN')}\n\n` +
      `Please create the final vector CAD proof and fabrication mockup!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-5xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
              <span>AI Neon Art & Vector Concept Generator</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                BETA 2026
              </span>
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: 2 Columns */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AI Render Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* The Neon Stage */}
            <div className="h-72 sm:h-96 w-full rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden flex items-center justify-center p-8">
              
              {/* Dynamic Glow Diffusion */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${activeColor}35 0%, transparent 65%)`,
                  opacity: glowIntensity / 100
                }}
              />

              {/* AI Vector Wireframe Render */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-3 border-cyan-400 border-t-transparent animate-spin" />
                    <span className="text-xs font-mono text-cyan-300">Translating Prompt into CNC Vector Wireframe...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {/* SVG Vector Wireframe */}
                    <svg
                      viewBox="0 0 200 200"
                      className="w-48 h-48 sm:w-60 sm:h-60 transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 10px ${activeColor}) drop-shadow(0 0 25px ${activeColor})`
                      }}
                    >
                      {selectedPreset.svgType === 'mask' && (
                        <g fill="none" stroke={activeColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M100 20 L140 60 L130 110 L100 160 L70 110 L60 60 Z" />
                          <path d="M75 75 L90 85 M125 75 L110 85" stroke={accentColor} strokeWidth="4" />
                          <path d="M80 120 Q100 140 120 120" stroke={accentColor} strokeWidth="3" />
                          <path d="M60 40 L40 15 M140 40 L160 15" stroke="#FFFFFF" strokeWidth="4" />
                          <circle cx="100" cy="50" r="8" fill={accentColor} />
                        </g>
                      )}

                      {selectedPreset.svgType === 'coffee' && (
                        <g fill="none" stroke={activeColor} strokeWidth="3.5" strokeLinecap="round">
                          <path d="M50 80 L150 80 L140 145 Q100 170 60 145 Z" />
                          <path d="M150 90 Q180 90 175 120 Q170 140 140 135" strokeWidth="3" />
                          <path d="M40 170 L160 170" strokeWidth="4" />
                          <path d="M80 60 Q85 30 75 15" stroke={accentColor} strokeWidth="3" />
                          <path d="M100 65 Q105 35 95 10" stroke={accentColor} strokeWidth="3" />
                          <path d="M120 60 Q125 30 115 15" stroke={accentColor} strokeWidth="3" />
                        </g>
                      )}

                      {selectedPreset.svgType === 'astro' && (
                        <g fill="none" stroke={activeColor} strokeWidth="3.5" strokeLinecap="round">
                          <circle cx="100" cy="100" r="50" />
                          <path d="M70 60 L60 30 L90 52" stroke={accentColor} strokeWidth="3" />
                          <path d="M130 60 L140 30 L110 52" stroke={accentColor} strokeWidth="3" />
                          <ellipse cx="100" cy="100" rx="35" ry="25" fill="#000" stroke={accentColor} strokeWidth="2.5" />
                          <circle cx="85" cy="95" r="4" fill="#FFF" />
                          <circle cx="115" cy="95" r="4" fill="#FFF" />
                          <path d="M95 110 Q100 115 105 110" stroke="#FFF" strokeWidth="2" />
                        </g>
                      )}

                      {selectedPreset.svgType === 'crest' && (
                        <g fill="none" stroke={activeColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M100 50 L100 160" strokeWidth="4" />
                          <path d="M100 60 Q40 50 20 100 Q60 110 100 140" stroke={accentColor} strokeWidth="3" />
                          <path d="M100 60 Q160 50 180 100 Q140 110 100 140" stroke={accentColor} strokeWidth="3" />
                          <path d="M80 35 L90 20 L100 30 L110 20 L120 35 Z" fill={activeColor} stroke="#FFF" strokeWidth="2" />
                        </g>
                      )}
                    </svg>

                    <span className="font-semibold text-white text-xs mt-2">{selectedPreset.title}</span>
                  </div>
                )}
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#86868b] z-20">
                <span className="text-[10px] font-mono text-cyan-300">
                  AI Vector Wireframe • 100% Laser CNC Ready
                </span>
                <span className="text-[10px] text-white bg-black/70 px-2 py-0.5 rounded-md border border-white/10">
                  80cm × 65cm
                </span>
              </div>

            </div>

            {/* Glow & Color Adjusters */}
            <div className="p-3.5 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#86868b]">Primary Glow:</span>
                {['#00F0FF', '#FF1493', '#FFD700', '#39FF14', '#FFFFFF'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { playClickSound(); setActiveColor(c); }}
                    className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                      activeColor === c ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#86868b]">Accent:</span>
                {['#FF1493', '#00F0FF', '#FFD700', '#FFFFFF'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { playClickSound(); setAccentColor(c); }}
                    className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                      accentColor === c ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Prompt Input & Quick Ideas (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            {/* Prompt Input Form */}
            <form onSubmit={handleGenerate} className="space-y-2">
              <label className="font-semibold text-white block">
                Describe Any Artwork or Symbol:
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. Minimalist mountain sunset with pine trees and glowing lake waves..."
                  className="w-full p-3 bg-[#121214] border border-[#2d2d30] rounded-2xl text-white text-xs focus:outline-none focus:border-cyan-400 resize-none pr-10"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="absolute right-2.5 bottom-3.5 p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer transition-colors"
                >
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Inspiration Pills */}
            <div className="space-y-2">
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block text-[10px]">
                Quick Inspiration Concepts:
              </span>
              <div className="space-y-2">
                {AI_PROMPT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      playClickSound();
                      setPromptText(preset.prompt);
                      setSelectedPreset(preset);
                      setActiveColor(preset.color);
                      setAccentColor(preset.accentColor);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedPreset.id === preset.id
                        ? 'bg-[#1e1e24] border-cyan-400 text-white shadow-sm'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-white text-xs">{preset.title}</span>
                      <span className="font-mono text-cyan-300 font-bold">{formatPrice(preset.price, selectedCurrency)}</span>
                    </div>
                    <p className="text-[10px] text-[#86868b] truncate">{preset.prompt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleBuy}
                className={`apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added Concept to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Custom Build ({formatPrice(selectedPreset.price, selectedCurrency)})</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppProof}
                className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Send Prompt to Engineer on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
