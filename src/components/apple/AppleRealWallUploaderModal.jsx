import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Sliders, 
  RotateCw, 
  Download, 
  ShoppingBag, 
  Check, 
  Sun, 
  Moon, 
  Camera,
  Layers,
  Move
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleRealWallUploaderModal({
  isOpen,
  onClose,
  onAddToCart,
  initialText = 'DREAM BIG',
  initialColor = '#00F0FF',
  selectedCurrency = 'INR'
}) {
  const [wallImage, setWallImage] = useState(null);
  const [signText, setSignText] = useState(initialText);
  const [glowColor, setGlowColor] = useState(initialColor);
  const [signScale, setSignScale] = useState(70);
  const [glowIntensity, setGlowIntensity] = useState(85);
  const [ambientLight, setAmbientLight] = useState('dark'); // 'dark' | 'dim' | 'bright'
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(45);
  const [isAdded, setIsAdded] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      playChimeSound();
      const reader = new FileReader();
      reader.onload = (event) => {
        setWallImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrder = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `realwall-neon-${Date.now()}`,
      name: `Custom Neon ("${signText}") [Wall Verified]`,
      category: 'AR Wall Visualized Neon',
      price: 6999,
      originalPrice: 9499,
      quantity: 1,
      image: '✨',
      specs: {
        dimensions: '80 cm × 45 cm',
        primaryColor: glowColor,
        wallVerified: 'Yes',
        acrylic: '6mm Cast Acrylic (Cut-to-Shape)'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-5xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
              <span>Upload Real Wall Photo • Instant AR Visualizer</span>
              <span className="px-2 py-0.5 rounded-full bg-[#2997ff]/20 text-[#2997ff] text-[10px] font-bold">
                PRO 3D
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
          
          {/* Left Column: Interactive Wall Visualizer Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className={`h-80 sm:h-[420px] w-full rounded-3xl border border-[#262629] relative overflow-hidden flex items-center justify-center ${
              !wallImage ? 'bg-[#090a0d]' : ''
            }`}>
              
              {/* If user uploaded real wall photo */}
              {wallImage ? (
                <img
                  src={wallImage}
                  alt="Uploaded Real Wall"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                /* Default Luxury Interior Wall Backdrop */
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80')`
                  }}
                />
              )}

              {/* Ambient Light Dimming Filter */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  backgroundColor: ambientLight === 'dark' ? 'rgba(0, 0, 0, 0.75)' : ambientLight === 'dim' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.15)'
                }}
              />

              {/* Dynamic Wall Glow Reflection */}
              <div 
                className="absolute pointer-events-none transition-all duration-300"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${signScale * 3.5}px`,
                  height: `${signScale * 2.2}px`,
                  background: `radial-gradient(circle at center, ${glowColor}50 0%, transparent 70%)`,
                  opacity: glowIntensity / 100
                }}
              />

              {/* Glowing Sign Overlaid on Wall */}
              <div
                className="absolute font-['Satisfy',cursive] font-bold text-center tracking-wide z-10 transition-all duration-200 cursor-move select-none"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: `clamp(1.2rem, ${signScale * 0.05}rem, 4.5rem)`,
                  color: '#FFFFFF',
                  textShadow: `0 0 5px #FFFFFF, 0 0 15px ${glowColor}, 0 0 35px ${glowColor}, 0 0 65px ${glowColor}`,
                  filter: `drop-shadow(0 0 20px ${glowColor})`
                }}
              >
                {signText}
              </div>

              {/* Bottom Stage Overlay Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white/20 cursor-pointer flex items-center gap-1.5 shadow-lg"
                >
                  <Upload className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>{wallImage ? 'Change Wall Photo' : 'Upload Your Room Photo'}</span>
                </button>

                <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/20 p-1 rounded-xl">
                  <button
                    onClick={() => { playClickSound(); setAmbientLight('bright'); }}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer ${ambientLight === 'bright' ? 'bg-white text-black' : 'text-[#86868b]'}`}
                    title="Daylight Mode"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { playClickSound(); setAmbientLight('dim'); }}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer ${ambientLight === 'dim' ? 'bg-white text-black' : 'text-[#86868b]'}`}
                    title="Evening Cozy Mode"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { playClickSound(); setAmbientLight('dark'); }}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer ${ambientLight === 'dark' ? 'bg-white text-black' : 'text-[#86868b]'}`}
                    title="Night Mode"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Customization Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            {/* Custom Sign Text Input */}
            <div className="space-y-1.5">
              <label className="font-semibold text-white block">
                Sign Text:
              </label>
              <input
                type="text"
                value={signText}
                onChange={(e) => setSignText(e.target.value)}
                placeholder="Type your custom text..."
                className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
              />
            </div>

            {/* Neon Glow Color Palette */}
            <div className="space-y-1.5">
              <label className="font-semibold text-white block">
                Silicone Neon Color:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { name: 'Cyber Cyan', hex: '#00F0FF' },
                  { name: 'Tokyo Pink', hex: '#FF1493' },
                  { name: 'Warm Gold', hex: '#FFD700' },
                  { name: 'Emerald', hex: '#39FF14' },
                  { name: 'Arctic White', hex: '#FFFFFF' },
                  { name: 'Purple', hex: '#9933FF' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => { playClickSound(); setGlowColor(c.hex); }}
                    className={`w-7 h-7 rounded-full border cursor-pointer transition-transform ${
                      glowColor === c.hex ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Position & Scale Sliders */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[#86868b]">
                  <span>Sign Scale / Size:</span>
                  <span className="font-mono text-white">{signScale}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={signScale}
                  onChange={(e) => setSignScale(Number(e.target.value))}
                  className="w-full accent-[#2997ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[#86868b]">
                    <span>Horizontal (X):</span>
                    <span className="font-mono text-white">{posX}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full accent-[#2997ff]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[#86868b]">
                    <span>Vertical (Y):</span>
                    <span className="font-mono text-white">{posY}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="75"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full accent-[#2997ff]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleOrder}
                className={`apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added Wall-Verified Sign to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order This Sign ({formatPrice(6999, selectedCurrency)})</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-[#86868b]">
                Includes 6mm laser-cut cast acrylic backplate & power supply kit.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
