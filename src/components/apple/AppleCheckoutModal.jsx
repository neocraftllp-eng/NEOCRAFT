import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  QrCode, 
  CreditCard, 
  CheckCircle2, 
  MessageCircle, 
  PackageCheck,
  Smartphone,
  Lock,
  Building,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleCheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  appliedPromo,
  onClearCart,
  selectedCurrency = 'INR'
}) {
  const [step, setStep] = useState('shipping'); // 'shipping' | 'payment' | 'processing' | 'success'
  const [paymentGateway, setPaymentGateway] = useState('upi'); // 'upi' | 'card' | 'applepay' | 'netbanking' | 'emi' | 'cod'
  const [orderId, setOrderId] = useState('');
  
  // Shipping form
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Payment Details Form
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedEmiMonths, setSelectedEmiMonths] = useState(3);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'NEO15') discount = Math.round(subtotal * 0.15);
    else if (appliedPromo.code === 'ARCH25') discount = Math.round(subtotal * 0.25);
    else if (appliedPromo.code === 'VIP20') discount = Math.round(subtotal * 0.20);
    else if (appliedPromo.code === 'FREEDIMMER') discount = 799;
    else if (appliedPromo.code === 'TRADEIN2000') discount = 2000;
    else if (appliedPromo.code === 'TRADEIN1500') discount = 1500;
    else if (appliedPromo.code === 'TRADEIN1000') discount = 1000;
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    playClickSound();
    setStep('payment');
  };

  const handleExecutePayment = () => {
    playClickSound();
    setStep('processing');

    setTimeout(() => {
      playChimeSound();
      const id = `APL-NCX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setStep('success');

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#0071e3', '#2997ff', '#10b981', '#ffffff']
      });

      if (onClearCart) onClearCart();
    }, 1800);
  };

  const handleWhatsAppReceipt = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Billing! ⚡\n\n` +
      `I have placed Order #${orderId}:\n` +
      `• Name: ${form.name}\n` +
      `• Amount Paid: ₹${finalTotal.toLocaleString('en-IN')}\n` +
      `• Payment Gateway: ${paymentGateway.toUpperCase()}\n` +
      `• Delivery Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}\n\n` +
      `Please confirm GST invoice & share production status updates!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-2xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              {step === 'shipping' && '1. Shipping & Delivery Address'}
              {step === 'payment' && '2. Razorpay & Stripe 256-Bit SSL Payment Gateway'}
              {step === 'processing' && 'Authenticating with Payment Gateway...'}
              {step === 'success' && 'Payment Verified & Order Placed'}
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
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* ================= STEP 1: SHIPPING ================= */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5 text-xs">
              
              {/* Order total summary */}
              <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] flex items-center justify-between">
                <div>
                  <span className="text-[#86868b]">{cartItems.length} items in Bag</span>
                  <div className="text-xl font-bold text-white mt-0.5">
                    Total: {formatPrice(finalTotal, selectedCurrency)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free BlueDart Air Express</span>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Delivery Destination:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Kabir Singhania"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Phone Number (WhatsApp Updates) *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 91666 91274"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Office No, Building Name, Street, Landmark..."
                    className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff] resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Mumbai"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="Maharashtra"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="400013"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#222225]">
                <button
                  type="submit"
                  className="apple-btn-primary w-full py-3.5 text-xs sm:text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* ================= STEP 2: PAYMENT GATEWAY ================= */}
          {step === 'payment' && (
            <div className="space-y-6 text-xs">
              
              {/* Order total header */}
              <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-[#2d2d30] flex items-center justify-between">
                <div>
                  <span className="text-[#86868b]">Payable Amount:</span>
                  <div className="text-2xl font-black text-white">
                    {formatPrice(finalTotal, selectedCurrency)}
                  </div>
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-[#2997ff] hover:underline cursor-pointer"
                >
                  Edit Address
                </button>
              </div>

              {/* Gateway Channel Switcher */}
              <div className="space-y-2">
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
                  Select Payment Method:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-1.5">
                  {[
                    { id: 'dodo', label: 'Dodo Pay', icon: '🦤', badge: 'Global' },
                    { id: 'upi', label: 'UPI / QR', icon: '⚡' },
                    { id: 'card', label: 'Cards', icon: '💳' },
                    { id: 'applepay', label: 'Apple Pay', icon: '🍎' },
                    { id: 'netbanking', label: 'NetBanking', icon: '🏛️' },
                    { id: 'emi', label: 'No-Cost EMI', icon: '📅' },
                    { id: 'cod', label: 'COD (20%)', icon: '📦' }
                  ].map((gw) => (
                    <button
                      key={gw.id}
                      type="button"
                      onClick={() => { playClickSound(); setPaymentGateway(gw.id); }}
                      className={`p-2 rounded-2xl border text-center cursor-pointer transition-all ${
                        paymentGateway === gw.id
                          ? 'bg-white text-black font-bold border-white shadow-lg'
                          : 'bg-[#121214] border-[#2d2d30] text-[#86868b] hover:text-white'
                      }`}
                    >
                      <div className="text-base">{gw.icon}</div>
                      <div className="text-[10px] mt-0.5">{gw.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gateway Tab 0: Dodo Payments (Global & Multi-Currency) */}
              {paymentGateway === 'dodo' && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c1824] to-[#121214] border border-[#ff6b00]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🦤</span>
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>Dodo Payments Global Checkout</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#ff6b00]/20 text-[#ff8c38] text-[9px] font-bold uppercase">
                            Global MoR
                          </span>
                        </div>
                        <span className="text-[10px] text-[#86868b]">Instant multi-currency conversion in USD, EUR, GBP, AED, INR</span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs text-emerald-400 font-bold">
                      Zero Forex Surcharge
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="font-bold text-white">Global Cards</div>
                      <div className="text-[9px] text-[#86868b]">Visa, MC, Amex, JCB</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="font-bold text-white">Apple / Google Pay</div>
                      <div className="text-[9px] text-[#86868b]">Biometric 1-Click</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="font-bold text-white">PayPal & SEPA</div>
                      <div className="text-[9px] text-[#86868b]">Europe & US Direct</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 text-center">
                      <div className="font-bold text-white">India UPI / QR</div>
                      <div className="text-[9px] text-[#86868b]">Instant PhonePe/GPay</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gateway Tab 1: UPI & Dynamic QR */}
              {paymentGateway === 'upi' && (
                <div className="p-5 rounded-2xl bg-[#121214] border border-[#222225] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Simulated Real QR */}
                    <div className="p-3 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center shrink-0">
                      <QrCode className="w-32 h-32 text-black" />
                      <span className="text-[10px] font-mono font-bold text-slate-900 mt-1">Scan with any UPI App</span>
                    </div>

                    <div className="space-y-3 w-full">
                      <div className="space-y-1">
                        <span className="text-[11px] text-[#86868b] block font-medium">Or enter your VPA / UPI ID:</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="flex-1 px-3 py-2 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                          />
                        </div>
                      </div>

                      {/* Quick UPI App Icons */}
                      <div className="flex items-center gap-2 pt-1">
                        {['Google Pay', 'PhonePe', 'Paytm', 'CRED'].map((app) => (
                          <span key={app} className="px-2 py-1 bg-[#1c1c20] border border-white/10 rounded-lg text-[10px] text-white">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Gateway Tab 2: Credit/Debit Cards */}
              {paymentGateway === 'card' && (
                <div className="p-5 rounded-2xl bg-[#121214] border border-[#222225] space-y-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength="19"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="4532 •••• •••• 8891"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#86868b] block mb-1">Valid Thru (MM/YY)</label>
                      <input
                        type="text"
                        maxLength="5"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        placeholder="08/29"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#2997ff]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#86868b] block mb-1">CVV / Security Code</label>
                      <input
                        type="password"
                        maxLength="4"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#2997ff]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      placeholder="KABIR SINGHANIA"
                      className="w-full px-3 py-2 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white uppercase text-xs focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>
              )}

              {/* Gateway Tab 3: Apple Pay Express */}
              {paymentGateway === 'applepay' && (
                <div className="p-6 rounded-2xl bg-[#121214] border border-[#222225] text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
                    
                  </div>
                  <h4 className="font-semibold text-white text-sm">Apple Pay Express Touch / Face ID</h4>
                  <p className="text-xs text-[#86868b] max-w-sm mx-auto">
                    Instant 1-click biometric checkout linked to your default Apple Wallet card.
                  </p>
                </div>
              )}

              {/* Gateway Tab 4: NetBanking */}
              {paymentGateway === 'netbanking' && (
                <div className="p-5 rounded-2xl bg-[#121214] border border-[#222225] space-y-3">
                  <span className="text-[11px] text-[#86868b] block font-medium">Select Popular Bank:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Yes Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => { playClickSound(); setSelectedBank(b); }}
                        className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer ${
                          selectedBank === b ? 'bg-white text-black border-white' : 'bg-[#18181b] border-[#2d2d30] text-[#86868b]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gateway Tab 5: No-Cost EMI */}
              {paymentGateway === 'emi' && (
                <div className="p-5 rounded-2xl bg-[#121214] border border-[#222225] space-y-3">
                  <span className="text-[11px] text-[#86868b] block font-medium">Choose EMI Plan (0% Interest):</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 6, 9].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => { playClickSound(); setSelectedEmiMonths(m); }}
                        className={`p-3 rounded-xl border text-center cursor-pointer ${
                          selectedEmiMonths === m ? 'bg-white text-black border-white' : 'bg-[#18181b] border-[#2d2d30] text-[#86868b]'
                        }`}
                      >
                        <div className="font-bold text-sm">₹{Math.round(finalTotal / m).toLocaleString('en-IN')}/mo</div>
                        <div className="text-[10px] mt-0.5">{m} Months @ 0%</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gateway Tab 6: COD */}
              {paymentGateway === 'cod' && (
                <div className="p-5 rounded-2xl bg-[#121214] border border-[#222225] space-y-2 text-xs">
                  <div className="font-semibold text-amber-300">Custom Signage Partial COD Policy</div>
                  <p className="text-[#86868b] leading-relaxed">
                    Pay 20% advance (₹{Math.round(finalTotal * 0.2).toLocaleString('en-IN')}) now to begin CNC laser fabrication, and pay the remaining 80% (₹{Math.round(finalTotal * 0.8).toLocaleString('en-IN')}) in cash or UPI upon delivery.
                  </p>
                </div>
              )}

              {/* Security Badges & Pay Button */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-center gap-4 text-[10px] text-[#86868b]">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-400" /> 256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span>Verified by Razorpay & Stripe</span>
                  <span>•</span>
                  <span>100% Buyer Protection</span>
                </div>

                <button
                  type="button"
                  onClick={handleExecutePayment}
                  className="apple-btn-primary w-full py-4 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {formatPrice(finalTotal, selectedCurrency)}</span>
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: PROCESSING SANDBOX ================= */}
          {step === 'processing' && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#2997ff] border-t-transparent animate-spin" />
              <h3 className="text-xl font-semibold text-white">Contacting Payment Gateway...</h3>
              <p className="text-xs text-[#86868b]">
                Securely verifying transaction via 256-bit encrypted banking handshake. Please do not refresh.
              </p>
            </div>
          )}

          {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
          {step === 'success' && (
            <div className="text-center py-8 space-y-5 text-xs">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Payment Approved!</h3>
                <p className="text-[#86868b] mt-1">
                  Order ID: <strong className="text-white font-mono">{orderId}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Recipient:</span>
                  <span className="font-semibold text-white">{form.name || 'Valued Customer'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Destination:</span>
                  <span className="font-semibold text-white">{form.city}, {form.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Logistics:</span>
                  <span className="text-emerald-400 font-semibold">BlueDart Air Priority Express</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#86868b]">Warranty:</span>
                  <span className="text-cyan-300 font-semibold">2-Year Direct Replacement</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppReceipt}
                  className="apple-btn-primary w-full sm:w-auto py-3 px-6 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Receive WhatsApp Tax Invoice</span>
                </button>

                <button
                  onClick={() => { playClickSound(); onClose(); }}
                  className="apple-btn-secondary w-full sm:w-auto py-3 px-6 text-xs font-semibold cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
