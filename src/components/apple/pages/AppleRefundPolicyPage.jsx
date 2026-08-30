import React from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { playClickSound } from '../../../audio/soundEffects';

export default function AppleRefundPolicyPage({
  onNavigate
}) {
  const handleOpenWhatsAppClaim = () => {
    playClickSound();
    const msg = encodeURIComponent('Hello Neocraft Warranty Team! 🛡️ I would like to file a rapid warranty / replacement claim.');
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#000000] text-white select-none pb-24">
      
      {/* Breadcrumb Header */}
      <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
          <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Store</button>
          <span>/</span>
          <span className="text-white font-semibold">Cancellation & Refund Policy</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% ZERO-RISK GUARANTEE
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight apple-text-headline">
          Complete confidence in every craft.
        </h1>

        <p className="text-sm sm:text-base text-[#86868b] max-w-xl mx-auto">
          We stand behind our craftsmanship with a 2-Year Direct Replacement Warranty, 100% transit damage protection, and hassle-free support.
        </p>
      </section>

      {/* 3 Core Guarantees Grid */}
      <section className="max-w-[1140px] mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">2-Year Direct Replacement</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              If your LED flex strip, 12V DC power brick, or wireless RF dimmer controller malfunctions at any point during 24 months, we ship a brand-new replacement unit with express air courier.
            </p>
          </div>

          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2997ff]/20 border border-[#2997ff]/40 flex items-center justify-center text-[#2997ff]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">100% Transit Damage Shield</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              All shipments are encased in reinforced double-wall armor packaging and 100% insured with BlueDart Air. In the rare event of transit damage, share an unboxing photo and we will fabricate a fresh sign for free.
            </p>
          </div>

          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">12-Hour Cancellation Window</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Custom bespoke items can be modified or canceled for a 100% instant refund within 12 hours of placing the order, before our CNC laser acrylic cutting begins.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy Terms */}
      <section className="max-w-[1000px] mx-auto px-4 space-y-8 text-xs text-[#a1a1a6] leading-relaxed">
        
        <div className="apple-card p-8 border border-[#262629] space-y-4">
          <h3 className="text-base font-semibold text-white">1. Custom Bespoke Artwork Policy</h3>
          <p>
            Because each custom neon sign, 3D acrylic facade, and photo-to-canvas print is tailor-made to your unique typography, vector artwork, and dimensions, custom orders cannot be returned once laser cutting and hand-assembly has commenced after the 12-hour grace period.
          </p>
          <p>
            However, our <strong>2-Year Warranty and Transit Protection</strong> covers 100% of functional or aesthetic manufacturing flaws.
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-4">
          <h3 className="text-base font-semibold text-white">2. Standard Pre-Designed Artworks (Canvas & Lineup)</h3>
          <p>
            For non-custom pre-designed catalog items (such as standard Canvas Paintings and Bestseller Neon models), returns are accepted within <strong>7 days of delivery</strong> provided the product is in its original packaging with all included accessories (power adapter, dimmer remote, standoff screws).
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-4">
          <h3 className="text-base font-semibold text-white">3. How to Submit a Rapid Claim</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Take a clear photo or 5-second video of your sign or power adapter.</li>
            <li>Click the WhatsApp button below or email <strong>warranty@neocraftx.com</strong> with your Order ID.</li>
            <li>Our technical support engineer will verify your issue within 15 minutes and dispatch replacement components immediately.</li>
          </ol>
        </div>

        {/* WhatsApp Fast Action Box */}
        <div className="p-8 rounded-3xl bg-[#121214] border border-[#2d2d30] text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">Need Immediate Assistance?</h3>
          <p className="text-xs text-[#86868b] max-w-md mx-auto">
            Our warranty claim concierge operates 7 days a week from 9:00 AM to 9:00 PM IST.
          </p>
          <button
            onClick={handleOpenWhatsAppClaim}
            className="apple-btn-primary py-3 px-8 text-xs font-semibold cursor-pointer inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Connect with Warranty Support on WhatsApp</span>
          </button>
        </div>

      </section>

    </div>
  );
}
