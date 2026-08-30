import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const TRADE_CONDITIONS = [
  {
    id: 'like-new',
    name: 'Working Neon / Signboard (Good Condition)',
    credit: 2000,
    desc: 'Fully illuminated with minor cosmetic wear',
    code: 'TRADEIN2000'
  },
  {
    id: 'partial',
    name: 'Flickering / Dimming / Partial Fault',
    credit: 1500,
    desc: 'Flickering neon gas or broken driver unit',
    code: 'TRADEIN1500'
  },
  {
    id: 'broken',
    name: 'Broken Glass Tube / Obsolete 220V',
    credit: 1000,
    desc: 'Cracked glass tube or non-functional sign for green recycling',
    code: 'TRADEIN1000'
  }
];

export default function AppleTradeInModal({
  isOpen,
  onClose,
  onApplyCredit
}) {
  const [selectedCondition, setSelectedCondition] = useState(TRADE_CONDITIONS[0]);
  const [step, setStep] = useState('select'); // 'select' | 'approved'
  const [signDetails, setSignDetails] = useState('');

  if (!isOpen) return null;

  const handleClaimTradeIn = () => {
    playChimeSound();
    setStep('approved');

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#0071e3', '#2997ff', '#10b981', '#ffffff']
    });

    onApplyCredit({
      code: selectedCondition.code,
      label: `₹${selectedCondition.credit} Trade-In Credit (${selectedCondition.code})`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-lg bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              NEOCRAFT Trade-In & Upgrade
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {step === 'select' ? (
            <div className="space-y-5">
              
              <div className="space-y-1">
                <h4 className="text-xl font-semibold text-white tracking-tight">
                  Trade in your old sign. Upgrade to 12V Silicon.
                </h4>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Get up to ₹2,000 instant credit toward any new handcrafted NEOCRAFT custom neon, 3D acrylic facade, or giclée canvas painting.
                </p>
              </div>

              {/* Condition Selection */}
              <div className="space-y-2.5">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Old Signboard Condition:
                </span>

                {TRADE_CONDITIONS.map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => { playClickSound(); setSelectedCondition(cond); }}
                    className={`w-full p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      selectedCondition.id === cond.id
                        ? 'bg-[#1f1f25] border-white text-white shadow-md'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:border-[#333]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{cond.name}</div>
                      <div className="text-[11px] text-[#86868b] mt-0.5">{cond.desc}</div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-emerald-400 font-mono">
                        +₹{cond.credit}
                      </span>
                      <span className="text-[9px] text-[#86868b] block uppercase">Credit</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Description Input */}
              <div className="space-y-1">
                <label className="text-[11px] text-[#86868b] block font-semibold">
                  Brand / Sign Details (Optional):
                </label>
                <input
                  type="text"
                  value={signDetails}
                  onChange={(e) => setSignDetails(e.target.value)}
                  placeholder="e.g. 3ft Glass Neon 'Open' sign / old cafe board..."
                  className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#222225]">
                <button
                  onClick={handleClaimTradeIn}
                  className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5 mr-1.5" />
                  <span>Claim ₹{selectedCondition.credit} Trade-In Credit</span>
                </button>
              </div>

            </div>
          ) : (
            /* Approved Step */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-semibold text-white">Trade-In Credit Activated!</h4>
                <p className="text-xs text-[#86868b]">
                  Code <strong className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{selectedCondition.code}</strong> has been applied to your Bag.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] text-center space-y-1 text-xs text-[#86868b] max-w-sm mx-auto">
                <span className="text-emerald-400 font-bold text-lg">₹{selectedCondition.credit} Instant Discount</span>
                <p className="text-[11px]">Will be deducted at checkout. Hand over your old sign during new crate delivery.</p>
              </div>

              <button
                onClick={() => { playClickSound(); onClose(); }}
                className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer"
              >
                Go to Bag & Shop
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
