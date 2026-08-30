import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Briefcase, 
  Percent, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  MessageCircle,
  Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

export default function AppleTradePartnerModal({
  isOpen,
  onClose
}) {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({
    firmName: '',
    contactName: '',
    phone: '',
    email: '',
    profession: 'Interior Designer',
    city: '',
    gstNumber: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firmName || !form.contactName || !form.phone) {
      alert('Please fill in firm name, contact person, and phone number.');
      return;
    }

    playChimeSound();
    setStep('approved');

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#2997ff', '#10b981', '#ffffff', '#f56300']
    });
  };

  const handleWhatsAppPartnerJoin = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Trade Team! 🏛️\n\n` +
      `We would like to register as an Official Trade Partner:\n\n` +
      `• Firm / Studio: ${form.firmName}\n` +
      `• Contact Person: ${form.contactName}\n` +
      `• Profession: ${form.profession}\n` +
      `• City: ${form.city || 'India'}\n` +
      `• GST / Tax ID: ${form.gstNumber || 'Pending verification'}\n\n` +
      `Please issue our 25% Trade Partner Discount Code & assign our Dedicated Project Manager.`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              NEOCRAFT for Architects & Designers
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
              
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#182030] to-[#121215] border border-[#2997ff]/30 space-y-2">
                <div className="flex items-center gap-1.5 text-[#2997ff] font-bold text-sm">
                  <Percent className="w-4 h-4" />
                  <span>25% Trade Partner Discount & Dedicated Manager</span>
                </div>
                <p className="text-[#a1a1a6] text-[11px] leading-relaxed">
                  Join 400+ leading interior design studios, architects, and nightclub hospitality groups. Access wholesale tiered pricing, 3D CAD/DWG lighting vector blueprints, and priority express fabrication.
                </p>
              </div>

              {/* Trade Benefits Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-[#121214] border border-[#222225] text-center space-y-1">
                  <Percent className="w-4 h-4 mx-auto text-emerald-400" />
                  <span className="font-semibold text-white block">25% Off</span>
                  <span className="text-[9px] text-[#86868b] block">On All Projects</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121214] border border-[#222225] text-center space-y-1">
                  <FileText className="w-4 h-4 mx-auto text-[#2997ff]" />
                  <span className="font-semibold text-white block">CAD Blueprints</span>
                  <span className="text-[9px] text-[#86868b] block">Free 3D Models</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121214] border border-[#222225] text-center space-y-1">
                  <Truck className="w-4 h-4 mx-auto text-amber-400" />
                  <span className="font-semibold text-white block">Priority Crate</span>
                  <span className="text-[9px] text-[#86868b] block">Express Delivery</span>
                </div>
              </div>

              {/* Registration Form */}
              <div className="space-y-3 pt-1">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Studio & Trade Details:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Architecture / Firm Name *</label>
                    <input
                      type="text"
                      required
                      value={form.firmName}
                      onChange={(e) => setForm({ ...form, firmName: e.target.value })}
                      placeholder="Studio Arch Design"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="Ar. Vikram Singhania"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 91666 91274"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Professional Scope</label>
                    <select
                      value={form.profession}
                      onChange={(e) => setForm({ ...form, profession: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    >
                      <option value="Interior Designer">Interior Designer</option>
                      <option value="Architect">Architect</option>
                      <option value="Event / Wedding Planner">Event / Wedding Planner</option>
                      <option value="Hospitality / Nightclub Owner">Hospitality / Nightclub Owner</option>
                      <option value="Retail Brand Manager">Retail Brand Manager</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Mumbai / Delhi / Bangalore"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">GSTIN Number (Optional)</label>
                    <input
                      type="text"
                      value={form.gstNumber}
                      onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                      placeholder="27ABCDE1234F1Z5"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#222225] space-y-2">
                <button
                  type="submit"
                  className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                  <span>Register for 25% Trade Partner Program</span>
                </button>
              </div>

            </form>
          ) : (
            /* Approved Step */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-semibold text-white">Trade Partner Account Created!</h4>
                <p className="text-xs text-[#86868b]">
                  Welcome aboard, <strong className="text-white">{form.contactName}</strong> from <strong className="text-white">{form.firmName}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] text-center space-y-1 text-xs text-[#86868b] max-w-sm mx-auto">
                <span className="text-emerald-400 font-bold text-base">Trade Code: ARCH25</span>
                <p className="text-[11px]">25% Trade Discount is unlocked. Dedicated Project Manager assigned.</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppPartnerJoin}
                  className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span>Connect with Your Dedicated Project Manager</span>
                </button>

                <button
                  onClick={() => { playClickSound(); onClose(); }}
                  className="apple-btn-primary w-full py-2.5 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
