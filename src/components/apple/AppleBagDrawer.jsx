import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MessageCircle, CheckCircle2 } from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleBagDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onProceedCheckout,
  selectedCurrency = 'INR'
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'NEO15') discount = Math.round(subtotal * 0.15);
    else if (appliedPromo.code === 'VIP20') discount = Math.round(subtotal * 0.20);
    else if (appliedPromo.code === 'FREEDIMMER') discount = 799;
    else if (appliedPromo.code === 'TRADEIN2000') discount = 2000;
    else if (appliedPromo.code === 'TRADEIN1500') discount = 1500;
    else if (appliedPromo.code === 'TRADEIN1000') discount = 1000;
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCode = () => {
    playClickSound();
    const c = promoInput.trim().toUpperCase();
    if (['NEO15', 'VIP20', 'FREEDIMMER', 'TRADEIN2000', 'TRADEIN1500', 'TRADEIN1000'].includes(c)) {
      playChimeSound();
      onApplyPromo({ code: c, label: `${c} Active` });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try NEO15 or TRADEIN2000');
    }
  };

  const handleWhatsAppCheckout = () => {
    playClickSound();
    if (cartItems.length === 0) return;

    const itemsSummary = cartItems.map((i, idx) => {
      return `${idx + 1}. ${i.name} x${i.quantity || 1} = ₹${(i.price * (i.quantity || 1)).toLocaleString('en-IN')}`;
    }).join('\n');

    const msg = encodeURIComponent(
      `Hello Neocraft! ⚡ I want to place an order from my Bag:\n\n` +
      `${itemsSummary}\n\n` +
      `• Total Amount: ₹${finalTotal.toLocaleString('en-IN')}\n` +
      `• Shipping: Free Pan-India Wooden Crate\n\n` +
      `Please confirm stock & send the invoice QR!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark Frosted Backdrop */}
      <div 
        onClick={() => { playClickSound(); onClose(); }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161617] border-l border-[#2d2d30] shadow-2xl flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#2997ff]" />
              <h3 className="font-semibold text-sm text-white tracking-tight">
                Review your Bag ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#222225] flex items-center justify-center text-xl text-[#86868b]">
                  🛍️
                </div>
                <h4 className="font-semibold text-base text-white">Your Bag is empty.</h4>
                <p className="text-xs text-[#86868b] max-w-xs mx-auto">
                  Explore our custom studio or choose a signature model from our lineup.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#2d2d30] shrink-0"
                        />
                      ) : null}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                        {item.specs && (
                          <div className="text-[11px] text-[#86868b] mt-0.5 space-y-0.5">
                            {item.specs.battery && <div>Battery: {item.specs.battery}</div>}
                            {item.specs.dimensions && <div>Dimensions: {item.specs.dimensions}</div>}
                            {item.specs.font && <div>Font: {item.specs.font}</div>}
                            {item.specs.color && <div>Finish: {item.specs.color}</div>}
                            {item.specs.size && <div>Size: {item.specs.size}</div>}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => { playClickSound(); onRemoveItem(item.id); }}
                        className="text-[#86868b] hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#262629]">
                      <div className="flex items-center gap-2 bg-[#121214] px-2 py-1 rounded-full border border-[#2d2d30]">
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1));
                          }}
                          className="text-[#86868b] hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-semibold text-white w-4 text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, (item.quantity || 1) + 1);
                          }}
                          className="text-[#86868b] hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-semibold text-sm text-white">
                        {formatPrice(item.price * (item.quantity || 1), selectedCurrency)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NEO15)"
                      className="flex-1 px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-xs text-white uppercase font-mono focus:outline-none focus:border-[#2997ff]"
                    />
                    <button
                      onClick={handleApplyCode}
                      className="px-4 py-2 rounded-xl bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white text-xs font-medium cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-red-400 mt-1">{promoError}</p>}
                  {appliedPromo && (
                    <p className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{appliedPromo.label}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#121214] border-t border-[#2d2d30] space-y-4 text-xs">
              <div className="space-y-1.5 text-[#86868b]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal, selectedCurrency)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice(discount, selectedCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Wooden Crate Delivery</span>
                  <span className="text-emerald-400 font-semibold uppercase text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-[#262629]">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal, selectedCurrency)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { playClickSound(); onProceedCheckout(); }}
                  className="apple-btn-primary w-full py-3 text-sm font-semibold cursor-pointer"
                >
                  <span>Check Out</span>
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="apple-btn-secondary w-full py-2.5 text-xs font-medium cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Order via WhatsApp Direct</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#86868b]">
                <ShieldCheck className="w-3 h-3 text-[#2997ff]" />
                <span>2-Year Direct Warranty • 100% Transit Safe</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
