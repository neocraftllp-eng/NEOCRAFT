import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Zap, 
  Sun, 
  Sparkles, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2,
  Car
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const BATTERY_PRESETS = [
  { id: 'powerbank', name: '20,000mAh USB-C Power Bank', capacityWh: 74, icon: Zap, tag: 'Portable & Pop-Up' },
  { id: 'inverter', name: 'Standard Home Inverter (150Ah)', capacityWh: 1800, icon: BatteryCharging, tag: 'Zero Blackout Interruption' },
  { id: 'solar', name: 'Solar Generator / EcoFlow (500Wh)', capacityWh: 500, icon: Sun, tag: '100% Green Energy' },
  { id: 'car', name: '12V Vehicle / Van Life Battery', capacityWh: 600, icon: Car, tag: 'Food Trucks & Events' }
];

export default function AppleBatteryRuntimeCalculator() {
  const [selectedBattery, setSelectedBattery] = useState(BATTERY_PRESETS[1]); // Home Inverter
  const [signWattage, setSignWattage] = useState(24); // 24W Standard

  // Calculation
  const hoursRuntime = Math.round((selectedBattery.capacityWh * 0.85) / signWattage);
  const daysRuntime = (hoursRuntime / 24).toFixed(1);

  return (
    <section id="battery-calc-section" className="py-20 md:py-28 bg-[#09090c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <BatteryCharging className="w-3.5 h-3.5" /> 12V HIGH-EFFICIENCY SOLID STATE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Illuminates for days on single charge.
          </h2>
          <p className="text-sm text-[#86868b]">
            Operating at ultra-safe 12V DC, NEOCRAFT signs consume 90% less electricity than legacy 220V glass neon. Run continuously during power outages on any home inverter or portable battery.
          </p>
        </div>

        {/* 2-Column Split: Interactive Sliders + Big Battery Gauge HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Battery Source & Wattage Configurator (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            
            {/* Battery Source Presets */}
            <div className="space-y-2">
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                Select Power / Battery Source:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BATTERY_PRESETS.map((bp) => {
                  const Icon = bp.icon;
                  return (
                    <button
                      key={bp.id}
                      onClick={() => { playClickSound(); setSelectedBattery(bp); }}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedBattery.id === bp.id
                          ? 'bg-[#1e1e24] border-white text-white shadow-md'
                          : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#2997ff]" />
                        <span className="font-semibold text-white text-xs">{bp.name.split(' (')[0]}</span>
                      </div>
                      <div className="text-[10px] text-[#2997ff] font-mono">{bp.tag}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wattage Slider */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#86868b] font-semibold">Sign Size & Wattage Draw:</span>
                <span className="font-mono text-white text-sm font-bold">{signWattage} Watts</span>
              </div>
              <input
                type="range"
                min="12"
                max="60"
                step="4"
                value={signWattage}
                onChange={(e) => setSignWattage(Number(e.target.value))}
                className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>Compact (12W)</span>
                <span>Standard (24W)</span>
                <span>Grand 160cm (60W)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Runtime Gauge HUD (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#182030] to-[#10131a] border border-[#2997ff]/40 shadow-2xl text-center space-y-4">
              
              <div className="w-12 h-12 mx-auto rounded-full bg-[#2997ff]/20 border border-[#2997ff]/50 flex items-center justify-center text-[#2997ff]">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs text-[#86868b] font-medium block">Continuous Runtime</span>
                <div className="text-5xl font-black text-white tracking-tight my-1">
                  {hoursRuntime} <span className="text-2xl font-normal text-[#2997ff]">Hours</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium font-mono">
                  ≈ {daysRuntime} Full Days of Non-Stop Glow
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Safe Touch 12V Low Voltage</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Inverter Conversion Humming Noise</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
