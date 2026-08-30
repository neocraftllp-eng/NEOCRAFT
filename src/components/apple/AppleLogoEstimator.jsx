import React, { useState, useRef } from 'react';
import { Briefcase, Upload, CheckCircle2, MessageCircle, ArrowRight, Layers } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const ENTERPRISE_MATERIALS = [
  {
    id: 'acrylic-halo',
    name: '3D Halo Backlit Solid Acrylic',
    ratePerFt: 4800,
    features: ['20mm solid cast virgin acrylic', '360° rear wall halo glow', 'Zero visible fasteners'],
    glowColor: '#FFE4B5'
  },
  {
    id: 'laser-brass',
    name: 'Laser-Cut PVD Brushed Brass / Steel',
    ratePerFt: 6200,
    features: ['PVD Anti-Rust Brass/Titanium', 'Precision fiber laser cutting', '100% Outdoor weatherproof'],
    glowColor: '#FFD700'
  },
  {
    id: 'silicon-neon',
    name: 'Silicon Optical Neon Flex',
    ratePerFt: 2800,
    features: ['Vibrant Tokyo glow', 'Lightweight 6mm acrylic contour', 'Silent 12V operation'],
    glowColor: '#00F0FF'
  },
  {
    id: 'rgb-matrix',
    name: 'Programmable Smart RGB Display',
    ratePerFt: 3600,
    features: ['Smartphone app text & animations', 'Ultra-bright 4000 nits', 'Sound reactive mode'],
    glowColor: '#39FF14'
  }
];

export default function AppleLogoEstimator({
  selectedCurrency = 'INR'
}) {
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [logoName, setLogoName] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(ENTERPRISE_MATERIALS[0]);
  const [widthFeet, setWidthFeet] = useState(4.0);

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

  const estMin = Math.round(widthFeet * selectedMaterial.ratePerFt * 0.95);
  const estMax = Math.round(widthFeet * selectedMaterial.ratePerFt * 1.15);

  const handleWhatsAppConsult = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Enterprise! 🏢 I would like a quote & 3D render for my Business Logo Signage:\n\n` +
      `• Brand: ${logoName || 'Corporate Logo'}\n` +
      `• Technology: ${selectedMaterial.name}\n` +
      `• Dimension: ${widthFeet} Feet (${Math.round(widthFeet * 30.48)} cm)\n` +
      `• Estimated Budget: ₹${estMin.toLocaleString('en-IN')} - ₹${estMax.toLocaleString('en-IN')}\n\n` +
      `Please provide the complimentary 3D production mockup!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <section id="logo-estimator-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <p className="text-xs font-semibold tracking-widest text-[#2997ff] uppercase">
            NEOCRAFT FOR BUSINESS
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Architectural signage. Tailored for your brand.
          </h2>
          <p className="text-sm text-[#86868b]">
            Upload your vector or raster logo. Receive an instant estimate and complimentary 3D production rendering.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Preview Box (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-[32px] bg-[#121214] border border-[#2d2d30] p-8 sm:p-12 min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden">
              
              <div 
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Ambient Glow */}
              <div
                className="absolute pointer-events-none rounded-full blur-[80px] w-64 h-64 opacity-40 transition-all duration-500"
                style={{ backgroundColor: selectedMaterial.glowColor }}
              />

              {uploadedLogo ? (
                <div className="relative z-10 p-6 rounded-2xl bg-white/[0.03] border border-white/20 backdrop-blur-sm shadow-2xl">
                  <img
                    src={uploadedLogo}
                    alt="Logo"
                    className="max-h-40 max-w-[240px] sm:max-w-xs object-contain filter drop-shadow-[0_0_20px_currentColor]"
                    style={{ color: selectedMaterial.glowColor }}
                  />
                  <div className="mt-3 text-xs font-semibold text-white">{logoName}</div>
                </div>
              ) : (
                <div className="relative z-10 space-y-3 max-w-sm">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-[#2997ff]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-lg text-white">Upload Your Brand Logo</h4>
                  <p className="text-xs text-[#86868b]">
                    Supports PNG, JPG, SVG, AI, or PDF vector formats. We provide free vectorization.
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,.svg,.pdf,.ai"
                className="hidden"
              />
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              <span>{uploadedLogo ? 'Choose Different File' : 'Upload Vector Logo File (.PNG / .SVG)'}</span>
            </button>
          </div>

          {/* Right Configurator (5 cols) */}
          <div className="lg:col-span-5 space-y-5 apple-card p-6 sm:p-8 text-xs">
            
            {/* 1. Technology */}
            <div>
              <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-2.5">
                1. Select Architectural Finish:
              </span>
              <div className="space-y-2">
                {ENTERPRISE_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => { playClickSound(); setSelectedMaterial(mat); }}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedMaterial.id === mat.id
                        ? 'bg-[#1f1f25] border-white text-white shadow-md'
                        : 'bg-[#0e0f14] border-[#222225] text-[#86868b] hover:border-[#333]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{mat.name}</div>
                      <div className="text-[10px] text-[#86868b] mt-0.5">{mat.features[0]}</div>
                    </div>
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mat.glowColor }} />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Width Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1 text-[#86868b]">
                <span className="font-semibold">2. Dimension Scale:</span>
                <span className="font-semibold text-white">{widthFeet} Feet ({Math.round(widthFeet * 30.48)} cm)</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8.0"
                step="0.5"
                value={widthFeet}
                onChange={(e) => setWidthFeet(Number(e.target.value))}
                className="w-full h-1 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
              />
            </div>

            {/* Estimate Box */}
            <div className="pt-4 border-t border-[#222225] space-y-3">
              <div>
                <span className="text-[#86868b] block text-[11px]">Estimated Investment:</span>
                <div className="text-2xl font-semibold text-white tracking-tight">
                  {formatPrice(estMin, selectedCurrency)} - {formatPrice(estMax, selectedCurrency)}
                </div>
                <p className="text-[10px] text-[#86868b] mt-0.5">
                  Includes Free 1:1 Mounting Template, Driver & 2-Yr Warranty.
                </p>
              </div>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full apple-btn-primary py-3 text-xs font-semibold cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>Request Free 3D Proof & Quote</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
