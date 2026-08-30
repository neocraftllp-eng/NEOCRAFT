import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Power, 
  Star, 
  Camera, 
  Check, 
  Zap 
} from 'lucide-react';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function ProductCard({
  product,
  selectedCurrency = 'INR',
  onSelectProduct,
  onAddToCart,
  onOpenVisualizer
}) {
  const [isLightOn, setIsLightOn] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const handleToggleLight = (e) => {
    e.stopPropagation();
    const next = !isLightOn;
    playSwitchSound(next);
    setIsLightOn(next);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    playChimeSound();
    setIsAdded(true);
    onAddToCart(product);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleOpenAR = (e) => {
    e.stopPropagation();
    playClickSound();
    onOpenVisualizer(product.name, product.glowColor);
  };

  return (
    <div 
      onClick={() => { playClickSound(); onSelectProduct(product); }}
      className="group relative rounded-2xl bg-[#0b0e17] border border-slate-800 hover:border-pink-500/50 shadow-xl hover:shadow-[0_15px_40px_rgba(236,72,153,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Card Top: Badges & Interactive Light Switch */}
      <div className="relative p-4 pb-0 flex items-center justify-between z-20">
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 backdrop-blur-md shadow-sm">
          {product.badge || product.tag}
        </span>

        {/* Live Power Toggle on Card */}
        <button
          onClick={handleToggleLight}
          title="Toggle Sign Lighting"
          className={`p-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
            isLightOn
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : 'bg-red-500/20 border-red-500/60 text-red-300'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Middle: Neon Visual Simulation Box */}
      <div className="relative h-48 sm:h-52 w-full flex items-center justify-center p-6 select-none overflow-hidden">
        
        {/* Ambient Glow Aura */}
        <div
          className="absolute pointer-events-none rounded-full blur-[45px] w-36 h-36 transition-all duration-500 opacity-60"
          style={{
            backgroundColor: isLightOn ? product.glowColor : 'transparent'
          }}
        />

        {/* Acrylic Backing contour */}
        <div className="relative z-10 p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-[1px] shadow-lg flex flex-col items-center justify-center">
          <span
            className={`text-xl sm:text-2xl font-black text-center font-['Satisfy',cursive] transition-all duration-300 ${
              isLightOn ? 'neon-tube-glow' : 'neon-off'
            }`}
            style={{
              color: isLightOn ? '#ffffff' : 'rgba(255,255,255,0.15)',
              textShadow: isLightOn
                ? `0 0 3px #ffffff, 0 0 8px ${product.glowColor}, 0 0 22px ${product.glowColor}, 0 0 45px ${product.glowColor}`
                : 'none'
            }}
          >
            {product.name}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest font-sans">
            {product.dimensions}
          </span>
        </div>

        {/* Quick AR Wall Button */}
        <button
          onClick={handleOpenAR}
          className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded-md bg-black/70 hover:bg-black/90 border border-white/10 text-[10px] text-cyan-300 font-bold backdrop-blur-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-3 h-3" />
          <span>AR Try-On</span>
        </button>
      </div>

      {/* Card Bottom: Info, Price & Actions */}
      <div className="p-4 bg-[#080a11] border-t border-slate-800/80 space-y-3">
        
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">{product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-1 group-hover:text-pink-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {product.shortDesc}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-base sm:text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {formatPrice(product.price, selectedCurrency)}
            </div>
            <div className="text-[11px] text-slate-500 line-through">
              {formatPrice(product.originalPrice, selectedCurrency)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className={`p-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                isAdded
                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-pink-500 hover:bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]'
              }`}
              title="Add to Cart"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
