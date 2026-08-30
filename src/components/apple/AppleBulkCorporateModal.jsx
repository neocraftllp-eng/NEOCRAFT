import React, { useState } from 'react';
import { 
  X, 
  Building, 
  Briefcase, 
  Gift, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  MessageCircle,
  Sliders,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleBulkCorporateModal({
  isOpen,
  onClose,
  selectedCurrency = 'INR'
}) {
  const [quantity, setQuantity] = useState(15);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [useCase, setUseCase] = useState('Employee & Founder Year-End Gifts');

  if (!isOpen) return null;

  // Wholesale Tier Calculation
  const baseUnitPrice = 4999;
  let discountPercent = 15;
  if (quantity >= 50) discountPercent = 35;
  else if (quantity >= 25) discountPercent = 28;
  else if (quantity >= 10) discountPercent = 20;

  const unitPrice = Math.round(baseUnitPrice * (1 - discountPercent / 100));
  const totalPrice = unitPrice * quantity;
  const totalSavings = (baseUnitPrice * quantity) - totalPrice;

  const handleWhatsAppInquiry = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello Neocraft Corporate Team! 🏢\n\n` +
      `We would like to request an Official Bulk Corporate Quote:\n\n` +
      `• Company / Organization: ${companyName || 'Corporate Client'}\n` +
      `• Contact Person: ${contactName || 'Lead Executive'}\n` +
      `• Estimated Quantity: ${quantity} units (${discountPercent}% Tier Discount)\n` +
      `• Estimated Budget: ₹${totalPrice.toLocaleString('en-IN')}\n` +
      `• Gifting Occasion: ${useCase}\n\n` +
      `Please provide sample digital 3D vector proof and invoice quotation.`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl select-none">
      
      <div className="relative w-full max-w-2xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white">
              Corporate Bulk Gifting & Tiered Wholesale
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
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-5">
          
          {/* Interactive Tier Scale */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#172030] to-[#121215] border border-[#2997ff]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Order Quantity:</span>
              <span className="font-mono text-base font-bold text-[#2997ff]">{quantity} Units</span>
            </div>

            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-[#2d2d30] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
            />

            <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-mono pt-1">
              <div className={quantity < 10 ? 'text-[#2997ff] font-bold' : 'text-[#86868b]'}>5–9 (15% Off)</div>
              <div className={quantity >= 10 && quantity < 25 ? 'text-[#2997ff] font-bold' : 'text-[#86868b]'}>10–24 (20% Off)</div>
              <div className={quantity >= 25 && quantity < 50 ? 'text-[#2997ff] font-bold' : 'text-[#86868b]'}>25–49 (28% Off)</div>
              <div className={quantity >= 50 ? 'text-emerald-400 font-bold' : 'text-[#86868b]'}>50+ (35% Off)</div>
            </div>
          </div>

          {/* Pricing Estimate Card */}
          <div className="p-4 rounded-2xl bg-[#121214] border border-[#222225] grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[#86868b] text-[10px] block">Unit Price</span>
              <span className="font-bold text-white text-base">{formatPrice(unitPrice, selectedCurrency)}</span>
            </div>
            <div>
              <span className="text-[#86868b] text-[10px] block">Total Estimate</span>
              <span className="font-bold text-[#2997ff] text-base">{formatPrice(totalPrice, selectedCurrency)}</span>
            </div>
            <div>
              <span className="text-[#86868b] text-[10px] block">You Save</span>
              <span className="font-bold text-emerald-400 text-base">{formatPrice(totalSavings, selectedCurrency)}</span>
            </div>
          </div>

          {/* Corporate Features */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#86868b]">
            <div className="p-2.5 rounded-xl bg-[#121214] border border-[#222225]">
              <Gift className="w-4 h-4 mx-auto text-pink-400 mb-1" />
              <span>Custom Branded Gift Packaging</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121214] border border-[#222225]">
              <Truck className="w-4 h-4 mx-auto text-amber-400 mb-1" />
              <span>Multi-Location Split Air Dispatch</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121214] border border-[#222225]">
              <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
              <span>GST Tax Invoices & Credit</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3 pt-1">
            <span className="font-semibold text-[#86868b] uppercase tracking-wider block">
              Company & Contact Details:
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Company / Studio Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Zomato / Cred / Google"
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Pooja Sharma"
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Quotation Action */}
          <div className="pt-2 border-t border-[#222225]">
            <button
              onClick={handleWhatsAppInquiry}
              className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Generate Official Quotation on WhatsApp ({discountPercent}% Off)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
