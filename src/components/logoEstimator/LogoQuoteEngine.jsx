import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  Upload, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Ruler, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const SIGN_MATERIALS = [
  {
    id: 'mat-neon',
    name: 'LED Neon Flex',
    subtitle: 'Vibrant & Modern',
    baseRatePerFoot: 2800,
    features: ['High-contrast glow', 'Lightweight acrylic backplate', 'Silent 12V operation'],
    idealFor: 'Cafes, Lounges, Creator Studios, Bedrooms',
    glowColor: '#00F0FF'
  },
  {
    id: 'mat-acrylic-halo',
    name: '3D Halo Backlit Acrylic',
    subtitle: 'Haute Luxury & Minimalist',
    baseRatePerFoot: 4800,
    features: ['20mm solid cast acrylic', '360° rear wall halo glow', 'Zero visible wires'],
    idealFor: 'Corporate Receptions, Luxury Boutiques, Clinics',
    glowColor: '#FFE4B5'
  },
  {
    id: 'mat-brass-metal',
    name: 'Laser Brushed Brass / Steel',
    subtitle: 'Architectural Prestige',
    baseRatePerFoot: 6200,
    features: ['PVD Anti-Rust Brass/Titanium', 'Precision fiber laser cutting', '100% Outdoor weatherproof'],
    idealFor: 'Villa Entrances, Building Facades, Law Firms',
    glowColor: '#FFD700'
  },
  {
    id: 'mat-rgb-pixel',
    name: 'RGB Smart Pixel Matrix',
    subtitle: 'Dynamic & App-Controlled',
    baseRatePerFoot: 3600,
    features: ['Smartphone app text & animation control', 'Ultra-bright 4000 nits', 'Sound reactive equalizer'],
    idealFor: 'Retail Showrooms, Food Trucks, Events',
    glowColor: '#39FF14'
  }
];

export default function LogoQuoteEngine({
  selectedCurrency = 'INR',
  onAddToCart
}) {
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [logoName, setLogoName] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(SIGN_MATERIALS[0]);
  const [widthFeet, setWidthFeet] = useState(3.5);
  const [signLocation, setSignLocation] = useState('Indoor Reception / Wall');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      setLogoName(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedLogo(ev.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate estimated price range
  const estimatedBase = Math.round(widthFeet * selectedMaterial.baseRatePerFoot);
  const estimatedMin = Math.round(estimatedBase * 0.95);
  const estimatedMax = Math.round(estimatedBase * 1.15);

  const handleWhatsAppConsultation = () => {
    playClickSound();
    const message = encodeURIComponent(
      `Hello Neocraft Studio! 🏢 I would like a quote & 3D render for my Business Logo Signage:\n\n` +
      `• Logo Name: ${logoName || 'My Brand Logo'}\n` +
      `• Signage Type: ${selectedMaterial.name}\n` +
      `• Approx Size: ${widthFeet} Feet (${Math.round(widthFeet * 30.48)} cm)\n` +
      `• Installation Space: ${signLocation}\n` +
      `• Budget Estimate: ₹${estimatedMin.toLocaleString('en-IN')} - ₹${estimatedMax.toLocaleString('en-IN')}\n\n` +
      `I have my logo file ready. Please send a complimentary 3D production mockup!`
    );
    window.open(`https://wa.me/919166691274?text=${message}`, '_blank');
  };

  return (
    <section id="logo-estimator-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
          <Briefcase className="w-3.5 h-3.5" /> B2B & BESPOKE SIGNAGE LAB
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
          TURN YOUR BRAND LOGO INTO <span className="text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text">ILLUMINATED ART</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Upload your corporate, cafe, or wedding logo. Choose from 3D backlit acrylics, architectural laser-cut brass, or neon flex for instant pricing & free 3D design proof.
        </p>
      </div>

      {/* Main Grid: Upload & Preview on Left, Material Specs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: LOGO PREVIEW & UPLOADER (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Visual Signboard Mockup Box */}
          <div className="relative rounded-2xl bg-[#0b0e17] border border-slate-700/80 p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] text-center select-none">
            
            {/* Background Wall Texture */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 0), linear-gradient(to bottom, #0d111e, #06080e)`,
                backgroundSize: '24px 24px, 100% 100%'
              }}
            />

            {/* Ambient Material Glow */}
            <div
              className="absolute pointer-events-none rounded-full blur-[100px] w-72 h-72 opacity-50 transition-all duration-500"
              style={{ backgroundColor: selectedMaterial.glowColor }}
            />

            {/* Uploaded Logo or Default Placeholder */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {uploadedLogo ? (
                <div className="relative p-6 rounded-2xl bg-white/[0.04] border border-white/20 backdrop-blur-sm shadow-2xl">
                  <img
                    src={uploadedLogo}
                    alt="Brand Logo"
                    className="max-h-48 max-w-[260px] sm:max-w-xs object-contain filter drop-shadow-[0_0_25px_currentColor]"
                    style={{ color: selectedMaterial.glowColor }}
                  />
                  <div className="mt-4 text-xs font-bold text-slate-300">
                    {logoName || 'Uploaded Vector Logo'}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Drag & Drop Your Logo Here</h4>
                  <p className="text-xs text-slate-400">
                    Supports PNG, JPG, SVG, AI or PDF vector formats. We provide free vector conversion.
                  </p>
                </div>
              )}

              {/* Standoff Pins simulation */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-slate-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedMaterial.glowColor }} />
                <span>Simulating: <strong className="text-white">{selectedMaterial.name}</strong></span>
                <span className="text-slate-500">•</span>
                <span>{widthFeet} Ft Wide</span>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.svg,.pdf,.ai"
              className="hidden"
            />
          </div>

          {/* Upload Button Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-bold transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{uploadedLogo ? 'Upload Different Logo' : 'Upload Logo File (.PNG / .SVG)'}</span>
            </button>

            <span className="text-xs text-slate-400">
              Need free design assistance? <strong className="text-white">Our 3D studio handles it.</strong>
            </span>
          </div>

        </div>

        {/* RIGHT: CONFIGURATION & BUDGET ESTIMATOR (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-[#0d101a] p-6 rounded-2xl border border-slate-800 shadow-2xl">
          
          {/* 1. Material Selector */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2.5">
              1. Select Signage Material & Style:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SIGN_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => { playClickSound(); setSelectedMaterial(mat); }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMaterial.id === mat.id
                      ? 'border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>{mat.name}</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.glowColor }} />
                  </div>
                  <div className="text-[10px] text-amber-300/80 mt-0.5">{mat.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Width Dimension Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold">
              <span className="text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-amber-400" /> 2. Estimated Width:
              </span>
              <span className="text-amber-300 text-sm">{widthFeet} Feet ({Math.round(widthFeet * 30.48)} cm)</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="8.0"
              step="0.5"
              value={widthFeet}
              onChange={(e) => setWidthFeet(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>1.5 ft (Desk/Cabin)</span>
              <span>4 ft (Standard Office)</span>
              <span>8 ft (Large Facade)</span>
            </div>
          </div>

          {/* 3. Location Selector */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
              3. Intended Installation Space:
            </label>
            <select
              value={signLocation}
              onChange={(e) => setSignLocation(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="Indoor Office Reception / Wall">Indoor Office Reception / Wall</option>
              <option value="Outdoor Storefront Building Facade (IP67)">Outdoor Storefront Building Facade (IP67)</option>
              <option value="Cafe / Restaurant / Bar Interior">Cafe / Restaurant / Bar Interior</option>
              <option value="Villa / House Gate Entrance Nameplate">Villa / House Gate Entrance Nameplate</option>
              <option value="Event Stage / Exhibition Booth">Event Stage / Exhibition Booth</option>
            </select>
          </div>

          {/* Material Features List */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Specifications for {selectedMaterial.name}:
            </span>
            {selectedMaterial.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Estimated Budget Box & Direct Consultation */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">
                Estimated Commercial Investment:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-pink-400 bg-clip-text">
                {formatPrice(estimatedMin, selectedCurrency)} - {formatPrice(estimatedMax, selectedCurrency)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                *Includes Free 1:1 Scale Mounting Template, Power Driver & 2-Yr Comprehensive Warranty.
              </p>
            </div>

            <button
              onClick={handleWhatsAppConsultation}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Get Free 3D Render & WhatsApp Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
