import React, { useState } from 'react';
import { 
  X, 
  Power, 
  Star, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Clock, 
  Camera, 
  CheckCircle2, 
  Maximize2,
  Box,
  Layers,
  Sparkles
} from 'lucide-react';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  selectedCurrency = 'INR',
  onAddToCart,
  onOpenVisualizer
}) {
  const [isLightOn, setIsLightOn] = useState(true);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'box' | 'reviews'

  if (!isOpen || !product) return null;

  const handleToggleLight = () => {
    const next = !isLightOn;
    playSwitchSound(next);
    setIsLightOn(next);
  };

  const handleAddToCart = () => {
    playChimeSound();
    onAddToCart(product);
  };

  const handleWhatsAppOrder = () => {
    playClickSound();
    const message = encodeURIComponent(
      `Hello Neocraft Studio! ⚡ I want to order the "${product.name}" (${formatPrice(product.price, 'INR')}):\n\n` +
      `• Category: ${product.subcategory}\n` +
      `• Dimensions: ${product.dimensions}\n` +
      `• Warranty: 2 Years Included\n\n` +
      `Please provide estimated delivery timeline & payment details!`
    );
    window.open(`https://wa.me/919166691274?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#090c14] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {product.subcategory}
            </span>
            <h3 className="text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {product.name}
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Visual Stage & Human Scale Comparison (7 cols) */}
          <div className="lg:col-span-7 p-6 bg-[#06080e] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-6">
            
            {/* Visual Canvas Stage */}
            <div className="relative h-64 sm:h-72 w-full rounded-xl bg-[#0b0e17] border border-slate-800/80 p-8 flex items-center justify-center overflow-hidden select-none">
              
              {/* Power Switch on stage */}
              <button
                onClick={handleToggleLight}
                className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                  isLightOn
                    ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                    : 'bg-red-500/20 border border-red-500/60 text-red-300'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{isLightOn ? 'LIGHT ON' : 'LIGHT OFF'}</span>
              </button>

              {/* AR Wall Launcher */}
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                  onOpenVisualizer(product.name, product.glowColor);
                }}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 text-xs font-bold cursor-pointer transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Test in Room (AR)</span>
              </button>

              {/* Ambient Glow */}
              <div
                className="absolute pointer-events-none rounded-full blur-[60px] w-48 h-48 transition-all duration-500 opacity-70"
                style={{
                  backgroundColor: isLightOn ? product.glowColor : 'transparent'
                }}
              />

              {/* Neon Representation */}
              <div className="relative z-10 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-[2px] shadow-2xl flex flex-col items-center">
                <span
                  className={`text-2xl sm:text-3xl font-black text-center font-['Satisfy',cursive] transition-all duration-300 ${
                    isLightOn ? 'neon-tube-glow' : 'neon-off'
                  }`}
                  style={{
                    color: isLightOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
                    textShadow: isLightOn
                      ? `0 0 4px #ffffff, 0 0 10px ${product.glowColor}, 0 0 25px ${product.glowColor}, 0 0 60px ${product.glowColor}`
                      : 'none'
                  }}
                >
                  {product.name}
                </span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                  {product.dimensions}
                </span>
              </div>
            </div>

            {/* Human & Furniture Scale Comparison Visualizer */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Wall Scale & Proportions:
              </span>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Dimensions: <strong className="text-white">{product.dimensions}</strong></span>
                <span>Operating Voltage: <strong className="text-emerald-400">12V DC Safe</strong></span>
                <span>Lifespan: <strong className="text-white">50,000h</strong></span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                <div className="font-bold text-white text-[11px]">2-Yr Warranty</div>
                <div className="text-[9px] text-slate-500">Replacement</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <Truck className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="font-bold text-white text-[11px]">Free Shipping</div>
                <div className="text-[9px] text-slate-500">Pan-India insured</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="font-bold text-white text-[11px]">Silent 12V</div>
                <div className="text-[9px] text-slate-500">Zero Buzzing</div>
              </div>
            </div>

          </div>

          {/* Right Column: Specs, Features & Checkout (5 cols) */}
          <div className="lg:col-span-5 p-6 space-y-5 bg-[#0d101a] overflow-y-auto">
            
            {/* Price & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ({product.reviewsCount} Verified Customer Reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text">
                  {formatPrice(product.price, selectedCurrency)}
                </div>
                <div className="text-sm text-slate-500 line-through">
                  {formatPrice(product.originalPrice, selectedCurrency)}
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Tabs: Key Specs / In the Box */}
            <div className="border-t border-slate-800 pt-3">
              <div className="flex gap-2 mb-3 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'specs' ? 'border-pink-500 text-pink-300' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Key Highlights
                </button>
                <button
                  onClick={() => setActiveTab('box')}
                  className={`pb-1 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'box' ? 'border-cyan-500 text-cyan-300' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  What's In The Box
                </button>
              </div>

              {activeTab === 'specs' ? (
                <ul className="space-y-2 text-xs text-slate-300">
                  {product.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 text-xs text-slate-300">
                  {product.includedInBox?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Box className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Cart • {formatPrice(product.price, selectedCurrency)}</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant Order On WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
