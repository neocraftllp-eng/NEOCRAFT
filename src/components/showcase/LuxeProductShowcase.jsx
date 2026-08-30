import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Power, 
  Info, 
  Camera, 
  Check, 
  Layers, 
  Volume2, 
  VolumeX, 
  Gift, 
  Share2,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export const SHOWCASE_PRODUCTS = [
  {
    id: 'wings-archangel',
    title: 'Celestial Archangel Wings LED',
    shortName: 'Celestial Wings',
    categoryIcon: '🪽',
    categoryName: 'Wings',
    doseSpec: '120 cm (47") • 12V DC',
    subtitleNote: 'Handcrafted with shatterproof optical silicone flex, 6mm cast acrylic, and 2-Year replacement warranty.',
    tagline: 'Instagram Viral #1 Photo Backdrop',
    basePriceINR: 9499,
    originalPriceINR: 13999,
    sizes: [
      { id: '30', label: '30', fullLabel: 'Small (30" / 75cm)', priceINR: 6499 },
      { id: '60', label: '60', fullLabel: 'Standard (47" / 120cm)', priceINR: 9499 },
      { id: '90', label: '90', fullLabel: 'Grand XXL (60" / 150cm)', priceINR: 13999 },
    ],
    theme: {
      cardGradient: 'radial-gradient(circle at 50% 35%, #b5173e 0%, #870a29 45%, #560317 100%)',
      outerBg: '#f7dbe0',
      accentColor: '#ff2d55',
      glowColor: '#00F0FF',
      subGlow: '#FF1493',
      particleColor: 'rgba(255, 100, 140, 0.15)',
    },
    visualType: 'wings',
    glowText: 'ANGEL WINGS',
    fontStyle: "'Orbitron', sans-serif",
    details: {
      voltage: '12V Low Voltage',
      lifespan: '50,000+ Hours',
      lumens: '3,200 lm',
      mounting: 'Heavy-duty Brass Standoff Pins & Wire Kit Included'
    }
  },
  {
    id: 'cyber-katana',
    title: 'Cyber Katana & Kanji Blade',
    shortName: 'Cyber Katana',
    categoryIcon: '⚡',
    categoryName: 'Anime',
    doseSpec: '90 cm (35") • 12V DC',
    subtitleNote: 'Laser contour cut clear acrylic with dual-layer ruby & cyan silicone flex. Built for 24/7 streaming battlestations.',
    tagline: 'Cyberpunk Tokyo Nightlife Edition',
    basePriceINR: 4999,
    originalPriceINR: 7499,
    sizes: [
      { id: '30', label: '30', fullLabel: 'Small (30" / 75cm)', priceINR: 4999 },
      { id: '60', label: '60', fullLabel: 'Medium (45" / 115cm)', priceINR: 7499 },
      { id: '90', label: '90', fullLabel: 'Grand (60" / 150cm)', priceINR: 10999 },
    ],
    theme: {
      cardGradient: 'radial-gradient(circle at 50% 35%, #08385d 0%, #03213a 45%, #01111f 100%)',
      outerBg: '#d9ebf9',
      accentColor: '#00F0FF',
      glowColor: '#FF003C',
      subGlow: '#00F0FF',
      particleColor: 'rgba(0, 240, 255, 0.12)',
    },
    visualType: 'katana',
    glowText: '刀 // CYBER BLADE',
    fontStyle: "'Press Start 2P', monospace",
    details: {
      voltage: '12V Low Voltage',
      lifespan: '50,000+ Hours',
      lumens: '2,600 lm',
      mounting: 'Concealed Wall Clips & Adhesive Spacers'
    }
  },
  {
    id: 'better-together',
    title: 'Better Together Script Light',
    shortName: 'Better Together',
    categoryIcon: '💍',
    categoryName: 'Wedding',
    doseSpec: '100 cm (39") • 2700K Champagne',
    subtitleNote: 'Ultra-warm 2700K champagne luminescence designed for high-end wedding arches, photo booths, and master bedrooms.',
    tagline: 'Timeless Haute Romance',
    basePriceINR: 5499,
    originalPriceINR: 7999,
    sizes: [
      { id: '30', label: '30', fullLabel: 'Small (30" / 75cm)', priceINR: 5499 },
      { id: '60', label: '60', fullLabel: 'Medium (45" / 115cm)', priceINR: 7999 },
      { id: '90', label: '90', fullLabel: 'Grand (60" / 150cm)', priceINR: 11499 },
    ],
    theme: {
      cardGradient: 'radial-gradient(circle at 50% 35%, #522d14 0%, #351b0a 45%, #1c0c04 100%)',
      outerBg: '#f8eedf',
      accentColor: '#FFE4B5',
      glowColor: '#FFE4B5',
      subGlow: '#FFFFFF',
      particleColor: 'rgba(255, 228, 181, 0.15)',
    },
    visualType: 'script',
    glowText: 'Better Together',
    fontStyle: "'Great Vibes', cursive",
    details: {
      voltage: '12V Low Voltage',
      lifespan: '50,000+ Hours',
      lumens: '2,800 lm',
      mounting: 'Free Hanging Arch Chain & Wall Mount Kit'
    }
  },
  {
    id: 'cocktails-dreams',
    title: 'Cocktails & Dreams Speakeasy',
    shortName: 'Cocktails & Dreams',
    categoryIcon: '🍸',
    categoryName: 'Speakeasy',
    doseSpec: '80 cm (31") • Tri-Color Glow',
    subtitleNote: 'Vintage 80s speakeasy silhouette with rich sunset amber, magenta, and lime tubes. Includes multi-mode RF dimmer remote.',
    tagline: 'Signature Hospitality Lounge Sign',
    basePriceINR: 6299,
    originalPriceINR: 8999,
    sizes: [
      { id: '30', label: '30', fullLabel: 'Small (30" / 75cm)', priceINR: 6299 },
      { id: '60', label: '60', fullLabel: 'Medium (45" / 115cm)', priceINR: 8999 },
      { id: '90', label: '90', fullLabel: 'Grand (60" / 150cm)', priceINR: 12499 },
    ],
    theme: {
      cardGradient: 'radial-gradient(circle at 50% 35%, #8f2608 0%, #5c1603 45%, #2e0900 100%)',
      outerBg: '#fae3d5',
      accentColor: '#FF6B00',
      glowColor: '#FF1493',
      subGlow: '#39FF14',
      particleColor: 'rgba(255, 107, 0, 0.15)',
    },
    visualType: 'cocktail',
    glowText: 'Cocktails & Dreams',
    fontStyle: "'Yellowtail', cursive",
    details: {
      voltage: '12V Low Voltage',
      lifespan: '50,000+ Hours',
      lumens: '3,100 lm',
      mounting: 'RF Remote Dimmer & Stainless Standoffs'
    }
  },
  {
    id: 'acrylic-halo-3d',
    title: '3D Halo Backlit Acrylic Facade',
    shortName: '3D Acrylic',
    categoryIcon: '🏛️',
    categoryName: '3D Acrylic',
    doseSpec: '20mm Solid Cast CNC Acrylic',
    subtitleNote: 'Architectural-grade solid acrylic letters with concealed stud mounting and 360° rear wall halo glow for luxury storefronts.',
    tagline: 'Haute Storefront & Reception Signage',
    basePriceINR: 12999,
    originalPriceINR: 18999,
    sizes: [
      { id: '30', label: '30', fullLabel: 'Medium (30" / 75cm)', priceINR: 12999 },
      { id: '60', label: '60', fullLabel: 'Large (60" / 150cm)', priceINR: 18999 },
      { id: '90', label: '90', fullLabel: 'Architectural (90" / 225cm)', priceINR: 27999 },
    ],
    theme: {
      cardGradient: 'radial-gradient(circle at 50% 35%, #2a2d3d 0%, #161822 45%, #0b0c11 100%)',
      outerBg: '#e1e5ee',
      accentColor: '#FFD700',
      glowColor: '#FFE4B5',
      subGlow: '#FFD700',
      particleColor: 'rgba(255, 215, 0, 0.12)',
    },
    visualType: 'acrylic3d',
    glowText: 'MAISON DE LUXE',
    fontStyle: "'Cinzel', serif",
    details: {
      voltage: '12V/24V IP67 Waterproof',
      lifespan: '60,000+ Hours',
      lumens: '4,500 lm',
      mounting: '1:1 Scale Installation Drilling Template & Driver'
    }
  }
];

export default function LuxeProductShowcase({
  onAddToCart,
  onOpenStudio,
  onOpenVisualizer,
  onOpenLogoEstimator,
  onOpenVibeQuiz,
  onOpenSpinWheel,
  onOpenCart,
  cartCount = 0,
  selectedCurrency = 'INR',
  soundActive = true,
  onToggleSound
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState('30');
  const [quantity, setQuantity] = useState(1);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [showSpecsSheet, setShowSpecsSheet] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('products'); // 'products' | 'custom'

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const product = SHOWCASE_PRODUCTS[currentIndex];
  const activeSize = product.sizes.find(s => s.id === selectedSizeId) || product.sizes[0];
  const currentPriceINR = activeSize.priceINR * quantity;

  // Handle Keyboard Navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
    setSelectedSizeId('30');
    setQuantity(1);
  };

  const handlePrev = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length);
    setSelectedSizeId('30');
    setQuantity(1);
  };

  const handleSelectProduct = (index) => {
    playClickSound();
    setCurrentIndex(index);
    setSelectedSizeId('30');
    setQuantity(1);
  };

  const handleSelectSize = (sizeId) => {
    playClickSound();
    setSelectedSizeId(sizeId);
  };

  const handleTogglePower = () => {
    const next = !isPowerOn;
    playSwitchSound(next);
    setIsPowerOn(next);
  };

  const handleBuyNow = () => {
    playChimeSound();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: [product.theme.accentColor, product.theme.glowColor, '#ffffff']
    });

    const cartItem = {
      id: `${product.id}-${selectedSizeId}-${Date.now()}`,
      name: `${product.title} (${activeSize.label}")`,
      category: product.categoryName.toLowerCase(),
      price: activeSize.priceINR,
      originalPrice: Math.round(activeSize.priceINR * 1.35),
      quantity: quantity,
      image: product.categoryIcon,
      specs: {
        font: product.fontStyle,
        color: product.glowText,
        size: activeSize.fullLabel,
        backing: 'Precision Cast Acrylic Board',
        dimmerRemote: 'Included'
      }
    };

    onAddToCart(cartItem);
  };

  // Mouse Move 3D Parallax Handler
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth angle bounds
    const rotateY = (x / (rect.width / 2)) * 14;
    const rotateX = -(y / (rect.height / 2)) * 14;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      className="relative w-full min-h-[90vh] py-6 sm:py-10 px-3 sm:px-6 lg:px-12 flex items-center justify-center transition-colors duration-700 select-none overflow-hidden"
      style={{ backgroundColor: product.theme.outerBg }}
    >
      {/* Outer Glow Background Radial Blobs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: product.theme.accentColor,
          top: '10%',
          left: '15%'
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-30 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: product.theme.glowColor,
          bottom: '10%',
          right: '15%'
        }}
      />

      {/* ============================================================ */}
      {/* THE MAIN ROUNDED-4XL LUXURY HERO CARD (Reference Layout) */}
      {/* ============================================================ */}
      <div 
        className="relative w-full max-w-[1240px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] p-6 sm:p-10 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] theme-transition overflow-hidden text-white flex flex-col justify-between min-h-[640px] sm:min-h-[720px] lg:min-h-[760px]"
        style={{
          background: product.theme.cardGradient,
        }}
      >
        {/* Organic Floating Petal/Energy Contour Shapes (Parallax Background) */}
        <div 
          className="absolute -top-12 -left-12 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none opacity-40 animate-organic-1 blur-2xl"
          style={{ background: `radial-gradient(circle, ${product.theme.particleColor} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute -bottom-16 -right-16 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full pointer-events-none opacity-30 animate-organic-2 blur-3xl"
          style={{ background: `radial-gradient(circle, ${product.theme.particleColor} 0%, transparent 70%)` }}
        />

        {/* Organic Petal Silhouette Leaves in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
          <svg className="w-[800px] h-[800px] text-white fill-current animate-spin-slow" viewBox="0 0 100 100">
            <path d="M50,0 C60,25 75,40 100,50 C75,60 60,75 50,100 C40,75 25,60 0,50 C25,40 40,25 50,0 Z" />
          </svg>
        </div>

        {/* ============================================================ */}
        {/* TOP BAR: BRAND MARK, SEGMENTED PILLS, CATEGORIES & CART */}
        {/* ============================================================ */}
        <div className="relative z-20 space-y-4">
          
          {/* Main Top Row */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Brand Geometric Sunburst Mark */}
            <div 
              onClick={() => handleSelectProduct(0)}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Geometric Petal Ring Logo (as in reference image xefag) */}
                <svg className="w-7 h-7 text-white fill-current group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
              </div>
              <span className="font-editorial italic tracking-wide text-2xl font-normal text-white lowercase">
                neocraft
              </span>
            </div>

            {/* Center: Segmented Navigation Pills (Products [active white] | Custom Studio) */}
            <div className="hidden sm:flex items-center p-1 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-xs font-semibold">
              <button
                onClick={() => { playClickSound(); setActiveMainTab('products'); }}
                className={`px-5 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeMainTab === 'products'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Products
              </button>
              
              <button
                onClick={() => {
                  playClickSound();
                  setActiveMainTab('custom');
                  onOpenStudio();
                }}
                className={`px-5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMainTab === 'custom'
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Custom Studio</span>
              </button>
            </div>

            {/* Right: User Icon & Cart Button with Glowing Counter */}
            <div className="flex items-center gap-2.5">
              
              {/* Sound FX Toggle */}
              <button
                onClick={() => {
                  const next = onToggleSound();
                  playSwitchSound(next);
                }}
                className="w-9 h-9 rounded-full bg-black/30 border border-white/15 hover:bg-black/50 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                title="Toggle Neon Audio"
              >
                {soundActive ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* User Profile Circle */}
              <button
                onClick={() => { playClickSound(); onOpenVibeQuiz(); }}
                className="w-9 h-9 rounded-full bg-black/30 border border-white/15 hover:bg-black/50 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                title="Vibe Matcher Quiz"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Shopping Bag Circle with Floating Badge */}
              <button
                onClick={() => { playClickSound(); onOpenCart(); }}
                className="relative w-9 h-9 rounded-full bg-white text-slate-950 hover:bg-white/90 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="View Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-950 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white/40">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>

          {/* Sub-Header Row: Back link on left, Sub-categories in center */}
          <div className="flex items-center justify-between text-xs pt-1">
            
            {/* Left < Back Navigation */}
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Center: Collection Category Pills */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
              {SHOWCASE_PRODUCTS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectProduct(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    currentIndex === idx
                      ? 'bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.categoryIcon}</span>
                  <span>{item.categoryName}</span>
                </button>
              ))}
            </div>

            {/* Right: AR Room Launcher shortcut */}
            <button
              onClick={() => {
                playClickSound();
                onOpenVisualizer(product.title, product.theme.accentColor);
              }}
              className="hidden md:flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-300" />
              <span>Try on Wall</span>
            </button>

          </div>

        </div>

        {/* ============================================================ */}
        {/* MAIN BODY: 3-COLUMN COMPOSITION (LEFT TYPOGRAPHY | CENTER 3D HERO | RIGHT CONTROLS) */}
        {/* ============================================================ */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
          
          {/* 1. LEFT FLANK: HERO TITLE & SPECS (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 text-left order-2 lg:order-1">
            
            <div>
              <span className="inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-white/90 mb-3">
                {product.tagline}
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] leading-[1.08] tracking-tight">
                {product.title}
              </h1>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-white/75 font-mono">
              {product.doseSpec}
            </div>

            {/* Bottom Left Minimalist Brand Assurance Copy */}
            <div className="pt-4 lg:pt-16 hidden sm:block">
              <p className="text-[11px] text-white/60 leading-relaxed max-w-xs font-normal">
                {product.subtitleNote}
              </p>
            </div>

          </div>

          {/* 2. CENTER FLANK: FLOATING 3D HERO SHOWCASE (lg:col-span-6) */}
          <div 
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] perspective-1000 order-1 lg:order-2 select-none"
          >
            {/* Prev / Next Floating Arrow Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-110"
              title="Previous Design (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-110"
              title="Next Design (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Central 3D Product Vessel / Floating Capsule Structure */}
            <div
              className="relative transition-transform duration-200 ease-out transform-style-3d animate-product-levitate"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Radial Core Spotlight behind Product */}
              <div 
                className="absolute inset-0 -m-12 rounded-full blur-[80px] opacity-75 pointer-events-none transition-all duration-700"
                style={{
                  backgroundColor: isPowerOn ? product.theme.accentColor : 'transparent'
                }}
              />

              {/* Central Sleek Vessel Container (Simulating the 3D Reference Form Factor) */}
              <div className="relative w-56 sm:w-68 lg:w-76 rounded-[36px] bg-gradient-to-b from-white/15 via-white/5 to-black/40 p-4 sm:p-5 border border-white/25 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] flex flex-col items-center justify-between text-center overflow-hidden">
                
                {/* White Vessel Cap (as in reference image) */}
                <div className="w-full py-3 sm:py-3.5 rounded-[22px] bg-gradient-to-b from-white to-slate-200 shadow-md border-b border-black/10 flex items-center justify-center relative mb-4">
                  {/* Subtle Cap ridges */}
                  <div className="flex items-center gap-1.5 opacity-30">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>

                  {/* Interactive Power Switch built into the Cap */}
                  <button
                    onClick={handleTogglePower}
                    className={`absolute right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isPowerOn
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isPowerOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Vessel Center Artwork / Glowing Core */}
                <div className="relative py-6 sm:py-8 w-full flex flex-col items-center justify-center">
                  
                  {/* Geometric Sunburst Mark on Product (as in reference image) */}
                  <div className="w-10 h-10 mb-2 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white fill-current opacity-90" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                    </svg>
                  </div>

                  {/* Product Title on bottle */}
                  <h3 className="font-serif italic font-black text-xl sm:text-2xl text-white tracking-tight">
                    {product.shortName}
                  </h3>
                  <p className="text-[10px] text-white/60 font-mono tracking-widest uppercase mt-0.5">
                    by neocraft
                  </p>

                  {/* THE GLOWING NEON TUBES CORE */}
                  <div className="mt-5 sm:mt-6 p-4 rounded-2xl bg-black/40 border border-white/15 w-full flex items-center justify-center">
                    <span 
                      className={`text-lg sm:text-2xl font-bold transition-all duration-300 ${
                        isPowerOn ? 'neon-tube-glow' : 'neon-off'
                      }`}
                      style={{
                        fontFamily: product.fontStyle,
                        color: isPowerOn ? '#ffffff' : 'rgba(255,255,255,0.2)',
                        textShadow: isPowerOn 
                          ? `0 0 4px #ffffff, 0 0 10px ${product.theme.glowColor}, 0 0 25px ${product.theme.glowColor}, 0 0 50px ${product.theme.subGlow}`
                          : 'none'
                      }}
                    >
                      {product.glowText}
                    </span>
                  </div>

                </div>

                {/* Vessel Bottom Indicator Ring & Dosage count */}
                <div className="w-full pt-3 pb-1 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80 font-bold px-2">
                  <span>{activeSize.label}" Sizing</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                    {selectedSizeId}
                  </span>
                </div>

              </div>

              {/* Realistic Drop Shadow on Card Floor */}
              <div className="w-48 sm:w-60 h-6 mx-auto rounded-full bg-black/60 blur-md mt-6 animate-pulse-shadow" />
            </div>

          </div>

          {/* 3. RIGHT FLANK: CIRCULAR SIZE PILLS & TECH SPECS (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6 text-right order-3 flex flex-col items-end">
            
            {/* Circular Size Selector (30, 60, 90) */}
            <div>
              <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block mb-2">
                Select Scale:
              </span>
              <div className="flex items-center justify-end gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSize(s.id)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                      selectedSizeId === s.id
                        ? 'bg-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.6)] scale-110'
                        : 'bg-black/35 border border-white/15 text-white/70 hover:text-white hover:border-white/40'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-white/60 mt-1.5 font-medium">
                {activeSize.fullLabel}
              </div>
            </div>

            {/* Technical Specs & Dosage Sheet Link */}
            <button
              onClick={() => { playClickSound(); setShowSpecsSheet(!showSpecsSheet); }}
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white font-medium underline underline-offset-4 cursor-pointer transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Overview, Lumens & Specs</span>
            </button>

            {/* Quick Specs Drawer Popover */}
            {showSpecsSheet && (
              <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/20 text-left text-xs space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2 max-w-xs">
                <div className="font-bold text-white text-xs border-b border-white/10 pb-1 flex items-center justify-between">
                  <span>Technical Sheet</span>
                  <button onClick={() => setShowSpecsSheet(false)} className="text-white/60 hover:text-white">✕</button>
                </div>
                <div className="space-y-1 text-[11px] text-white/80">
                  <div>• Voltage: <strong className="text-emerald-300">{product.details.voltage}</strong></div>
                  <div>• Lifespan: <strong className="text-white">{product.details.lifespan}</strong></div>
                  <div>• Brightness: <strong className="text-white">{product.details.lumens}</strong></div>
                  <div>• Mounting: <span className="text-white/70">{product.details.mounting}</span></div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ============================================================ */}
        {/* BOTTOM BAR: PRICE, QUANTITY STEPPER & [ BUY NOW ] PILL */}
        {/* ============================================================ */}
        <div className="relative z-20 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Minimalist Partnership Copy on Mobile */}
          <p className="text-[10px] text-white/50 block sm:hidden text-center max-w-xs">
            {product.subtitleNote}
          </p>

          {/* Left: Prominent Price Display */}
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              {formatPrice(currentPriceINR, selectedCurrency)}
            </div>
            <div className="text-[11px] text-white/60 mt-0.5">
              Includes 2-Yr Warranty & Free Pan-India Wooden Crate
            </div>
          </div>

          {/* Right: Quantity Stepper & Buy Now Action Pill */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            
            {/* Minimalist Glass Quantity Stepper: [-] 1 [+] */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white font-bold text-sm">
              <button
                onClick={() => {
                  playClickSound();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="text-white/60 hover:text-white cursor-pointer transition-colors"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-5 text-center text-sm font-black font-mono">
                {quantity}
              </span>

              <button
                onClick={() => {
                  playClickSound();
                  setQuantity(quantity + 1);
                }}
                className="text-white/60 hover:text-white cursor-pointer transition-colors"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* High-Contrast Rounded Pill [ Buy Now ] Button */}
            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-none px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.6)] cursor-pointer flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>Buy Now</span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
