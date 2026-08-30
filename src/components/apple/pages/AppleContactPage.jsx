import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  Building2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../../audio/soundEffects';

export default function AppleContactPage({
  onNavigate,
  onOpenConsultation
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Custom Neon Signage Quote',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in your name, email, and project message.');
      return;
    }

    playChimeSound();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2997ff', '#10b981', '#ffffff']
    });
  };

  const handleOpenWhatsApp = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Studio! ⚡\n\n` +
      `• Name: ${form.name || 'Client'}\n` +
      `• Inquiring About: ${form.subject}\n` +
      `• Message: ${form.message || 'I would like to request a 3D design quote.'}`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#000000] text-white select-none pb-24">
      
      {/* Breadcrumb Header */}
      <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
          <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Store</button>
          <span>/</span>
          <span className="text-white font-semibold">Contact NEOCRAFT</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
          <Phone className="w-3.5 h-3.5" /> STUDIO CONCIERGE & SUPPORT
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight apple-text-headline">
          Let’s illuminate your vision.
        </h1>

        <p className="text-sm sm:text-base text-[#86868b] max-w-xl mx-auto">
          Our lighting engineers, Vastu consultants, and B2B trade specialists respond within minutes.
        </p>
      </section>

      {/* Main 2-Column Section: Form + Contact Hub */}
      <section className="max-w-[1140px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 apple-card p-6 sm:p-10 border border-[#262629]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-[#86868b] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{form.name}</strong>. A master lighting engineer is reviewing your request and will share a 3D digital proof via WhatsApp and Email within 15 minutes.
                </p>
                <button
                  onClick={handleOpenWhatsApp}
                  className="apple-btn-primary py-3 px-6 text-xs font-semibold cursor-pointer inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Continue on WhatsApp Live Chat</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-xl font-semibold text-white mb-2">Send a Message or Request 3D Proof</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Kabir Mehra"
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="kabir@design.com"
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 91666 91274"
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Project Category</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    >
                      <option value="Custom Neon Signage Quote">Custom Neon Signage Quote</option>
                      <option value="VIP Bottle Presenters for Nightclub">VIP Bottle Presenters for Nightclub</option>
                      <option value="Museum Giclée Canvas Printing">Museum Giclée Canvas Printing</option>
                      <option value="Architect & Interior Designer Trade Partnership">Architect & Interior Designer Trade</option>
                      <option value="Vastu Lighting & Spatial Direction Advice">Vastu Lighting Advice</option>
                      <option value="Warranty & Order Tracking Assistance">Warranty & Order Tracking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Project Details / Sign Text / Dimensions *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your desired text, logo dimensions, font preferences, or wall installation details..."
                    className="w-full px-3.5 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="apple-btn-primary flex-1 py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message & Request 3D Proof</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="apple-btn-secondary py-3 px-5 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Instant WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Studio Addresses & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            
            {/* Direct Contacts Card */}
            <div className="apple-card p-6 border border-[#262629] space-y-4">
              <h4 className="font-semibold text-white text-sm">Direct Studio Channels</h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Direct Phone & WhatsApp</div>
                    <div className="text-[#86868b] font-mono">+91 91666 91274 (24/7 Priority Concierge)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Email Inquiries</div>
                    <div className="text-[#86868b] font-mono">concierge@neocraftx.com / trade@neocraftx.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Fabrication & Dispatch Hours</div>
                    <div className="text-[#86868b]">Monday – Saturday: 9:00 AM – 9:00 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Studio Locations */}
            <div className="apple-card p-6 border border-[#262629] space-y-4">
              <h4 className="font-semibold text-white text-sm">Studio & Fabrication Hubs</h4>

              <div className="space-y-3 text-[#86868b]">
                <div className="space-y-0.5">
                  <strong className="text-white block">📍 Mumbai Flagship Studio</strong>
                  <p>Unit 402, Signature Light Tower, Lower Parel, Mumbai, MH 400013</p>
                </div>

                <div className="space-y-0.5">
                  <strong className="text-white block">📍 Delhi-NCR Cleanroom Hub</strong>
                  <p>Phase II Industrial Tech Park, Okhla, New Delhi 110020</p>
                </div>

                <div className="space-y-0.5">
                  <strong className="text-white block">📍 Dubai International Studio</strong>
                  <p>Level 14, Boulevard Plaza Tower 1, Downtown Dubai, UAE</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
