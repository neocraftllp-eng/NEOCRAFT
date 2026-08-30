import React, { useState } from 'react';
import { 
  ShoppingBag, 
  BatteryCharging, 
  Power, 
  Check, 
  MessageCircle, 
  Flame, 
  Radio, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { BOTTLE_PRESENTERS } from '../../data/appleProducts';
import { playClickSound, playSwitchSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleBottlePresenters({
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [powerStates, setPowerStates] = useState(
    BOTTLE_PRESENTERS.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );

  const [addedIds, setAddedIds] = useState({});
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  const togglePower = (id) => {
    const next = !powerStates[id];
    playSwitchSound(next);
    setPowerStates((prev) => ({ ...prev, [id]: next }));
  };

  const handleBuy = (presenter) => {
    playChimeSound();
    setAddedIds((prev) => ({ ...prev, [presenter.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [presenter.id]: false }));
    }, 2000);

    const item = {
      id: `${presenter.id}-${Date.now()}`,
      name: presenter.name,
      category: 'bottle-presenters',
      price: presenter.priceINR,
      originalPrice: presenter.originalPriceINR,
      quantity: 1,
      image: presenter.image,
      specs: {
        dimensions: presenter.dimensions,
        battery: presenter.specs.batteryLife,
        finish: presenter.finish,
        voltage: presenter.specs.voltage,
        dimmer: 'RF Strobe Remote Included'
      }
    };
    onAddToCart(item);
  };

  const handleWhatsAppCustomClubQuote = (presenter) => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft! 🍾 I want to order the "${presenter.name}" (₹${presenter.priceINR.toLocaleString('en-IN')}):\n\n` +
      `• Category: VIP Bottle Presenter\n` +
      `• Specs: ${presenter.specs.batteryLife} • ${presenter.dimensions}\n` +
      `• Included: Fast Charger & RF Strobe Remote\n\n` +
      `Please provide nightclub delivery timelines!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <section id="bottle-presenters-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1120px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f56300]/15 border border-[#f56300]/30 text-[#f56300] text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" /> VIP NIGHTLIFE & BOTTLE SERVICE
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
              LED Bottle Presenters.
            </h2>
            <p className="text-sm text-[#86868b] max-w-xl">
              High-intensity rechargeable LED glorifiers, marquee letterboards, and royal shields engineered for luxury clubs, lounges, and festival stages.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#86868b]">
            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <BatteryCharging className="w-4 h-4" />
              <span>8h Rechargeable Battery</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#2997ff] font-medium">
              <Radio className="w-4 h-4" />
              <span>RF Strobe Remote</span>
            </div>
          </div>
        </div>

        {/* Presenter Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOTTLE_PRESENTERS.map((item) => {
            const isPowered = powerStates[item.id] !== false;
            const isAdded = addedIds[item.id];

            return (
              <div
                key={item.id}
                className="apple-card p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#2997ff] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2997ff]/10 border border-[#2997ff]/20">
                      {item.kicker}
                    </span>
                    
                    {/* Power / Strobe Toggle on Card */}
                    <button
                      onClick={() => togglePower(item.id)}
                      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                        isPowered
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'bg-red-500/20 text-red-300 border-red-500/50'
                      }`}
                      title="Toggle Strobe Lighting"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* ACTUAL HIGH-RES PHOTOGRAPHY STAGE */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-[#0c0d12] border border-[#222225] overflow-hidden mb-5 select-none group/photo cursor-pointer">
                  
                  {/* Photo Display with Strobe Power Effect */}
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => { playClickSound(); setSelectedPhotoModal(item); }}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover/photo:scale-105 ${
                      isPowered 
                        ? 'brightness-105 contrast-105' 
                        : 'grayscale opacity-40 brightness-50'
                    }`}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Dynamic Color Aura on Edge */}
                  {isPowered && (
                    <div 
                      className="absolute inset-0 border-2 rounded-2xl pointer-events-none opacity-60 animate-pulse"
                      style={{ borderColor: item.glowColor }}
                    />
                  )}

                  {/* Zoom Fullscreen Trigger Pill */}
                  <button
                    onClick={() => { playClickSound(); setSelectedPhotoModal(item); }}
                    className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] text-white flex items-center gap-1 opacity-0 group-hover/photo:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-3 h-3 text-[#2997ff]" />
                    <span>View HD Photo</span>
                  </button>

                  {/* Battery Life Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <BatteryCharging className="w-3.5 h-3.5" />
                    <span>{item.specs.batteryLife.split('(')[0]}</span>
                  </div>

                  {/* Dimensions Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-white font-mono">
                    {item.dimensions}
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-1.5 text-xs text-[#a1a1a6] mb-5">
                  <div>• {item.highlights[0]}</div>
                  <div>• {item.highlights[1]}</div>
                  <div>• {item.highlights[3] || item.highlights[2]}</div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-[#222225] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#86868b] block">Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-white">
                        {formatPrice(item.priceINR, selectedCurrency)}
                      </span>
                      <span className="text-[11px] text-[#86868b] line-through">
                        {formatPrice(item.originalPriceINR, selectedCurrency)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBuy(item)}
                      className={`apple-btn-primary py-2 px-3 text-xs font-semibold cursor-pointer ${
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

                    <button
                      onClick={() => handleWhatsAppCustomClubQuote(item)}
                      className="p-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 cursor-pointer transition-colors"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN HD PHOTO LIGHTBOX MODAL */}
      {selectedPhotoModal && (
        <div 
          onClick={() => setSelectedPhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#161617] border border-[#2d2d30] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="relative h-[420px] sm:h-[500px] w-full bg-black">
              <img
                src={selectedPhotoModal.image}
                alt={selectedPhotoModal.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 bg-[#121214] flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">{selectedPhotoModal.name}</h4>
                <p className="text-xs text-[#86868b]">{selectedPhotoModal.specs.batteryLife} • Fast USB-C Charger & Strobe Remote Included</p>
              </div>

              <button
                onClick={() => {
                  handleBuy(selectedPhotoModal);
                  setSelectedPhotoModal(null);
                }}
                className="apple-btn-primary py-2.5 px-5 text-xs font-semibold cursor-pointer"
              >
                Buy for {formatPrice(selectedPhotoModal.priceINR, selectedCurrency)}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
