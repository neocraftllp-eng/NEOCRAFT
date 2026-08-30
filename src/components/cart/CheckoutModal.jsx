import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  MessageCircle, 
  Sparkles, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  appliedPromo,
  onClearCart,
  selectedCurrency = 'INR'
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

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

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your name, contact phone and delivery address.');
      return;
    }

    playChimeSound();
    const generatedId = `NCX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#00F0FF', '#ec4899', '#39FF14', '#FFD700']
    });

    onClearCart();
  };

  const handleWhatsAppDispatch = () => {
    playClickSound();
    const itemsSummary = cartItems.map(i => `${i.name} (x${i.quantity || 1})`).join(', ');
    const msg = encodeURIComponent(
      `🎉 New Order Placed: #${orderId || 'NCX-VIP'}\n\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n` +
      `• Items: ${itemsSummary}\n` +
      `• Payment Method: ${paymentMethod.toUpperCase()}\n` +
      `• Total Amount: ₹${finalTotal.toLocaleString('en-IN')}\n\n` +
      `Please provide estimated dispatch date!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#090c14] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {step === 'form' ? 'EXPRESS CHECKOUT & DISPATCH' : 'ORDER CONFIRMED!'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 'form' ? 'Insured Wooden Crate Pan-India Delivery' : `Tracking Reference: #${orderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order Quick Summary Bar */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">{cartItems.length} items in cart</span>
                  <div className="text-base font-black text-white mt-0.5">
                    Total: <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">{formatPrice(finalTotal, selectedCurrency)}</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-400 font-semibold">
                  <Truck className="w-4 h-4 inline mr-1" />
                  Free Express Delivery
                </div>
              </div>

              {/* Contact & Shipping Details */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  1. Shipping & Contact Information:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarav Mehta"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 91666 91274"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Complete Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat / Office No, Building, Street, Landmark..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Maharashtra"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="400050"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  2. Select Payment Method:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('upi'); }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-cyan-400 bg-cyan-500/15 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-cyan-400 mb-1" />
                    <div className="font-bold text-xs text-white">Instant UPI</div>
                    <div className="text-[9px] text-slate-400">GPay, PhonePe, Paytm QR</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('card'); }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-pink-400 bg-pink-500/15 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-pink-400 mb-1" />
                    <div className="font-bold text-xs text-white">Cards / NetBanking</div>
                    <div className="text-[9px] text-slate-400">Debit, Credit & EMI</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playClickSound(); setPaymentMethod('advance'); }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'advance'
                        ? 'border-amber-400 bg-amber-500/15 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-amber-400 mb-1" />
                    <div className="font-bold text-xs text-white">COD (20% Advance)</div>
                    <div className="text-[9px] text-slate-400">Balance on Delivery</div>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order • {formatPrice(finalTotal, selectedCurrency)}</span>
                </button>

                <p className="text-[10px] text-center text-slate-500">
                  🔒 256-Bit Encrypted Secure Checkout • 100% Transit Safe Warranty
                </p>
              </div>

            </form>
          ) : (
            /* ORDER SUCCESS SCREEN */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-bounce-short">
                <PackageCheck className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  THANK YOU FOR YOUR ORDER!
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  Your custom neon craftsmanship has begun. We will dispatch your order in 3-5 business days.
                </p>
              </div>

              {/* Order Specs Box */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tracking Reference:</span>
                  <span className="font-mono font-bold text-cyan-300">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient:</span>
                  <span className="text-white font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery City:</span>
                  <span className="text-white font-semibold">{formData.city}, {formData.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="text-emerald-400 font-bold">Confirmed via {paymentMethod.toUpperCase()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppDispatch}
                  className="px-6 py-3 rounded-xl bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400 text-emerald-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Receive Live WhatsApp Updates</span>
                </button>

                <button
                  onClick={() => { playClickSound(); onClose(); }}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Back To Studio
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
