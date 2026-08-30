import React from 'react';
import { Zap, ShieldCheck, Sparkles, Layers, Award, Droplets, CheckCircle2 } from 'lucide-react';

export default function AppleBentoGrid() {
  return (
    <section id="overview-section" className="py-20 md:py-28 bg-[#000000] text-white select-none">
      <div className="max-w-[1024px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#f56300] uppercase">
            CRAFTED WITH PRECISION
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Engineered to illuminate. Built to endure.
          </h2>
        </div>

        {/* 4-Tile Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Tile 1: Optical Silicone Flex (7 cols) */}
          <div className="md:col-span-7 apple-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold text-[#2997ff] uppercase tracking-wider">
                Optical Silicone Flex
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                50,000 hours of continuous, uniform luminescence.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed max-w-md">
                Unlike fragile glass neon, our shatterproof food-grade silicone flex provides a flawless 120° diffuse light beam with zero hot spots or color fading.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2d2d30] flex items-center gap-6 text-xs text-[#a1a1a6]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Uniform Diffusion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Glass Hazard</span>
              </div>
            </div>
          </div>

          {/* Tile 2: 12V Silent Power (5 cols) */}
          <div className="md:col-span-5 apple-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
            
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold text-[#f56300] uppercase tracking-wider">
                Safe Touch Voltage
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                12V DC. Safe to touch. Completely silent.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                Operating on ultra-low 12V voltage with certified MeanWell power drivers. No high-voltage electrical hum or heat buildup.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2d2d30] flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Zap className="w-4 h-4" />
              <span>Certified Child & Pet Safe</span>
            </div>
          </div>

          {/* Tile 3: IP67 Weatherproof (5 cols) */}
          <div className="md:col-span-5 apple-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                IP67 Weatherproof
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                Ready for monsoons, heat, and high humidity.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                Hermetically sealed silicone channels engineered for luxury outdoor storefronts and building facades across India.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2d2d30] flex items-center gap-2 text-xs text-purple-300 font-medium">
              <Droplets className="w-4 h-4" />
              <span>Outdoor Grade Sealing</span>
            </div>
          </div>

          {/* Tile 4: 6mm Optical Cast Acrylic (7 cols) */}
          <div className="md:col-span-7 apple-card p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider">
                Diamond Acrylic Backplate
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                6mm cast virgin acrylic. Laser polished clarity.
              </h3>
              <p className="text-sm text-[#86868b] leading-relaxed max-w-md">
                Precision CNC contour cutting with stainless steel & brushed brass standoff wall spacers for an ethereal floating illusion.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2d2d30] flex items-center gap-6 text-xs text-[#a1a1a6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2997ff]" />
                <span>2-Year Direct Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>100% Pan-India Transit Insurance</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
