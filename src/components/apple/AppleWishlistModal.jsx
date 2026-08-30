import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  ShoppingBag, 
  Gift, 
  MessageCircle,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const DEFAULT_WISHLIST_ITEMS = [
  {
    id: 'wish-1',
    name: 'Custom Neon ("DREAM BIG")',
    category: 'Signature Neon',
    price: 6499,
    image: '✨',
    funded: '100% Available'
  },
  {
    id: 'wish-2',
    name: 'Museum Giclée Canvas ("Seven Running Horses")',
    category: 'Vastu Art',
    price: 8999,
    image: '/images/canvas/seven-horses.jpg',
    funded: '100% Available'
  }
];

export default function AppleWishlistModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [registryTitle, setRegistryTitle] = useState('Kabir & Riya’s Dream Home Registry');
  const [registryCategory, setRegistryCategory] = useState('Wedding / Housewarming');
  const [items, setItems] = useState(DEFAULT_WISHLIST_ITEMS);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareableUrl = `https://neocraftx.com/wishlist#NC-REG-${Math.abs(registryTitle.length * 4821)}`;

  const handleCopyLink = () => {
    playChimeSound();
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2997ff', '#ec4899', '#ffffff']
    });
  };

  const handleShareWhatsApp = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello! 🎁 Check out my NEOCRAFT Luxury Neon & Fine Art Wishlist:\n\n` +
      `"${registryTitle}"\n` +
      `• Link: ${shareableUrl}\n\n` +
      `You can gift any sign or chip in directly with complimentary laser gift engraving!`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-pink-400" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Luxury Gift Registry & Shareable Wishlist
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* Top Registry Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#241822] to-[#121215] border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <input
                type="text"
                value={registryTitle}
                onChange={(e) => setRegistryTitle(e.target.value)}
                className="text-lg sm:text-xl font-bold text-white bg-transparent border-b border-white/20 focus:outline-none focus:border-pink-400 w-full"
              />
              <span className="text-[11px] text-pink-300 font-medium block">
                Category: {registryCategory} • 2 Curated Artworks
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="apple-btn-secondary py-2 px-4 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="apple-btn-primary py-2 px-4 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Registry Wishlist Items List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-[#86868b]">
              <span className="font-semibold uppercase tracking-wider">Curated Gift Items:</span>
              <span>Friends & family can purchase directly with engraved gift note</span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#121214] border border-[#222225] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-[#333]" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#1e1e24] flex items-center justify-center text-xl">
                        {item.image}
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-white text-xs">{item.name}</h4>
                      <div className="font-mono text-pink-300 font-bold text-xs mt-0.5">
                        {formatPrice(item.price, selectedCurrency)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playChimeSound();
                      if (onAddToCart) onAddToCart(item);
                      onClose();
                    }}
                    className="apple-btn-primary py-2 px-4 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Gift This Sign</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
