import React, { useState } from 'react';
import { Zap, Leaf, ShieldCheck, DollarSign, TrendingDown, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleEnergyCalculator({
  selectedCurrency = 'INR'
}) {
  const [numSigns, setNumSigns] = useState(1);
  const [dailyHours, setDailyHours] = useState(8);

  // Constants:
  // NEOCRAFT 12V LED: Average 36W per sign
  // Traditional High-Voltage Glass Neon: Average 350W per sign
  // Average electricity tariff: ₹8.00 per kWh
  const kwhRate = 8.0;

  const neocraftKwhPerMonth = (numSigns * 36 * dailyHours * 30) / 1000;
  const glassNeonKwhPerMonth = (numSigns * 350 * dailyHours * 30) / 1000;

  const neocraftMonthlyCost = Math.round(neocraftKwhPerMonth * kwhRate);
  const glassNeonMonthlyCost = Math.round(glassNeonKwhPerMonth * kwhRate);
  const monthlySavings = glassNeonMonthlyCost - neocraftMonthlyCost;
  const annualSavings = monthlySavings * 12;

  return (
    <section id="energy-calculator-section" className="py-20 md:py-28 bg-[#0a0a0c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5" /> 12V GREEN ENERGY & EFFICIENCY
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Brilliant light. Fractions of the power.
          </h2>
          <p className="text-sm text-[#86868b]">
            Engineered with high-efficacy 12V optical chips that deliver up to 90% energy savings compared to obsolete 220V glass neon.
          </p>
        </div>

        {/* 2-Column Calculator Box */}
        <div className="apple-card p-6 sm:p-12 border border-[#2d2d30] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-xs">
              
              {/* Slider 1: Number of Signs */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white">Number of Signs / Presenters:</span>
                  <span className="font-mono text-sm font-bold text-[#2997ff]">{numSigns} {numSigns === 1 ? 'Sign' : 'Signs'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={numSigns}
                  onChange={(e) => { playClickSound(); setNumSigns(Number(e.target.value)); }}
                  className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
                />
                <div className="flex justify-between text-[10px] text-[#86868b] mt-1">
                  <span>1 Unit (Home)</span>
                  <span>5 Units (Cafe/Bar)</span>
                  <span>10 Units (Club/Hotel)</span>
                </div>
              </div>

              {/* Slider 2: Daily Runtime */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white">Daily Runtime:</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{dailyHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="2"
                  value={dailyHours}
                  onChange={(e) => { playClickSound(); setDailyHours(Number(e.target.value)); }}
                  className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-[#86868b] mt-1">
                  <span>2 Hours (Evening)</span>
                  <span>8 Hours (Nightly)</span>
                  <span>24 Hours (Storefront)</span>
                </div>
              </div>

              {/* Green Highlights */}
              <div className="pt-4 border-t border-[#222225] grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>90% Lower Carbon Footprint</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero High-Voltage Heat</span>
                </div>
              </div>

            </div>

            {/* Right Cost Savings Comparison Card (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl bg-[#111113] p-6 sm:p-8 border border-[#262629] space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider block">
                    Estimated Annual Electricity Savings
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-400 tracking-tight mt-1">
                    Save {formatPrice(annualSavings, selectedCurrency)} / yr
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingDown className="w-6 h-6" />
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="space-y-3 pt-2 text-xs">
                
                {/* Neocraft */}
                <div className="p-3.5 rounded-xl bg-[#1a1a1d] border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>NEOCRAFT 12V Silicon LED</span>
                    </div>
                    <div className="text-[11px] text-[#86868b] mt-0.5">{Math.round(neocraftKwhPerMonth)} kWh / month</div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-white text-sm">
                      {formatPrice(neocraftMonthlyCost, selectedCurrency)}
                    </span>
                    <span className="text-[10px] text-[#86868b] block">/ month</span>
                  </div>
                </div>

                {/* Traditional Neon */}
                <div className="p-3.5 rounded-xl bg-[#141416] border border-[#222225] flex items-center justify-between opacity-70">
                  <div>
                    <div className="font-medium text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>Legacy 220V Glass Neon</span>
                    </div>
                    <div className="text-[11px] text-[#86868b] mt-0.5">{Math.round(glassNeonKwhPerMonth)} kWh / month</div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-slate-300 text-sm line-through">
                      {formatPrice(glassNeonMonthlyCost, selectedCurrency)}
                    </span>
                    <span className="text-[10px] text-[#86868b] block">/ month</span>
                  </div>
                </div>

              </div>

              <div className="text-[10px] text-[#86868b] text-center">
                *Estimated based on standard commercial electricity tariff of ₹8.00/kWh.
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
