import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Move, 
  RotateCw, 
  Sun, 
  Camera, 
  Sparkles, 
  Download, 
  Check, 
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { NEON_COLORS } from '../../data/colors';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const SAMPLE_WALLS = [
  {
    id: 'sample-brick',
    name: 'Loft Brick Wall',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    category: 'Industrial'
  },
  {
    id: 'sample-bedroom',
    name: 'Luxury Bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    category: 'Home'
  },
  {
    id: 'sample-cafe',
    name: 'Coffee Bar Counter',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    category: 'Commercial'
  },
  {
    id: 'sample-battlestation',
    name: 'Battlestation Studio',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    category: 'Gaming'
  }
];

export const SAMPLE_SIGNS = [
  { id: 'sign-wings', name: 'Angel Wings', text: 'ARCHANGEL WINGS', icon: '🪽', color: '#00F0FF', font: "'Orbitron', sans-serif" },
  { id: 'sign-vibes', name: 'Good Vibes Only', text: 'Good Vibes Only', icon: '✨', color: '#FF1493', font: "'Satisfy', cursive" },
  { id: 'sign-better', name: 'Better Together', text: 'Better Together', icon: '💍', color: '#FFE4B5', font: "'Great Vibes', cursive" },
  { id: 'sign-cocktails', name: 'Cocktails & Dreams', text: 'Cocktails & Dreams', icon: '🍸', color: '#FF6B00', font: "'Yellowtail', cursive" },
  { id: 'sign-hustle', name: 'HUSTLE HARD', text: 'HUSTLE HARD', icon: '⚡', color: '#39FF14', font: "'Bebas Neue', sans-serif" },
];

export default function RoomVisualizerModal({
  isOpen,
  onClose,
  initialText = 'Good Vibes Only',
  initialColor = '#00F0FF',
  onAddToCart
}) {
  const [selectedWallUrl, setSelectedWallUrl] = useState(SAMPLE_WALLS[0].image);
  const [customWallUploaded, setCustomWallUploaded] = useState(false);
  const [signText, setSignText] = useState(initialText);
  const [activeColor, setActiveColor] = useState(initialColor);
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(50); // percentage
  const [posY, setPosY] = useState(45); // percentage
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [selectedPresetSign, setSelectedPresetSign] = useState(SAMPLE_SIGNS[1]);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Upload Custom Room Photo
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedWallUrl(uploadEvent.target?.result);
        setCustomWallUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset) => {
    playClickSound();
    setSelectedPresetSign(preset);
    setSignText(preset.text);
    setActiveColor(preset.color);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#090c14] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
                ROOM VISUALIZER & AR WALL TRY-ON
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40">
                  Live Simulator
                </span>
              </h3>
              <p className="text-xs text-slate-400">Upload your wall photo or pick a room to see exact sizing & glow casting</p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into Interactive Viewport & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT: AR INTERACTIVE ROOM VIEWPORT (8 cols) */}
          <div className="lg:col-span-8 bg-black relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden select-none">
            
            {/* Background Room Photo */}
            <img
              src={selectedWallUrl}
              alt="Room Wall"
              className="absolute inset-0 w-full h-full object-cover opacity-85 filter brightness-90"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Ambient Wall Light Bloom from Neon Sign */}
            <div
              className="absolute pointer-events-none rounded-full blur-[90px] transition-all duration-300"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: 'translate(-50%, -50%)',
                width: `${scale * 320}px`,
                height: `${scale * 240}px`,
                backgroundColor: activeColor,
                opacity: (brightness / 100) * 0.45
              }}
            />

            {/* Superimposed Glowing Neon Sign */}
            <div
              className="absolute z-20 cursor-move flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-[1px] shadow-2xl transition-transform"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                opacity: brightness / 100
              }}
            >
              <span
                className="text-2xl sm:text-4xl font-bold whitespace-nowrap text-center"
                style={{
                  fontFamily: selectedPresetSign?.font || "'Satisfy', cursive",
                  color: '#ffffff',
                  textShadow: `
                    0 0 3px #ffffff,
                    0 0 8px ${activeColor},
                    0 0 20px ${activeColor},
                    0 0 45px ${activeColor},
                    0 0 80px ${activeColor}
                  `
                }}
              >
                {signText || 'Dream In Neon'}
              </span>

              {/* Wire detail */}
              <div className="w-[1.5px] h-6 bg-slate-400/40 absolute -bottom-6 right-6" />
            </div>

            {/* Viewport Overlay Hints */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-cyan-400" />
              <span>Use sliders on right to position & scale</span>
            </div>

          </div>

          {/* RIGHT: CONTROLS & PHOTO SELECTOR (4 cols) */}
          <div className="lg:col-span-4 p-5 space-y-5 bg-[#0d101a] border-l border-slate-800 overflow-y-auto">
            
            {/* 1. Upload Custom Wall */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                1. Choose Wall / Room:
              </label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl border border-dashed border-cyan-500/60 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer mb-2.5"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo of Your Wall</span>
              </button>

              {/* Preset Sample Walls */}
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_WALLS.map((wall) => (
                  <button
                    key={wall.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedWallUrl(wall.image);
                      setCustomWallUploaded(false);
                    }}
                    className={`relative rounded-lg overflow-hidden border transition-all cursor-pointer h-14 ${
                      selectedWallUrl === wall.image && !customWallUploaded
                        ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={wall.image} alt={wall.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-[10px] font-bold text-white text-center">
                      {wall.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Sign to Test */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                2. Test Sign Text:
              </label>
              <input
                type="text"
                value={signText}
                onChange={(e) => setSignText(e.target.value)}
                placeholder="Enter neon text..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-medium focus:outline-none focus:border-cyan-500"
              />

              {/* Quick Preset Signs */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SAMPLE_SIGNS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectPreset(s)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                      selectedPresetSign?.id === s.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Swatches */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                3. Neon Glow Color:
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {NEON_COLORS.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { playClickSound(); setActiveColor(c.hex); }}
                    style={{ background: c.hex }}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      activeColor === c.hex
                        ? 'scale-125 ring-2 ring-white shadow-[0_0_10px_currentColor]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* 4. Fine-tuning sliders: Scale, Position, Brightness */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Sign Scale / Size</span>
                  <span className="font-bold text-white">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Vertical Wall Height</span>
                  <span className="font-bold text-white">{posY}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Horizontal Position</span>
                  <span className="font-bold text-white">{posX}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Glow Radiance Dimmer</span>
                  <span className="font-bold text-white">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                playChimeSound();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Perfect! Apply To Custom Studio</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
