import React, { useState, useRef, useEffect } from 'react';
import { X, Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const WHEEL_PRIZES = [
  { id: '15off', label: '15% OFF ALL SIGNS', code: 'NEO15', color: '#ec4899', desc: 'Flat 15% discount auto-applied' },
  { id: 'dimmer', label: 'FREE DIMMER REMOTE', code: 'FREEDIMMER', color: '#00F0FF', desc: '₹799 value RF wireless remote included' },
  { id: '1000off', label: '₹1,000 CASH VOUCHER', code: 'NEO1000', color: '#f59e0b', desc: '₹1,000 off orders over ₹5,000' },
  { id: 'shipping', label: 'FREE EXPRESS CRATE', code: 'FREECRATE', color: '#10b981', desc: 'Insured wooden crate shipping' },
  { id: '20off', label: 'VIP 20% OFF DROP', code: 'VIP20', color: '#a855f7', desc: 'Extra 20% discount on cart' },
  { id: 'kit', label: 'FREE PRO MOUNT KIT', code: 'MOUNTKIT', color: '#3b82f6', desc: 'Stainless standoff pins & wall anchors' },
];

export default function SpinWheelModal({
  isOpen,
  onClose,
  onApplyDiscount
}) {
  const [spinning, setSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning || wonPrize) return;
    playClickSound();
    setSpinning(true);

    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    const totalSpins = 5 * 360; // 5 full revolutions
    const targetAngle = totalSpins + (360 - (prizeIndex * segmentAngle) - (segmentAngle / 2));

    setRotation(targetAngle);

    setTimeout(() => {
      const selected = WHEEL_PRIZES[prizeIndex];
      setWonPrize(selected);
      setSpinning(false);
      playChimeSound();

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#00F0FF', '#f59e0b', '#a855f7']
      });

      if (onApplyDiscount) {
        onApplyDiscount(selected);
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-md bg-[#0a0c16] border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/40">
          <Gift className="w-3.5 h-3.5" /> LUCKY NEON POWER-UP WHEEL
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
          SPIN TO UNLOCK <span className="text-transparent bg-gradient-to-r from-amber-300 to-pink-400 bg-clip-text">EXCLUSIVE PERKS</span>
        </h3>
        <p className="text-xs text-slate-300 mt-1 mb-6">
          Every spin is guaranteed to win a real checkout bonus!
        </p>

        {/* The Animated Spin Wheel Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-6 flex items-center justify-center">
          
          {/* Wheel Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-amber-400 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />

          {/* Rotating Wheel Disc */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.4)] overflow-hidden relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              background: `conic-gradient(
                #ec4899 0deg 60deg,
                #00F0FF 60deg 120deg,
                #f59e0b 120deg 180deg,
                #10b981 180deg 240deg,
                #a855f7 240deg 300deg,
                #3b82f6 300deg 360deg
              )`
            }}
          >
            {/* Prize Labels around disc */}
            {WHEEL_PRIZES.map((p, idx) => {
              const angle = idx * 60 + 30;
              return (
                <div
                  key={p.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-slate-950 uppercase tracking-tighter text-center"
                  style={{
                    transform: `rotate(${angle}deg) translate(0, -75px) rotate(-90deg)`,
                    width: '70px'
                  }}
                >
                  {p.label.split(' ')[0]} {p.label.split(' ')[1]}
                </div>
              );
            })}
          </div>

          {/* Center Wheel Hub Button */}
          <button
            onClick={handleSpin}
            disabled={spinning || !!wonPrize}
            className="absolute z-20 w-16 h-16 rounded-full bg-slate-950 border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center text-white font-black text-xs cursor-pointer hover:scale-105 transition-transform disabled:opacity-90 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-300">
              {spinning ? '...' : wonPrize ? 'WON' : 'SPIN'}
            </span>
          </button>
        </div>

        {/* Won Prize Details or Spin Prompt */}
        {wonPrize ? (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 space-y-2 animate-bounce-short">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> CONGRATULATIONS!
            </div>
            <h4 className="text-xl font-black text-white">{wonPrize.label}</h4>
            <div className="text-xs text-slate-300">{wonPrize.desc}</div>
            <div className="inline-block px-3 py-1 bg-amber-500/30 rounded-lg text-xs font-mono font-bold text-amber-300 border border-amber-400/50">
              CODE: {wonPrize.code}
            </div>

            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="mt-3 w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Claim & Apply to Cart →
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            {spinning ? 'Spinning The Wheel...' : 'Click to Spin for Free Bonus!'}
          </button>
        )}

      </div>

    </div>
  );
}
