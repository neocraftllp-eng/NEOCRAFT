import React, { useState } from 'react';
import { 
  X, 
  Maximize2, 
  Sparkles, 
  Eye, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  Ruler
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const SIZES = [
  {
    cm: 50,
    inches: 20,
    name: 'Compact (50 cm)',
    scaleWidth: '25%',
    viewingDistance: '3 to 6 Meters',
    idealFor: 'Study desk battlestations, bedside vanity, bookshelf nooks',
    characterLimit: 'Up to 6-8 Letters'
  },
  {
    cm: 80,
    inches: 32,
    name: 'Standard (80 cm)',
    scaleWidth: '40%',
    viewingDistance: '6 to 12 Meters',
    idealFor: 'Bedroom feature wall, cafe photo corner, creator studio backdrop',
    characterLimit: 'Up to 10-14 Letters'
  },
  {
    cm: 120,
    inches: 48,
    name: 'Grand Statement (120 cm)',
    scaleWidth: '60%',
    viewingDistance: '12 to 20 Meters',
    idealFor: '3-Seater sofa wall, King bed headboard, cocktail lounge bar',
    characterLimit: 'Up to 16-22 Letters'
  },
  {
    cm: 160,
    inches: 64,
    name: 'Architectural (160 cm)',
    scaleWidth: '80%',
    viewingDistance: '20 to 35 Meters',
    idealFor: 'Corporate reception lobbies, high-ceiling duplexes, nightclub stages',
    characterLimit: 'Multi-line logos & slogans'
  }
];

const ENVIRONMENTS = [
  { id: 'sofa', name: 'Above 3-Seater Living Room Sofa (7 ft Wide)', icon: '🛋️' },
  { id: 'bed', name: 'Above King Size Master Bed (6 ft Wide)', icon: '🛏️' },
  { id: 'desk', name: 'Above Workspace Battlestation (4 ft Wide)', icon: '🖥️' }
];

export default function AppleSizingVisualizerModal({
  isOpen,
  onClose,
  onSelectSize
}) {
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // 80cm default
  const [selectedEnv, setSelectedEnv] = useState(ENVIRONMENTS[0]);
  const [signText, setSignText] = useState('DREAM BIG');
  const [glowColor, setGlowColor] = useState('#00F0FF');

  if (!isOpen) return null;

  const handleApplySize = () => {
    playClickSound();
    if (onSelectSize) onSelectSize(selectedSize.cm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-5xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Sign Sizing, Human Scale & Optical Viewing Distance Visualizer
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
          
          {/* Left Column: Visual Scale Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* The Scaled Wall Room Stage */}
            <div className="h-72 sm:h-96 w-full rounded-3xl bg-[#0a0a0d] border border-[#262629] relative overflow-hidden flex flex-col items-center justify-center p-8">
              
              {/* Radial Wall Lighting */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${glowColor}30 0%, transparent 65%)`
                }}
              />

              {/* Glowing Sign Scaled */}
              <div 
                className="font-['Satisfy',cursive] font-bold text-center tracking-wide z-10 transition-all duration-300 px-4"
                style={{
                  width: selectedSize.scaleWidth,
                  fontSize: `clamp(1.5rem, ${selectedSize.cm * 0.05}vw, 3.8rem)`,
                  color: '#FFFFFF',
                  textShadow: `0 0 5px #FFFFFF, 0 0 15px ${glowColor}, 0 0 35px ${glowColor}`
                }}
              >
                {signText}
              </div>

              {/* Furniture Backdrop Base Silhouette */}
              <div className="absolute bottom-6 w-3/4 h-12 rounded-xl bg-[#1c1c22] border border-white/10 flex items-center justify-center text-xs text-[#86868b] z-10">
                <span className="flex items-center gap-1.5">
                  <span>{selectedEnv.icon}</span>
                  <span className="text-[11px]">{selectedEnv.name}</span>
                </span>
              </div>

              {/* Measurement Overlay HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-20">
                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[11px]">
                  Physical Width: <strong className="text-[#2997ff]">{selectedSize.cm} cm</strong> ({selectedSize.inches} Inches)
                </div>

                <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-emerald-400 font-mono text-[11px]">
                  Optical Range: {selectedSize.viewingDistance}
                </div>
              </div>

            </div>

            {/* Environment Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {ENVIRONMENTS.map((env) => (
                <button
                  key={env.id}
                  onClick={() => { playClickSound(); setSelectedEnv(env); }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer shrink-0 transition-colors ${
                    selectedEnv.id === env.id
                      ? 'bg-white text-black border-white'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  {env.name.split(' (')[0]}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Sizing Options & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              Choose Sign Length:
            </span>

            <div className="space-y-2">
              {SIZES.map((size) => (
                <button
                  key={size.cm}
                  onClick={() => { playClickSound(); setSelectedSize(size); }}
                  className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedSize.cm === size.cm
                      ? 'bg-[#1e1e24] border-[#2997ff] text-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-white text-xs">{size.name}</span>
                    <span className="font-mono text-[#2997ff] font-bold">{size.inches}" Inch</span>
                  </div>
                  <p className="text-[10px] text-[#86868b]">{size.idealFor}</p>
                </button>
              ))}
            </div>

            {/* Viewing Distance & Character Capacity Info Card */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#86868b]">Recommended Room Distance:</span>
                <span className="font-semibold text-white">{selectedSize.viewingDistance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">Optimal Character Density:</span>
                <span className="font-semibold text-[#2997ff]">{selectedSize.characterLimit}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleApplySize}
              className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Select {selectedSize.name} & Open Studio</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
