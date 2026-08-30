import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  User,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

export default function AppleCatalogDownloadModal({
  isOpen,
  onClose
}) {
  const [step, setStep] = useState('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }

    playChimeSound();
    setStep('downloading');

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#2997ff', '#ffffff', '#10b981', '#f56300']
    });

    // Simulate instant download trigger
    setTimeout(() => {
      const blob = new Blob([
        `====================================================\n` +
        `NEOCRAFT X — 2026 ARCHITECTURAL LIGHTING & CANVAS LOOKBOOK\n` +
        `====================================================\n\n` +
        `Thank you for downloading, ${name}!\n\n` +
        `1. CUSTOM NEON STUDIO 2.0 (12V SILICON FLEX)\n` +
        `- 50,000 Hours Lifespan\n` +
        `- 6mm Diamond Cast Acrylic\n` +
        `- IP67 Waterproof & 0 dB Silent Solid State\n\n` +
        `2. VIP LED BOTTLE PRESENTERS\n` +
        `- Aurora Diamond Presenter (₹11,999)\n` +
        `- VIP Letterboard Marquee Board (₹13,499)\n` +
        `- Ace of Spades Champagne Shield (₹14,999)\n` +
        `- 4500mAh Lithium-ion 8h Rechargeable Battery\n\n` +
        `3. MUSEUM GICLÉE CANVAS PRINTS\n` +
        `- 380 GSM Virgin Cotton Canvas\n` +
        `- 12-Color Epson UltraChrome HDR Inks (100+ Years Fade-Proof)\n` +
        `- Hand-stretched European Pinewood Frames\n\n` +
        `4. VASTU PLACEMENT & SPATIAL ENERGY\n` +
        `- North-East: Cosmic Mahadev Shiva & Golden Buddha\n` +
        `- East: Vastu Seven Running White Horses\n` +
        `- North: Shree Ganesha & Emerald Geode\n\n` +
        `Direct WhatsApp Concierge: +91 91666 91274\n` +
        `Official Store: https://neocraftx.com/\n`
      ], { type: 'text/plain' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NEOCRAFT_2026_Architectural_Lookbook_${name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-lg bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Download 2026 Architectural Lookbook
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
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-[#1d1d20] border border-[#2d2d30] space-y-1">
                <div className="flex items-center gap-1.5 text-[#2997ff] font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>High-Resolution PDF Catalog & Specs</span>
                </div>
                <p className="text-[#86868b] text-[11px] leading-relaxed">
                  Includes 48-page architectural lookbook, full technical CAD mounting specifications, 12V wiring schematics, and complete 2026 price list.
                </p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rohan Kapoor"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Work / Personal Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rohan@designstudio.com"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">WhatsApp Phone (For Instant Mobile Link)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 91666 91274"
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#222225]">
                <button
                  type="submit"
                  className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Free 2026 Lookbook PDF</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success Step */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-semibold text-white">Lookbook Generated!</h4>
                <p className="text-xs text-[#86868b]">
                  Your download has started. We also emailed a copy to <strong className="text-white">{email}</strong>.
                </p>
              </div>

              <button
                onClick={() => { playClickSound(); onClose(); }}
                className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
