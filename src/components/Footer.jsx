import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Send,
  Heart,
  Globe,
  Share2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../audio/soundEffects';

export default function Footer({
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator,
  onOpenVibeQuiz
}) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      playChimeSound();
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#05070c] border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Top Banner Feature Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-[#080a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">2-Year Replacement Warranty</div>
              <div className="text-[11px] text-slate-400">Complete peace of mind on all LED flex</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Pan-India Free Express</div>
              <div className="text-[11px] text-slate-400">Shock-resistant wooden crate packaging</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Fast 3-5 Day Dispatch</div>
              <div className="text-[11px] text-slate-400">Rapid precision handcrafted production</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">24/7 WhatsApp Support</div>
              <div className="text-[11px] text-slate-400">Instant design proofs & consultation</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <div className="w-full h-full bg-[#090b12] rounded-[10px] flex items-center justify-center font-black text-white text-lg">
                NX
              </div>
            </div>
            <span className="font-black text-xl text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              NEO<span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">CRAFT</span>
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            India’s #1 custom LED neon studio and architectural signage manufacturer. Handcrafting bespoke illuminated art for luxury residences, commercial storefronts, cafes, and unforgettable weddings.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-pink-400 hover:border-pink-500 transition-colors flex items-center gap-1.5 font-bold text-[11px]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@neocraft.studio</span>
            </a>
            <a 
              href="https://wa.me/919166691274" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500 transition-colors flex items-center gap-1.5 font-bold text-[11px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Interactive Tools</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => { playClickSound(); onOpenStudio(); }} className="hover:text-pink-400 transition-colors cursor-pointer">
                ⚡ Custom Neon Studio
              </button>
            </li>
            <li>
              <button onClick={() => { playClickSound(); onOpenVisualizer(); }} className="hover:text-cyan-400 transition-colors cursor-pointer">
                📷 Room AR Visualizer
              </button>
            </li>
            <li>
              <button onClick={() => { playClickSound(); onOpenLogoEstimator(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                🏢 Business Logo Estimator
              </button>
            </li>
            <li>
              <button onClick={() => { playClickSound(); onOpenVibeQuiz(); }} className="hover:text-purple-400 transition-colors cursor-pointer">
                🪄 Neon Vibe Quiz
              </button>
            </li>
          </ul>
        </div>

        {/* Product Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Sign Collections</h4>
          <ul className="space-y-2">
            <li><span className="hover:text-white transition-colors cursor-pointer">Archangel Neon Wings</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Anime & Cyberpunk Neon</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Cocktail & Bar Lounge</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Wedding Backdrop Signs</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">3D Backlit Acrylic Letters</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Laser Brushed Brass Signage</span></li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">VIP Neon Club</h4>
          <p className="text-[11px] text-slate-400">
            Subscribe for exclusive drop discounts, secret fonts, and interior styling guides.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-1.5">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-bold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 font-semibold">
                ✓ Welcome! Code NEO15 unlocked for you.
              </p>
            )}
          </form>

          <div className="pt-2 text-[11px] space-y-1 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>+91 91666 91274 / +91 91666 91274</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-pink-400" />
              <span>studio@neocraftx.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-900 py-6 bg-[#040508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NEOCRAFT X STUDIO. All rights reserved. Handcrafted with pride in India.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Warranty Policy</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
