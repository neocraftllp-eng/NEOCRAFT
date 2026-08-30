import React from 'react';
import { COMPARISON_DATA } from '../../data/appleProducts';
import { formatPrice } from '../../utils/pricing';
import { playClickSound } from '../../audio/soundEffects';

export default function AppleComparisonMatrix({
  onOpenStudio,
  onOpenLogoEstimator,
  selectedCurrency = 'INR'
}) {
  const models = [
    {
      id: 'neon',
      name: 'Silicon Neon Flex',
      tagline: 'Vibrant, flexible, versatile.',
      priceINR: 4999,
      icon: '⚡',
      actionLabel: 'Configure in Studio',
      action: onOpenStudio
    },
    {
      id: 'acrylic',
      name: '3D Halo Acrylic',
      tagline: 'Architectural solid 360° halo.',
      priceINR: 12999,
      icon: '🏛️',
      actionLabel: 'Get 3D Quote',
      action: onOpenLogoEstimator
    },
    {
      id: 'metal',
      name: 'Laser Brushed Brass',
      tagline: 'PVD Anti-Rust titanium prestige.',
      priceINR: 15499,
      icon: '🏢',
      actionLabel: 'Get Brass Quote',
      action: onOpenLogoEstimator
    },
    {
      id: 'rgb',
      name: 'RGB Pixel Matrix',
      tagline: 'Smartphone app scrolling text.',
      priceINR: 7999,
      icon: '📱',
      actionLabel: 'Configure RGB',
      action: onOpenStudio
    }
  ];

  return (
    <section id="comparison-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1100px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#2997ff] uppercase">
            COMPARE MODELS
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Which sign is right for you?
          </h2>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[760px]">
            
            {/* Top Row: Model Headers */}
            <div className="grid grid-cols-5 gap-4 pb-8 border-b border-[#2d2d30] items-end">
              <div className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                Specification
              </div>

              {models.map((m) => (
                <div key={m.id} className="text-center space-y-2">
                  <div className="text-2xl">{m.icon}</div>
                  <h3 className="font-semibold text-base text-white">{m.name}</h3>
                  <p className="text-xs text-[#86868b]">{m.tagline}</p>
                  <div className="text-sm font-semibold text-white pt-1">
                    From {formatPrice(m.priceINR, selectedCurrency)}
                  </div>
                  <button
                    onClick={() => { playClickSound(); m.action(); }}
                    className="apple-btn-primary py-1.5 px-3 text-xs w-full cursor-pointer mt-2"
                  >
                    {m.actionLabel}
                  </button>
                </div>
              ))}
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-[#222225] text-xs">
              {COMPARISON_DATA.map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-4 py-5 items-center">
                  <div className="font-semibold text-[#86868b]">
                    {row.feature}
                  </div>
                  <div className="text-center text-white font-medium">
                    {row.neonFlex}
                  </div>
                  <div className="text-center text-white font-medium">
                    {row.acrylicHalo}
                  </div>
                  <div className="text-center text-white font-medium">
                    {row.metalBrass}
                  </div>
                  <div className="text-center text-white font-medium">
                    {row.rgbMatrix}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
