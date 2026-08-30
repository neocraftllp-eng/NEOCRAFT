import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
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
  Leaf
} from 'lucide-react';
import { playClickSound, playSwitchSound } from '../../audio/soundEffects';
import { CURRENCIES } from '../../utils/pricing';

export default function AppleNavbar({
  currentPage = 'home',
  cartCount = 0,
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

  const handleNav = (pageId) => {
    playClickSound();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      
      {/* 1. Global Announcement Banner */}
      <div className="bg-[#1d1d1f] border-b border-[#2d2d2f] px-4 py-2 text-center text-xs text-[#a1a1a6] flex items-center justify-center gap-2">
        <span>Get up to 15% off your custom neon or illuminated 3D facade. Use code <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">NEO15</strong>.</span>
        <button 
          onClick={() => { playClickSound(); onOpenSpinWheel(); }}
          className="text-[#2997ff] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
        >
          <span>Spin for Perks</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* 2. Main Apple Global Frosted Navigation */}
      <nav className="apple-nav-blur h-12 w-full">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between text-xs text-[#cccccc]">
          
          {/* Apple-style Geometric Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
              </svg>
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">NEOCRAFT</span>
          </div>

          {/* Center Navigation Links (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-[#d1d1d6] text-[12px] font-normal tracking-tight">
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
              <span className="text-[9px] font-bold text-[#2997ff] uppercase">2.0</span>
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
              <span>Bottle Presenters</span>
              <span className="text-[9px] font-bold text-[#f56300] uppercase bg-[#f56300]/15 px-1 rounded">VIP</span>
            </button>
            <button 
              onClick={() => handleNav('business-signs')} 
              className={`transition-colors cursor-pointer ${currentPage === 'business-signs' ? 'text-white font-bold' : 'hover:text-white'}`}
            >
              Business Signs
            </button>
            <button 
              onClick={() => handleNav('vastu')} 
              className={`transition-colors cursor-pointer ${currentPage === 'vastu' ? 'text-amber-400 font-bold' : 'hover:text-white'}`}
            >
              Vastu Guide
            </button>
            <button 
              onClick={() => handleNav('gallery')} 
              className={`transition-colors cursor-pointer ${currentPage === 'gallery' ? 'text-purple-300 font-bold' : 'hover:text-white'}`}
            >
              Real Spaces
            </button>
            <button 
              onClick={() => handleNav('fonts')} 
              className={`transition-colors cursor-pointer ${currentPage === 'fonts' ? 'text-pink-400 font-bold' : 'hover:text-white'}`}
            >
              Fonts Lab
            </button>
            <button 
              onClick={() => handleNav('remote')} 
              className={`transition-colors cursor-pointer ${currentPage === 'remote' ? 'text-[#2997ff] font-bold' : 'hover:text-white'}`}
            >
              RF Remote
            </button>
            <button 
              onClick={() => handleNav('tracker')} 
              className={`transition-colors cursor-pointer ${currentPage === 'tracker' ? 'text-emerald-400 font-bold' : 'hover:text-white'}`}
            >
              Track Order
            </button>
            <button 
              onClick={() => handleNav('weddings')} 
              className={`transition-colors cursor-pointer ${currentPage === 'weddings' ? 'text-pink-300 font-bold' : 'hover:text-white'}`}
            >
              Weddings
            </button>
            <button 
              onClick={() => handleNav('dreamcolor')} 
              className={`transition-colors cursor-pointer ${currentPage === 'dreamcolor' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
            >
              RGB Pixel
            </button>
            <button 
              onClick={() => handleNav('support')} 
              className={`transition-colors cursor-pointer ${currentPage === 'support' ? 'text-[#2997ff] font-bold' : 'hover:text-white'}`}
            >
              Support
            </button>
          </div>

          {/* Right Utility Icons (Currency, Sound, Bag, Mobile Toggle) */}
          <div className="flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <select
                value={selectedCurrency}
                onChange={(e) => { playClickSound(); onChangeCurrency(e.target.value); }}
                className="bg-transparent text-[11px] font-medium text-[#a1a1a6] hover:text-white focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c} className="bg-[#1d1d1f] text-white">
                    {c}
                  </option>
                ))}
              </select>
              <span className="absolute right-0 top-0.5 text-[8px] text-[#86868b] pointer-events-none">▼</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = onToggleSound();
                playSwitchSound(next);
              }}
              title={soundActive ? 'Mute Neon FX' : 'Unmute Neon FX'}
              className="text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-[#2997ff]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Bag Icon */}
            <button
              onClick={() => { playClickSound(); onOpenCart(); }}
              className="relative text-[#a1a1a6] hover:text-white transition-colors cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#0071e3] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="md:hidden text-[#a1a1a6] hover:text-white cursor-pointer p-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </nav>

      {/* 3. Apple Sub-Navigation Ribbon (Sticky Product Bar) */}
      <div className="apple-ribbon-blur h-11 w-full border-b border-[#2d2d2f]">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-3">
            <button onClick={() => handleNav('home')} className="font-semibold text-white tracking-tight cursor-pointer hover:text-[#2997ff] transition-colors">
              NEOCRAFT Pro
            </button>
            <span className="hidden sm:inline-block text-[11px] text-[#86868b]">Titanium of Light</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-normal overflow-x-auto no-scrollbar py-1">
            <button 
              onClick={() => handleNav('home')} 
              className={`whitespace-nowrap transition-colors cursor-pointer ${currentPage === 'home' ? 'text-white font-semibold' : 'text-[#86868b] hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => handleNav('catalog')} 
              className={`whitespace-nowrap transition-colors cursor-pointer ${currentPage === 'catalog' ? 'text-white font-semibold' : 'text-[#86868b] hover:text-white'}`}
            >
              All Models
            </button>
            <button 
              onClick={() => handleNav('paintings')} 
              className={`whitespace-nowrap transition-colors cursor-pointer ${currentPage === 'paintings' ? 'text-amber-300 font-semibold' : 'text-[#86868b] hover:text-white'}`}
            >
              Canvas Art
            </button>
            <button 
              onClick={() => handleNav('bottle-presenters')} 
              className={`whitespace-nowrap transition-colors cursor-pointer ${currentPage === 'bottle-presenters' ? 'text-[#f56300] font-semibold' : 'text-[#86868b] hover:text-white'}`}
            >
              VIP Presenters
            </button>
            <button 
              onClick={() => handleNav('custom-studio')} 
              className={`whitespace-nowrap transition-colors cursor-pointer ${currentPage === 'custom-studio' ? 'text-[#2997ff] font-semibold' : 'text-[#86868b] hover:text-white'}`}
            >
              Custom Studio
            </button>

            <button 
              onClick={() => { playClickSound(); onOpenSimulator(); }} 
              className="hidden md:inline text-cyan-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              3D Simulator
            </button>

            <button 
              onClick={() => { playClickSound(); onOpenTradePartner(); }} 
              className="hidden md:inline text-[#2997ff] hover:underline cursor-pointer font-medium whitespace-nowrap"
            >
              For Architects
            </button>

            <button 
              onClick={() => { playClickSound(); onOpenTradeIn(); }} 
              className="hidden sm:inline text-emerald-400 hover:underline cursor-pointer font-medium whitespace-nowrap"
            >
              Trade-In
            </button>

            <button
              onClick={() => handleNav('custom-studio')}
              className="apple-btn-primary py-1 px-3 text-xs cursor-pointer whitespace-nowrap"
            >
              Buy
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#000000]/98 backdrop-blur-2xl border-b border-[#2d2d2f] px-6 py-6 space-y-3.5 text-sm font-medium animate-in slide-in-from-top-4 duration-200">
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
          <button onClick={() => handleNav('business-signs')} className="block w-full text-left py-2 text-white border-b border-[#222]">
            🏢 3D Architectural Business Signs
          </button>
          <button onClick={() => handleNav('vastu')} className="block w-full text-left py-2 text-amber-400 border-b border-[#222]">
            🧭 Vastu Shastra Placement Guide
          </button>
          <button onClick={() => handleNav('gallery')} className="block w-full text-left py-2 text-purple-300 border-b border-[#222]">
            📸 Real Spaces (Illuminated by NEOCRAFT)
          </button>
          <button onClick={() => handleNav('sound-reactive')} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
            🎵 Sound-Reactive Acoustic Studio
          </button>
          <button onClick={() => handleNav('energy-calculator')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
            ⚡ 12V Green Energy Cost Calculator
          </button>
          <button onClick={() => handleNav('tracker')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
            📦 Live Order & Production Tracker
          </button>
          <button onClick={() => handleNav('fonts')} className="block w-full text-left py-2 text-pink-300 border-b border-[#222]">
            ✍️ Signature Typography Lab (12 Fonts)
          </button>
          <button onClick={() => handleNav('remote')} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            📱 Handheld RF Dimmer Remote Simulator
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenCatalogDownload(); }} className="block w-full text-left py-2 text-white border-b border-[#222]">
            📖 Download 2026 Architectural Lookbook PDF
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenSimulator(); }} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
            🛋️ 3D Room Material Simulator
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenTradePartner(); }} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            🏛️ For Architects & Designers (25% Off)
          </button>
          <button onClick={() => handleNav('support')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
            🛡️ Apple Genius Support & Troubleshooting
          </button>
          <button onClick={() => handleNav('unboxing')} className="block w-full text-left py-2 text-white border-b border-[#222]">
            📦 White-Glove VIP Unboxing Architecture
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenBackingSimulator(); }} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
            ✨ Acrylic Backing Cut-to-Shape Simulator
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenGiftCard(); }} className="block w-full text-left py-2 text-white border-b border-[#222]">
            🎁 Luxury Digital Gift Cards
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenMultiLang(); }} className="block w-full text-left py-2 text-amber-300 border-b border-[#222]">
            🕉️ Multi-Language Calligraphy (Devanagari, Arabic, Japanese)
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenCorporateBulk(); }} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            🏢 Corporate Bulk Gifting & Tiered Wholesale (35% Off)
          </button>
          <button onClick={() => handleNav('battery')} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
            🔋 12V Inverter & Battery Runtime Calculator
          </button>
          <button onClick={() => handleNav('weddings')} className="block w-full text-left py-2 text-pink-300 border-b border-[#222]">
            💍 Weddings & Event Keepsake vs Rental Calculator
          </button>
          <button onClick={() => handleNav('dreamcolor')} className="block w-full text-left py-2 text-cyan-400 border-b border-[#222]">
            🌈 RGB DreamColor Addressable Pixel Chasing Studio
          </button>
          <button onClick={() => handleNav('safety')} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            ⚖️ Sign Weight, Mounting Anchor & Seismic Safety Calculator
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenSmartHome(); }} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            📱 Smart Home Pairing (Apple HomeKit, Siri, Alexa, Google)
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenMultiPanel(); }} className="block w-full text-left py-2 text-amber-300 border-b border-[#222]">
            🖼️ 3-Piece Triptych & 5-Piece Panoramic Multi-Panel Canvas Split
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenColorPsychology(); }} className="block w-full text-left py-2 text-pink-300 border-b border-[#222]">
            🧠 Color Psychology, Kelvin Spectrum & Circadian Guide
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenAIGenerator(); }} className="block w-full text-left py-2 text-cyan-300 border-b border-[#222]">
            ✨ AI Neon Art & Vector Design Generator (Beta)
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenSizingVisualizer(); }} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            📐 Sign Sizing & Optical Viewing Distance Visualizer
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenRealWallUploader(); }} className="block w-full text-left py-2 text-[#2997ff] border-b border-[#222]">
            📷 Upload Real Wall Photo • Instant AR Visualizer
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenGSTInvoice(); }} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222]">
            📄 Official GST Tax Invoice & Proforma PDF Generator
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }} className="block w-full text-left py-2 text-pink-300 border-b border-[#222]">
            🎁 Luxury Gift Registry & Shareable Wishlist
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenTradeIn(); }} className="block w-full text-left py-2 text-emerald-400 border-b border-[#222] font-semibold">
            🔄 NEOCRAFT Trade-In & Upgrade
          </button>
          <button onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }} className="block w-full text-left py-2 text-purple-300 border-b border-[#222]">
            🗓️ Book 1-on-1 Virtual Consultation
          </button>
          <button onClick={() => handleNav('admin')} className="block w-full text-left py-2 text-cyan-300 font-semibold">
            ⚡ Studio Admin & Production Pipeline
          </button>
        </div>
      )}

    </header>
  );
}
