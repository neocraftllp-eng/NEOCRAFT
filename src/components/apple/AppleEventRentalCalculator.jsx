import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ShoppingBag, 
  Check, 
  MessageCircle,
  Clock
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const POPULAR_WEDDING_PRESETS = [
  { text: '#BetterTogether', vibe: 'Warm Wedding 2700K Gold', color: '#FFD700' },
  { text: 'All You Need Is Love', vibe: 'Romantic Rose Blush', color: '#FF1493' },
  { text: 'Happily Ever After', vibe: 'Pure Arctic White', color: '#FFFFFF' },
  { text: '#TheKapoorWedding', vibe: 'Custom Couple Hashtag', color: '#FFD700' }
];

export default function AppleEventRentalCalculator({
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [customHashtag, setCustomHashtag] = useState('#TheKapoorWedding');
  const [selectedPlan, setSelectedPlan] = useState('buyout'); // 'buyout' | 'rental'
  const [selectedColor, setSelectedColor] = useState('#FFD700');
  const [isAdded, setIsAdded] = useState(false);

  const buyoutPrice = 6499;
  const rentalPrice = 2999;

  const handleBuy = () => {
    playChimeSound();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    const isBuyout = selectedPlan === 'buyout';
    const item = {
      id: `wedding-${Date.now()}`,
      name: `${isBuyout ? 'Wedding Keepsake' : '3-Day Event Rental'} ("${customHashtag}")`,
      category: 'Weddings & Celebrations',
      price: isBuyout ? buyoutPrice : rentalPrice,
      originalPrice: isBuyout ? 9999 : 4999,
      quantity: 1,
      image: '💍',
      specs: {
        dimensions: '90 cm × 40 cm',
        color: selectedColor,
        plan: isBuyout ? 'Forever Keepsake' : '3-Day Rental with Pickup Box',
        dimmer: 'Included'
      }
    };
    if (onAddToCart) onAddToCart(item);
  };

  const handleWhatsAppConsult = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Wedding Concierge! 💍\n\n` +
      `I would like to inquire about wedding / celebration neon:\n` +
      `• Custom Text: ${customHashtag}\n` +
      `• Plan: ${selectedPlan === 'buyout' ? 'Forever Keepsake (₹6,499)' : '3-Day Rental (₹2,999)'}\n\n` +
      `Please share photo backdrop mockups and delivery dates.`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <section id="wedding-rental-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" /> WEDDINGS, PROPOSALS & RED CARPET CELEBRATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            From the aisle to your bedroom wall.
          </h2>
          <p className="text-sm text-[#86868b]">
            Illuminate your wedding photo backdrop and reception stage. Keep it forever as your master suite headboard heirloom art, or choose convenient 3-day event rental.
          </p>
        </div>

        {/* 2-Column Split: Stage on Left, Keepsake vs Rental on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[#09090c] border border-[#262629] relative overflow-hidden p-8">
            
            {/* Ambient Warm Golden / Rose Glow */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${selectedColor}40 0%, transparent 65%)`
              }}
            />

            {/* Glowing Wedding Text */}
            <div
              className="font-['Great_Vibes',cursive] font-bold text-center tracking-wider z-10 select-none px-4"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                color: '#ffffff',
                textShadow: `0 0 4px #ffffff, 0 0 14px ${selectedColor}, 0 0 35px ${selectedColor}, 0 0 70px ${selectedColor}`
              }}
            >
              {customHashtag || '#BetterTogether'}
            </div>

            {/* Top Text Input */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <input
                type="text"
                value={customHashtag}
                onChange={(e) => setCustomHashtag(e.target.value)}
                placeholder="TYPE WEDDING HASHTAG..."
                className="bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-white font-mono focus:outline-none focus:border-pink-400 w-48 sm:w-64"
              />

              <div className="flex items-center gap-1.5">
                {['#FFD700', '#FF1493', '#FFFFFF', '#00F0FF'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { playClickSound(); setSelectedColor(c); }}
                    className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${
                      selectedColor === c ? 'scale-125 border-white shadow-md' : 'border-black/50 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar z-20">
              {POPULAR_WEDDING_PRESETS.map((wp) => (
                <button
                  key={wp.text}
                  onClick={() => {
                    playClickSound();
                    setCustomHashtag(wp.text);
                    setSelectedColor(wp.color);
                  }}
                  className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white hover:border-pink-400 shrink-0 transition-colors cursor-pointer"
                >
                  {wp.text}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Keepsake vs Rental Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs">
            
            {/* Plan 1: Forever Keepsake Buyout */}
            <button
              onClick={() => { playClickSound(); setSelectedPlan('buyout'); }}
              className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === 'buyout'
                  ? 'bg-gradient-to-r from-[#221820] to-[#121215] border-pink-400 text-white shadow-lg'
                  : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="font-semibold text-white text-sm">Forever Heirloom Keepsake</span>
                </div>
                <span className="font-bold text-pink-300 font-mono text-sm">{formatPrice(buyoutPrice, selectedCurrency)}</span>
              </div>
              <p className="text-[11px] text-[#a1a1a6] leading-relaxed">
                Yours to cherish for a lifetime. Mount on stage for your wedding day, then hang permanently above your master bedroom headboard. Includes 50,000h warranty.
              </p>
            </button>

            {/* Plan 2: 3-Day Event Rental */}
            <button
              onClick={() => { playClickSound(); setSelectedPlan('rental'); }}
              className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedPlan === 'rental'
                  ? 'bg-[#1e1e24] border-white text-white shadow-lg'
                  : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2997ff]" />
                  <span className="font-semibold text-white text-sm">3-Day Event Rental</span>
                </div>
                <span className="font-bold text-[#2997ff] font-mono text-sm">{formatPrice(rentalPrice, selectedCurrency)}</span>
              </div>
              <p className="text-[11px] text-[#86868b] leading-relaxed">
                Includes pre-event doorstep air delivery in heavy-duty flight case, and free return courier pickup after your reception wraps up.
              </p>
            </button>

            {/* Actions: Add to Bag + WhatsApp Consultation */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleBuy}
                className={`apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Confirm {selectedPlan === 'buyout' ? 'Keepsake Buyout' : 'Event Rental'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-pink-400" />
                <span>Request Wedding Stage Backdrop 3D Proof</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
