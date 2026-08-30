import React, { useState } from 'react';
import { Camera, MapPin, Sparkles, ShoppingBag, Check, Heart, ExternalLink } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const REAL_INSTALLATIONS = [
  {
    id: 'shot-mumbai-villa',
    title: 'Minimalist Sea-Facing Penthouse',
    location: 'Bandra West, Mumbai',
    productName: 'NEOCRAFT Celestial Wings Pro',
    productCategory: 'Wings & Backdrops',
    priceINR: 9499,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    client: 'Design by Studio Arch',
    quote: '"The 120cm split archangel wings completely transformed our double-height foyer wall into an Instagram hotspot."'
  },
  {
    id: 'shot-dubai-lounge',
    title: 'VIP Skyline Speakeasy Lounge',
    location: 'Downtown Dubai, UAE',
    productName: 'Aurora Diamond LED Bottle Presenter',
    productCategory: 'Bottle Presenters',
    priceINR: 11999,
    image: '/images/presenters/aurora-diamond.jpg',
    client: 'Nocturne Nightclub',
    quote: '"The strobe chasing effects and 8h battery runtime make bottle drops look electrifying across VIP tables."'
  },
  {
    id: 'shot-delhi-mansion',
    title: 'Modern Vastu Sanctuary Living Room',
    location: 'Vasant Vihar, New Delhi',
    productName: 'Vastu Seven Running White Horses (48" × 48")',
    productCategory: 'Canvas Paintings',
    priceINR: 6290,
    image: '/images/canvas/seven-horses.jpg',
    client: 'The Kapoor Residence',
    quote: '"The 380 GSM cotton canvas and gold brushed floating frame exceeded our expectations. Truly museum-grade."'
  },
  {
    id: 'shot-bangalore-studio',
    title: 'Creator Cyberpunk Battlestation',
    location: 'Indiranagar, Bangalore',
    productName: 'NEOCRAFT Cyber Katana Blade',
    productCategory: 'Anime & Gaming',
    priceINR: 4999,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    client: '@RohanGaming Live',
    quote: '"Zero electrical hum and 12V silent operation. Looks incredible on my 4K Twitch streaming camera setup."'
  },
  {
    id: 'shot-goa-resort',
    title: 'Boutique Beachfront Cocktail Bar',
    location: 'Anjuna, Goa',
    productName: 'NEOCRAFT Cocktails & Dreams',
    productCategory: 'Bar & Dining',
    priceINR: 6299,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    client: 'Sunkissed Social Club',
    quote: '"The tri-color dimming allows us to switch from daytime cafe vibes to moody midnight lounge ambience seamlessly."'
  },
  {
    id: 'shot-gurgaon-corporate',
    title: 'Architectural Reception Atrium',
    location: 'Cyber City, Gurgaon',
    productName: '3D Halo Backlit Cast Acrylic Facade',
    productCategory: '3D Architectural Signage',
    priceINR: 12999,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    client: 'Apex Fintech HQ',
    quote: '"Solid 20mm virgin acrylic with 360° halo illumination. Premium corporate prestige with zero visible wires."'
  }
];

export default function AppleShotOnNeocraft({
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [addedIds, setAddedIds] = useState({});

  const handleShopLook = (item) => {
    playChimeSound();
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);

    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.productName,
      category: item.productCategory,
      price: item.priceINR,
      originalPrice: Math.round(item.priceINR * 1.35),
      quantity: 1,
      image: item.image,
      specs: {
        location: item.location,
        verifiedClient: item.client
      }
    };
    onAddToCart(cartItem);
  };

  return (
    <section id="installations-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1140px] mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5" /> ILLUMINATED BY NEOCRAFT
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
              Real spaces. Real luminescence.
            </h2>
            <p className="text-sm text-[#86868b] max-w-xl">
              Curated architectural installations from luxury villas, speakeasy lounges, creator studios, and corporate headquarters.
            </p>
          </div>

          <div className="text-xs text-[#86868b]">
            <span className="text-white font-semibold">1,200+ Spaces</span> illuminated across India & UAE
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_INSTALLATIONS.map((inst) => {
            const isAdded = addedIds[inst.id];

            return (
              <div
                key={inst.id}
                className="apple-card overflow-hidden border border-[#262629] flex flex-col justify-between group"
              >
                {/* Photo Viewport */}
                <div className="relative h-64 w-full bg-[#111113] overflow-hidden">
                  <img
                    src={inst.image}
                    alt={inst.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Location Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>{inst.location}</span>
                  </div>

                  {/* Client Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="text-xs font-semibold text-white truncate">{inst.title}</div>
                    <div className="text-[10px] text-[#86868b]">{inst.client}</div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#a1a1a6] italic leading-relaxed">
                    {inst.quote}
                  </p>

                  <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#86868b] block">Featured Product</span>
                      <span className="text-xs font-semibold text-white truncate block max-w-[160px]">
                        {inst.productName}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#2997ff]">
                        {formatPrice(inst.priceINR, selectedCurrency)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleShopLook(inst)}
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
                          <span>Shop Look</span>
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
