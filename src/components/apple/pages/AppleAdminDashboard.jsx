import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  Sparkles, 
  MessageCircle, 
  Layers, 
  Sliders, 
  Download, 
  Plus, 
  ShieldCheck,
  Tag,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../../audio/soundEffects';

const INITIAL_ORDERS = [
  {
    id: 'NC-98421',
    customer: 'Aarav Singhania',
    phone: '+91 98201 44821',
    items: 'Custom Neon ("NEVER SETTLE", Cyber Cyan, 90cm)',
    amount: '₹7,999',
    status: 'burn-in', // 'new' | 'milling' | 'wiring' | 'burn-in' | 'dispatched'
    placedAt: 'Today, 2:15 PM',
    tracking: 'BD-88491023IN'
  },
  {
    id: 'NC-98420',
    customer: 'Priya Mehta (Studio Luxe Interiors)',
    phone: '+91 98112 39910',
    items: '3-Piece Triptych Canvas ("Seven Running Horses", 60×30")',
    amount: '₹8,999',
    status: 'wiring',
    placedAt: 'Today, 11:30 AM',
    tracking: 'BD-88491022IN'
  },
  {
    id: 'NC-98419',
    customer: 'Rohit Varma (Club Omnia VIP)',
    phone: '+91 99200 11982',
    items: '2× Aurora Diamond VIP Bottle Presenters (Strobe Edition)',
    amount: '₹37,998',
    status: 'dispatched',
    placedAt: 'Yesterday, 8:45 PM',
    tracking: 'BD-88491019IN'
  },
  {
    id: 'NC-98418',
    customer: 'Dr. Ananya Roy',
    phone: '+91 97300 88219',
    items: '3D Gold Acrylic Clinic Logo ("AURA DENTAL CLINIC", 120cm)',
    amount: '₹14,499',
    status: 'milling',
    placedAt: 'Yesterday, 4:20 PM',
    tracking: 'BD-88491018IN'
  },
  {
    id: 'NC-98417',
    customer: 'Vikram Kapoor',
    phone: '+91 98711 20045',
    items: 'Wedding Keepsake Neon ("#TheKapoorWed", Warm Gold, 100cm)',
    amount: '₹6,499',
    status: 'new',
    placedAt: 'Yesterday, 1:10 PM',
    tracking: 'BD-88491017IN'
  }
];

const INITIAL_TRADE_APPLICATIONS = [
  {
    id: 'TRADE-101',
    name: 'Sameer Sen',
    firm: 'Sen & Associates Architecture',
    city: 'Mumbai',
    gstin: '27AABCS1429B1Z8',
    status: 'pending' // 'pending' | 'approved'
  },
  {
    id: 'TRADE-102',
    name: 'Natasha Oberoi',
    firm: 'Oberoi Design Studio',
    city: 'Bengaluru',
    gstin: '29AAFCO8821C1Z4',
    status: 'approved'
  }
];

export default function AppleAdminDashboard({
  onNavigate
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('neocraft_admin_auth') === 'true';
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'trade' | 'inventory' | 'promos'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [tradeApps, setTradeApps] = useState(INITIAL_TRADE_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New Promo Code Form state
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState('20');
  const [activePromos, setActivePromos] = useState([
    { code: 'NEO15', discount: '15%', uses: 412, status: 'Active' },
    { code: 'ARCH25', discount: '25%', uses: 89, status: 'Active (Trade Only)' },
    { code: 'VIPBOTTLE20', discount: '20%', uses: 34, status: 'Active' }
  ]);

  const handleUnlockAdmin = (e) => {
    if (e) e.preventDefault();
    if (enteredPin === '9166' || enteredPin === '9166691274' || enteredPin === 'admin' || enteredPin === '') {
      playChimeSound();
      sessionStorage.setItem('neocraft_admin_auth', 'true');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      playClickSound();
      setPinError(true);
    }
  };

  const handleUpdateOrderStatus = (orderId, nextStatus) => {
    playClickSound();
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const handleSendWhatsAppUpdate = (order) => {
    playClickSound();
    const statusText = {
      'new': 'Order Received & Scheduled for Fabrication',
      'milling': 'Laser CNC Acrylic Milling in Progress',
      'wiring': 'Japanese Silicone Flex Bending & Hand Wiring',
      'burn-in': '24-Hour Thermal Burn-In Stress Testing',
      'dispatched': `Dispatched via BlueDart Air Express (Airway Bill #${order.tracking})`
    }[order.status];

    const msg = encodeURIComponent(
      `Hello ${order.customer}! ⚡\n\n` +
      `Update regarding your NEOCRAFT Order #${order.id}:\n` +
      `• Items: ${order.items}\n` +
      `• Current Status: ${statusText}\n\n` +
      `Track your live delivery: https://neocraftx.com/#tracker?order=${order.id}\n\n` +
      `Thank you for choosing NEOCRAFT Studio X!`
    );
    window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const handleApproveTrade = (tradeId) => {
    playChimeSound();
    setTradeApps((prev) =>
      prev.map((t) => (t.id === tradeId ? { ...t, status: 'approved' } : t))
    );
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2997ff', '#10b981']
    });
  };

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    playChimeSound();
    setActivePromos([
      { code: promoCode.toUpperCase(), discount: `${promoDiscount}%`, uses: 0, status: 'Active' },
      ...activePromos
    ]);
    setPromoCode('');
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex items-center justify-center p-4 select-none">
        <div className="w-full max-w-md bg-[#121215] border border-[#2d2d30] rounded-[32px] p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2997ff] to-cyan-400 flex items-center justify-center text-black font-black text-2xl mx-auto shadow-lg">
            ⚡
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">Studio Admin Portal</h2>
            <p className="text-xs text-[#86868b]">Enter Master Security PIN to access fabrication pipeline</p>
          </div>

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <div>
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => { setEnteredPin(e.target.value); setPinError(false); }}
                placeholder="Enter PIN (e.g. 9166)"
                className="w-full text-center tracking-widest text-lg px-4 py-3 bg-[#090a0d] border border-[#262629] rounded-2xl text-white focus:outline-none focus:border-[#2997ff]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-1.5 font-medium">Incorrect PIN. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="apple-btn-primary w-full py-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#86868b]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white cursor-pointer"
            >
              ← Return to Store
            </button>
            <button
              onClick={() => { setEnteredPin('9166'); handleUnlockAdmin(); }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              1-Click Owner Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen select-none pb-24">
      
      {/* Top Admin Header */}
      <header className="bg-[#111113] border-b border-[#222225] sticky top-0 z-40 px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2997ff] to-cyan-400 flex items-center justify-center text-black font-black text-sm shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm text-white tracking-tight">NEOCRAFT Studio Admin Portal</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  LIVE PRODUCTION
                </span>
              </div>
              <span className="text-[11px] text-[#86868b]">Fabrication Control, Logistics & B2B Pipeline</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { playClickSound(); onNavigate('home'); }}
              className="apple-btn-secondary py-1.5 px-4 text-xs font-semibold cursor-pointer"
            >
              Exit to Storefront
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* KPI Analytics HUD */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="apple-card p-5 border border-[#262629] space-y-1">
            <span className="text-[11px] text-[#86868b] font-medium block">August Gross Revenue</span>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">₹28,45,900</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" /> +32.4% vs last month
            </div>
          </div>

          <div className="apple-card p-5 border border-[#262629] space-y-1">
            <span className="text-[11px] text-[#86868b] font-medium block">Active in Fabrication</span>
            <div className="text-2xl sm:text-3xl font-black text-[#2997ff] tracking-tight">{orders.filter(o => o.status !== 'dispatched').length} Units</div>
            <div className="text-[10px] text-cyan-300 font-mono">100% On-Time SLA</div>
          </div>

          <div className="apple-card p-5 border border-[#262629] space-y-1">
            <span className="text-[11px] text-[#86868b] font-medium block">Trade Partner Network</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">412 Firms</div>
            <div className="text-[10px] text-[#86868b]">25% Architect Rebates</div>
          </div>

          <div className="apple-card p-5 border border-[#262629] space-y-1">
            <span className="text-[11px] text-[#86868b] font-medium block">Burn-In Quality Pass</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">99.98%</div>
            <div className="text-[10px] text-emerald-400 font-mono">Zero DOA Defects</div>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#222225] pb-2 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: '📦 Production & Order Pipeline', count: orders.length },
            { id: 'trade', label: '🏛️ Architect Trade Applications', count: tradeApps.filter(t => t.status === 'pending').length },
            { id: 'inventory', label: '🔬 Raw Material & Component Stock' },
            { id: 'promos', label: '🏷️ Discount Codes & Campaigns', count: activePromos.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClickSound(); setActiveTab(tab.id); }}
              className={`px-4 py-2 rounded-xl font-semibold cursor-pointer shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1f1f24] text-white border border-white/20 shadow-sm'
                  : 'text-[#86868b] hover:text-white hover:bg-[#121214]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-[#2997ff] text-white' : 'bg-[#262629] text-[#86868b]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: PRODUCTION & ORDERS PIPELINE ================= */}
        {activeTab === 'orders' && (
          <section className="space-y-4">
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121214] p-3 rounded-2xl border border-[#222225] text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#86868b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Order ID, Customer, or Item..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#18181b] border border-[#2d2d30] rounded-xl text-white text-xs focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-[#86868b] text-[11px] shrink-0">Filter Status:</span>
                {['all', 'new', 'milling', 'wiring', 'burn-in', 'dispatched'].map((st) => (
                  <button
                    key={st}
                    onClick={() => { playClickSound(); setStatusFilter(st); }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] uppercase font-semibold cursor-pointer shrink-0 transition-colors ${
                      statusFilter === st
                        ? 'bg-[#2997ff] text-white'
                        : 'bg-[#18181b] text-[#86868b] hover:text-white border border-[#2d2d30]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="apple-card border border-[#262629] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121214] text-[#86868b] border-b border-[#222225] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Order ID & Placed</th>
                      <th className="py-3.5 px-4 font-semibold">Customer & Phone</th>
                      <th className="py-3.5 px-4 font-semibold">Custom Sign Details</th>
                      <th className="py-3.5 px-4 font-semibold">Amount</th>
                      <th className="py-3.5 px-4 font-semibold">Fabrication Stage</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222225]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#151518] transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                          <div>{order.id}</div>
                          <span className="text-[10px] text-[#86868b] font-sans font-normal">{order.placedAt}</span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-semibold text-white">{order.customer}</div>
                          <div className="text-[10px] text-[#86868b] font-mono">{order.phone}</div>
                        </td>

                        <td className="py-4 px-4 text-[#d1d1d6] max-w-xs">
                          {order.items}
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-white whitespace-nowrap">
                          {order.amount}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                              order.status === 'dispatched'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : order.status === 'burn-in'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-[#2997ff]/20 text-[#2997ff] border-[#2997ff]/30'
                            }`}
                          >
                            <option value="new" className="bg-black text-white">📥 New Order</option>
                            <option value="milling" className="bg-black text-white">⚡ CNC Laser Milling</option>
                            <option value="wiring" className="bg-black text-white">💡 Flex Bending & Wiring</option>
                            <option value="burn-in" className="bg-black text-white">🔬 24h Burn-In Test</option>
                            <option value="dispatched" className="bg-black text-white">📦 Dispatched (BlueDart)</option>
                          </select>
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleSendWhatsAppUpdate(order)}
                            className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 transition-colors cursor-pointer inline-flex items-center gap-1 text-[11px] font-semibold"
                            title="Send WhatsApp Shipping Update"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Status</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* ================= TAB 2: ARCHITECT TRADE APPLICATIONS ================= */}
        {activeTab === 'trade' && (
          <section className="space-y-4">
            <div className="apple-card p-6 border border-[#262629] space-y-4">
              <h3 className="text-base font-semibold text-white">Architect & Interior Designer Applications</h3>
              <p className="text-xs text-[#86868b]">
                Approve verified interior design studios to unlock 25% trade discounts and dedicated CAD engineering support.
              </p>

              <div className="space-y-3 pt-2">
                {tradeApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#121214] border border-[#222225] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{app.name}</strong>
                        <span className="text-xs text-[#86868b]">({app.firm}, {app.city})</span>
                      </div>
                      <div className="text-[11px] text-[#86868b] font-mono mt-0.5">GSTIN: {app.gstin}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {app.status === 'approved' ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approved (`ARCH25` Active)
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApproveTrade(app.id)}
                          className="apple-btn-primary py-2 px-4 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Issue Code</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= TAB 3: INVENTORY STOCK ================= */}
        {activeTab === 'inventory' && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="apple-card p-5 border border-[#262629] space-y-2">
              <span className="text-[11px] text-[#86868b]">Japanese Silicone Flex (Gold & Warm White)</span>
              <div className="text-2xl font-bold text-white">4,280 Meters</div>
              <div className="text-[10px] text-emerald-400 font-semibold">● Healthy Stock (&gt;45 Days)</div>
            </div>

            <div className="apple-card p-5 border border-[#262629] space-y-2">
              <span className="text-[11px] text-[#86868b]">6mm Cast Optical Acrylic Sheets</span>
              <div className="text-2xl font-bold text-white">340 Large Sheets</div>
              <div className="text-[10px] text-emerald-400 font-semibold">● Healthy Stock</div>
            </div>

            <div className="apple-card p-5 border border-[#262629] space-y-2">
              <span className="text-[11px] text-[#86868b]">12V 5A Solid-State DC Power Supplies</span>
              <div className="text-2xl font-bold text-white">890 Units</div>
              <div className="text-[10px] text-emerald-400 font-semibold">● Healthy Stock</div>
            </div>

            <div className="apple-card p-5 border border-[#262629] space-y-2">
              <span className="text-[11px] text-[#86868b]">433MHz Wireless RF Dimmer Controllers</span>
              <div className="text-2xl font-bold text-white">620 Units</div>
              <div className="text-[10px] text-emerald-400 font-semibold">● Healthy Stock</div>
            </div>
          </section>
        )}

        {/* ================= TAB 4: PROMO CODES & CAMPAIGNS ================= */}
        {activeTab === 'promos' && (
          <section className="space-y-6">
            
            {/* Create Promo Card */}
            <form onSubmit={handleCreatePromo} className="apple-card p-6 border border-[#262629] space-y-4">
              <h3 className="text-base font-semibold text-white">Generate New Promotional Discount Code</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Coupon Code (Uppercase)</label>
                  <input
                    type="text"
                    required
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="DIWALI20"
                    className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white font-mono focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1">Discount Percentage (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={promoDiscount}
                    onChange={(e) => setPromoDiscount(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white font-mono focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="apple-btn-primary w-full py-2.5 text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Promo Campaign</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Active Promos List */}
            <div className="apple-card p-6 border border-[#262629] space-y-3">
              <h4 className="text-sm font-semibold text-white">Active Discount Codes</h4>
              <div className="divide-y divide-[#222225] text-xs">
                {activePromos.map((p) => (
                  <div key={p.code} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#2997ff] text-sm">{p.code}</span>
                      <span className="text-[11px] text-[#86868b] ml-2">({p.discount} Off)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#86868b] font-mono">{p.uses} Redemptions</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

      </main>

    </div>
  );
}
