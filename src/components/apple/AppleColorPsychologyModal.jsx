import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Sparkles, 
  Sun, 
  Moon, 
  Heart, 
  Zap, 
  CheckCircle2, 
  Brain,
  Eye
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const COLOR_PROFILES = [
  {
    hex: '#FFD700',
    name: '2700K Warm Champagne Gold',
    spectrum: '590 nm Wavelength',
    psychology: 'Triggers natural melatonin release and promotes deep biological relaxation, warmth, and hospitality.',
    rooms: 'Bedrooms, Dining Areas, Meditation Havens, Vastu South-East Agni Corner',
    vibe: 'Coziness, Luxury, Restful Sleep'
  },
  {
    hex: '#00F0FF',
    name: 'Cyber Cyan (470nm)',
    spectrum: '470 nm High-Energy Wavelength',
    psychology: 'Stimulates neural alertness, cognitive speed, and sustained mental focus without eye strain.',
    rooms: 'Gaming Battlestations, Tech Workspaces, Creative Creator Studios',
    vibe: 'High Focus, Futuristic, Dopamine Boost'
  },
  {
    hex: '#FF1493',
    name: 'Tokyo Neon Magenta (630nm)',
    spectrum: '630 nm Dynamic Wavelength',
    psychology: 'Elevates heart rate, stimulates social conversation, excitement, and creative self-expression.',
    rooms: 'Cocktail Bars, Nightclub VIP Booths, Fashion Boutiques, Glam Vanity Corners',
    vibe: 'Vibrancy, Passion, Nightlife High Energy'
  },
  {
    hex: '#39FF14',
    name: 'Electric Emerald Green (525nm)',
    spectrum: '525 nm Natural Harmonic Wavelength',
    psychology: 'Aligns with Heart Chakra frequency. Associated in Vastu Shastra with wealth expansion and tranquility.',
    rooms: 'Living Rooms, Financial Consultations, Spa Lounges, Vastu North Kubera Wall',
    vibe: 'Abundance, Vitality, Organic Balance'
  },
  {
    hex: '#FFFFFF',
    name: 'Arctic Pure White (6000K)',
    spectrum: 'Broad Spectrum CRI >90',
    psychology: 'Maximum optical clarity and color-rendering fidelity. Reflects museum-grade architectural minimalism.',
    rooms: 'Art Galleries, Luxury Retail Showrooms, Modern Minimalist Kitchens',
    vibe: 'Purity, Precision, High Contrast'
  }
];

export default function AppleColorPsychologyModal({
  isOpen,
  onClose
}) {
  const [selectedColor, setSelectedColor] = useState(COLOR_PROFILES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Color Psychology, Kelvin Spectrum & Circadian Lighting Guide
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
          
          {/* Left Column: Visual Color Sphere & Glow Stage (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="h-64 sm:h-80 w-full rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
              
              {/* Radial Light Glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedColor.hex}40 0%, transparent 70%)`
                }}
              />

              {/* Glowing Orb */}
              <div 
                className="w-20 h-20 rounded-full border-2 border-white/50 shadow-2xl transition-all duration-300 mb-4 z-10"
                style={{
                  backgroundColor: selectedColor.hex,
                  boxShadow: `0 0 30px ${selectedColor.hex}, 0 0 70px ${selectedColor.hex}`
                }}
              />

              <h4 className="font-bold text-white text-lg z-10">{selectedColor.name}</h4>
              <span className="text-xs text-[#86868b] font-mono z-10">{selectedColor.spectrum}</span>

              {/* Vibe Tag */}
              <div className="mt-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white z-10">
                {selectedColor.vibe}
              </div>

            </div>

            {/* Color Switcher Bar */}
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#121214] border border-[#222225]">
              {COLOR_PROFILES.map((cp) => (
                <button
                  key={cp.hex}
                  onClick={() => { playClickSound(); setSelectedColor(cp); }}
                  className={`w-9 h-9 rounded-xl border cursor-pointer transition-transform ${
                    selectedColor.hex === cp.hex
                      ? 'scale-110 border-white shadow-lg ring-2 ring-white/30'
                      : 'border-[#333] hover:scale-105'
                  }`}
                  style={{ backgroundColor: cp.hex }}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Psychological & Room Placement Matrix (6 cols) */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <span className="font-semibold text-[#2997ff] uppercase tracking-wider text-[10px] block">
                🧠 Neurological & Circadian Impact:
              </span>
              <p className="text-white leading-relaxed text-xs">{selectedColor.psychology}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <span className="font-semibold text-amber-300 uppercase tracking-wider text-[10px] block">
                🏡 Recommended Room Placements:
              </span>
              <p className="text-[#a1a1a6] leading-relaxed text-xs">{selectedColor.rooms}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px] block">
                ✨ NEOCRAFT Optical Standard:
              </span>
              <div className="space-y-1 text-[#86868b] text-[11px]">
                <div>• Pure food-grade Japanese silicone flex tubing</div>
                <div>• Zero UV emission & zero toxic gas discharge</div>
                <div>• Solid-state flicker-free high frequency &gt;20,000 Hz</div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
