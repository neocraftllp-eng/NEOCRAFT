import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Gift, 
  MessageCircle,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const UPSELL_ADDONS = [
  { id: 'addon-wifi', name: 'Smart WiFi Plug (Alexa/Google Home)', price: 699, icon: '🔌' },
  { id: 'addon-chain', name: 'Heavy Duty Stainless Hanging Chain Kit', price: 349, icon: '⛓️' },
  { id: 'addon-cleaner', name: 'Anti-Static Acrylic Polish & Microfiber Kit', price: 249, icon: '✨' },
];

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onAddAddon,
  appliedPromo,
  onApplyPromo,
  onProceedCheckout,
  selectedCurrency = 'INR'
}) {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'NEO15' || appliedPromo.code === 'VIBE10') {
      discountAmount = Math.round(subtotal * 0.15);
    } else if (appliedPromo.code === 'VIP20') {
      discountAmount = Math.round(subtotal * 0.20);
    } else if (appliedPromo.code === 'NEO1000' && subtotal >= 5000) {
      discountAmount = 1000;
    } else if (appliedPromo.code === 'FREEDIMMER') {
      discountAmount = 799;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromoCode = () => {
    playClickSound();
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'NEO15' || code === 'VIBE10' || code === 'VIP20' || code === 'NEO1000' || code === 'FREEDIMMER') {
      playChimeSound();
      onApplyPromo({ code, label: `${code} Applied` });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try NEO15 or spin the wheel!');
    }
  };

  const handleWhatsAppCheckout = () => {
    playClickSound();
    if (cartItems.length === 0) return;

    let itemsList = cartItems.map((item, idx) => {
      let specStr = '';
      if (item.specs) {
        specStr = ` [Font: ${item.specs.font}, Color: ${item.specs.color}, Size: ${item.specs.size}]`;
      }
      return `${idx + 1}. ${item.name}${specStr} x${item.quantity || 1} = ₹${(item.price * (item.quantity || 1)).toLocaleString('en-IN')}`;
    }).join('\n');

    const message = encodeURIComponent(
      `Hello Neocraft Studio! ⚡ I want to place an order for my cart:\n\n` +
      `${itemsList}\n\n` +
      `• Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n` +
      `• Discount (${appliedPromo?.code || 'None'}): -₹${discountAmount.toLocaleString('en-IN')}\n` +
      `• Final Total: ₹${finalTotal.toLocaleString('en-IN')}\n` +
      `• Shipping: Free Pan-India Insured Delivery\n\n` +
      `Please confirm stock & send the invoice / payment QR code!`
    );

    window.open(`https://wa.me/919166691274?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => { playClickSound(); onClose(); }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090b14] border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-pink-400" />
              <h3 className="font-black text-lg text-white font-['Plus_Jakarta_Sans',sans-serif]">
                YOUR NEON CART ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body (Items & Upsells) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl">
                  ⚡
                </div>
                <h4 className="text-lg font-bold text-white">Your cart is glowing empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Customize a bespoke neon sign in our studio or select a signature piece from our catalog.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.name}
                        </h4>
                        
                        {/* Custom Specs Display */}
                        {item.specs && (
                          <div className="text-[10px] text-slate-400 space-y-0.5 mt-1 font-medium">
                            <div>Font: <span className="text-purple-300">{item.specs.font}</span> | Color: <span className="text-cyan-300">{item.specs.color}</span></div>
                            <div>Size: {item.specs.size} | Backing: {item.specs.backing}</div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => { playClickSound(); onRemoveItem(item.id); }}
                        className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1));
                          }}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, (item.quantity || 1) + 1);
                          }}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-sm font-black text-white">
                        {formatPrice(item.price * (item.quantity || 1), selectedCurrency)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Popular Add-on Upsells */}
                <div className="p-3.5 rounded-xl bg-[#0d101a] border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    Recommended Upgrades:
                  </span>
                  <div className="space-y-2">
                    {UPSELL_ADDONS.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span>{addon.icon}</span>
                          <div>
                            <div className="font-bold text-white text-[11px]">{addon.name}</div>
                            <div className="text-[10px] text-pink-400 font-semibold">{formatPrice(addon.price, selectedCurrency)}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            playChimeSound();
                            onAddAddon({
                              id: `${addon.id}-${Date.now()}`,
                              name: addon.name,
                              price: addon.price,
                              quantity: 1
                            });
                          }}
                          className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Enter promo code (e.g. NEO15)"
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white uppercase font-mono focus:outline-none focus:border-pink-500"
                    />
                    <button
                      onClick={handleApplyPromoCode}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-red-400">{promoError}</p>}
                  {appliedPromo && (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{appliedPromo.label} active</span>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Drawer Footer (Summary & CTAs) */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#070910] border-t border-slate-800 space-y-4">
              
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatPrice(subtotal, selectedCurrency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-{formatPrice(discountAmount, selectedCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Pan-India Crate Delivery</span>
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">
                    {formatPrice(finalTotal, selectedCurrency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => { playClickSound(); onProceedCheckout(); }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed To Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Order Dispatch</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>2-Year Warranty & 100% Transit Damage Protection</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
