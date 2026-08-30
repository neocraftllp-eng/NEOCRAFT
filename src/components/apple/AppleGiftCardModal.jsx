import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  Send,
  Mail,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const CARD_THEMES = [
  { id: 'titanium', name: 'Titanium Obsidian', bg: 'from-[#1c1c1e] via-[#2c2c2e] to-[#000000]', border: 'border-white/20', text: 'text-white' },
  { id: 'neon-cyan', name: 'Cyber Neon Cyan', bg: 'from-[#001f3f] via-[#003366] to-[#000814]', border: 'border-cyan-400/40', text: 'text-cyan-300' },
  { id: 'gold-luxe', name: '24K Liquid Gold', bg: 'from-[#332200] via-[#553b00] to-[#1a1100]', border: 'border-amber-400/40', text: 'text-amber-300' }
];

const AMOUNTS = [2500, 5000, 10000, 25000];

export default function AppleGiftCardModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [selectedTheme, setSelectedTheme] = useState(CARD_THEMES[0]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('May this illuminate your new space with brilliant energy!');
  const [senderName, setSenderName] = useState('');

  if (!isOpen) return null;

  const handleBuyCard = () => {
    if (!recipientName || !recipientEmail) {
      alert('Please enter recipient name and email.');
      return;
    }

    playChimeSound();

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#2997ff', '#ffd700', '#ffffff', '#ff1493']
    });

    const item = {
      id: `giftcard-${Date.now()}`,
      name: `NEOCRAFT Digital Luxury Gift Card (${formatPrice(selectedAmount, selectedCurrency)})`,
      category: 'Gift Cards',
      price: selectedAmount,
      originalPrice: selectedAmount,
      quantity: 1,
      image: '🎁',
      specs: {
        recipient: `${recipientName} (${recipientEmail})`,
        sender: senderName || 'Anonymous',
        theme: selectedTheme.name,
        message: giftMessage
      }
    };

    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Send a NEOCRAFT Luxury Gift Card
            </h3>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* Virtual Apple Wallet Card Preview */}
          <div className={`p-6 rounded-3xl bg-gradient-to-br ${selectedTheme.bg} border ${selectedTheme.border} shadow-2xl space-y-8 relative overflow-hidden transition-all duration-300`}>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">NEOCRAFT</span>
                <span className="text-[10px] tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded-full text-white/80">Gift Card</span>
              </div>
              <Sparkles className="w-4 h-4 text-white/70" />
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-white/60 uppercase block">Card Balance</span>
                <div className="text-3xl font-bold font-mono tracking-tight text-white">
                  {formatPrice(selectedAmount, selectedCurrency)}
                </div>
              </div>

              <div className="text-right text-[11px] text-white/80">
                <span className="block text-[9px] uppercase text-white/50">For</span>
                <strong>{recipientName || 'Valued Recipient'}</strong>
              </div>
            </div>

          </div>

          {/* Amount Pills */}
          <div className="space-y-2">
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              1. Select Gift Amount:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { playClickSound(); setSelectedAmount(amt); }}
                  className={`py-2.5 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all ${
                    selectedAmount === amt
                      ? 'bg-white text-slate-950 border-white shadow-md'
                      : 'bg-[#121214] border-[#262629] text-[#86868b] hover:text-white'
                  }`}
                >
                  {formatPrice(amt, selectedCurrency)}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              2. Choose Card Finish:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {CARD_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { playClickSound(); setSelectedTheme(theme); }}
                  className={`py-2 px-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedTheme.id === theme.id
                      ? 'bg-[#1f1f25] border-white text-white'
                      : 'bg-[#121214] border-[#262629] text-[#86868b]'
                  }`}
                >
                  <div className="font-semibold text-[11px] text-white">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Details Form */}
          <div className="space-y-3 pt-2">
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              3. Recipient Information:
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Recipient Email *</label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="aarav@gmail.com"
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#86868b] block mb-1">Personal Note / Message</label>
              <textarea
                rows={2}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Write your custom blessing or message..."
                className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff] resize-none"
              />
            </div>
          </div>

          {/* Add to Bag Button */}
          <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
            <div>
              <span className="text-[#86868b] text-[11px] block">Gift Card Total</span>
              <div className="text-xl font-semibold text-white">
                {formatPrice(selectedAmount, selectedCurrency)}
              </div>
            </div>

            <button
              onClick={handleBuyCard}
              className="apple-btn-primary py-2.5 px-6 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Gift Card to Bag</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
