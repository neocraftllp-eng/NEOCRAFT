import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  MessageCircle,
  Building2,
  QrCode
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleGSTInvoiceModal({
  isOpen,
  onClose,
  orderData = null,
  selectedCurrency = 'INR'
}) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  // Fallback sample data if orderData is not passed
  const order = orderData || {
    id: 'NCX-INV-2026-8942',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    customer: {
      name: 'Dr. Kabir Oberoi',
      company: 'Oberoi Wellness & Aesthetic Clinic',
      phone: '+91 91666 91274',
      email: 'kabir@oberoiwellness.com',
      address: 'Suite 402, Signature Towers, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra (27)',
      pincode: '400051',
      gstin: '27AABCO4481P1Z9'
    },
    items: [
      {
        name: 'Custom 12V Solid-State LED Neon Sign ("HEAL & GLOW")',
        specs: '100cm × 45cm • Cyber Cyan & Warm Gold • 6mm Laser CNC Cut Acrylic',
        hsn: '94054090',
        qty: 1,
        unitPrice: 8473.73,
        amount: 8473.73
      },
      {
        name: 'RF Wireless Remote Dimmer & Strobe Controller (12V/10A)',
        specs: '10-Level Dynamic Dimming • Party Flash & Breathing Modes',
        hsn: '85371000',
        qty: 1,
        unitPrice: 0.00,
        amount: 0.00
      },
      {
        name: 'Stainless Steel Heavy-Duty Standoff Hardware & 3M Command Strips',
        specs: 'Seismic Shockproof Mount Kit • Dual Installation Setup',
        hsn: '73181500',
        qty: 1,
        unitPrice: 0.00,
        amount: 0.00
      }
    ],
    subtotal: 8473.73,
    cgst: 762.63, // 9%
    sgst: 762.63, // 9%
    total: 9999.00,
    paymentStatus: 'PAID (256-Bit SSL Encrypted)',
    paymentGateway: 'DODO PAYMENTS / UPI'
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleSendWhatsAppInvoice = () => {
    playClickSound();
    const msg = encodeURIComponent(
      `Hello ${order.customer.name}! 📄\n\n` +
      `Here is your Official GST Proforma Tax Invoice #${order.id} from NEOCRAFT X Studio:\n` +
      `• Total Amount: ₹${order.total.toLocaleString('en-IN')}\n` +
      `• GSTIN: 27AAFCO8821C1Z4 (HSN 9405)\n` +
      `• Status: ${order.paymentStatus}\n\n` +
      `Your 2-Year Direct Replacement Warranty is now active. BlueDart tracking will be dispatched shortly!`
    );
    window.open(`https://wa.me/919166691274?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-2xl select-none overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-[#161617] border border-[#2d2d30] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[96vh] text-white">
        
        {/* Header Actions Bar */}
        <div className="px-6 py-4 border-b border-[#2d2d30] flex items-center justify-between bg-[#121214] no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2997ff]" />
            <h3 className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
              <span>Official GST Proforma Tax Invoice</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                100% Tax Compliant
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="apple-btn-secondary px-3 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleSendWhatsAppInvoice}
              className="apple-btn-primary px-3 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp Invoice</span>
            </button>

            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#86868b] hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div ref={printRef} className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#0d0d10] text-slate-100 text-xs space-y-8 font-sans">
          
          {/* Invoice Header: Company Brand + Tax Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-8">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-['Outfit',sans-serif]">
                  NEOCRAFT<span className="text-[#2997ff]">X</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#2997ff]">
                  STUDIO LLP
                </span>
              </div>
              <p className="text-[11px] text-[#86868b] max-w-sm leading-relaxed">
                Architectural Neon & Fine Art Engineering Hub<br />
                Bandra Kurla Complex, Mumbai, MH 400051 • Helpline: +91 91666 91274<br />
                GSTIN: <strong className="text-white font-mono">27AAFCO8821C1Z4</strong> • State Code: 27 (MH)
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-lg font-bold text-white font-mono">{order.id}</div>
              <div className="text-[11px] text-[#86868b]">Invoice Date: {order.date}</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Billed To & Shipped To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#121216] border border-[#222226] p-5 rounded-2xl">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block">
                Billed & Shipped To:
              </span>
              <div className="font-bold text-white text-sm">{order.customer.name}</div>
              {order.customer.company && (
                <div className="text-xs text-[#2997ff] font-medium">{order.customer.company}</div>
              )}
              <div className="text-[#86868b] text-[11px] leading-relaxed pt-1">
                {order.customer.address}<br />
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}<br />
                Phone: {order.customer.phone} • Email: {order.customer.email}
              </div>
              {order.customer.gstin && (
                <div className="text-[10px] font-mono text-emerald-400 pt-1">
                  Customer GSTIN: {order.customer.gstin}
                </div>
              )}
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-6 pt-4 sm:pt-0">
              <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider block">
                Supply & Transit Terms:
              </span>
              <div className="space-y-1 text-[11px] text-[#86868b]">
                <div>• <strong>Place of Supply:</strong> {order.customer.state}</div>
                <div>• <strong>Shipping Rail:</strong> BlueDart Air Express (Insured Wooden Crate)</div>
                <div>• <strong>Warranty:</strong> 2-Year Direct Replacement (Certificate #NCW-882)</div>
                <div>• <strong>Payment Mode:</strong> {order.paymentGateway}</div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-[#86868b] font-bold tracking-wider">
                  <th className="py-3 px-2">Description of Goods</th>
                  <th className="py-3 px-2">HSN Code</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Taxable Value</th>
                  <th className="py-3 px-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-2">
                      <div className="font-semibold text-white text-xs">{item.name}</div>
                      <div className="text-[10px] text-[#86868b] mt-0.5">{item.specs}</div>
                    </td>
                    <td className="py-3.5 px-2 font-mono text-[#86868b]">{item.hsn}</td>
                    <td className="py-3.5 px-2 text-center font-mono text-white">{item.qty}</td>
                    <td className="py-3.5 px-2 text-right font-mono text-[#86868b]">
                      {item.unitPrice > 0 ? `₹${item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'Complimentary'}
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-semibold text-white">
                      {item.amount > 0 ? `₹${item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '₹0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Calculation & Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center gap-2 text-[11px] text-[#86868b]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Solid-State 12V Electrical Safety Compliance (RoHS & CE Certified)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#121216] border border-[#222226] text-[10px] text-[#86868b] leading-relaxed">
                <strong>Bank Account Details:</strong><br />
                A/C Name: NEOCRAFT STUDIO LLP • A/C No: 5020008891274<br />
                Bank: HDFC Bank Ltd, BKC Branch • IFSC: HDFC0000240
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-[#86868b]">
                <span>Taxable Amount:</span>
                <span className="font-mono text-white">₹{order.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[#86868b]">
                <span>CGST (9.0%):</span>
                <span className="font-mono text-white">₹{order.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[#86868b]">
                <span>SGST (9.0%):</span>
                <span className="font-mono text-white">₹{order.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[#86868b]">
                <span>Insured Freight & Wooden Crate:</span>
                <span className="font-mono text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-white/20 pt-2.5">
                <span>Grand Total (INR):</span>
                <span className="font-mono text-[#2997ff] text-base">
                  ₹{order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Golden Seal & Signatory */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#86868b] text-[10px]">
            <div>
              This is a computer-generated tax invoice. No physical signature required.
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-white text-xs tracking-wider">FOR NEOCRAFT STUDIO LLP</div>
              <div className="text-emerald-400 font-mono text-[9px] mt-0.5">● Digitally Authorized Signatory</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
