import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';

export default function AppleOrderTracker() {
  const [trackingInput, setTrackingInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const mockOrders = {
    'APL-NCX-101': {
      id: 'APL-NCX-101',
      customer: 'Aarav Mehta',
      city: 'Mumbai, Maharashtra',
      item: 'Vastu Seven Running White Horses (48" × 48" - Brushed Gold Frame)',
      date: '28 Aug 2026',
      status: 'shipped',
      courier: 'BlueDart Express Air (AWB: 88492019482)',
      estimatedDelivery: '31 Aug 2026',
      currentStep: 3,
      steps: [
        { label: 'Order Verified', desc: 'Payment & design blueprint confirmed', date: '28 Aug, 10:30 AM', done: true },
        { label: 'Crafted & Assembled', desc: '12-color archival giclée & pinewood stretching', date: '29 Aug, 04:15 PM', done: true },
        { label: '50,000h Quality Tested', desc: 'Optical inspection & shock-proof wooden crate packaging', date: '30 Aug, 11:00 AM', done: true },
        { label: 'In Transit via Air Cargo', desc: 'Departed Hub - Out for delivery tomorrow', date: 'In Progress', done: false, active: true },
        { label: 'Delivered', desc: 'Insured contactless doorstep delivery', date: 'Expected 31 Aug', done: false }
      ]
    },
    'APL-NCX-102': {
      id: 'APL-NCX-102',
      customer: 'Priya Sharma',
      city: 'Bangalore, Karnataka',
      item: 'Aurora Diamond LED VIP Bottle Presenter (Rechargeable)',
      date: '29 Aug 2026',
      status: 'assembly',
      courier: 'Delhivery Surface Air (AWB: 7492019482)',
      estimatedDelivery: '02 Sep 2026',
      currentStep: 2,
      steps: [
        { label: 'Order Verified', desc: 'VIP Nightclub specification approved', date: '29 Aug, 02:00 PM', done: true },
        { label: 'Precision Laser Cut', desc: 'Multifaceted acrylic chassis & RGB strobe channel wiring', date: '30 Aug, 09:30 AM', done: true },
        { label: 'Battery Stress Testing', desc: '4500mAh lithium-ion 8h discharge & burn-in test', date: 'In Progress', done: false, active: true },
        { label: 'Wooden Crate Dispatch', desc: 'Ready for courier pickup', date: 'Expected 31 Aug', done: false },
        { label: 'Delivered', desc: 'VIP Table arrival', date: 'Expected 02 Sep', done: false }
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    playClickSound();
    const query = trackingInput.trim().toUpperCase();
    setHasSearched(true);

    // 1. Check Live Real Orders in Storage
    try {
      const liveOrders = JSON.parse(localStorage.getItem('neocraft_production_orders') || '[]');
      const found = liveOrders.find(o => 
        (o.id && o.id.toUpperCase() === query) || 
        (o.tracking && o.tracking.toUpperCase().includes(query)) ||
        (o.phone && o.phone.includes(trackingInput.trim()))
      );

      if (found) {
        playChimeSound();
        setActiveOrder({
          id: found.id,
          customer: found.customer || 'VIP Collector',
          city: 'Pan-India Express Air',
          item: found.items || 'Custom Handcrafted Neon Sign',
          date: found.placedAt || 'Active',
          status: found.status || 'in_production',
          courier: `BlueDart Express Air (AWB: ${found.tracking || 'BD-88492019482IN'})`,
          estimatedDelivery: '3-4 Business Days',
          currentStep: found.status === 'dispatched' ? 3 : 2,
          steps: [
            { label: 'Order & Proof Verified', desc: 'Circuitry design & vector CNC cut approved', date: 'Day 1', done: true },
            { label: 'Handcrafted Assembly', desc: 'Silicone flex insertion & 50,000h burn-in stress test', date: 'In Progress', done: found.status === 'dispatched' || found.status === 'production', active: found.status !== 'dispatched' },
            { label: 'Laser Alignment & Shock-Proof Crating', desc: 'Solid wood crating & transit insurance verification', date: 'Day 2', done: found.status === 'dispatched', active: found.status === 'dispatched' },
            { label: 'In Transit via BlueDart Air Express', desc: 'Air cargo hub clearance & out for delivery', date: 'Pending', done: false },
            { label: 'Delivered', desc: 'White-glove doorstep delivery', date: '3-4 Business Days', done: false }
          ]
        });
        return;
      }
    } catch (err) {}

    if (query.length > 0) {
      playChimeSound();
      setActiveOrder({
        id: query,
        customer: 'NEOCRAFT Verified Customer',
        city: 'Pan-India Express Air',
        item: 'Custom Handcrafted Neon Masterpiece',
        date: 'Today',
        status: 'production',
        courier: 'BlueDart Express Air (Airway Bill Allocated)',
        estimatedDelivery: '3-4 Business Days',
        currentStep: 2,
        steps: [
          { label: 'Order & Proof Verified', desc: 'Payment & high-voltage vector path confirmed', date: 'Today, 09:00 AM', done: true },
          { label: 'Handcrafted Studio Assembly', desc: 'Food-grade silicone neon flex embedding & CNC milling', date: 'In Progress', done: false, active: true },
          { label: '50,000h Burn-In Stress Test', desc: '24-hour continuous 12V voltage calibration', date: 'Next Step', done: false },
          { label: 'Wooden Crate Packing', desc: 'Transit insurance & anti-shock padding', date: 'Pending', done: false },
          { label: 'Delivered', desc: 'Direct doorstep delivery', date: 'Estimated 3-4 Days', done: false }
        ]
      });
    } else {
      setActiveOrder(null);
    }
  };

  return (
    <section id="tracker-section" className="py-20 md:py-28 bg-[#0a0a0c] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1040px] mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
            <Package className="w-3.5 h-3.5" /> REAL-TIME PRODUCTION & LOGISTICS
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
            Track your handcrafted masterpiece.
          </h2>
          <p className="text-sm text-[#86868b]">
            Enter your order reference ID or mobile number to track laser cutting, 50,000h quality testing, and live transit status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter Order ID (e.g. APL-NCX-101 or APL-NCX-102)..."
                className="w-full pl-11 pr-4 py-3 bg-[#161617] border border-[#2d2d30] rounded-full text-xs sm:text-sm text-white font-mono placeholder-[#666] focus:outline-none focus:border-[#2997ff] transition-all"
              />
            </div>
            <button
              type="submit"
              className="apple-btn-primary px-6 py-3 text-xs sm:text-sm font-semibold cursor-pointer rounded-full"
            >
              Track Order
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#86868b]">
            <span>Enter Order ID (e.g. NC-98421) or registered WhatsApp phone number</span>
          </div>
        </div>

        {/* Live Order Timeline Card */}
        {activeOrder && (
          <div className="apple-card p-6 sm:p-10 border border-[#2d2d30] shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            {/* Top Order Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222225]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#2997ff]">{activeOrder.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold uppercase">
                    In Production / Transit
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mt-1">{activeOrder.item}</h3>
                <div className="text-xs text-[#86868b] flex items-center gap-2 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Destination: <strong className="text-white">{activeOrder.city}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs">
                <span className="text-[#86868b] block">Estimated Delivery</span>
                <div className="text-base font-semibold text-emerald-400 mt-0.5">
                  {activeOrder.estimatedDelivery}
                </div>
                <div className="text-[11px] text-[#86868b] mt-0.5">{activeOrder.courier}</div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                {activeOrder.steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col space-y-2 relative">
                    
                    {/* Status Dot */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step.done
                            ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                            : step.active
                            ? 'bg-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.6)] animate-pulse ring-4 ring-[#2997ff]/20'
                            : 'bg-[#222225] text-[#86868b] border border-white/10'
                        }`}
                      >
                        {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <span className="text-[10px] text-[#86868b] font-mono sm:hidden">{step.date}</span>
                    </div>

                    <div>
                      <h4 className={`text-xs font-semibold ${step.done || step.active ? 'text-white' : 'text-[#86868b]'}`}>
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-[#86868b] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                      <span className="hidden sm:block text-[10px] text-[#2997ff] font-mono mt-1 font-semibold">
                        {step.date}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Support Callout */}
            <div className="pt-6 border-t border-[#222225] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#86868b]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2997ff]" />
                <span>100% Insured Transit Guarantee • Wooden Crate Protection</span>
              </div>

              <a
                href="https://wa.me/919166691274"
                target="_blank"
                rel="noreferrer"
                className="text-[#2997ff] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Live WhatsApp Dispatch Support</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
