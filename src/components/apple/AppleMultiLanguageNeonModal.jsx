import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Eye, 
  Layers,
  Sliders
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const LANGUAGE_PRESETS = [
  {
    lang: 'Devanagari (Sanskrit / Hindi)',
    presets: [
      { text: 'ॐ नमः शिवाय', meaning: 'Lord Shiva Cosmic Devotion', tag: 'Spiritual' },
      { text: 'सत्यमेव जयते', meaning: 'Truth Alone Triumphs', tag: 'National' },
      { text: 'सुख समृद्धि', meaning: 'Peace & Prosperity', tag: 'Home Blessing' },
      { text: 'कर्म ही पूजा है', meaning: 'Work is Worship', tag: 'Office Studio' }
    ]
  },
  {
    lang: 'Arabic / Urdu Calligraphy',
    presets: [
      { text: 'ما شاء الله', meaning: 'God Has Willed It', tag: 'Blessing' },
      { text: 'صبر و شكر', meaning: 'Patience & Gratitude', tag: 'Spiritual' },
      { text: 'سلام', meaning: 'Peace & Harmony', tag: 'Minimal' },
      { text: 'كن فيكون', meaning: 'Be, and it is', tag: 'Calligraphy' }
    ]
  },
  {
    lang: 'Japanese Kanji (Cyberpunk)',
    presets: [
      { text: '東京 ネオン', meaning: 'Tokyo Neon Glow', tag: 'Cyberpunk' },
      { text: '愛 と 平和', meaning: 'Love and Peace', tag: 'Aesthetic' },
      { text: '夢', meaning: 'Dream (Yume)', tag: 'Minimal' },
      { text: '侍スピリット', meaning: 'Samurai Spirit', tag: 'Gaming' }
    ]
  },
  {
    lang: 'Gurmukhi (Punjabi)',
    presets: [
      { text: 'ੴ ਇਕ ਓਅੰਕਾਰ', meaning: 'One Universal Creator', tag: 'Divine' },
      { text: 'ਚੜ੍ਹਦੀ ਕਲਾ', meaning: 'High Spirits & Positivity', tag: 'Inspiration' },
      { text: 'ਸਰਬੱਤ ਦਾ ਭਲਾ', meaning: 'Goodwill for All', tag: 'Blessing' }
    ]
  }
];

export default function AppleMultiLanguageNeonModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);
  const [text, setText] = useState(LANGUAGE_PRESETS[0].presets[0].text);
  const [color, setColor] = useState('#FFD700');
  const [brightness, setBrightness] = useState(100);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const currentPrice = 5999;
  const originalPrice = 8499;

  const colors = [
    { label: 'Warm 2700K Gold', hex: '#FFD700' },
    { label: 'Tokyo Magenta', hex: '#FF1493' },
    { label: 'Cyber Cyan', hex: '#00F0FF' },
    { label: 'Electric Lime', hex: '#39FF14' },
    { label: 'Arctic White', hex: '#FFFFFF' }
  ];

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `multilang-${Date.now()}`,
      name: `Calligraphy Neon ("${text}")`,
      category: 'Multi-Language Calligraphy',
      price: currentPrice,
      originalPrice: originalPrice,
      quantity: 1,
      image: '🕉️',
      specs: {
        dimensions: '80 cm × 35 cm',
        color: color,
        language: LANGUAGE_PRESETS[selectedLangIndex].lang,
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
            <Globe className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Multi-Language & Regional Calligraphy Neon Studio
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
          
          {/* Left Column: Visual Calligraphy Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Stage */}
            <div className="h-72 sm:h-96 w-full rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden flex items-center justify-center p-8 transition-all duration-300">
              
              {/* Radial Ambient Glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${color}35 0%, transparent 65%)`,
                  opacity: brightness / 100
                }}
              />

              {/* Glowing Calligraphy Text */}
              <div
                className="font-bold text-center tracking-wide transition-all duration-300 z-10 select-none px-4"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  color: '#ffffff',
                  textShadow: `0 0 4px #ffffff, 0 0 12px ${color}, 0 0 28px ${color}, 0 0 60px ${color}`
                }}
              >
                {text || 'ॐ'}
              </div>

              {/* HUD Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 z-20">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px]">
                  Script: <strong className="text-white">{LANGUAGE_PRESETS[selectedLangIndex].lang.split(' ')[0]}</strong>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-amber-300">
                  Precision CNC Bent
                </div>
              </div>

            </div>

            {/* Custom Text Input & Color Bar */}
            <div className="p-3.5 rounded-2xl bg-[#121214] border border-[#222225] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type in any script / language..."
                className="w-full sm:w-60 px-3 py-2 bg-[#1a1a1d] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
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
                    title={c.label}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Language Tabs & 1-Click Cultural Presets (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            {/* Language Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGE_PRESETS.map((lp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playClickSound();
                    setSelectedLangIndex(idx);
                    setText(lp.presets[0].text);
                  }}
                  className={`p-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    selectedLangIndex === idx
                      ? 'bg-white text-slate-950 font-bold border-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  {lp.lang.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Presets List */}
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider block">
                Popular {LANGUAGE_PRESETS[selectedLangIndex].lang} Presets:
              </span>

              {LANGUAGE_PRESETS[selectedLangIndex].presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => { playClickSound(); setText(p.text); }}
                  className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    text === p.text
                      ? 'bg-[#1f1f25] border-white text-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{p.text}</span>
                    <span className="text-[9px] font-bold text-[#2997ff] uppercase bg-[#2997ff]/10 px-2 py-0.5 rounded-full border border-[#2997ff]/20">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#86868b]">{p.meaning}</p>
                </button>
              ))}
            </div>

            {/* Price & Buy Action */}
            <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
              <div>
                <span className="text-[#86868b] text-[10px] block">Price with Dimmer & Adapter</span>
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

    </div>
  );
}
