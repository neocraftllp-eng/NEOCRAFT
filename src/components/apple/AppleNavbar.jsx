import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Sparkles, 
  Volume2, 
  VolumeX, 
  Gift, 
  Compass, 
  Camera, 
  Package, 
  Building2, 
  Sliders, 
  RefreshCw,
  Palette,
  Music,
  Leaf,
  Sun,
  Moon,
  User,
  Zap,
  SlidersHorizontal,
  Flame,
  Truck,
  Layers,
  Award,
  Battery,
  Shield,
  Heart,
  HelpCircle,
  FileText
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../../audio/soundEffects';
import { CURRENCIES } from '../../utils/pricing';
import { getCurrentCustomer } from '../../services/customerAuth';

export default function AppleNavbar({
  currentPage = 'home',
  cartCount = 0,
  theme = 'dark',
  onToggleTheme,
  onOpenCart,
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator,
  onOpenConsultation,
  onOpenTradeIn,
  onOpenGiftCard,
  onOpenSimulator,
  onOpenBackingSimulator,
  onOpenMultiLang,
  onOpenCorporateBulk,
  onOpenSmartHome,
  onOpenMultiPanel,
  onOpenColorPsychology,
  onOpenAIGenerator,
  onOpenSizingVisualizer,
  onOpenWishlist,
  onOpenGSTInvoice,
  onOpenRealWallUploader,
  onOpenTradePartner,
  onOpenCatalogDownload,
  onOpenVibeQuiz,
  onOpenSpinWheel,
  selectedCurrency = 'INR',
  onChangeCurrency,
  soundActive = true,
  onToggleSound,
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [customer, setCustomer] = useState(getCurrentCustomer);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleAuthSync = () => {
      setCustomer(getCurrentCustomer());
    };
    window.addEventListener('neocraft_auth_changed', handleAuthSync);
    return () => window.removeEventListener('neocraft_auth_changed', handleAuthSync);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (pageId) => {
    playClickSound();
    setMobileMenuOpen(false);
    setIsExploreOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none" ref={dropdownRef}>
      
      {/* 1. Global Slim Announcement Banner */}
      <div className="bg-[#111113] border-b border-[#222225] px-4 py-1.5 text-center text-[11px] text-[#a1a1a6] flex items-center justify-center gap-2">
        <span>Get up to 15% off your custom neon or illuminated 3D facade. Code: <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">NEO15</strong></span>
        <button 
          onClick={() => { playClickSound(); onOpenSpinWheel(); }}
          className="text-[#2997ff] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
        >
          <span>Spin</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2. Main Apple Minimal Frosted Navigation Bar */}
      <nav className="apple-nav-blur h-12 w-full border-b border-[#222225]/80">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between text-xs text-[#cccccc]">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity shrink-0"
          >
            <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-[#0071e3] to-[#00F0FF] p-0.5 flex items-center justify-center shadow-md shadow-[#0071e3]/30">
              <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center">
                <Zap className="w-3 h-3 text-[#2997ff] fill-[#2997ff]" />
              </div>
            </div>
            <span className="font-bold text-white tracking-tight text-sm">NEOCRAFT</span>
          </div>

          {/* Clean Desktop Navigation Menu (6 Core Links + Explore Dropdown) */}
          <div className="hidden lg:flex items-center gap-5 text-[#d1d1d6] text-[13px] font-normal tracking-tight">
            <button 
              onClick={() => handleNav('home')} 
              className={`transition-colors cursor-pointer ${currentPage === 'home' ? 'text-white font-bold' : 'hover:text-white'}`}
            >
              Store
            </button>
            <button 
              onClick={() => handleNav('custom-studio')} 
              className={`transition-colors cursor-pointer flex items-center gap-1 ${currentPage === 'custom-studio' ? 'text-[#2997ff] font-bold' : 'hover:text-white'}`}
            >
              <span>Custom Studio</span>
              <span className="text-[9px] font-bold text-[#2997ff] bg-[#2997ff]/15 px-1 py-0.2 rounded">2.0</span>
            </button>
            <button 
              onClick={() => handleNav('paintings')} 
              className={`transition-colors cursor-pointer ${currentPage === 'paintings' ? 'text-amber-300 font-bold' : 'hover:text-white'}`}
            >
              Canvas Art
            </button>
            <button 
              onClick={() => handleNav('bottle-presenters')} 
              className={`transition-colors cursor-pointer flex items-center gap-1 ${currentPage === 'bottle-presenters' ? 'text-[#f56300] font-bold' : 'hover:text-white'}`}
            >
              <span>VIP Presenters</span>
              <span className="text-[9px] font-bold text-[#f56300] uppercase bg-[#f56300]/15 px-1 rounded">VIP</span>
            </button>
            <button 
              onClick={() => handleNav('community')} 
              className={`transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded-full ${
                currentPage === 'community' 
                  ? 'bg-[#ff4500]/20 text-[#ff4500] font-bold border border-[#ff4500]/40' 
                  : 'hover:text-[#ff4500]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500] animate-pulse" />
              <span>r/Community</span>
            </button>
            <button 
              onClick={() => handleNav('tracker')} 
              className={`transition-colors cursor-pointer ${currentPage === 'tracker' ? 'text-emerald-400 font-bold' : 'hover:text-white'}`}
            >
              Track Order
            </button>

            {/* Explore ▾ Flyout Dropdown */}
            <div className="relative">
              <button
                onClick={() => { playClickSound(); setIsExploreOpen(!isExploreOpen); }}
                className={`flex items-center gap-1 py-1 px-2 rounded-lg cursor-pointer transition-all ${
                  isExploreOpen ? 'bg-white/10 text-white font-bold' : 'text-[#a1a1a6] hover:text-white'
                }`}
              >
                <span>Explore</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExploreOpen ? 'rotate-180 text-[#2997ff]' : ''}`} />
              </button>

              {/* Flyout Dropdown Grid */}
              {isExploreOpen && (
                <div className="absolute top-full right-0 mt-2 w-[520px] p-4 bg-[#121216]/95 backdrop-blur-2xl border border-[#2d2d32] rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-4 text-xs">
                  
                  {/* Category 1: Design & Typography */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block mb-2 px-2">
                      Design & Simulators
                    </span>
                    <button 
                      onClick={() => handleNav('fonts')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Palette className="w-3.5 h-3.5 text-pink-400" />
                      <span>Typography Lab (12 Fonts)</span>
                    </button>
                    <button 
                      onClick={() => handleNav('remote')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#2997ff]" />
                      <span>RF Dimmer Remote Simulator</span>
                    </button>
                    <button 
                      onClick={() => handleNav('dreamcolor')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>RGB DreamColor Pixel Studio</span>
                    </button>
                    <button 
                      onClick={() => handleNav('sound-reactive')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Music className="w-3.5 h-3.5 text-purple-400" />
                      <span>Sound-Reactive Studio</span>
                    </button>
                    <button 
                      onClick={() => handleNav('gallery')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-300" />
                      <span>Real Installations Gallery</span>
                    </button>
                  </div>

                  {/* Category 2: Calculators & Commercial */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block mb-2 px-2">
                      Commercial & Calculators
                    </span>
                    <button 
                      onClick={() => handleNav('business-signs')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-white" />
                      <span>3D Architectural Signs</span>
                    </button>
                    <button 
                      onClick={() => handleNav('vastu')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Vastu Shastra Guide</span>
                    </button>
                    <button 
                      onClick={() => handleNav('energy-calculator')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      <span>12V Green Energy Calculator</span>
                    </button>
                    <button 
                      onClick={() => handleNav('battery')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <Battery className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Battery & Inverter Calculator</span>
                    </button>
                    <button 
                      onClick={() => handleNav('support')} 
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-white flex items-center gap-2"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#2997ff]" />
                      <span>Genius Support & 2-Yr Warranty</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

          {/* Right Utility Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select
                value={selectedCurrency}
                onChange={(e) => { playClickSound(); onChangeCurrency(e.target.value); }}
                className="bg-transparent text-[11px] font-medium text-[#a1a1a6] hover:text-white focus:outline-none cursor-pointer pr-3.5 appearance-none"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c} className="bg-[#1d1d1f] text-white">
                    {c}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-0.5 text-[8px] text-[#86868b] pointer-events-none">▼</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#a1a1a6] hover:text-white transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle Dark and Light Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#0071e3] hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = onToggleSound();
                playSwitchSound(next);
              }}
              title={soundActive ? 'Mute FX' : 'Unmute FX'}
              className="p-1.5 text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-[#2997ff]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* VIP Member Account Button */}
            <button
              onClick={() => handleNav(customer ? 'account' : 'login')}
              title={customer ? `VIP Dashboard (${customer.name})` : 'VIP Member Sign In'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                customer 
                  ? 'bg-[#2997ff]/20 text-[#2997ff] border border-[#2997ff]/40 shadow-sm' 
                  : 'text-[#a1a1a6] hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">
                {customer ? (customer.name.split(' ')[0] || 'VIP') : 'Sign In'}
              </span>
            </button>

            {/* Bag Icon */}
            <button
              onClick={() => { playClickSound(); onOpenCart(); }}
              className="relative p-1.5 text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0071e3] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="lg:hidden text-[#a1a1a6] hover:text-white cursor-pointer p-1.5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </nav>

      {/* 3. Clean Categorized Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#000000]/98 backdrop-blur-2xl border-b border-[#2d2d2f] px-6 py-6 space-y-4 text-sm font-medium animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          
          <div className="flex items-center justify-between py-2 border-b border-[#222]">
            <span className="text-[#86868b] text-xs">Theme & Currency:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
                className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#0071e3]" />}
                <span>{theme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}</span>
              </button>
            </div>
          </div>

          <button 
            onClick={() => handleNav(customer ? 'account' : 'login')} 
            className="block w-full text-left py-2.5 text-[#2997ff] border-b border-[#222] font-semibold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{customer ? `VIP Account (${customer.name})` : 'VIP Member Sign In / Register'}</span>
            </span>
            <span className="text-[10px] bg-[#0071e3] text-white px-2 py-0.5 rounded-full font-mono">
              {customer ? 'Dashboard ➔' : '10% Off'}
            </span>
          </button>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block">Primary Store</span>
            <button onClick={() => handleNav('home')} className="block w-full text-left py-2 text-white border-b border-[#222]">
              🏠 Store Overview
            </button>
            <button onClick={() => handleNav('custom-studio')} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222] font-semibold">
              ⚡ Custom Neon Studio 2.0
            </button>
            <button onClick={() => handleNav('paintings')} className="block w-full text-left py-2 text-amber-300 border-b border-[#222]">
              🖼️ Museum Canvas Prints (18+ Artworks)
            </button>
            <button onClick={() => handleNav('bottle-presenters')} className="block w-full text-left py-2 text-[#f56300] border-b border-[#222] font-semibold">
              🍾 VIP LED Bottle Presenters
            </button>
            <button onClick={() => handleNav('community')} className="block w-full text-left py-2 text-[#ff4500] border-b border-[#222] font-semibold">
              🔥 r/NEOCRAFT Creators Community
            </button>
            <button onClick={() => handleNav('tracker')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
              📦 Live Order & Logistics Tracker
            </button>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block">Design & Tools</span>
            <button onClick={() => handleNav('fonts')} className="block w-full text-left py-2 text-pink-300 border-b border-[#222]">
              ✍️ Typography Lab (12 Fonts)
            </button>
            <button onClick={() => handleNav('remote')} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
              📱 RF Dimmer Remote Simulator
            </button>
            <button onClick={() => handleNav('dreamcolor')} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
              🌈 RGB DreamColor Studio
            </button>
            <button onClick={() => handleNav('sound-reactive')} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
              🎵 Sound-Reactive Studio
            </button>
            <button onClick={() => handleNav('business-signs')} className="block w-full text-left py-2 text-white border-b border-[#222]">
              🏢 3D Architectural Signs
            </button>
            <button onClick={() => handleNav('vastu')} className="block w-full text-left py-2 text-amber-400 border-b border-[#222]">
              🧭 Vastu Shastra Placement Guide
            </button>
            <button onClick={() => handleNav('energy-calculator')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
              ⚡ 12V Green Energy Cost Calculator
            </button>
            <button onClick={() => handleNav('support')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
              🛡️ Genius Support & 2-Year Warranty
            </button>
          </div>

        </div>
      )}

    </header>
  );
}
