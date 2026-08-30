import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Move, Check, Sparkles } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const PRESET_ROOMS = [
  {
    id: 'room-brick',
    name: 'Industrial Brick',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-bedroom',
    name: 'Modern Bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-cafe',
    name: 'Coffee Bar',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'room-studio',
    name: 'Creator Studio',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function AppleARQuickLookModal({
  isOpen,
  onClose,
  initialText = 'Dream In Neon',
  initialColor = '#00F0FF',
  onAddToCart
}) {
  const [selectedWallUrl, setSelectedWallUrl] = useState(PRESET_ROOMS[0].image);
  const [customWallUploaded, setCustomWallUploaded] = useState(false);
  const [signText, setSignText] = useState(initialText);
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(45);
  const [brightness, setBrightness] = useState(100);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      const reader = new FileReader();
      reader.onload = (uploadEv) => {
        setSelectedWallUrl(uploadEv.target?.result);
        setCustomWallUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm text-white tracking-tight">
              AR Quick Look • View in your space
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewport & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Main Stage */}
          <div className="lg:col-span-8 bg-black relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
            <img
              src={selectedWallUrl}
              alt="Room Backdrop"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

            {/* Ambient Room Glow */}
            <div
              className="absolute pointer-events-none rounded-full blur-[80px] transition-all duration-300"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: 'translate(-50%, -50%)',
                width: `${scale * 300}px`,
                height: `${scale * 200}px`,
                backgroundColor: initialColor,
                opacity: (brightness / 100) * 0.4
              }}
            />

            {/* Neon Sign Superimposed */}
            <div
              className="absolute z-10 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-[1px] shadow-2xl transition-transform cursor-move"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: brightness / 100
              }}
            >
              <span
                className="text-2xl sm:text-4xl font-bold whitespace-nowrap text-center font-['Satisfy',cursive]"
                style={{
                  color: '#ffffff',
                  textShadow: `0 0 3px #ffffff, 0 0 8px ${initialColor}, 0 0 20px ${initialColor}, 0 0 45px ${initialColor}`
                }}
              >
                {signText || 'Dream In Neon'}
              </span>
            </div>

            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#86868b] border border-white/10">
              Drag & use sliders to position sign on wall
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-4 p-5 space-y-4 bg-[#141416] border-l border-[#2d2d30] text-xs">
            
            {/* Upload Button */}
            <div>
              <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                1. Photo of Your Wall:
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#2997ff]/50 bg-[#2997ff]/10 hover:bg-[#2997ff]/20 text-[#2997ff] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mb-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Room Photo</span>
              </button>

              {/* Presets */}
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_ROOMS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedWallUrl(r.image);
                      setCustomWallUploaded(false);
                    }}
                    className={`h-12 rounded-lg overflow-hidden border relative transition-all cursor-pointer ${
                      selectedWallUrl === r.image && !customWallUploaded
                        ? 'border-[#2997ff] ring-1 ring-[#2997ff]'
                        : 'border-[#2d2d30] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-semibold text-white">
                      {r.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 pt-2 border-t border-[#222225]">
              <div>
                <div className="flex justify-between text-[#86868b] mb-1">
                  <span>Scale / Size</span>
                  <span className="font-semibold text-white">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-1 bg-[#2d2d30] rounded appearance-none cursor-pointer accent-[#2997ff]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#86868b] mb-1">
                  <span>Wall Height</span>
                  <span className="font-semibold text-white">{posY}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full h-1 bg-[#2d2d30] rounded appearance-none cursor-pointer accent-[#2997ff]"
                />
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playChimeSound();
                  onClose();
                }}
                className="w-full apple-btn-primary py-2.5 text-xs font-semibold cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                <span>Looks Great</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
