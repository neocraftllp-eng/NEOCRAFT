import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, CheckCircle2, X } from 'lucide-react';

const LIVE_EVENTS = [
  { name: 'Riya K.', city: 'Mumbai', action: 'customized a neon', item: '"Never Give Up" in Cyber Cyan', time: '2m ago' },
  { name: 'Vikram S.', city: 'Bengaluru', action: 'ordered', item: 'Celestial Archangel Wings 120cm', time: '4m ago' },
  { name: 'The Urban Grind Cafe', city: 'Delhi NCR', action: 'requested quote for', item: '3D Halo Backlit Acrylic Sign', time: '7m ago' },
  { name: 'Karan & Meera', city: 'Jaipur', action: 'purchased', item: '"Better Together" Champagne Script', time: '11m ago' },
  { name: 'Rohan P.', city: 'Pune', action: 'ordered', item: 'Cyber Katana & Kanji Art', time: '14m ago' },
  { name: 'Dr. Alok Verma', city: 'Hyderabad', action: 'ordered', item: 'Laser-Cut Brushed Brass Villa Sign', time: '18m ago' },
];

export default function LiveActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
        setVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = LIVE_EVENTS[currentIndex];

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm p-3.5 rounded-2xl bg-[#090b14]/90 border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start justify-between gap-2.5">
        
        {/* Glow Avatar / Icon */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 p-[1.5px] shrink-0">
          <div className="w-full h-full bg-[#080a11] rounded-full flex items-center justify-center text-xs">
            ⚡
          </div>
        </div>

        {/* Content */}
        <div className="text-xs flex-1">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span>{current.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-normal flex items-center gap-0.5 text-[11px]">
              <MapPin className="w-3 h-3 text-pink-400" /> {current.city}
            </span>
          </div>

          <p className="text-slate-300 text-[11px] mt-0.5">
            {current.action} <strong className="text-cyan-300">{current.item}</strong>
          </p>

          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Verified Order
            </span>
            <span>{current.time}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-500 hover:text-slate-300 p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
