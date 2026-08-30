import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Zap, 
  CheckCircle2,
  Scale
} from 'lucide-react';
import { playClickSound } from '../../../audio/soundEffects';

export default function AppleTermsPage({
  onNavigate
}) {
  return (
    <div className="bg-[#000000] text-white select-none pb-24">
      
      {/* Breadcrumb Header */}
      <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
          <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Store</button>
          <span>/</span>
          <span className="text-white font-semibold">Terms & Conditions</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-24 px-4 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" /> LEGAL TRANSPARENCY
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight apple-text-headline">
          Terms & Conditions
        </h1>

        <p className="text-sm sm:text-base text-[#86868b] max-w-xl mx-auto">
          Clear, transparent agreements outlining our craftsmanship standards, intellectual property policies, and commercial warranties.
        </p>
      </section>

      {/* Main Legal Clauses */}
      <section className="max-w-[1000px] mx-auto px-4 space-y-8 text-xs text-[#a1a1a6] leading-relaxed">
        
        <div className="apple-card p-8 border border-[#262629] space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold text-xs">1</span>
            <span>Intellectual Property & Custom Vector Art</span>
          </h3>
          <p>
            When you submit custom artwork, logos, or typography to NEOCRAFT X for fabrication, you affirm that you own or possess valid licensing rights for the provided trademarks and designs. NEOCRAFT claims no ownership over proprietary client logos and treats all design files with strict commercial confidentiality.
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold text-xs">2</span>
            <span>12V Electrical Safety & Installation Compliance</span>
          </h3>
          <p>
            All NEOCRAFT neon products operate on certified 12V DC solid-state electrical circuits and include certified power supplies with standard BIS / CE / UL compliant safety protections (over-voltage, short-circuit, and thermal cut-off).
          </p>
          <p>
            Products rated for Indoor use must not be subjected to direct outdoor rain unless specified with our IP67 Outdoor Weatherproof sealing option.
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold text-xs">3</span>
            <span>Production Lead Times & BlueDart Air Logistics</span>
          </h3>
          <p>
            Standard bespoke fabrication requires <strong>3 to 5 business days</strong> of precision CNC milling, hand-bending, and 24-hour burn-in stress testing. Transit times across India via BlueDart Air Express are typically <strong>2 to 4 business days</strong>.
          </p>
          <p>
            Rush Express 48-Hour Priority Fabrication is available upon request for events and wedding deadlines.
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold text-xs">4</span>
            <span>Payment Security & 256-Bit Encryption</span>
          </h3>
          <p>
            All online transactions processed on NEOCRAFT X are encrypted with 256-bit SSL encryption via authorized payment gateways (Razorpay, UPI, Apple Pay, Visa, Mastercard, and Amex). We never store payment card credentials on our servers.
          </p>
        </div>

        <div className="apple-card p-8 border border-[#262629] space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold text-xs">5</span>
            <span>2-Year Replacement Warranty Disclosures</span>
          </h3>
          <p>
            The 2-Year Direct Replacement Warranty covers functional LED flex tube failures, power brick defects, and RF dimmer pairing issues under normal operating conditions. The warranty does not cover deliberate physical acrylic breakage, unauthorized rewiring, or third-party high-voltage modifications.
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 text-center">
          <button
            onClick={() => { playClickSound(); onNavigate('home'); }}
            className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer"
          >
            Return to Store
          </button>
        </div>

      </section>

    </div>
  );
}
