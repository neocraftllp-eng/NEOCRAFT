import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle,
  Video
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

const CONSULTATION_TYPES = [
  {
    id: 'home-art',
    name: 'Home & Master Bedroom Ambient Lighting',
    desc: 'Custom silicone neon placement & 380 GSM giclée canvas selection',
    icon: '🏠'
  },
  {
    id: 'nightclub-vip',
    name: 'Nightlife VIP Bottle Service Suite',
    desc: 'LED bottle presenters, marquee letterboards & rechargeable club strobe kits',
    icon: '🍾'
  },
  {
    id: 'b2b-facade',
    name: 'Corporate & 3D Architectural Signage',
    desc: '3D halo backlit cast acrylics & laser PVD brushed brass facades',
    icon: '🏢'
  },
  {
    id: 'event-wedding',
    name: 'Wedding & Haute Event Stage Backdrops',
    desc: 'Life-sized radiant angel wings & warm 2700K cursive illuminated arches',
    icon: '💍'
  }
];

export default function AppleDesignConsultationModal({
  isOpen,
  onClose
}) {
  const [step, setStep] = useState('form');
  const [selectedType, setSelectedType] = useState(CONSULTATION_TYPES[0]);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 04:00 PM IST');
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectNotes: ''
  });

  if (!isOpen) return null;

  const timeSlots = [
    'Tomorrow, 11:30 AM IST',
    'Tomorrow, 04:00 PM IST',
    'Tomorrow, 07:30 PM IST',
    'Day After Tomorrow, 03:00 PM IST',
    'Day After Tomorrow, 06:30 PM IST'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    playChimeSound();
    setStep('confirmed');

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#2997ff', '#0071e3', '#ffffff', '#f56300']
    });
  };

  const handleWhatsAppInstantMeet = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Design Studio! ⚡ I would like to schedule my Free 1-on-1 Lighting & Signage Consultation:\n\n` +
      `• Name: ${form.name}\n` +
      `• Project Type: ${selectedType.name}\n` +
      `• Preferred Slot: ${selectedDate}\n` +
      `• Location: ${form.city || 'India'}\n` +
      `• Notes: ${form.projectNotes || 'Complimentary 3D Mockup & Lighting Plan'}\n\n` +
      `Looking forward to connecting!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              {step === 'form' ? 'Book 1-on-1 Studio Lighting Consultation' : 'Consultation Confirmed'}
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Top Banner */}
              <div className="p-4 rounded-2xl bg-[#1d1d20] border border-[#2d2d30] space-y-1">
                <div className="flex items-center gap-1.5 text-[#2997ff] font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complimentary 15-Min Virtual Design Session</span>
                </div>
                <p className="text-[#86868b] text-[11px] leading-relaxed">
                  Collaborate directly with a NEOCRAFT Master Lighting Engineer. Receive 1:1 vector scale proofs, lumen calculations, and bespoke material recommendations.
                </p>
              </div>

              {/* 1. Project Type Selector */}
              <div>
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                  1. Select Consultation Scope:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONSULTATION_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { playClickSound(); setSelectedType(t); }}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedType.id === t.id
                          ? 'bg-[#1f1f25] border-white text-white shadow-sm'
                          : 'bg-[#121214] border-[#262629] text-[#86868b] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        <span>{t.icon}</span>
                        <span className="truncate">{t.name.split(' ')[0]} {t.name.split(' ')[1] || ''}</span>
                      </div>
                      <div className="text-[10px] text-[#86868b] mt-1 line-clamp-2">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Slot Picker */}
              <div>
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                  2. Preferred Time Slot:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => { playClickSound(); setSelectedDate(slot); }}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedDate === slot
                          ? 'bg-white text-slate-950 font-bold border-white'
                          : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#2997ff]" />
                        <span>{slot}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. User Details */}
              <div className="space-y-3">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  3. Contact Information:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Rohan Kapoor"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Mumbai / Delhi / Dubai"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="rohan@studio.com"
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
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>Confirm Free Design Appointment</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInstantMeet}
                  className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span>Connect Instantly on WhatsApp</span>
                </button>
              </div>

            </form>
          ) : (
            /* Confirmation View */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-semibold text-white">Your Session is Booked!</h4>
                <p className="text-xs text-[#86868b]">
                  We have sent meeting details to <strong className="text-white">{form.phone}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] text-left text-xs space-y-1.5 text-[#86868b] max-w-sm mx-auto">
                <div>Scope: <strong className="text-white">{selectedType.name}</strong></div>
                <div>Slot: <strong className="text-[#2997ff] font-mono">{selectedDate}</strong></div>
                <div>Engineer: <span className="text-emerald-400 font-semibold">NEOCRAFT Senior Lighting Architect</span></div>
              </div>

              <button
                onClick={() => { playClickSound(); onClose(); }}
                className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
