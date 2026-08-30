import React, { useState, useEffect } from 'react';
import AppleNavbar from './components/apple/AppleNavbar';
import AppleHero from './components/apple/AppleHero';
import AppleBentoGrid from './components/apple/AppleBentoGrid';
import AppleStudioConfigurator from './components/apple/AppleStudioConfigurator';
import AppleProductLineup from './components/apple/AppleProductLineup';
import AppleComparisonMatrix from './components/apple/AppleComparisonMatrix';
import AppleBottlePresenters from './components/apple/AppleBottlePresenters';
import AppleCanvasPaintings from './components/apple/AppleCanvasPaintings';
import AppleVastuGuide from './components/apple/AppleVastuGuide';
import AppleEnergyCalculator from './components/apple/AppleEnergyCalculator';
import AppleSoundReactiveStudio from './components/apple/AppleSoundReactiveStudio';
import AppleLogoEstimator from './components/apple/AppleLogoEstimator';
import AppleOrderTracker from './components/apple/AppleOrderTracker';
import AppleShotOnNeocraft from './components/apple/AppleShotOnNeocraft';
import AppleRemoteSimulator from './components/apple/AppleRemoteSimulator';
import AppleFontShowcase from './components/apple/AppleFontShowcase';
import AppleSupportCenter from './components/apple/AppleSupportCenter';
import AppleUnboxingExperience from './components/apple/AppleUnboxingExperience';
import AppleBackingSimulatorModal from './components/apple/AppleBackingSimulatorModal';
import AppleMultiLanguageNeonModal from './components/apple/AppleMultiLanguageNeonModal';
import AppleBulkCorporateModal from './components/apple/AppleBulkCorporateModal';
import AppleBatteryRuntimeCalculator from './components/apple/AppleBatteryRuntimeCalculator';
import ApplePixelChasingStudio from './components/apple/ApplePixelChasingStudio';
import AppleWallSafetyCalculator from './components/apple/AppleWallSafetyCalculator';
import AppleEventRentalCalculator from './components/apple/AppleEventRentalCalculator';
import AppleSmartHomeModal from './components/apple/AppleSmartHomeModal';
import AppleMultiPanelCanvasModal from './components/apple/AppleMultiPanelCanvasModal';
import AppleColorPsychologyModal from './components/apple/AppleColorPsychologyModal';
import AppleAINeonGeneratorModal from './components/apple/AppleAINeonGeneratorModal';
import AppleSizingVisualizerModal from './components/apple/AppleSizingVisualizerModal';
import AppleWishlistModal from './components/apple/AppleWishlistModal';
import AppleCatalogDownloadModal from './components/apple/AppleCatalogDownloadModal';
import AppleDesignConsultationModal from './components/apple/AppleDesignConsultationModal';
import AppleTradeInModal from './components/apple/AppleTradeInModal';
import AppleGiftCardModal from './components/apple/AppleGiftCardModal';
import AppleProductDetailModal from './components/apple/AppleProductDetailModal';
import AppleRoomSimulatorModal from './components/apple/AppleRoomSimulatorModal';
import AppleTradePartnerModal from './components/apple/AppleTradePartnerModal';
import AppleLiveConcierge from './components/apple/AppleLiveConcierge';
import AppleARQuickLookModal from './components/apple/AppleARQuickLookModal';
import AppleBagDrawer from './components/apple/AppleBagDrawer';
import AppleCheckoutModal from './components/apple/AppleCheckoutModal';
import AppleFooter from './components/apple/AppleFooter';
import AppleAboutPage from './components/apple/pages/AppleAboutPage';
import AppleBlogPage from './components/apple/pages/AppleBlogPage';
import AppleContactPage from './components/apple/pages/AppleContactPage';
import AppleRefundPolicyPage from './components/apple/pages/AppleRefundPolicyPage';
import AppleTermsPage from './components/apple/pages/AppleTermsPage';
import AppleAdminDashboard from './components/apple/pages/AppleAdminDashboard';
import { updatePageSEO } from './utils/seo';

import ReviewsSection from './components/salesEngines/ReviewsSection';
import VibeMatcherModal from './components/vibeQuiz/VibeMatcherModal';
import SpinWheelModal from './components/salesEngines/SpinWheelModal';
import LiveActivityTicker from './components/salesEngines/LiveActivityTicker';

import { toggleGlobalSound, isSoundActive, playClickSound } from './audio/soundEffects';

export default function App() {
  // Navigation
  const [activeSection, setActiveSection] = useState('hero');

  // Modals & Drawers
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [arText, setArText] = useState('Dream In Neon');
  const [arColor, setArColor] = useState('#00F0FF');
  const [isVibeQuizOpen, setIsVibeQuizOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isBackingSimulatorOpen, setIsBackingSimulatorOpen] = useState(false);
  const [isMultiLangOpen, setIsMultiLangOpen] = useState(false);
  const [isCorporateBulkOpen, setIsCorporateBulkOpen] = useState(false);
  const [isSmartHomeOpen, setIsSmartHomeOpen] = useState(false);
  const [isMultiPanelOpen, setIsMultiPanelOpen] = useState(false);
  const [isColorPsychologyOpen, setIsColorPsychologyOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isSizingVisualizerOpen, setIsSizingVisualizerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTradePartnerOpen, setIsTradePartnerOpen] = useState(false);
  const [isCatalogDownloadOpen, setIsCatalogDownloadOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);

  // Cart & Currency
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState({ code: 'NEO15', label: '15% Discount Applied' });
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [soundActive, setSoundActive] = useState(true);

  const handleToggleSound = () => {
    const nextState = !soundActive;
    toggleGlobalSound(nextState);
    setSoundActive(nextState);
    return nextState;
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [item, ...prev];
    });
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigation & Active Page Route
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'home';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        let target = hash;
        if (target === 'hero' || target === 'overview' || target === 'comparison') target = 'home';
        if (target === 'logo-estimator') target = 'business-signs';
        setCurrentPage(target);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    updatePageSEO(currentPage);
  }, [currentPage]);

  const handleNavigate = (pageId) => {
    try {
      playClickSound();
    } catch (e) {
      // safe fallback
    }
    let target = pageId || 'home';
    if (target === 'hero' || target === 'overview' || target === 'comparison') target = 'home';
    if (target === 'logo-estimator') target = 'business-signs';
    
    window.location.hash = target === 'home' ? '' : target;
    setCurrentPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenARWithParams = (text = 'Dream In Neon', color = '#00F0FF') => {
    setArText(text);
    setArColor(color);
    setIsAROpen(true);
  };

  const totalBagCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white flex flex-col justify-between">
      
      {/* 1. Apple Global Frosted Navigation & Sub-Nav Ribbon */}
      <AppleNavbar
        currentPage={currentPage}
        cartCount={totalBagCount}
        onOpenCart={() => setIsBagOpen(true)}
        onOpenStudio={() => handleNavigate('custom-studio')}
        onOpenVisualizer={() => handleOpenARWithParams()}
        onOpenLogoEstimator={() => handleNavigate('business-signs')}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenBackingSimulator={() => setIsBackingSimulatorOpen(true)}
        onOpenMultiLang={() => setIsMultiLangOpen(true)}
        onOpenCorporateBulk={() => setIsCorporateBulkOpen(true)}
        onOpenSmartHome={() => setIsSmartHomeOpen(true)}
        onOpenMultiPanel={() => setIsMultiPanelOpen(true)}
        onOpenColorPsychology={() => setIsColorPsychologyOpen(true)}
        onOpenAIGenerator={() => setIsAIGeneratorOpen(true)}
        onOpenSizingVisualizer={() => setIsSizingVisualizerOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTradePartner={() => setIsTradePartnerOpen(true)}
        onOpenCatalogDownload={() => setIsCatalogDownloadOpen(true)}
        onOpenVibeQuiz={() => setIsVibeQuizOpen(true)}
        onOpenSpinWheel={() => setIsSpinWheelOpen(true)}
        selectedCurrency={selectedCurrency}
        onChangeCurrency={setSelectedCurrency}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Dedicated View / Page Switcher */}
      <main className="flex-1">
        
        {/* ================= PAGE: HOME / MAIN STORE ================= */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Cinematic Apple Pro Hero Section */}
            <AppleHero
              onOpenStudio={() => handleNavigate('custom-studio')}
              onOpenVisualizer={() => handleOpenARWithParams()}
              onOpenCatalog={() => handleNavigate('catalog')}
              selectedCurrency={selectedCurrency}
            />

            {/* Apple Bento Grid ("Engineered to Illuminate") */}
            <AppleBentoGrid />

            {/* Product Lineup Grid */}
            <AppleProductLineup
              onAddToCart={handleAddToCart}
              onOpenVisualizer={handleOpenARWithParams}
              onSelectProduct={(p) => setSelectedDetailProduct(p)}
              selectedCurrency={selectedCurrency}
            />

            {/* Comparison Matrix */}
            <AppleComparisonMatrix
              onOpenStudio={() => handleNavigate('custom-studio')}
              onOpenLogoEstimator={() => handleNavigate('business-signs')}
              selectedCurrency={selectedCurrency}
            />

            {/* Real Installations Preview */}
            <AppleShotOnNeocraft
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />

            {/* Reviews & Trust Metrics */}
            <ReviewsSection />
          </div>
        )}

        {/* ================= PAGE: CATALOG ================= */}
        {currentPage === 'catalog' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-white font-semibold">All Signature Collections</span>
              </div>
            </div>

            <AppleProductLineup
              onAddToCart={handleAddToCart}
              onOpenVisualizer={handleOpenARWithParams}
              onSelectProduct={(p) => setSelectedDetailProduct(p)}
              selectedCurrency={selectedCurrency}
            />
            <AppleComparisonMatrix
              onOpenStudio={() => handleNavigate('custom-studio')}
              onOpenLogoEstimator={() => handleNavigate('business-signs')}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: CUSTOM NEON STUDIO 2.0 ================= */}
        {currentPage === 'custom-studio' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-[#2997ff] font-semibold">Custom Neon Studio 2.0</span>
              </div>
            </div>

            <AppleStudioConfigurator
              onAddToCart={handleAddToCart}
              onOpenVisualizer={handleOpenARWithParams}
              selectedCurrency={selectedCurrency}
            />
            <AppleSoundReactiveStudio />
          </div>
        )}

        {/* ================= PAGE: MUSEUM CANVAS PAINTINGS ================= */}
        {currentPage === 'paintings' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-amber-300 font-semibold">Museum Giclée Canvas Paintings</span>
              </div>
            </div>

            <AppleCanvasPaintings
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
            <AppleVastuGuide />
          </div>
        )}

        {/* ================= PAGE: VIP BOTTLE PRESENTERS ================= */}
        {currentPage === 'bottle-presenters' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-[#f56300] font-semibold">VIP LED Bottle Presenters</span>
              </div>
            </div>

            <AppleBottlePresenters
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: 3D ARCHITECTURAL BUSINESS SIGNS ================= */}
        {currentPage === 'business-signs' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-white font-semibold">3D Architectural & Enterprise Business Signage</span>
              </div>
            </div>

            <AppleLogoEstimator
              selectedCurrency={selectedCurrency}
            />
            <AppleComparisonMatrix
              onOpenStudio={() => handleNavigate('custom-studio')}
              onOpenLogoEstimator={() => handleNavigate('business-signs')}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: VASTU SHASTRA PLACEMENT GUIDE ================= */}
        {currentPage === 'vastu' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-amber-400 font-semibold">Vastu Shastra & Spatial Harmony Guide</span>
              </div>
            </div>

            <AppleVastuGuide />
            <AppleCanvasPaintings
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: REAL INSTALLATIONS / GALLERY ================= */}
        {currentPage === 'gallery' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-purple-300 font-semibold">Illuminated by NEOCRAFT (Real Spaces)</span>
              </div>
            </div>

            <AppleShotOnNeocraft
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: ORDER TRACKER ================= */}
        {currentPage === 'tracker' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-emerald-400 font-semibold">Real-Time Production & Logistics Tracker</span>
              </div>
            </div>

            <AppleOrderTracker />
          </div>
        )}

        {/* ================= PAGE: SOUND-REACTIVE ACOUSTIC STUDIO ================= */}
        {currentPage === 'sound-reactive' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-cyan-400 font-semibold">Sound-Reactive Smart Equalizer Studio</span>
              </div>
            </div>

            <AppleSoundReactiveStudio />
          </div>
        )}

        {/* ================= PAGE: 12V GREEN ENERGY CALCULATOR ================= */}
        {currentPage === 'energy-calculator' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-emerald-400 font-semibold">12V Green Energy & Power Cost Calculator</span>
              </div>
            </div>

            <AppleEnergyCalculator
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: REVIEWS & WARRANTY ================= */}
        {currentPage === 'reviews' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-white font-semibold">Verified Customer Reviews & 5-Year Guarantee</span>
              </div>
            </div>

            <ReviewsSection />
          </div>
        )}

        {/* ================= PAGE: SIGNATURE TYPOGRAPHY LAB ================= */}
        {currentPage === 'fonts' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-pink-400 font-semibold">Signature Typography Lab (12 Luxury Fonts)</span>
              </div>
            </div>

            <AppleFontShowcase
              onSelectFontToStudio={(text, font) => {
                handleNavigate('custom-studio');
              }}
            />
          </div>
        )}

        {/* ================= PAGE: WIRELESS RF REMOTE CONTROLLER ================= */}
        {currentPage === 'remote' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-[#2997ff] font-semibold">Handheld RF Dimmer Remote Controller Simulator</span>
              </div>
            </div>

            <AppleRemoteSimulator />
          </div>
        )}

        {/* ================= PAGE: APPLE GENIUS SUPPORT & TROUBLESHOOTING ================= */}
        {currentPage === 'support' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-emerald-400 font-semibold">NEOCRAFT Genius Support & 2-Year Warranty</span>
              </div>
            </div>

            <AppleSupportCenter />
          </div>
        )}

        {/* ================= PAGE: WHITE-GLOVE UNBOXING ARCHITECTURE ================= */}
        {currentPage === 'unboxing' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-white font-semibold">White-Glove VIP Unboxing Architecture</span>
              </div>
            </div>

            <AppleUnboxingExperience
              onOpenBackingSimulator={() => setIsBackingSimulatorOpen(true)}
            />
          </div>
        )}

        {/* ================= PAGE: 12V INVERTER & BATTERY RUNTIME CALCULATOR ================= */}
        {currentPage === 'battery' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-emerald-400 font-semibold">12V Inverter, UPS & Solar Battery Runtime Calculator</span>
              </div>
            </div>

            <AppleBatteryRuntimeCalculator />
          </div>
        )}

        {/* ================= PAGE: RGB DREAMCOLOR PIXEL CHASING STUDIO ================= */}
        {currentPage === 'dreamcolor' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-cyan-400 font-semibold">Addressable RGB DreamColor Pixel Studio</span>
              </div>
            </div>

            <ApplePixelChasingStudio
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: SIGN WEIGHT & WALL LOAD SAFETY CALCULATOR ================= */}
        {currentPage === 'safety' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-[#2997ff] font-semibold">Architectural Sign Weight & Seismic Safety Calculator</span>
              </div>
            </div>

            <AppleWallSafetyCalculator />
          </div>
        )}

        {/* ================= PAGE: WEDDING & EVENT KEEPSAKE VS RENTAL ================= */}
        {currentPage === 'weddings' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-[#111113] border-b border-[#222225] py-4 px-4">
              <div className="max-w-[1140px] mx-auto flex items-center gap-2 text-xs text-[#86868b]">
                <button onClick={() => handleNavigate('home')} className="hover:text-white">Store</button>
                <span>/</span>
                <span className="text-pink-300 font-semibold">Weddings & Celebrations Keepsake vs Rental Studio</span>
              </div>
            </div>

            <AppleEventRentalCalculator
              onAddToCart={handleAddToCart}
              selectedCurrency={selectedCurrency}
            />
          </div>
        )}

        {/* ================= PAGE: ABOUT US ================= */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <AppleAboutPage
              onNavigate={handleNavigate}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          </div>
        )}

        {/* ================= PAGE: BLOG & STORIES ================= */}
        {currentPage === 'blog' && (
          <div className="animate-in fade-in duration-300">
            <AppleBlogPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* ================= PAGE: CONTACT US ================= */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <AppleContactPage
              onNavigate={handleNavigate}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          </div>
        )}

        {/* ================= PAGE: CANCELLATION & REFUND POLICY ================= */}
        {currentPage === 'refund-policy' && (
          <div className="animate-in fade-in duration-300">
            <AppleRefundPolicyPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* ================= PAGE: TERMS & CONDITIONS ================= */}
        {currentPage === 'terms' && (
          <div className="animate-in fade-in duration-300">
            <AppleTermsPage
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* ================= PAGE: STUDIO ADMIN & PRODUCTION DASHBOARD ================= */}
        {currentPage === 'admin' && (
          <div className="animate-in fade-in duration-300">
            <AppleAdminDashboard
              onNavigate={handleNavigate}
            />
          </div>
        )}

      </main>

      {/* 3. Apple Multi-Column Directory Footer */}
      <AppleFooter
        onNavigate={handleNavigate}
        onOpenStudio={() => handleNavigate('custom-studio')}
        onOpenVisualizer={() => handleOpenARWithParams()}
        onOpenLogoEstimator={() => handleNavigate('business-signs')}
      />

      {/* 4. Live Order Activity Toast Notification */}
      <LiveActivityTicker />

      {/* 5. Apple Store Bag Drawer */}
      <AppleBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedPromo={appliedPromo}
        onApplyPromo={setAppliedPromo}
        onProceedCheckout={() => {
          setIsBagOpen(false);
          setIsCheckoutOpen(true);
        }}
        selectedCurrency={selectedCurrency}
      />

      {/* 6. Apple Express Checkout Modal */}
      <AppleCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedPromo={appliedPromo}
        onClearCart={handleClearCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 7. Apple AR Quick Look / View in Your Space Modal */}
      <AppleARQuickLookModal
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
        initialText={arText}
        initialColor={arColor}
        onAddToCart={handleAddToCart}
      />

      {/* 8. 1-on-1 Studio Lighting Consultation Modal */}
      <AppleDesignConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* 9. Apple-Style Trade-In & Signage Upgrade Modal */}
      <AppleTradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
        onApplyCredit={(promo) => {
          setAppliedPromo(promo);
          setIsBagOpen(true);
        }}
      />

      {/* 10. Apple Wallet Digital Luxury Gift Card Modal */}
      <AppleGiftCardModal
        isOpen={isGiftCardOpen}
        onClose={() => setIsGiftCardOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 8. Vibe Matcher Discovery Quiz */}
      <VibeMatcherModal
        isOpen={isVibeQuizOpen}
        onClose={() => setIsVibeQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenStudio={() => {
          setIsVibeQuizOpen(false);
          handleNavigate('custom-studio');
        }}
        selectedCurrency={selectedCurrency}
      />

      {/* 9. Lucky Neon Spin Wheel Promo Modal */}
      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onApplyDiscount={(prize) => {
          setAppliedPromo({ code: prize.code, label: prize.label });
        }}
      />

      {/* 10. Apple Product Detail & Specification Inspect Modal */}
      <AppleProductDetailModal
        product={selectedDetailProduct}
        isOpen={!!selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenAR={handleOpenARWithParams}
        selectedCurrency={selectedCurrency}
      />

      {/* 11. 3D Room Material & Ambient Lighting Simulator Modal */}
      <AppleRoomSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        initialText="DREAM IN NEON"
        initialColor="#00F0FF"
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 12. Architect & Interior Designer Trade Partner Modal */}
      <AppleTradePartnerModal
        isOpen={isTradePartnerOpen}
        onClose={() => setIsTradePartnerOpen(false)}
      />

      {/* 13. Download Architectural Lookbook & Specs PDF Modal */}
      <AppleCatalogDownloadModal
        isOpen={isCatalogDownloadOpen}
        onClose={() => setIsCatalogDownloadOpen(false)}
      />

      {/* 14. Acrylic Backing & Laser Cut-to-Shape Simulator Modal */}
      <AppleBackingSimulatorModal
        isOpen={isBackingSimulatorOpen}
        onClose={() => setIsBackingSimulatorOpen(false)}
        initialText="ICONIC"
        initialColor="#00F0FF"
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 15. Multi-Language & Regional Calligraphy Neon Studio Modal */}
      <AppleMultiLanguageNeonModal
        isOpen={isMultiLangOpen}
        onClose={() => setIsMultiLangOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 16. Corporate Bulk Gifting & Tiered Wholesale B2B Modal */}
      <AppleBulkCorporateModal
        isOpen={isCorporateBulkOpen}
        onClose={() => setIsCorporateBulkOpen(false)}
        selectedCurrency={selectedCurrency}
      />

      {/* 17. Smart Home Automation (Apple HomeKit, Alexa, Google) Modal */}
      <AppleSmartHomeModal
        isOpen={isSmartHomeOpen}
        onClose={() => setIsSmartHomeOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 18. Panoramic Multi-Panel Canvas Split (Triptych & Cascade) Modal */}
      <AppleMultiPanelCanvasModal
        isOpen={isMultiPanelOpen}
        onClose={() => setIsMultiPanelOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 19. Color Psychology, Kelvin Spectrum & Circadian Guide Modal */}
      <AppleColorPsychologyModal
        isOpen={isColorPsychologyOpen}
        onClose={() => setIsColorPsychologyOpen(false)}
      />

      {/* 20. AI Neon Art & Vector Concept Generator Modal */}
      <AppleAINeonGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 21. Sign Sizing & Optical Viewing Distance Visualizer Modal */}
      <AppleSizingVisualizerModal
        isOpen={isSizingVisualizerOpen}
        onClose={() => setIsSizingVisualizerOpen(false)}
        onSelectSize={(cm) => {
          handleNavigate('custom-studio');
        }}
      />

      {/* 22. Luxury Gift Registry & Shareable Wishlist Modal */}
      <AppleWishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onAddToCart={handleAddToCart}
        selectedCurrency={selectedCurrency}
      />

      {/* 23. Apple Floating VIP Concierge Widget */}
      <AppleLiveConcierge
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenTradeIn={() => setIsTradeInOpen(true)}
      />

    </div>
  );
}
