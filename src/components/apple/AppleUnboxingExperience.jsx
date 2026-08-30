import React, { useState } from 'react';
import { 
  Box, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Truck, 
  CheckCircle2, 
  PackageCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const UNBOXING_STEPS = [
  {
    step: '01',
    title: 'Reinforced Armor Packaging',
    subtitle: 'Zero-Breakage Guarantee',
    desc: 'Each custom neon and canvas artwork is encased within shock-absorbing dual-wall corrugated armor and corner impact edge guards. Transit tested up to 2-meter vertical drop.',
    tag: 'Drop Tested',
    badgeColor: 'text-amber-300 bg-amber-400/10 border-amber-400/30'
  },
  {
    step: '02',
    title: 'Laser-Contoured Foam Cushioning',
    subtitle: 'High-Density Anti-Static EPE',
    desc: 'Custom CNC router cut foam that mirrors the exact silhouette of your artwork. Prevents vibration fatigue during air transit with BlueDart.',
    tag: 'Anti-Vibration',
    badgeColor: 'text-[#2997ff] bg-[#2997ff]/10 border-[#2997ff]/30'
  },
  {
    step: '03',
    title: 'Serialized Certificate of Authenticity',
    subtitle: '50,000-Hour Stress Test Hologram',
    desc: 'Individually signed QC inspection card with technician burn-in verification stamp and unique serial number for instant warranty activation.',
    tag: 'QC Certified',
    badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
  },
  {
    step: '04',
    title: 'Complete Plug & Play Hardware Pack',
    subtitle: 'Everything Included in the Box',
    desc: 'Includes 12V DC power supply brick, wireless RF dimmer controller with battery, 4 brushed stainless steel standoff pins, screws, and 3M heavy-duty command strips.',
    tag: 'Plug & Play',
    badgeColor: 'text-purple-300 bg-purple-400/10 border-purple-400/30'
  }
];

export default function AppleUnboxingExperience({
  onOpenBackingSimulator
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="unboxing-section" className="py-20 md:py-28 bg-[#0a0a0c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
            <PackageCheck className="w-3.5 h-3.5" /> WHITE-GLOVE PACKAGING ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Unboxing perfection.
          </h2>
          <p className="text-sm text-[#86868b]">
            Designed with the same obsessive precision as the artwork inside. Every package arrives ready to unbox, mount in under 3 minutes, and illuminate.
          </p>
        </div>

        {/* 4-Step Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNBOXING_STEPS.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => { playClickSound(); setActiveStep(idx); }}
              className={`apple-card p-6 border flex flex-col justify-between cursor-pointer transition-all ${
                activeStep === idx
                  ? 'border-white shadow-xl bg-[#161619]'
                  : 'border-[#262629] bg-[#101012] hover:border-[#3a3a3e]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-[#2997ff]">{s.step}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.badgeColor}`}>
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1">{s.title}</h3>
                <h4 className="text-xs text-[#2997ff] font-medium mb-3">{s.subtitle}</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1f1f22] flex items-center justify-between text-[11px]">
                <span className="text-[#86868b]">Inspect Layer</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeStep === idx ? 'text-white translate-x-1' : 'text-[#86868b]'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#141d2b] to-[#121215] border border-[#2997ff]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">Want to customize the Acrylic Backing Cut?</h4>
            <p className="text-xs text-[#86868b]">
              Compare Contour Cut, 24K Gold Mirror Acrylic, Matte Obsidian Black, and Tabletop Stands.
            </p>
          </div>

          <button
            onClick={() => {
              playClickSound();
              if (onOpenBackingSimulator) onOpenBackingSimulator();
            }}
            className="apple-btn-primary py-2.5 px-5 text-xs font-semibold cursor-pointer shrink-0"
          >
            Launch Backing Cut Simulator
          </button>
        </div>

      </div>
    </section>
  );
}
