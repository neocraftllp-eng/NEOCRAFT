import React, { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  Sparkles, 
  Heart, 
  MapPin, 
  LogOut, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Key, 
  Mail, 
  Phone, 
  Building, 
  Zap, 
  Gift, 
  Layers, 
  Award,
  ChevronRight,
  ExternalLink,
  Edit3,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playChimeSound } from '../../../audio/soundEffects';
import { formatPrice } from '../../../utils/pricing';
import { 
  getCurrentCustomer, 
  loginCustomer, 
  loginWithGoogle,
  registerCustomer, 
  logoutCustomer, 
  getCustomerSavedDesigns 
} from '../../../services/customerAuth';

export default function AppleCustomerDashboard({
  onNavigate,
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [customer, setCustomer] = useState(getCurrentCustomer);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'designs' | 'perks' | 'profile'
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('');

  // Orders State from Store
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem('neocraft_production_orders');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Saved Designs State
  const [savedDesigns, setSavedDesigns] = useState(getCustomerSavedDesigns);

  useEffect(() => {
    const handleAuthSync = () => {
      setCustomer(getCurrentCustomer());
      setSavedDesigns(getCustomerSavedDesigns());
    };
    window.addEventListener('neocraft_auth_changed', handleAuthSync);
    return () => window.removeEventListener('neocraft_auth_changed', handleAuthSync);
  }, []);

  const handleGoogleAccountSelect = (profile) => {
    playChimeSound();
    setShowGoogleModal(false);
    const user = loginWithGoogle(profile);
    setCustomer(user);
    confetti({ particleCount: 90, spread: 75 });
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleEmail.includes('@')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    const namePart = customGoogleEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    handleGoogleAccountSelect({
      name: formattedName || 'Google User',
      email: customGoogleEmail.toLowerCase().trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    if (!loginIdentifier) {
      alert('Please enter your email address or mobile number.');
      return;
    }
    playChimeSound();
    const user = loginCustomer(loginIdentifier, loginPassword);
    setCustomer(user);
    confetti({ particleCount: 80, spread: 70 });
  };

  const handleDemoQuickLogin = () => {
    playChimeSound();
    const user = loginCustomer('vip.collector@neocraftx.com', 'demo');
    setCustomer(user);
    confetti({ particleCount: 100, spread: 80 });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }
    playChimeSound();
    const user = registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone,
      city: regCity || 'Mumbai'
    });
    setCustomer(user);
    confetti({ particleCount: 120, spread: 90 });
  };

  const handleLogout = () => {
    playClickSound();
    logoutCustomer();
    setCustomer(null);
  };

  // ================= UNAUTHENTICATED: LOGIN / REGISTER PORTAL =================
  if (!customer) {
    return (
      <div className="min-h-screen bg-[#070709] text-white pt-6 pb-20 select-none">
        <div className="max-w-md mx-auto px-4">
          
          {/* Brand Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0071e3] to-[#00F0FF] p-0.5 mx-auto shadow-xl shadow-[#0071e3]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#121216] rounded-2xl flex items-center justify-center text-white">
                <User className="w-7 h-7 text-[#2997ff]" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              NEOCRAFT VIP Account
            </h1>
            <p className="text-xs text-[#86868b]">
              Access saved neon designs, track active studio fabrication, and redeem exclusive collector rewards.
            </p>
          </div>

          {/* Card Container */}
          <div className="apple-card p-6 sm:p-8 border border-[#262629] shadow-2xl space-y-5">
            
            {/* Google One-Tap / OAuth Sign-In Button */}
            <button
              type="button"
              onClick={() => { playClickSound(); setShowGoogleModal(true); }}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-[#262629]" />
              <span className="text-[10px] uppercase font-bold text-[#86868b] tracking-wider">or sign in with email</span>
              <div className="h-[1px] flex-1 bg-[#262629]" />
            </div>

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-[#121215] rounded-xl border border-[#222225] text-xs">
              <button
                onClick={() => { playClickSound(); setAuthMode('login'); }}
                className={`py-2 rounded-lg font-semibold cursor-pointer transition-all ${
                  authMode === 'login' 
                    ? 'bg-[#2997ff] text-white shadow-md' 
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { playClickSound(); setAuthMode('register'); }}
                className={`py-2 rounded-lg font-semibold cursor-pointer transition-all ${
                  authMode === 'register' 
                    ? 'bg-[#2997ff] text-white shadow-md' 
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Login Form */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">
                    Email Address or WhatsApp Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#86868b] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="e.g. yourname@gmail.com or 98201xxxxx"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-[#86868b] font-semibold">Password / OTP PIN</label>
                    <span className="text-[10px] text-[#2997ff] cursor-pointer hover:underline">Instant Auto-Verify</span>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-[#86868b] absolute left-3 top-3" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password (or leave blank for instant login)"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="apple-btn-primary w-full py-3 font-bold text-xs tracking-wide cursor-pointer shadow-lg shadow-[#0071e3]/20"
                >
                  Sign In to VIP Account ➔
                </button>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDemoQuickLogin}
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#2997ff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>⚡ 1-Click Instant Demo Login</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="vikram@studio.com"
                    className="w-full px-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98201xxxxx"
                      className="w-full px-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">City</label>
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Mumbai / Delhi"
                      className="w-full px-3 py-2.5 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
                  <Gift className="w-4 h-4 shrink-0" />
                  <span>Includes <strong>500 Welcome Bonus Karma Points</strong> (₹500 Value).</span>
                </div>

                <button
                  type="submit"
                  className="apple-btn-primary w-full py-3 font-bold text-xs tracking-wide cursor-pointer shadow-lg shadow-[#0071e3]/20"
                >
                  Create Free VIP Account ➔
                </button>
              </form>
            )}

            {/* Trust Footer */}
            <div className="pt-4 border-t border-[#222225] flex items-center justify-between text-[10px] text-[#86868b]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit SSL Encrypted
              </span>
              <span>2-Year Direct Replacement</span>
            </div>

          </div>
        </div>

        {/* Google OAuth Interactive Account Chooser Modal */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[#18181c] border border-[#2d2d32] rounded-3xl p-6 shadow-2xl space-y-5 text-white">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span className="text-sm font-bold">Sign in with Google</span>
                </div>
                <button
                  onClick={() => setShowGoogleModal(false)}
                  className="p-1 rounded-full text-[#86868b] hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#a1a1a6]">
                Choose an account to continue to <strong>NEOCRAFT Studio</strong>:
              </p>

              {/* Preset Google Accounts */}
              <div className="space-y-2">
                {[
                  {
                    name: 'Akash Sharma',
                    email: 'akash.sharma@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                  },
                  {
                    name: 'Rhea Kapoor',
                    email: 'rhea.architects@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                  }
                ].map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleGoogleAccountSelect(acc)}
                    className="w-full p-3 rounded-2xl bg-[#222228] hover:bg-[#2c2c34] border border-[#33333c] flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                      <div>
                        <strong className="text-xs text-white block group-hover:text-[#2997ff]">{acc.name}</strong>
                        <span className="text-[11px] text-[#86868b]">{acc.email}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#86868b] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>

              {/* Enter Custom Gmail */}
              <div className="pt-2 border-t border-[#2d2d32]">
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-2">
                  <label className="text-[11px] text-[#86868b] block font-semibold">Or enter your Gmail:</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      placeholder="your.name@gmail.com"
                      className="flex-1 px-3 py-2 bg-[#121215] border border-[#333] rounded-xl text-xs text-white focus:outline-none focus:border-[#2997ff]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2997ff] hover:bg-[#0071e3] text-white rounded-xl text-xs font-bold cursor-pointer shrink-0 shadow-md"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-[10px] text-[#86868b] text-center pt-2">
                To continue, Google will share your name, email address, and profile picture with NEOCRAFT.
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // ================= AUTHENTICATED: FULL VIP CUSTOMER DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#070709] text-white pt-4 pb-20 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* VIP Member Top Hero Header */}
        <div className="relative rounded-[32px] overflow-hidden border border-[#262629] bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#0f0f15] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            
            {/* User Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={customer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={customer.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2997ff] shadow-lg shadow-[#2997ff]/20"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {customer.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {customer.tier || 'Gold VIP Member'}
                  </span>
                  {customer.authProvider === 'google' && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold flex items-center gap-1 border border-white/20">
                      <svg className="w-3 h-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      Google Verified
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#86868b] flex items-center gap-3 flex-wrap">
                  <span>{customer.email}</span>
                  <span>•</span>
                  <span>Member since {customer.joinedAt || '2026'}</span>
                </div>
              </div>
            </div>

            {/* Loyalty Karma & Logout */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#111115] border border-[#262629] text-right min-w-[130px]">
                <span className="text-[10px] uppercase font-bold text-[#86868b] block">VIP Neon Karma</span>
                <div className="text-lg font-black text-amber-300 font-mono flex items-center justify-end gap-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{customer.karma || 500} Pts</span>
                </div>
                <span className="text-[9px] text-emerald-400 block font-semibold">₹{(customer.karma || 500)} Discount Value</span>
              </div>

              <button
                onClick={handleLogout}
                className="p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer flex flex-col items-center justify-center text-[10px] font-semibold gap-1"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#222225] pb-2 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: '📦 Fabrication & Orders', count: orders.length },
            { id: 'designs', label: '✨ My Saved Neon Designs', count: savedDesigns.length },
            { id: 'perks', label: '💎 VIP Collector Perks & Coupons' },
            { id: 'profile', label: '📍 Addresses & GST Profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClickSound(); setActiveTab(tab.id); }}
              className={`px-4 py-2.5 rounded-xl font-semibold cursor-pointer shrink-0 transition-all ${
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

        {/* ================= TAB 1: ORDERS & TRACKING ================= */}
        {activeTab === 'orders' && (
          <section className="space-y-4">
            {orders.length === 0 ? (
              <div className="apple-card p-12 text-center border border-[#262629] space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1c1c22] border border-white/10 flex items-center justify-center mx-auto text-[#2997ff]">
                  <Package className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">No Active Orders Yet</h3>
                  <p className="text-xs text-[#86868b] max-w-md mx-auto">
                    You haven't placed an order yet. Build a custom neon sign or choose from our museum canvas gallery!
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => { playClickSound(); onNavigate('custom-studio'); }}
                    className="apple-btn-primary py-2 px-5 text-xs font-semibold cursor-pointer"
                  >
                    Open Custom Neon Studio ➔
                  </button>
                  <button
                    onClick={() => { playClickSound(); onNavigate('paintings'); }}
                    className="apple-btn-secondary py-2 px-5 text-xs font-semibold cursor-pointer"
                  >
                    Explore Canvas Art
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="apple-card p-6 border border-[#262629] space-y-4 hover:border-[#333338] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#222225] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-white font-mono">{order.id}</strong>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'dispatched'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-[#2997ff]/20 text-[#2997ff] border border-[#2997ff]/30'
                          }`}>
                            ● {order.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#86868b]">Placed: {order.placedAt}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-white font-mono">{order.amount}</span>
                        <div className="text-[10px] text-[#86868b]">BlueDart: {order.tracking || 'BD-88491023IN'}</div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-200">
                      <strong>Items:</strong> {order.items}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => { playClickSound(); onNavigate('tracker'); }}
                        className="text-xs text-[#2997ff] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Live Production Stages ➔</span>
                      </button>

                      <a
                        href={`https://wa.me/919166691274?text=Hello%20Neocraft!%20Checking%20status%20for%20my%20Order%20${order.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="apple-btn-secondary py-1.5 px-3 text-[11px] font-semibold cursor-pointer inline-flex items-center gap-1"
                      >
                        WhatsApp Support
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= TAB 2: SAVED CUSTOM DESIGNS ================= */}
        {activeTab === 'designs' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedDesigns.map((dsg) => (
                <div
                  key={dsg.id}
                  className="apple-card p-6 border border-[#262629] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-bold">
                        {dsg.font} Font
                      </span>
                      <span className="text-[10px] text-[#86868b]">{dsg.savedAt}</span>
                    </div>

                    {/* Glowing Preview Box */}
                    <div className="p-6 rounded-2xl bg-black border border-[#222225] flex items-center justify-center min-h-[110px] text-center overflow-hidden">
                      <span 
                        className="text-2xl font-bold tracking-wide neon-tube-glow"
                        style={{ 
                          fontFamily: dsg.font === 'Satisfy' ? "'Satisfy', cursive" : dsg.font === 'Sacramento' ? "'Sacramento', cursive" : 'inherit',
                          color: dsg.color 
                        }}
                      >
                        {dsg.text}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-[#86868b] flex justify-between">
                        <span>Color:</span>
                        <strong className="text-white">{dsg.colorName}</strong>
                      </div>
                      <div className="text-[#86868b] flex justify-between">
                        <span>Size / Backing:</span>
                        <strong className="text-white">{dsg.size} • {dsg.backing}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
                    <div className="text-base font-black text-white font-mono">
                      {formatPrice(dsg.price, selectedCurrency)}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playClickSound();
                          onNavigate('custom-studio');
                        }}
                        className="apple-btn-secondary py-1.5 px-3 text-xs font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          playChimeSound();
                          onAddToCart({
                            id: `saved-${dsg.id}`,
                            name: `Custom Neon "${dsg.text}" (${dsg.size})`,
                            price: dsg.price,
                            quantity: 1,
                            image: '⚡'
                          });
                        }}
                        className="apple-btn-primary py-1.5 px-3 text-xs font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => { playClickSound(); onNavigate('custom-studio'); }}
                className="apple-btn-secondary py-2.5 px-6 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>+ Create New Custom Neon Sign in Studio 2.0</span>
              </button>
            </div>
          </section>
        )}

        {/* ================= TAB 3: VIP PERKS & COUPONS ================= */}
        {activeTab === 'perks' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="apple-card p-5 border border-[#262629] space-y-2 bg-gradient-to-br from-[#1c1a24] to-[#121216]">
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold font-mono">
                  ACTIVE COLLECTOR PERK
                </span>
                <h4 className="text-sm font-bold text-white">15% Lifetime Rebate</h4>
                <p className="text-xs text-[#86868b]">Apply coupon code at checkout for 15% off any architectural sign.</p>
                <div className="p-2 rounded-lg bg-black font-mono font-bold text-cyan-300 text-xs text-center border border-[#333]">
                  NEO15
                </div>
              </div>

              <div className="apple-card p-5 border border-[#262629] space-y-2 bg-gradient-to-br from-[#182030] to-[#121216]">
                <span className="px-2 py-0.5 rounded-full bg-[#2997ff]/20 text-[#2997ff] text-[10px] font-bold font-mono">
                  FREE ACCESSORY
                </span>
                <h4 className="text-sm font-bold text-white">Complimentary Dimmer Remote</h4>
                <p className="text-xs text-[#86868b]">Free RF wireless handheld multi-mode dimmer included with all VIP orders.</p>
                <span className="text-[11px] text-emerald-400 font-semibold block">● Included Automatically</span>
              </div>

              <div className="apple-card p-5 border border-[#262629] space-y-2 bg-gradient-to-br from-[#1a241e] to-[#121216]">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono">
                  WARRANTY UPGRADE
                </span>
                <h4 className="text-sm font-bold text-white">Priority Express Replacement</h4>
                <p className="text-xs text-[#86868b]">2-Year zero-hassle courier swap for solid-state power bricks & transformers.</p>
                <span className="text-[11px] text-emerald-400 font-semibold block">● Active for your account</span>
              </div>

            </div>
          </section>
        )}

        {/* ================= TAB 4: PROFILE & GST ================= */}
        {activeTab === 'profile' && (
          <section className="apple-card p-6 sm:p-8 border border-[#262629] space-y-6 text-xs">
            <h3 className="text-base font-semibold text-white">VIP Profile & Billing Preferences</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  defaultValue={customer.name}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  defaultValue={customer.email}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">Primary WhatsApp Phone</label>
                <input
                  type="tel"
                  defaultValue={customer.phone}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#86868b] block mb-1 font-semibold">GSTIN (For 18% Input Tax Credit)</label>
                <input
                  type="text"
                  placeholder="27AABCS1429B1Z8 (Optional)"
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2d2d30] rounded-xl text-white focus:outline-none focus:border-[#2997ff]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#222225] flex justify-end">
              <button
                onClick={() => {
                  playChimeSound();
                  alert('Profile & GST billing preferences updated successfully! ✅');
                }}
                className="apple-btn-primary py-2 px-5 font-bold cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
