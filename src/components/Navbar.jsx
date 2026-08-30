import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Volume2, 
  VolumeX, 
  Gift, 
  Camera, 
  Briefcase, 
  MessageCircle, 
  Compass,
  Menu,
  X,
  Layers,
  Wand2
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../audio/soundEffects';
import { CURRENCIES } from '../utils/pricing';

export default function Navbar({
  cartItems = [],
  onOpenCart,
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator,
  onOpenVibeQuiz,
  onOpenSpinWheel,
  soundActive,
  onToggleSound,
  selectedCurrency,
  onChangeCurrency,
  activeSection,
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleNavClick = (sectionId) => {
    playClickSound();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080a11]/85 border-b border-slate-800/80 transition-all duration-300">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-900/60 via-purple-900/60 to-cyan-900/60 border-b border-pink-500/20 px-4 py-1.5 text-xs text-center font-medium text-pink-200 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-yellow-300 font-semibold animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> FESTIVE FLASH DROP:
        </span>
        <span>Use code <strong className="text-white bg-pink-500/30 px-1.5 py-0.5 rounded border border-pink-400/40">NEO15</strong> for 15% OFF + Free Dimmer Remote!</span>
        <button 
          onClick={() => { playClickSound(); onOpenSpinWheel(); }}
          className="hidden sm:inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100 underline font-semibold ml-2 cursor-pointer"
        >
          <Gift className="w-3 h-3" /> Spin to Win Perks →
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(236,72,153,0.5)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#090b12] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-xl tracking-tighter bg-gradient-to-tr from-pink-400 via-white to-cyan-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                NX
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-xl text-white font-['Plus_Jakarta_Sans',sans-serif]">
                NEO<span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">CRAFT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">Bespoke LED Neon & Signs</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => { playClickSound(); onOpenStudio(); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>Custom Studio</span>
            <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ml-1">Live</span>
          </button>

          <button
            onClick={() => handleNavClick('catalog')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeSection === 'catalog' ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Catalog
          </button>

          <button
            onClick={() => { playClickSound(); onOpenVisualizer(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Room AR</span>
          </button>

          <button
            onClick={() => { playClickSound(); onOpenLogoEstimator(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Logo Estimator</span>
          </button>

          <button
            onClick={() => { playClickSound(); onOpenVibeQuiz(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span>Vibe Quiz</span>
          </button>

          <button
            onClick={() => handleNavClick('lookbook')}
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Lookbook
          </button>

          <button
            onClick={() => handleNavClick('reviews')}
            className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            Reviews
          </button>
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const newState = onToggleSound();
              playSwitchSound(newState);
            }}
            title={soundActive ? 'Mute Neon FX Audio' : 'Unmute Neon FX Audio'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundActive 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={(e) => { playClickSound(); onChangeCurrency(e.target.value); }}
              className="bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold text-slate-200 rounded-lg px-2 py-2 cursor-pointer focus:outline-none focus:border-cyan-500 appearance-none pr-6"
            >
              {Object.keys(CURRENCIES).map((curr) => (
                <option key={curr} value={curr} className="bg-slate-900 text-white">
                  {CURRENCIES[curr].name}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-2.5 pointer-events-none text-slate-400 text-[10px]">▼</span>
          </div>

          {/* Spin Wheel Promo Button */}
          <button
            onClick={() => { playClickSound(); onOpenSpinWheel(); }}
            title="Spin to Win Discounts"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-100 text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)] cursor-pointer"
          >
            <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Spin & Win</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919166691274?text=Hello%20Neocraft,%20I%20want%20to%20get%20a%20quote%20for%20a%20custom%20neon%20/%20signage"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Drawer Button */}
          <button
            onClick={() => { playClickSound(); onOpenCart(); }}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-pink-500 text-slate-200 hover:text-pink-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0c16] border-b border-slate-800 px-4 py-4 space-y-2">
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenStudio(); }}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-pink-500/15 border border-pink-500/40 text-pink-300 font-semibold text-sm"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Live Custom Neon Studio
            </span>
            <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">Build Now</span>
          </button>

          <button
            onClick={() => handleNavClick('catalog')}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-800 text-slate-200 font-medium text-sm"
          >
            Browse All Products & Signages
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenVisualizer(); }}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-800 text-cyan-300 font-medium text-sm"
          >
            <Camera className="w-4 h-4 text-cyan-400" /> Test Signs on Your Wall (AR)
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenLogoEstimator(); }}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-800 text-amber-300 font-medium text-sm"
          >
            <Briefcase className="w-4 h-4 text-amber-400" /> Bespoke Logo & 3D Sign Estimator
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenVibeQuiz(); }}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-800 text-purple-300 font-medium text-sm"
          >
            <Wand2 className="w-4 h-4 text-purple-400" /> Vibe Discovery Quiz
          </button>

          <button
            onClick={() => handleNavClick('lookbook')}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-800 text-slate-200 font-medium text-sm"
          >
            Customer Installs Lookbook
          </button>

          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-800 text-slate-200 font-medium text-sm"
          >
            Reviews & Trust Ratings
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenSpinWheel(); }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-200 font-bold text-sm"
          >
            <Gift className="w-4 h-4 text-amber-400" /> Spin Neon Wheel For Discounts
          </button>
        </div>
      )}
    </header>
  );
}
