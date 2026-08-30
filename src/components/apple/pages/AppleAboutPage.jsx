import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Award, 
  Users, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { playClickSound } from '../../../audio/soundEffects';

export default function AppleAboutPage({
  onNavigate,
  onOpenConsultation
}) {
  return (
    <div className="bg-[#000000] text-white select-none pb-24">
      
      {/* Breadcrumb Navigation Header */}
      <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
          <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Store</button>
          <span>/</span>
          <span className="text-white font-semibold">About NEOCRAFT X</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> THE ARCHITECTURE OF LIGHT
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight apple-text-headline leading-tight">
          Where pure precision meets human emotion.
        </h1>

        <p className="text-base sm:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
          Founded in 2021, NEOCRAFT was born with a singular obsession: to liberate illumination from fragile glass tubes and hazardous high voltage, transforming light into architectural fine art.
        </p>
      </section>

      {/* Key Numbers Bento Grid */}
      <section className="max-w-[1140px] mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="apple-card p-6 sm:p-8 text-center border border-[#262629]">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-1">15,000+</div>
            <div className="text-xs text-[#86868b] font-medium uppercase tracking-wider">Custom Signs Crafted</div>
          </div>

          <div className="apple-card p-6 sm:p-8 text-center border border-[#262629]">
            <div className="text-3xl sm:text-5xl font-black text-[#2997ff] tracking-tight mb-1">400+</div>
            <div className="text-xs text-[#86868b] font-medium uppercase tracking-wider">Architect Partners</div>
          </div>

          <div className="apple-card p-6 sm:p-8 text-center border border-[#262629]">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight mb-1">4.98 ★</div>
            <div className="text-xs text-[#86868b] font-medium uppercase tracking-wider">Verified Customer Rating</div>
          </div>

          <div className="apple-card p-6 sm:p-8 text-center border border-[#262629]">
            <div className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight mb-1">50,000h</div>
            <div className="text-xs text-[#86868b] font-medium uppercase tracking-wider">Stress-Tested Lifespan</div>
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="max-w-[1140px] mx-auto px-4 mb-24 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Our 4 Manufacturing Pillars
          </h2>
          <p className="text-xs text-[#86868b]">
            Every NEOCRAFT creation is fabricated in our clean-room studio with aerospace-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2997ff]/20 border border-[#2997ff]/40 flex items-center justify-center text-[#2997ff]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">1. Safe 12V Solid-State Engineering</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              We replaced dangerous 2,000–15,000V glass neon with ultra-safe 12V DC low voltage. Safe to touch, zero humming buzz, and uses 90% less electricity than legacy neon.
            </p>
          </div>

          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">2. 6mm Cast Optical Acrylic Backplates</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              We never use flimsy 3mm extruded plastic. Our backplates are CNC-milled from 6mm virgin optical cast acrylic with diamond-polished bevel edges for flawless transparency.
            </p>
          </div>

          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">3. IP67 Waterproof Japanese Silicone</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Our LED flex jackets are molded from UV-stabilized food-grade silicone that resists yellowing, cracking, and moisture damage for over a decade of continuous illumination.
            </p>
          </div>

          <div className="apple-card p-8 border border-[#262629] space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">4. 50,000-Hour Burn-In Stress Test</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Before leaving our studio, every single unit undergoes a mandatory 24-hour thermal and voltage stress test to ensure 0% DOA defect rate before BlueDart air dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Locations & Team */}
      <section className="max-w-[1140px] mx-auto px-4 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141d2b] to-[#121215] border border-[#2997ff]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">Have a Bespoke Vision?</h3>
            <p className="text-xs text-[#86868b] max-w-md">
              Book a 1-on-1 virtual design session with a master lighting engineer or visit our flagship studio in Mumbai.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { playClickSound(); onOpenConsultation(); }}
              className="apple-btn-primary py-3 px-6 text-xs font-semibold cursor-pointer"
            >
              Book 1:1 Design Session
            </button>
            <button
              onClick={() => { playClickSound(); onNavigate('custom-studio'); }}
              className="apple-btn-secondary py-3 px-6 text-xs font-semibold cursor-pointer"
            >
              Custom Studio 2.0
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
