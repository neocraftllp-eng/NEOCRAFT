import React from 'react';
import { playClickSound } from '../../audio/soundEffects';

export default function AppleFooter({
  onNavigate,
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator
}) {
  const handleNav = (pageId) => {
    playClickSound();
    if (onNavigate) onNavigate(pageId);
  };

  return (
    <footer className="bg-[#161617] text-[#86868b] text-[11px] select-none border-t border-[#2d2d30] py-10">
      <div className="max-w-[1040px] mx-auto px-4 space-y-8">
        
        {/* Footnotes */}
        <div className="space-y-1.5 pb-6 border-b border-[#2d2d30] text-[11px] leading-relaxed">
          <p>
            1. 15% promotional discount applies to all handcrafted custom neon signs, VIP presenters, and museum canvas prints with code <strong className="text-white">NEO15</strong>.
          </p>
          <p>
            2. 50,000-hour LED silicone flex operating lifespan is based on continuous 12V DC testing under standard ambient temperature conditions.
          </p>
          <p>
            3. Pan-India free delivery includes shock-resistant custom wooden crate packaging and full transit damage replacement coverage.
          </p>
        </div>

        {/* Multi-Column Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-2">
          
          {/* Col 1: Shop & Collections */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs">Shop & Collections</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('home')}>Store Overview</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('custom-studio')}>Custom Studio 2.0</span></li>
              <li><span className="hover:text-white cursor-pointer text-amber-300" onClick={() => handleNav('paintings')}>Museum Canvas Prints</span></li>
              <li><span className="hover:text-white cursor-pointer text-[#f56300]" onClick={() => handleNav('bottle-presenters')}>VIP Bottle Presenters</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('catalog')}>Signature Neon Art</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('business-signs')}>3D Acrylic Signage</span></li>
            </ul>
          </div>

          {/* Col 2: Interactive Studios */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs">Interactive Tools</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('custom-studio')}>Studio Configurator</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={onOpenVisualizer}>AR Room Try-On</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('business-signs')}>3D Logo Estimator</span></li>
              <li><span className="hover:text-white cursor-pointer text-cyan-400" onClick={() => handleNav('sound-reactive')}>Sound-Reactive Studio</span></li>
              <li><span className="hover:text-white cursor-pointer text-amber-400" onClick={() => handleNav('vastu')}>Vastu Placement Guide</span></li>
              <li><span className="hover:text-white cursor-pointer text-emerald-400" onClick={() => handleNav('energy-calculator')}>12V Energy Calculator</span></li>
            </ul>
          </div>

          {/* Col 3: Real Spaces & B2B */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs">Experience & B2B</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer text-purple-300" onClick={() => handleNav('gallery')}>Illuminated by NEOCRAFT</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('business-signs')}>Hospitality & Lounges</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('business-signs')}>Architectural Facades</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('business-signs')}>Corporate Headquarters</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('reviews')}>Customer Reviews</span></li>
            </ul>
          </div>

          {/* Col 4: Orders & Support */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs">Orders & Support</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer text-emerald-400 font-medium" onClick={() => handleNav('tracker')}>Track Your Order</span></li>
              <li><span className="hover:text-white cursor-pointer text-emerald-300" onClick={() => handleNav('refund-policy')}>2-Year Warranty & Refunds</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('unboxing')}>VIP Wooden Crate Shipping</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('support')}>Installation & Genius Bar</span></li>
              <li><span className="hover:text-white cursor-pointer text-[#2997ff]" onClick={() => handleNav('contact')}>Contact Studio</span></li>
            </ul>
          </div>

          {/* Col 5: Brand & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs">About & Legal</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white cursor-pointer text-white font-medium" onClick={() => handleNav('about')}>About Us</span></li>
              <li><span className="hover:text-white cursor-pointer text-pink-300" onClick={() => handleNav('blog')}>Blog & Design Stories</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('terms')}>Terms & Conditions</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('refund-policy')}>Cancellation Policy</span></li>
              <li><span className="hover:text-white cursor-pointer text-[#2997ff]" onClick={() => handleNav('contact')}>Support & Media</span></li>
            </ul>
          </div>

        </div>

        {/* Copyright & Disclaimers */}
        <div className="pt-6 border-t border-[#2d2d30] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            Copyright © {new Date().getFullYear()} NEOCRAFT Studio X Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[#86868b]">
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('about')}>About Us</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('blog')}>Blog</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('contact')}>Contact</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('refund-policy')}>Refunds & Warranty</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('terms')}>Terms</span>
            <span>•</span>
            <span className="text-[#2997ff] hover:text-white cursor-pointer font-semibold" onClick={() => handleNav('admin')}>Admin Portal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
