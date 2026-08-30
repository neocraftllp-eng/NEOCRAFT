import React, { useRef, useEffect } from 'react';
import { Power, Sun, Camera, Sparkles, Download, Volume2 } from 'lucide-react';
import { playClickSound, playSwitchSound } from '../../audio/soundEffects';

export default function NeonCanvas({
  text = 'Your Custom Neon',
  font,
  color,
  size,
  backing,
  isPowered = true,
  onTogglePower,
  dimmer = 100,
  onChangeDimmer,
  lightMode = 'steady',
  onChangeLightMode,
  selectedRoom,
  textAlign = 'center',
  onOpenVisualizer
}) {
  const canvasContainerRef = useRef(null);

  // Compute text lines
  const lines = text ? text.split('\n') : ['Your Custom Neon'];

  // Handle Download Mockup as Canvas image
  const handleDownloadMockup = () => {
    playClickSound();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 800;

    // Background color
    ctx.fillStyle = '#0c0e14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neocraft watermark & branding
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Plus Jakarta Sans, sans-serif';
    ctx.fillText('NEOCRAFT X • CUSTOM NEON STUDIO 2.0', 50, 750);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(`Font: ${font.name} | Color: ${color.name} | Size: ${size.label}`, 50, 775);

    // Neon text rendering
    const activeColor = color.hex.includes('gradient') ? '#00F0FF' : color.hex;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 72px ${font.family}`;

    const lineHeight = 90;
    const startY = 400 - ((lines.length - 1) * lineHeight) / 2;

    // Layer 1: Wide glow
    ctx.shadowColor = activeColor;
    ctx.shadowBlur = 40;
    ctx.fillStyle = activeColor;
    lines.forEach((line, idx) => {
      ctx.fillText(line, 600, startY + idx * lineHeight);
    });

    // Layer 2: Tight glow
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    lines.forEach((line, idx) => {
      ctx.fillText(line, 600, startY + idx * lineHeight);
    });

    // Download trigger
    const link = document.createElement('a');
    link.download = `neocraft-custom-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Determine light mode animation class
  const getLightModeClass = () => {
    if (!isPowered) return 'neon-off';
    if (lightMode === 'breathe') return 'animate-neon-breathe';
    if (lightMode === 'party') return 'animate-neon-party';
    if (lightMode === 'flicker') return 'animate-neon-flicker';
    return '';
  };

  // Ambient glow calculation
  const glowOpacity = isPowered ? (dimmer / 100) * 0.9 : 0;
  const isMulti = color.isGradient;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col">
      
      {/* Top Floating Controls inside Canvas Viewport */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        
        {/* Power switch button */}
        <button
          onClick={() => {
            const next = !isPowered;
            playSwitchSound(next);
            onTogglePower(next);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all cursor-pointer shadow-lg backdrop-blur-md ${
            isPowered 
              ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
              : 'bg-red-500/25 border border-red-400 text-red-300'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isPowered ? 'NEON ON' : 'NEON OFF'}</span>
        </button>

        {/* Light FX Modes */}
        {isPowered && (
          <div className="hidden sm:flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 text-[11px] font-semibold text-slate-300">
            {[
              { id: 'steady', label: 'Steady' },
              { id: 'breathe', label: 'Pulse' },
              { id: 'party', label: 'Party Disco' },
              { id: 'flicker', label: 'Vintage Buzz' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => { playClickSound(); onChangeLightMode(m.id); }}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  lightMode === m.id 
                    ? 'bg-white/20 text-white font-bold shadow-sm' 
                    : 'hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Action buttons: Download & AR */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { playClickSound(); onOpenVisualizer(); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-200 text-xs font-bold transition-all cursor-pointer backdrop-blur-md shadow-md"
            title="Try this sign on your actual room wall"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Try on Wall (AR)</span>
          </button>

          <button
            onClick={handleDownloadMockup}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer backdrop-blur-md"
            title="Download 4K Sign Mockup"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline ml-1">Mockup</span>
          </button>
        </div>
      </div>

      {/* Main Room & Neon Rendering Stage */}
      <div 
        ref={canvasContainerRef}
        style={selectedRoom?.bgStyle || { backgroundColor: '#0c0e14' }}
        className="relative w-full h-[400px] sm:h-[480px] lg:h-[530px] flex items-center justify-center p-6 sm:p-12 overflow-hidden transition-all duration-500 select-none"
      >
        {/* Dynamic Ambient Wall Reflection Glow */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: isPowered 
              ? `radial-gradient(circle at 50% 50%, rgba(${color.ambientRgb}, ${glowOpacity * 0.45}) 0%, rgba(${color.ambientRgb}, ${glowOpacity * 0.15}) 40%, transparent 75%)`
              : 'transparent',
          }}
        />

        {/* Acrylic Backing Board Visualization */}
        <div 
          className={`relative z-10 p-6 sm:p-10 transition-all duration-300 max-w-[90%] flex flex-col items-center justify-center ${
            backing.id === 'full-rect'
              ? 'rounded-2xl bg-white/[0.03] border border-white/20 backdrop-blur-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : backing.id === 'cut-to-shape'
              ? 'rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-[1px] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
              : backing.id === 'stand-off'
              ? 'rounded-2xl bg-white/[0.04] border border-amber-500/20 backdrop-blur-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
              : 'bg-transparent border-0'
          }`}
        >
          {/* Metallic Standoff Brass Pins (if selected) */}
          {(backing.id === 'stand-off' || backing.id === 'full-rect') && (
            <>
              <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-lg border border-black/60" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-lg border border-black/60" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-lg border border-black/60" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-lg border border-black/60" />
            </>
          )}

          {/* Glowing Neon Text Lines */}
          <div 
            className={`space-y-1 sm:space-y-2 text-${textAlign} ${getLightModeClass()}`}
            style={{
              fontFamily: font.family,
              letterSpacing: font.letterSpacing,
              lineHeight: font.lineHeight,
              textAlign: textAlign
            }}
          >
            {lines.map((line, index) => {
              const displayText = line || ' ';
              return (
                <div
                  key={index}
                  className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-200 ${
                    !isPowered ? 'neon-off' : ''
                  }`}
                  style={{
                    color: isPowered ? (isMulti ? '#ffffff' : '#ffffff') : 'rgba(255,255,255,0.18)',
                    textShadow: isPowered
                      ? isMulti
                        ? `0 0 4px #ffffff, 0 0 10px #00F0FF, 0 0 20px #FF1493, 0 0 40px #00F0FF, 0 0 80px #FF1493`
                        : `
                            0 0 3px #ffffff,
                            0 0 8px ${color.hex},
                            0 0 ${15 * (dimmer / 100)}px ${color.hex},
                            0 0 ${35 * (dimmer / 100)}px ${color.hex},
                            0 0 ${75 * (dimmer / 100)}px ${color.hex}
                          `
                      : 'none',
                    opacity: isPowered ? Math.max(0.3, dimmer / 100) : 0.4
                  }}
                >
                  {displayText}
                </div>
              );
            })}
          </div>

          {/* Power wire simulation */}
          <div className="absolute -bottom-6 right-8 w-1 h-8 bg-slate-700/60 rounded-full pointer-events-none" />
        </div>

        {/* Dimension & Scale Tag Watermark */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
          <span className="text-cyan-400 font-bold">{size.label.split('(')[0]}</span>
          <span className="text-slate-500">|</span>
          <span>{size.label.split('(')[1]?.replace(')', '') || ''}</span>
          <span className="text-slate-500">|</span>
          <span className="text-pink-300 font-semibold">{backing.name}</span>
        </div>

        {/* Room scene badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-slate-400 pointer-events-none hidden sm:block">
          Wall: <span className="text-white font-medium">{selectedRoom.name}</span>
        </div>

      </div>

      {/* Bottom Interactive Dimmer & Controls Bar */}
      <div className="bg-[#080a12] px-4 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Dimmer Brightness Slider */}
        <div className="flex items-center gap-3 min-w-[200px] flex-1 max-w-sm">
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            Dimmer: {dimmer}%
          </span>
          <input
            type="range"
            min="10"
            max="100"
            value={dimmer}
            disabled={!isPowered}
            onChange={(e) => onChangeDimmer(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500 disabled:opacity-30"
          />
        </div>

        {/* Quick Specs summary */}
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            12V Low-Voltage Safe
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline">50,000h Silicone Flex</span>
        </div>

      </div>
    </div>
  );
}
