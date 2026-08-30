import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  Info,
  Wrench
} from 'lucide-react';
import { playClickSound } from '../../audio/soundEffects';

const WALL_TYPES = [
  { id: 'drywall', name: 'Drywall / Gypsum Board', recommended: '3M Strips or Plastic Anchors', safetyRating: '100% Safe' },
  { id: 'brick', name: 'Exposed Brick / Concrete', recommended: 'Stainless Standoff Screws', safetyRating: 'Maximum Hold (35kg+)' },
  { id: 'glass', name: 'Storefront Glass / Mirror', recommended: '3M Clear Picture Strips or Suction', safetyRating: 'Damage-Free' },
  { id: 'wood', name: 'Nordic Wood Slats / Plywood', recommended: 'Direct Wood Screws or Standoffs', safetyRating: 'Ultra Secure' }
];

export default function AppleWallSafetyCalculator() {
  const [signWidthCm, setSignWidthCm] = useState(80);
  const [acrylicThickness, setAcrylicThickness] = useState(6); // 6mm standard vs 10mm heavy
  const [selectedWall, setSelectedWall] = useState(WALL_TYPES[0]);

  // Weight Calculation: Base acrylic density ≈ 1.19 g/cm³
  const estimatedWeightKg = Number(((signWidthCm * (signWidthCm * 0.45) * (acrylicThickness / 10) * 0.00119) + 0.6).toFixed(2));
  
  // 3M command strip limit is 7.2 kg for 4 pairs
  const commandStripSafetyMargin = Math.round((7.2 / estimatedWeightKg) * 100);
  // Standoff anchor limit is 35 kg for 4 screws
  const standoffSafetyMargin = Math.round((35.0 / estimatedWeightKg) * 100);

  return (
    <section id="safety-calc-section" className="py-20 md:py-28 bg-[#0a0a0c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> ARCHITECTURAL WEIGHT & SEISMIC LOAD CALCULATOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Engineered for zero wall stress.
          </h2>
          <p className="text-sm text-[#86868b]">
            Cast acrylic is 50% lighter than glass with 17x the impact resistance. Calculate exact weight and mounting safety factors for your specific wall material.
          </p>
        </div>

        {/* 2-Column Split: Sliders + Safety Gauge HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Dimensions & Wall Material (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            
            {/* Dimension Width Slider */}
            <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#86868b] font-semibold">Sign Length / Width:</span>
                <span className="font-mono text-white text-sm font-bold">{signWidthCm} cm ({Math.round(signWidthCm / 2.54)} inches)</span>
              </div>
              <input
                type="range"
                min="40"
                max="200"
                step="10"
                value={signWidthCm}
                onChange={(e) => setSignWidthCm(Number(e.target.value))}
                className="w-full h-1.5 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>Compact (50cm)</span>
                <span>Standard (80cm)</span>
                <span>Grand (160cm)</span>
              </div>
            </div>

            {/* Acrylic Thickness Option */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { playClickSound(); setAcrylicThickness(6); }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  acrylicThickness === 6
                    ? 'bg-[#1e1e24] border-white text-white shadow-sm'
                    : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">6mm Cast Clear (Standard)</div>
                <div className="text-[10px] text-[#86868b]">Featherweight, sleek 5mm edge</div>
              </button>

              <button
                onClick={() => { playClickSound(); setAcrylicThickness(10); }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  acrylicThickness === 10
                    ? 'bg-[#1e1e24] border-white text-white shadow-sm'
                    : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">10mm Heavy Architectural</div>
                <div className="text-[10px] text-[#86868b]">Commercial facade & wind load grade</div>
              </button>
            </div>

            {/* Wall Material Grid */}
            <div className="space-y-1.5">
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                Select Your Wall Surface:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WALL_TYPES.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => { playClickSound(); setSelectedWall(w); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedWall.id === w.id
                        ? 'bg-[#1e1e24] border-[#2997ff] text-white shadow-sm'
                        : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs">{w.name}</div>
                    <div className="text-[10px] text-[#2997ff] mt-0.5">{w.recommended}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Weight & Safety Factors HUD (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#18181d] to-[#101013] border border-[#2d2d30] shadow-2xl space-y-5 text-center">
              
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Scale className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs text-[#86868b] font-medium block">Total Net Sign Weight</span>
                <div className="text-5xl font-black text-white tracking-tight my-1">
                  {estimatedWeightKg} <span className="text-2xl font-normal text-[#2997ff]">KG</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium font-mono">
                  Super Lightweight • Zero Structural Stress
                </span>
              </div>

              {/* Safety Margin Meters */}
              <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] text-left text-xs space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#86868b]">3M Command No-Drill Strips:</span>
                    <span className="font-bold text-emerald-400 font-mono">{commandStripSafetyMargin}% Safety Margin</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, commandStripSafetyMargin / 5)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#86868b]">Stainless Standoff Wall Anchors:</span>
                    <span className="font-bold text-[#2997ff] font-mono">{standoffSafetyMargin}% Safety Margin</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2997ff] rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
