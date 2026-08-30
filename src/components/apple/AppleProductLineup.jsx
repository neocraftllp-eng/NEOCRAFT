import React, { useState } from 'react';
import { ChevronRight, ShoppingBag, Camera, Power, Star, Check } from 'lucide-react';
import { APPLE_PRODUCTS } from '../../data/appleProducts';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleProductLineup({
  onAddToCart,
  onOpenVisualizer,
  onSelectProduct,
  selectedCurrency = 'INR'
}) {
  const [powerStates, setPowerStates] = useState({
    'wings-pro': true,
    'cyber-katana-pro': true,
    'better-together-pro': true,
    'cocktails-dreams-pro': true,
    'acrylic-halo-facade': true,
  });

  const [addedIds, setAddedIds] = useState({});

  const toggleProductPower = (id) => {
    const next = !powerStates[id];
    playSwitchSound(next);
    setPowerStates((prev) => ({ ...prev, [id]: next }));
  };

  const handleQuickBuy = (product) => {
    playChimeSound();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);

    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      category: product.screenCategory,
      price: product.priceINR,
      originalPrice: product.originalPriceINR,
      quantity: 1,
      image: '⚡',
      specs: {
        dimensions: product.dimensions,
        finish: product.finish,
        voltage: product.specs.voltage,
        dimmer: 'Included'
      }
    };
    onAddToCart(cartItem);
  };

  return (
    <section id="catalog-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1080px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-[#2997ff] uppercase">
              THE NEOCRAFT LINEUP
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
              Explore all models.
            </h2>
          </div>
          <p className="text-sm text-[#86868b] max-w-sm">
            Handcrafted with commercial-grade optical flex and 2-Year direct warranty.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLE_PRODUCTS.map((prod) => {
            const isPowered = powerStates[prod.id] !== false;
            const isAdded = addedIds[prod.id];

            return (
              <div
                key={prod.id}
                className="apple-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#f56300] uppercase tracking-wider">
                      {prod.kicker}
                    </span>
                    <button
                      onClick={() => toggleProductPower(prod.id)}
                      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                        isPowered
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                          : 'bg-red-500/20 text-red-300 border-red-500/50'
                      }`}
                      title="Toggle Power"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#86868b]">{prod.tagline}</p>
                </div>

                {/* Visual Stage inside Card */}
                <div className="relative h-48 sm:h-52 w-full rounded-2xl bg-[#0e0f14] border border-[#222225] p-6 flex flex-col items-center justify-center overflow-hidden mb-6">
                  
                  {/* Ambient Glow */}
                  <div
                    className="absolute pointer-events-none rounded-full blur-2xl w-32 h-32 opacity-50 transition-all duration-500"
                    style={{
                      backgroundColor: isPowered ? prod.glowColor : 'transparent'
                    }}
                  />

                  {/* Glowing Name / Art */}
                  <span
                    className={`text-xl sm:text-2xl font-bold font-['Satisfy',cursive] text-center transition-all duration-300 z-10 ${
                      isPowered ? 'neon-tube-glow' : 'neon-off'
                    }`}
                    style={{
                      color: isPowered ? '#ffffff' : 'rgba(255,255,255,0.15)',
                      textShadow: isPowered
                        ? `0 0 3px #ffffff, 0 0 8px ${prod.glowColor}, 0 0 20px ${prod.glowColor}`
                        : 'none'
                    }}
                  >
                    {prod.name.replace('NEOCRAFT ', '')}
                  </span>

                  <span className="text-[10px] text-[#86868b] uppercase tracking-widest mt-2 z-10 font-mono">
                    {prod.dimensions}
                  </span>

                  {/* AR Wall Link on card */}
                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenVisualizer(prod.name, prod.glowColor);
                    }}
                    className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] text-[#2997ff] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-3 h-3" />
                    <span>AR View</span>
                  </button>
                </div>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-[#a1a1a6] mb-6">
                  <div>• {prod.specs.voltage}</div>
                  <div>• {prod.specs.lifespan}</div>
                  <div>• {prod.specs.weatherRating}</div>
                </div>

                {/* Price & Buy Button */}
                <div className="pt-4 border-t border-[#222225] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#86868b] block">From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-semibold text-white">
                        {formatPrice(prod.priceINR, selectedCurrency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        if (onSelectProduct) onSelectProduct(prod);
                      }}
                      className="apple-btn-secondary py-2 px-3 text-xs font-semibold cursor-pointer"
                    >
                      Inspect
                    </button>

                    <button
                      onClick={() => handleQuickBuy(prod)}
                      className={`apple-btn-primary py-2 px-3.5 text-xs font-semibold cursor-pointer ${
                        isAdded ? 'bg-emerald-600' : ''
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          <span>Buy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
