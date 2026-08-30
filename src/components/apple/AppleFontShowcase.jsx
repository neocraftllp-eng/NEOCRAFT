import React, { useState } from 'react';
import { Type, Sparkles, ArrowRight, Palette, Copy, Check } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const SIGNATURE_FONTS = [
  { id: 'font-satisfy', name: 'Satisfy Script', family: "'Satisfy', cursive", vibe: 'Cursive Elegance & Warm Glow', category: 'Signature' },
  { id: 'font-sacramento', name: 'Sacramento', family: "'Sacramento', cursive", vibe: 'Delicate Wedding & Romance', category: 'Romantic' },
  { id: 'font-greatvibes', name: 'Great Vibes', family: "'Great Vibes', cursive", vibe: 'Royal Calligraphy & Penthouse', category: 'Luxury' },
  { id: 'font-orbitron', name: 'Orbitron Cyber', family: "'Orbitron', sans-serif", vibe: 'Futuristic Sci-Fi & Battlestations', category: 'Cyberpunk' },
  { id: 'font-cinzel', name: 'Cinzel Roman', family: "'Cinzel', serif", vibe: 'Architectural Stone & Corporate', category: 'Serif' },
  { id: 'font-bungee', name: 'Bungee Marquee', family: "'Bungee', cursive", vibe: 'Bold Industrial & Nightclub Strobe', category: 'Display' },
  { id: 'font-monoton', name: 'Monoton Triple Tube', family: "'Monoton', cursive", vibe: 'Retro 80s Disco Multi-Line', category: 'Retro' },
  { id: 'font-pacifico', name: 'Pacifico Wave', family: "'Pacifico', cursive", vibe: 'Cafe & Coastal Sunset Chill', category: 'Casual' },
  { id: 'font-righteous', name: 'Righteous Modern', family: "'Righteous', cursive", vibe: 'Minimalist Clean Geometric', category: 'Modern' },
  { id: 'font-permanent', name: 'Permanent Marker', family: "'Permanent Marker', cursive", vibe: 'Raw Graffiti & Creator Studio', category: 'Street' },
  { id: 'font-caveat', name: 'Caveat Hand', family: "'Caveat', cursive", vibe: 'Playful Handcrafted Signature', category: 'Handwritten' },
  { id: 'font-marcellus', name: 'Marcellus Haute', family: "'Marcellus', serif", vibe: 'Luxury Boutique & Fine Jewelry', category: 'Luxury' }
];

export default function AppleFontShowcase({
  onSelectFontToStudio
}) {
  const [inputText, setInputText] = useState('Dream In Neon');
  const [selectedColor, setSelectedColor] = useState('#00F0FF');
  const [copiedFont, setCopiedFont] = useState(null);

  const colors = [
    { label: 'Cyber Cyan', hex: '#00F0FF' },
    { label: 'Tokyo Magenta', hex: '#FF1493' },
    { label: 'Electric Lime', hex: '#39FF14' },
    { label: 'Warm 2700K Gold', hex: '#FFD700' },
    { label: 'Pure Arctic White', hex: '#FFFFFF' }
  ];

  const handleLaunchFont = (font) => {
    playChimeSound();
    setCopiedFont(font.name);
    setTimeout(() => setCopiedFont(null), 2000);
    if (onSelectFontToStudio) {
      onSelectFontToStudio(inputText, font.family);
    }
  };

  return (
    <section id="fonts-section" className="py-20 md:py-28 bg-[#0a0a0c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1180px] mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold">
              <Type className="w-3.5 h-3.5" /> SIGNATURE TYPOGRAPHY LAB
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
              Compare 12 bespoke fonts.
            </h2>
            <p className="text-sm text-[#86868b] max-w-xl">
              Type your custom text once and see it rendered across all signature neon typography families with real-time glow.
            </p>
          </div>

          {/* Live Text Input */}
          <div className="w-full sm:w-80">
            <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">
              Type Preview Text:
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your name / brand..."
              className="w-full px-4 py-2.5 bg-[#161617] border border-[#2d2d30] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-[#2997ff]"
            />
          </div>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#222225] overflow-x-auto no-scrollbar">
          <span className="text-xs text-[#86868b] font-medium shrink-0">Switch Color Glow:</span>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => { playClickSound(); setSelectedColor(c.hex); }}
                className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 cursor-pointer transition-all ${
                  selectedColor === c.hex
                    ? 'bg-white text-slate-950 border-white font-bold shadow-md'
                    : 'bg-[#141416] border-[#262629] text-[#86868b] hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                <span>{c.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_FONTS.map((font) => (
            <div
              key={font.id}
              className="apple-card p-6 border border-[#262629] flex flex-col justify-between overflow-hidden relative group hover:border-[#2997ff]/40 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider bg-[#161618] px-2.5 py-0.5 rounded-full border border-white/10">
                  {font.category}
                </span>
                <span className="text-xs font-semibold text-white">{font.name}</span>
              </div>

              {/* Glowing Font Stage */}
              <div className="h-32 w-full rounded-2xl bg-[#09090c] border border-[#222225] flex items-center justify-center p-4 overflow-hidden relative mb-4">
                <div 
                  className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${selectedColor}20 0%, transparent 70%)`
                  }}
                />

                <span
                  className="text-2xl sm:text-3xl text-center leading-tight transition-all duration-300 z-10 break-words max-w-full"
                  style={{
                    fontFamily: font.family,
                    color: '#ffffff',
                    textShadow: `0 0 4px #ffffff, 0 0 10px ${selectedColor}, 0 0 24px ${selectedColor}`
                  }}
                >
                  {inputText || 'Dream In Neon'}
                </span>
              </div>

              {/* Vibe Description & Launch */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#86868b] truncate max-w-[170px]">{font.vibe}</span>

                <button
                  onClick={() => handleLaunchFont(font)}
                  className="text-[#2997ff] hover:text-white flex items-center gap-1 font-semibold cursor-pointer group-hover:underline"
                >
                  <span>Use Font</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
