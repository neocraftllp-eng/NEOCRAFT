import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Wrench, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  MessageCircle, 
  CheckCircle2,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const DIAGNOSTIC_TOPICS = [
  {
    id: 'troubleshoot-power',
    title: '⚡ Sign is not lighting up / Power check',
    solution: '1. Check the green LED indicator light on your 12V power supply brick. If green, power is reaching the unit.\n2. Ensure the DC barrel jack is firmly connected between the sign and adapter.\n3. Make sure the clear plastic battery insulator tag in the wireless remote has been pulled out.'
  },
  {
    id: 'troubleshoot-remote',
    title: '📱 How to re-pair or reset your RF Wireless Remote',
    solution: '1. Unplug the 12V power supply from the wall socket.\n2. While holding down the [SPEED+] and [SPEED-] buttons on the remote simultaneously, plug the power supply back in.\n3. The neon sign will flash 3 times rapidly, confirming successful RF pairing.'
  },
  {
    id: 'clean-acrylic',
    title: '✨ How to clean acrylic without scratches',
    solution: '1. Never use acetone, alcohol, Windex, or harsh glass cleaners (they cause acrylic hazing).\n2. Use the provided optical microfiber cloth lightly dampened with lukewarm water or mild dish soap dilution.\n3. Wipe in gentle circular motions.'
  },
  {
    id: 'mount-drywall',
    title: '🧱 Renter-Friendly Mounting without Wall Drilling',
    solution: '1. Clean the wall surface with rubbing alcohol to remove grease/dust.\n2. Apply 4 pieces of 3M Command Large Picture Hanging Strips along the back edges of the cast acrylic plate.\n3. Press firmly against wall for 30 seconds. Holds up to 7.2 kg with damage-free removal.'
  },
  {
    id: 'warranty-claim',
    title: '🛡️ How to claim your 2-Year Direct Replacement Warranty',
    solution: 'All NEOCRAFT signs are covered by our 2-Year No-Questions-Asked Replacement Guarantee. If any LED flex strip, power supply, or dimmer fails, we ship a brand-new replacement unit with expedited air express courier.'
  }
];

export default function AppleSupportCenter() {
  const [openTopic, setOpenTopic] = useState(DIAGNOSTIC_TOPICS[0].id);

  const handleWhatsAppSupport = () => {
    playClickSound();
    const msg = encodeURIComponent('Hello Neocraft Genius Support! 🛠️ I need assistance with my neon sign / power adapter / mounting.');
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <section id="support-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1040px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 2-YEAR WARRANTY & NEOCRAFT GENIUS BAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Support that matches our craft.
          </h2>
          <p className="text-sm text-[#86868b]">
            Direct answers from the engineers who built your sign. Fast troubleshooting, mounting guides, and instant warranty claim assistance.
          </p>
        </div>

        {/* 2-Column Split: Interactive Diagnostic Accordion + Direct Genius Hotline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Accordion Topics (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {DIAGNOSTIC_TOPICS.map((topic) => {
              const isOpen = openTopic === topic.id;
              return (
                <div
                  key={topic.id}
                  className="rounded-2xl bg-[#121214] border border-[#222225] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => {
                      playClickSound();
                      setOpenTopic(isOpen ? null : topic.id);
                    }}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#18181b] transition-colors"
                  >
                    <span className="font-semibold text-white text-xs sm:text-sm">{topic.title}</span>
                    <ChevronDown className={`w-4 h-4 text-[#86868b] transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#a1a1a6] leading-relaxed border-t border-[#1f1f22] pt-3 whitespace-pre-line">
                      {topic.solution}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Genius Support Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#18181c] to-[#101012] border border-[#2d2d30] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#2997ff]/20 border border-[#2997ff]/40 flex items-center justify-center text-[#2997ff]">
                <Wrench className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-white text-base">Direct Master Engineer Hotline</h4>
                <p className="text-xs text-[#86868b]">
                  Have a custom wiring requirement or need a rapid warranty part replacement?
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#86868b]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2-Year Direct Replacement Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>Avg Response Time: &lt; 5 Minutes</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppSupport}
                className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Genius Bar on WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
