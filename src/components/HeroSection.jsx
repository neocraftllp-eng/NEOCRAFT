import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Clock, 
  Camera, 
  Layers, 
  Wand2,
  ChevronRight,
  Flame,
  Volume2
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../audio/soundEffects';

export default function HeroSection({
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator,
  onOpenVibeQuiz,
  onExploreCatalog
}) {
  const [heroNeonOn, setHeroNeonOn] = useState(true);
  const [heroColor, setHeroColor] = useState('#00F0FF');
  const [heroAmbiance, setHeroAmbiance] = useState('cyber');

  const handleToggleNeon = () => {
    const nextState = !heroNeonOn;
    playSwitchSound(nextState);
    setHeroNeonOn(nextState);
  };

  const handleColorSwitch = (colorHex) => {
    playClickSound();
    setHeroColor(colorHex);
    if (!heroNeonOn) {
      setHeroNeonOn(true);
      playSwitchSound(true);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24 border-b border-slate-800/60">
      
      {/* Dynamic Ambient Background Lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[900px] h-[350px] md:h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-60"
        style={{
          backgroundColor: heroNeonOn ? heroColor : 'rgba(15, 23, 42, 0.4)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
              India's Premier Haute-Living & Architectural Signage Lab
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-bold">2.0 Live Studio</span>
          </div>
        </div>

        {/* Hero Main Typography */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] leading-[1.08]">
            ILLUMINATE YOUR WORLD WITH{' '}
            <span className="relative inline-block mt-2 sm:mt-0">
              <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                BESPOKE NEON
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 rounded-full blur-[1px]" />
            </span>
            {' '}& 3D SIGNS
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Handcrafted luxury LED neon flex, 3D halo-backlit acrylics, laser-cut brass, and smart RGB displays. Designed in real-time. Built for a lifetime.
          </p>

          {/* Interactive CTA Group */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => { playClickSound(); onOpenStudio(); }}
              className="relative group px-7 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-base shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
              <span>Create Custom Neon Sign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { playClickSound(); onOpenVisualizer(); }}
              className="px-6 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-semibold text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5"
            >
              <Camera className="w-5 h-5 text-cyan-400" />
              <span>Test in Your Room (AR)</span>
            </button>

            <button
              onClick={() => { playClickSound(); onOpenLogoEstimator(); }}
              className="px-5 py-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-amber-200 font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Business Logo Quote</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE HERO NEON SHOWCASE BOX */}
        <div className="relative max-w-5xl mx-auto mt-6 rounded-2xl p-1 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="relative rounded-[14px] bg-[#090b13] p-6 sm:p-10 overflow-hidden border border-slate-800/80">
            
            {/* Top Toolbar in Showcase */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  Interactive Live Sim:
                </span>
                {/* Physical Power Switch */}
                <button
                  onClick={handleToggleNeon}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    heroNeonOn 
                      ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                      : 'bg-red-500/20 border border-red-500/60 text-red-300'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${heroNeonOn ? 'fill-emerald-400' : ''}`} />
                  <span>{heroNeonOn ? 'POWER: ON' : 'POWER: OFF'}</span>
                </button>
              </div>

              {/* Color Preset Palette */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">Color:</span>
                {[
                  { hex: '#00F0FF', name: 'Cyan' },
                  { hex: '#FF1493', name: 'Pink' },
                  { hex: '#FFE4B5', name: 'Warm Gold' },
                  { hex: '#39FF14', name: 'Matrix Green' },
                  { hex: '#A855F7', name: 'Purple' },
                  { hex: '#FF6B00', name: 'Amber' },
                ].map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => handleColorSwitch(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      heroColor === col.hex && heroNeonOn
                        ? 'scale-125 ring-2 ring-white shadow-[0_0_12px_currentColor]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Glowing Neon Display Zone */}
            <div className="py-12 sm:py-16 text-center select-none flex flex-col items-center justify-center relative">
              
              {/* Backing Acrylic Glass Cutout Effect */}
              <div className="absolute inset-x-8 inset-y-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(255,255,255,0.03)] pointer-events-none">
                {/* 4 Standoff Brass Pins in corners */}
                <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-md border border-black/40" />
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-md border border-black/40" />
                <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-md border border-black/40" />
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-md border border-black/40" />
              </div>

              {/* The Glowing Neon Tubes */}
              <div className="relative z-10 space-y-2">
                <p 
                  className={`text-3xl sm:text-6xl md:text-7xl font-bold tracking-wider font-['Satisfy',cursive] transition-all duration-300 ${
                    heroNeonOn ? 'neon-tube-glow' : 'neon-off'
                  }`}
                  style={{
                    color: heroNeonOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                    textShadow: heroNeonOn 
                      ? `0 0 5px #ffffff, 0 0 10px ${heroColor}, 0 0 25px ${heroColor}, 0 0 50px ${heroColor}, 0 0 100px ${heroColor}`
                      : 'none'
                  }}
                >
                  Dream In Neon
                </p>
                <p
                  className={`text-sm sm:text-xl uppercase font-black tracking-[0.3em] font-['Orbitron',sans-serif] transition-all duration-300 ${
                    heroNeonOn ? 'neon-tube-glow' : 'neon-off'
                  }`}
                  style={{
                    color: heroNeonOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                    textShadow: heroNeonOn 
                      ? `0 0 3px #ffffff, 0 0 8px ${heroColor}, 0 0 20px ${heroColor}`
                      : 'none'
                  }}
                >
                  NEOCRAFT STUDIO 2026
                </p>
              </div>

              {/* Wiring detail */}
              <div className="absolute bottom-1 right-12 w-[2px] h-8 bg-slate-600/40" />
            </div>

            {/* Quick interactive shortcuts below showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-800/60 text-xs">
              <div 
                onClick={() => { playClickSound(); onOpenStudio(); }}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-pink-500/40 cursor-pointer transition-all flex items-center gap-2.5 group"
              >
                <Sparkles className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">Custom Studio</div>
                  <div className="text-[10px] text-slate-400">Type your words</div>
                </div>
              </div>

              <div 
                onClick={() => { playClickSound(); onOpenVisualizer(); }}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center gap-2.5 group"
              >
                <Camera className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">Room AR Try-On</div>
                  <div className="text-[10px] text-slate-400">Test on your wall</div>
                </div>
              </div>

              <div 
                onClick={() => { playClickSound(); onOpenLogoEstimator(); }}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex items-center gap-2.5 group"
              >
                <Layers className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">3D Logo Estimator</div>
                  <div className="text-[10px] text-slate-400">Upload business logo</div>
                </div>
              </div>

              <div 
                onClick={() => { playClickSound(); onOpenVibeQuiz(); }}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all flex items-center gap-2.5 group"
              >
                <Wand2 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">Vibe Discovery Quiz</div>
                  <div className="text-[10px] text-slate-400">Find your style in 30s</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-6 border-t border-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">2-Year Warranty</div>
              <div className="text-xs text-slate-400">Free unit replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">12V Silent Touch</div>
              <div className="text-xs text-slate-400">Child & pet safe voltage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">50,000+ Hours</div>
              <div className="text-xs text-slate-400">10+ years daily runtime</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Pan-India Express</div>
              <div className="text-xs text-slate-400">Insured wooden crate dispatch</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
