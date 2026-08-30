import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  Smartphone, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Sliders,
  Cpu
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const ECOSYSTEMS = [
  {
    id: 'apple',
    name: 'Apple Home & Siri',
    icon: '🍎',
    voicePrompt: '“Hey Siri, set Cyberpunk Studio to Neon Cyan”',
    desc: 'Native Apple Home app integration with Siri Shortcuts and geofence automation.'
  },
  {
    id: 'alexa',
    name: 'Amazon Alexa',
    icon: '🔵',
    voicePrompt: '“Alexa, turn on Living Room Neon”',
    desc: 'Control brightness, create sunrise routines, and group with your smart bulbs.'
  },
  {
    id: 'google',
    name: 'Google Assistant',
    icon: '🔴',
    voicePrompt: '“Hey Google, dim Studio Neon to 25%”',
    desc: 'Seamless voice command on Google Nest speakers and Android smart displays.'
  },
  {
    id: 'tuya',
    name: 'Smart Life & Tuya',
    icon: '⚡',
    voicePrompt: 'Automated Sunset On & Midnight Sleep Timer',
    desc: 'App-controlled schedules, dynamic music equalizer modes, and multi-device grouping.'
  }
];

export default function AppleSmartHomeModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedEco, setSelectedEco] = useState(ECOSYSTEMS[0]);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const smartPlugPrice = 1499;

  const handleAddSmartKit = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const item = {
      id: `smart-kit-${Date.now()}`,
      name: `NEOCRAFT Wi-Fi Smart Home Kit (${selectedEco.name})`,
      category: 'Smart Home Automation',
      price: smartPlugPrice,
      originalPrice: 2499,
      quantity: 1,
      image: '📱',
      specs: {
        compatibility: 'Apple Home, Alexa, Google Home',
        wireless: '2.4GHz Wi-Fi + Bluetooth Mesh',
        powerRating: '16A Heavy Duty Solid State'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Smart Home Automation & Ecosystem Pairing (Apple Home, Alexa, Google)
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
          
          {/* Left Column: Virtual Smart Phone Control HUD (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Phone Screen Mockup */}
            <div className="rounded-3xl bg-[#09090c] border border-[#262629] p-6 space-y-5 relative overflow-hidden">
              
              {/* Dynamic Glow */}
              <div 
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top, rgba(41,151,255,0.2) 0%, transparent 70%)',
                  opacity: isPowerOn ? brightness / 100 : 0
                }}
              />

              {/* Status Header */}
              <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedEco.icon}</span>
                  <div>
                    <div className="font-bold text-white text-xs">{selectedEco.name}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{isPowerOn ? 'Connected & Online' : 'Standby Mode'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { playClickSound(); setIsPowerOn(!isPowerOn); }}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                    isPowerOn ? 'bg-[#2997ff]' : 'bg-[#333]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isPowerOn ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Voice Command Simulation Box */}
              <div className="p-3.5 rounded-2xl bg-[#141418] border border-white/10 space-y-1 relative z-10">
                <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Voice Command:</span>
                <p className="font-mono text-xs text-cyan-300 italic">{selectedEco.voicePrompt}</p>
              </div>

              {/* Brightness Dimmer */}
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between text-xs text-[#86868b]">
                  <span>Brightness Dimmer:</span>
                  <span className="font-mono text-white">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
                />
              </div>

              {/* Smart Automations Checklist */}
              <div className="space-y-1.5 text-[11px] text-[#a1a1a6] pt-1 relative z-10">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Auto-On at Sunset (Geofence Location Sync)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gentle 10% Nightlight Mode at Midnight</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Turn Off Automatically when leaving home</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Ecosystem Cards & Smart Kit Addon (6 cols) */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              Supported Smart Home Platforms:
            </span>

            <div className="space-y-2">
              {ECOSYSTEMS.map((eco) => (
                <button
                  key={eco.id}
                  onClick={() => { playClickSound(); setSelectedEco(eco); }}
                  className={`w-full p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedEco.id === eco.id
                      ? 'bg-[#1a1a20] border-white text-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{eco.icon}</span>
                      <span className="font-semibold text-white text-xs">{eco.name}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#86868b] leading-relaxed">{eco.desc}</p>
                </button>
              ))}
            </div>

            {/* Smart Kit Add-on Card */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-4">
              <div>
                <span className="font-semibold text-white text-xs block">NEOCRAFT Smart Wi-Fi Controller Kit</span>
                <span className="text-[10px] text-[#86868b]">Includes Smart Plug + Apple/Alexa Hub Bridge</span>
                <div className="font-mono text-sm font-bold text-[#2997ff] mt-0.5">
                  {formatPrice(smartPlugPrice, selectedCurrency)}
                </div>
              </div>

              <button
                onClick={handleAddSmartKit}
                className={`apple-btn-primary py-2.5 px-4 text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Smart Kit</span>
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
