import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Send, 
  Phone, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Compass,
  Package
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

export default function AppleLiveConcierge({
  onNavigate,
  onOpenConsultation,
  onOpenTradeIn
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleOpenWhatsApp = (text) => {
    playClickSound();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919166691274?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  const quickPrompts = [
    {
      title: '⚡ Request Instant 3D Proof on WhatsApp',
      desc: 'Send your vector logo or custom neon text for a free render',
      action: () => handleOpenWhatsApp('Hello Neocraft Studio! I would like to request a Free 3D Vector Proof for my custom sign.')
    },
    {
      title: '🍾 VIP Bottle Presenters Bulk Pricing',
      desc: 'Inquire about club rates, lithium battery runtimes & custom branding',
      action: () => handleOpenWhatsApp('Hello! I want to inquire about VIP Bottle Presenters & letterboard marquee sets for my venue.')
    },
    {
      title: '🧭 Vastu Art & Lighting Recommendation',
      desc: 'Get advice on directional placement for your living room or foyer',
      action: () => {
        setIsOpen(false);
        if (onNavigate) onNavigate('vastu');
      }
    },
    {
      title: '📦 Check My Order Production Status',
      desc: 'Look up live laser cutting & BlueDart air tracking',
      action: () => {
        setIsOpen(false);
        if (onNavigate) onNavigate('tracker');
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => { playClickSound(); setIsOpen(true); }}
          className="apple-btn-primary p-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer group hover:scale-105 transition-all ring-4 ring-[#2997ff]/20"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold hidden sm:inline">VIP Concierge</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Flyout Concierge Card */}
      {isOpen && (
        <div className="w-[330px] sm:w-[370px] bg-[#161617] border border-[#2d2d30] rounded-[28px] shadow-2xl overflow-hidden text-white animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-[#121214] border-b border-[#262629] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2997ff]/20 border border-[#2997ff]/40 flex items-center justify-center text-[#2997ff]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-xs text-white">NEOCRAFT Studio Concierge</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Master Lighting Engineer Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { playClickSound(); setIsOpen(false); }}
              className="p-1 rounded-full bg-[#262629] text-[#86868b] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs max-h-[380px] overflow-y-auto">
            <p className="text-[11px] text-[#86868b]">
              How can we assist your custom illumination or museum canvas project today?
            </p>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => { playClickSound(); q.action(); }}
                  className="w-full p-2.5 rounded-xl bg-[#121214] border border-[#262629] hover:border-[#2997ff]/50 text-left transition-all cursor-pointer group"
                >
                  <div className="font-semibold text-white text-[11px] group-hover:text-[#2997ff] transition-colors">
                    {q.title}
                  </div>
                  <div className="text-[10px] text-[#86868b] mt-0.5">{q.desc}</div>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customMsg.trim()) handleOpenWhatsApp(customMsg);
                }}
                className="flex gap-1.5"
              >
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs placeholder-[#666] focus:outline-none focus:border-[#2997ff]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#2997ff] text-slate-950 hover:bg-[#0071e3] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
