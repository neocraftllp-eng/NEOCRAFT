import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Power, 
  Sun, 
  Moon, 
  Zap, 
  Activity, 
  Clock, 
  Radio, 
  Sparkles,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../../audio/soundEffects';

export default function AppleRemoteSimulator() {
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [activeMode, setActiveMode] = useState('static'); // 'static' | 'breathe' | 'strobe' | 'party'
  const [strobeRate, setStrobeRate] = useState(5);
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [signColor, setSignColor] = useState('#00F0FF');
  const [customText, setCustomText] = useState('NIGHTLIFE VIP');

  // Breathing & Strobe Animation Cycle
  const [currentGlow, setCurrentGlow] = useState(100);

  useEffect(() => {
    if (!isOn) {
      setCurrentGlow(0);
      return;
    }

    if (activeMode === 'static') {
      setCurrentGlow(brightness);
      return;
    }

    let interval;
    if (activeMode === 'breathe') {
      let step = 0;
      interval = setInterval(() => {
        step += 0.05;
        const val = Math.round(((Math.sin(step) + 1) / 2) * (brightness - 15) + 15);
        setCurrentGlow(val);
      }, 50);
    } else if (activeMode === 'strobe') {
      let toggle = false;
      interval = setInterval(() => {
        toggle = !toggle;
        setCurrentGlow(toggle ? brightness : 10);
      }, 1000 / strobeRate);
    } else if (activeMode === 'party') {
      const colors = ['#00F0FF', '#FF1493', '#39FF14', '#FFD700', '#1E90FF'];
      let colorIdx = 0;
      interval = setInterval(() => {
        colorIdx = (colorIdx + 1) % colors.length;
        setSignColor(colors[colorIdx]);
        setCurrentGlow(brightness);
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isOn, activeMode, brightness, strobeRate]);

  const handleTogglePower = () => {
    const next = !isOn;
    playSwitchSound(next);
    setIsOn(next);
  };

  const handleSetMode = (mode) => {
    playClickSound();
    setActiveMode(mode);
  };

  const handleSetBrightness = (val) => {
    playClickSound();
    setBrightness(val);
    if (activeMode === 'static') setCurrentGlow(val);
  };

  const handleSetTimer = (mins) => {
    playClickSound();
    setTimerMinutes(mins);
  };

  return (
    <section id="remote-simulator-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
            <Radio className="w-3.5 h-3.5" /> WIRELESS RF SMART CONTROLLER (INCLUDED FREE)
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Complete command from across the room.
          </h2>
          <p className="text-sm text-[#86868b]">
            Every NEOCRAFT sign arrives with a dedicated RF wireless remote control. Test real-time dimming, breathing pulses, and party strobe effects right on this virtual stage.
          </p>
        </div>

        {/* 2-Column Split: Stage on Left, Handheld Remote on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Live Illumination Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden p-8">
            
            {/* Radial Light Diffusion */}
            <div 
              className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${signColor}40 0%, transparent 70%)`,
                opacity: (currentGlow / 100) * (isOn ? 1 : 0)
              }}
            />

            {/* Simulated Neon Light */}
            <div
              className="font-['Satisfy',cursive] font-bold text-center tracking-wider transition-all duration-150 z-10"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: isOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                textShadow: isOn 
                  ? `0 0 5px #ffffff, 0 0 ${12 * (currentGlow / 100)}px ${signColor}, 0 0 ${35 * (currentGlow / 100)}px ${signColor}, 0 0 ${70 * (currentGlow / 100)}px ${signColor}`
                  : 'none',
                opacity: isOn ? Math.max(0.15, currentGlow / 100) : 0.15
              }}
            >
              {customText}
            </div>

            {/* Text Input overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                placeholder="TYPE SIGN TEXT..."
                className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-[11px] text-white font-mono focus:outline-none focus:border-[#2997ff] w-44 sm:w-60"
              />

              <div className="flex items-center gap-1.5">
                {['#00F0FF', '#FF1493', '#39FF14', '#FFD700', '#FFFFFF'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { playClickSound(); setSignColor(c); }}
                    className={`w-5 h-5 rounded-full border cursor-pointer transition-transform ${
                      signColor === c ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Remote Feedback HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#86868b] z-20">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOn ? 'bg-emerald-400' : 'bg-red-500'}`} />
                <span className="text-white font-mono text-[11px]">
                  {isOn ? `12V ACTIVE • ${brightness}% BRIGHTNESS • ${activeMode.toUpperCase()}` : '12V STANDBY (OFF)'}
                </span>
              </div>

              {timerMinutes && (
                <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Timer: {timerMinutes}m</span>
                </span>
              )}
            </div>

          </div>

          {/* Right Column: Physical Handheld Remote Control Simulator (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            
            {/* The Remote Body */}
            <div className="w-72 bg-gradient-to-b from-[#222225] via-[#1a1a1d] to-[#121214] border-2 border-[#3a3a3e] rounded-[36px] p-5 shadow-2xl space-y-4 relative text-white">
              
              {/* Top Remote LED Transmitter Indicator */}
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span className="text-[9px] font-bold tracking-widest text-[#86868b] uppercase">RF 433MHz</span>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full transition-all ${isOn ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-red-500/40'}`} />
              </div>

              {/* Power ON / OFF Master Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { playSwitchSound(true); setIsOn(true); }}
                  className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isOn 
                      ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400' 
                      : 'bg-[#2a2a2e] text-white hover:bg-[#333]'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>ON</span>
                </button>

                <button
                  onClick={() => { playSwitchSound(false); setIsOn(false); }}
                  className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    !isOn 
                      ? 'bg-red-500 text-white shadow-md ring-2 ring-red-400' 
                      : 'bg-[#2a2a2e] text-[#86868b] hover:bg-[#333]'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>OFF</span>
                </button>
              </div>

              {/* Brightness Presets (100%, 50%, 25%, 10%) */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-[#86868b] uppercase tracking-wider block text-center">
                  Quick Dimmer Presets
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[100, 50, 25, 10].map((b) => (
                    <button
                      key={b}
                      onClick={() => handleSetBrightness(b)}
                      className={`py-2 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                        brightness === b && activeMode === 'static'
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'bg-[#2a2a2e] text-white hover:bg-[#333]'
                      }`}
                    >
                      {b}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Modes (Static, Breathe, Strobe, Party) */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-[#86868b] uppercase tracking-wider block text-center">
                  Dynamic Lighting Modes
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSetMode('static')}
                    className={`py-2.5 px-2 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      activeMode === 'static' ? 'bg-[#2997ff] text-slate-950 font-bold' : 'bg-[#242428] text-white'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Static Solid</span>
                  </button>

                  <button
                    onClick={() => handleSetMode('breathe')}
                    className={`py-2.5 px-2 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      activeMode === 'breathe' ? 'bg-[#2997ff] text-slate-950 font-bold' : 'bg-[#242428] text-white'
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>Breathing Wave</span>
                  </button>

                  <button
                    onClick={() => handleSetMode('strobe')}
                    className={`py-2.5 px-2 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      activeMode === 'strobe' ? 'bg-[#2997ff] text-slate-950 font-bold' : 'bg-[#242428] text-white'
                    }`}
                  >
                    <Zap className="w-3 h-3" />
                    <span>Fast Strobe</span>
                  </button>

                  <button
                    onClick={() => handleSetMode('party')}
                    className={`py-2.5 px-2 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      activeMode === 'party' ? 'bg-[#2997ff] text-slate-950 font-bold' : 'bg-[#242428] text-white'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Color Cycle</span>
                  </button>
                </div>
              </div>

              {/* Sleep Timers (15m, 30m, 60m) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-bold text-[#86868b] uppercase tracking-wider block text-center">
                  Sleep Auto-Off Timer
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[15, 30, 60].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleSetTimer(t)}
                      className={`py-1.5 rounded-lg text-[10px] font-mono cursor-pointer transition-all ${
                        timerMinutes === t
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-[#222226] text-[#86868b] hover:text-white'
                      }`}
                    >
                      {t} Min
                    </button>
                  ))}
                </div>
              </div>

              {/* Remote Footer branding */}
              <div className="pt-2 text-center text-[9px] text-[#86868b] tracking-wider uppercase font-semibold">
                NEOCRAFT RF WIRELESS CONTROLLER
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
