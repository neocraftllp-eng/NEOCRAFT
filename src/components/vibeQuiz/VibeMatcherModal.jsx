import React, { useState } from 'react';
import { 
  X, 
  Wand2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag, 
  RotateCcw,
  Gift
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

const QUIZ_QUESTIONS = [
  {
    step: 1,
    title: 'Where will your neon shine?',
    subtitle: 'Select the space you want to transform',
    options: [
      { id: 'space-bedroom', label: 'Master Bedroom / Bedhead', icon: '🛏️', desc: 'Warm intimate ambient glow' },
      { id: 'space-bar', label: 'Home Bar / Dining Lounge', icon: '🍸', desc: 'Moody speakeasy cocktail atmosphere' },
      { id: 'space-gaming', label: 'Gaming Battlestation / Studio', icon: '⚡', desc: 'High-voltage cyberpunk streaming backdrop' },
      { id: 'space-wedding', label: 'Wedding / Photo Booth', icon: '💍', desc: 'Romantic photo-ready elegance' },
      { id: 'space-commercial', label: 'Cafe / Storefront / Office', icon: '🏢', desc: 'High-impact customer branding' }
    ]
  },
  {
    step: 2,
    title: 'What mood do you want to evoke?',
    subtitle: 'Every light frequency tells a different story',
    options: [
      { id: 'mood-cyber', label: 'Cyberpunk & Electric', icon: '🌆', colorHex: '#00F0FF', desc: 'Vibrant Tron cyan and intense magenta' },
      { id: 'mood-cozy', label: 'Warm & Romantic Champagne', icon: '✨', colorHex: '#FFE4B5', desc: 'Soft 2700K golden luxury aura' },
      { id: 'mood-bold', label: 'CEO Energy & Motivation', icon: '🔥', colorHex: '#FF003C', desc: 'High-impact focus and empowerment' },
      { id: 'mood-nature', label: 'Botanical & Chill Lounge', icon: '🌿', colorHex: '#39FF14', desc: 'Relaxing matrix green and aqua vibes' }
    ]
  },
  {
    step: 3,
    title: 'What style of sign speaks to you?',
    subtitle: 'Choose your preferred artistic format',
    options: [
      { id: 'art-wings', label: 'Life-Sized Angel Wings', icon: '🪽', desc: 'The iconic Instagram selfie centerpiece' },
      { id: 'art-script', label: 'Flowing Cursive Signature Quote', icon: '✍️', desc: 'Timeless cursive phrases & custom names' },
      { id: 'art-anime', label: 'Anime, Gaming & Neo-Art', icon: '🗡️', desc: 'Edgy cyberpunk Japanese silhouettes' },
      { id: 'art-acrylic', label: '3D Solid Backlit Letters', icon: '🏛️', desc: 'Architectural halo illumination' }
    ]
  }
];

export default function VibeMatcherModal({
  isOpen,
  onClose,
  onAddToCart,
  onOpenStudio,
  selectedCurrency = 'INR'
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (optionId) => {
    playClickSound();
    const updated = { ...answers, [currentStep]: optionId };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      playChimeSound();
      setShowResult(true);
    }
  };

  const handleReset = () => {
    playClickSound();
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Find best matched product
  let matchedProduct = PRODUCTS[0];
  if (answers[0] === 'space-bar') matchedProduct = PRODUCTS[2]; // Cocktails & Dreams
  else if (answers[0] === 'space-wedding' || answers[1] === 'mood-cozy') matchedProduct = PRODUCTS[3]; // Better Together
  else if (answers[2] === 'art-anime' || answers[1] === 'mood-cyber') matchedProduct = PRODUCTS[1]; // Cyber Katana
  else if (answers[0] === 'space-commercial') matchedProduct = PRODUCTS[5]; // 3D Acrylic Letters
  else if (answers[2] === 'art-wings') matchedProduct = PRODUCTS[0]; // Wings

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#090c15] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-purple-950/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                NEON VIBE MATCHER QUIZ
              </h3>
              <p className="text-xs text-purple-200/70">Personalized neon recommendation in 3 questions</p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 sm:p-8">
          
          {!showResult ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                <span>QUESTION {currentStep + 1} OF 3</span>
                <span className="text-purple-400">{Math.round(((currentStep + 1) / 3) * 100)}% COMPLETED</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                />
              </div>

              {/* Question Details */}
              <h4 className="text-xl sm:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-1">
                {QUIZ_QUESTIONS[currentStep].title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                {QUIZ_QUESTIONS[currentStep].subtitle}
              </p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-purple-950/30 hover:border-purple-500/60 text-left transition-all cursor-pointer group flex items-start gap-3.5 transform hover:-translate-y-0.5 shadow-lg"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* QUIZ RESULTS VIEW */
            <div className="space-y-6 text-center">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> 100% VIBE MATCH FOUND
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  Your Aesthetic Soulmate: <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">{matchedProduct.name}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                  {matchedProduct.shortDesc}
                </p>
              </div>

              {/* Recommended Product Card */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 max-w-md mx-auto text-left shadow-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    {matchedProduct.subcategory}
                  </span>
                  <h5 className="font-bold text-base text-white">{matchedProduct.name}</h5>
                  <div className="text-xs text-slate-400 mt-0.5">{matchedProduct.dimensions}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-black text-white">{formatPrice(matchedProduct.price, selectedCurrency)}</span>
                    <span className="text-xs text-slate-500 line-through">{formatPrice(matchedProduct.originalPrice, selectedCurrency)}</span>
                  </div>
                </div>

                <div 
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shadow-[0_0_25px_currentColor] border border-white/20"
                  style={{ color: matchedProduct.glowColor, backgroundColor: '#090b13' }}
                >
                  ⚡
                </div>
              </div>

              {/* Unlocked Reward Badge */}
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Quiz Reward Unlocked: Use code <strong className="text-white bg-amber-500/30 px-1.5 py-0.5 rounded">VIBE10</strong> for Extra 10% Off!</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    playChimeSound();
                    onAddToCart(matchedProduct);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Matched Sign to Cart</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    onClose();
                    onOpenStudio();
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Customize in Studio
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
