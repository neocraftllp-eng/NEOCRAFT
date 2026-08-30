import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Maximize2, 
  Upload, 
  Frame, 
  ShieldCheck, 
  Palette, 
  Search,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { CANVAS_PAINTINGS, CANVAS_CATEGORIES } from '../../data/appleProducts';
import { playClickSound, playChimeSound } from '../../audio/soundEffects';
import { formatPrice } from '../../utils/pricing';

export default function AppleCanvasPaintings({
  onAddToCart,
  selectedCurrency = 'INR'
}) {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Card customization states per painting: { [id]: { sizeIndex: 2, frameIndex: 0 } }
  const [customStates, setCustomStates] = useState(
    CANVAS_PAINTINGS.reduce((acc, p) => ({
      ...acc,
      [p.id]: { sizeIndex: 2, frameIndex: 0 } // default 48x48, Gallery Wrap
    }), {})
  );

  const [addedIds, setAddedIds] = useState({});
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);

  // Custom Photo on Canvas Uploader State
  const [customPhotoFile, setCustomPhotoFile] = useState(null);
  const [customPhotoPreview, setCustomPhotoPreview] = useState(null);
  const [customPhotoSizeIndex, setCustomPhotoSizeIndex] = useState(2); // 48"x48"
  const [customPhotoFrameIndex, setCustomPhotoFrameIndex] = useState(0);
  const photoInputRef = useRef(null);

  const customPhotoSizes = [
    { label: '24" × 24"', price: 2499 },
    { label: '36" × 36"', price: 4299 },
    { label: '48" × 48"', price: 6290 },
    { label: '60" × 40" Panorama', price: 7999 }
  ];

  const customPhotoFrames = [
    { label: 'Gallery Wrap (Frameless)', price: 0 },
    { label: 'Matte Obsidian Frame', price: 999 },
    { label: 'Brushed Gold Frame', price: 1299 }
  ];

  const handleSizeChange = (paintingId, sizeIndex) => {
    playClickSound();
    setCustomStates((prev) => ({
      ...prev,
      [paintingId]: { ...prev[paintingId], sizeIndex }
    }));
  };

  const handleFrameChange = (paintingId, frameIndex) => {
    playClickSound();
    setCustomStates((prev) => ({
      ...prev,
      [paintingId]: { ...prev[paintingId], frameIndex }
    }));
  };

  const handleBuy = (painting) => {
    playChimeSound();
    const state = customStates[painting.id] || { sizeIndex: 2, frameIndex: 0 };
    const selectedSize = painting.sizes[state.sizeIndex];
    const selectedFrame = painting.frames[state.frameIndex];
    const finalPrice = selectedSize.price + selectedFrame.price;

    setAddedIds((prev) => ({ ...prev, [painting.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [painting.id]: false }));
    }, 2000);

    const item = {
      id: `${painting.id}-${Date.now()}`,
      name: `${painting.name} (${selectedSize.label})`,
      category: 'canvas-paintings',
      price: finalPrice,
      originalPrice: Math.round(finalPrice * 1.4),
      quantity: 1,
      image: painting.image,
      specs: {
        dimensions: selectedSize.label,
        frame: selectedFrame.label,
        canvasType: '380 GSM 100% Virgin Cotton Canvas',
        printing: '12-Color Epson UltraChrome HDR Archival'
      }
    };
    onAddToCart(item);
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      setCustomPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setCustomPhotoPreview(ev.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBuyCustomPhoto = () => {
    playChimeSound();
    const sz = customPhotoSizes[customPhotoSizeIndex];
    const fr = customPhotoFrames[customPhotoFrameIndex];
    const finalPrice = sz.price + fr.price;

    const item = {
      id: `custom-photo-canvas-${Date.now()}`,
      name: `Custom Photo on Canvas (${sz.label})`,
      category: 'custom-canvas',
      price: finalPrice,
      originalPrice: Math.round(finalPrice * 1.4),
      quantity: 1,
      image: customPhotoPreview || '/images/canvas/seven-horses.jpg',
      specs: {
        dimensions: sz.label,
        frame: fr.label,
        canvasType: '380 GSM Cotton Canvas',
        note: 'High-Res Photo Uploaded'
      }
    };
    onAddToCart(item);
  };

  // Filtered artworks
  const filteredPaintings = CANVAS_PAINTINGS.filter((p) => {
    const matchesCategory = selectedTheme === 'all' || p.theme === selectedTheme;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kicker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="paintings-section" className="py-20 md:py-28 bg-[#000000] text-white select-none border-b border-[#222225]">
      <div className="max-w-[1180px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f56300]/15 border border-[#f56300]/30 text-[#f56300] text-xs font-semibold">
              <Palette className="w-3.5 h-3.5" /> GICLÉE CANVAS PAINTINGS & ART ({CANVAS_PAINTINGS.length}+ ARTWORKS)
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight apple-text-headline">
              Museum Canvas Prints.
            </h2>
            <p className="text-sm text-[#86868b] max-w-xl">
              380 GSM 100% Pure Virgin Cotton Canvas. 12-Color archival HDR Giclée print on seasoned European Pinewood frames. 100+ years fade-proof.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#86868b]">
            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <Award className="w-4 h-4" />
              <span>380 GSM Pure Cotton</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#2997ff] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100-Yr Fade Proof</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#222225]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {CANVAS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playClickSound(); setSelectedTheme(cat.id); }}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedTheme === cat.id
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-[#141416] border border-[#262629] text-[#86868b] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search paintings (e.g. Shiva, Horses, Gold)..."
              className="w-full pl-9 pr-4 py-2 bg-[#121214] border border-[#262629] rounded-full text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#2997ff] transition-all"
            />
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPaintings.map((painting) => {
            const state = customStates[painting.id] || { sizeIndex: 2, frameIndex: 0 };
            const selectedSize = painting.sizes[state.sizeIndex];
            const selectedFrame = painting.frames[state.frameIndex];
            const currentPrice = selectedSize.price + selectedFrame.price;
            const isAdded = addedIds[painting.id];

            return (
              <div
                key={painting.id}
                className="apple-card p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Top Info */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#f56300] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f56300]/10 border border-[#f56300]/20">
                      {painting.kicker}
                    </span>
                    <span className="text-[10px] text-[#86868b] font-mono">380 GSM Cotton Canvas</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {painting.name}
                  </h3>
                  <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
                    {painting.description}
                  </p>
                </div>

                {/* REAL HIGH-RES CANVAS PHOTO */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-[#0c0d12] border border-[#222225] overflow-hidden mb-4 select-none group/photo cursor-pointer">
                  <img
                    src={painting.image}
                    alt={painting.name}
                    onClick={() => { playClickSound(); setSelectedPhotoModal(painting); }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Zoom Fullscreen Trigger Pill */}
                  <button
                    onClick={() => { playClickSound(); setSelectedPhotoModal(painting); }}
                    className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] text-white flex items-center gap-1 opacity-0 group-hover/photo:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-3 h-3 text-[#2997ff]" />
                    <span>View HD Canvas</span>
                  </button>

                  {/* Dimension Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-white font-mono font-semibold">
                    {selectedSize.label}
                  </div>

                  {/* Frame Tag */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-[#a1a1a6]">
                    {selectedFrame.label.split('(')[0]}
                  </div>
                </div>

                {/* Size Selector Tabs */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">
                    Choose Dimension:
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {painting.sizes.map((sz, idx) => (
                      <button
                        key={sz.id}
                        onClick={() => handleSizeChange(painting.id, idx)}
                        className={`py-1 px-1 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer ${
                          state.sizeIndex === idx
                            ? 'bg-white text-slate-950 font-bold border-white shadow-sm'
                            : 'bg-[#121214] text-[#86868b] border-[#222225] hover:text-white'
                        }`}
                      >
                        {sz.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frame Style Selector */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">
                    Choose Framing:
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {painting.frames.map((fr, idx) => (
                      <button
                        key={fr.id}
                        onClick={() => handleFrameChange(painting.id, idx)}
                        className={`py-1 px-1 rounded-lg text-[9px] font-medium border text-center truncate transition-all cursor-pointer ${
                          state.frameIndex === idx
                            ? 'bg-white text-slate-950 font-bold border-white'
                            : 'bg-[#121214] text-[#86868b] border-[#222225] hover:text-white'
                        }`}
                        title={fr.label}
                      >
                        {idx === 0 ? 'Gallery Wrap' : idx === 1 ? 'Black Frame' : 'Gold Frame'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & Buy Button */}
                <div className="pt-3.5 border-t border-[#222225] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#86868b] block">Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-white">
                        {formatPrice(currentPrice, selectedCurrency)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(painting)}
                    className={`apple-btn-primary py-2 px-4 text-xs font-semibold cursor-pointer ${
                      isAdded ? 'bg-emerald-600' : ''
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                        <span>Buy Canvas</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* CUSTOM PHOTO ON CANVAS INTERACTIVE UPLOADER BANNER */}
        <div className="apple-card p-8 sm:p-12 border border-[#2d2d30] relative overflow-hidden bg-gradient-to-b from-[#161618] to-[#0f0f10]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> CUSTOM CANVAS STUDIO
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
                Turn Your Favorite Memory Into a Luxury Canvas.
              </h3>

              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                Upload your wedding portraits, family photos, travel snapshots, or digital artwork. Our studio artists optimize your resolution for 300 DPI museum-grade print reproduction.
              </p>

              {/* Upload Input & Button */}
              <div className="pt-2">
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={handleUploadPhoto}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="apple-btn-primary px-6 py-3 text-xs font-semibold cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{customPhotoFile ? 'Change Photo' : 'Upload Your High-Res Photo'}</span>
                </button>
                {customPhotoFile && (
                  <p className="text-xs text-emerald-400 mt-2 font-medium">
                    ✓ Selected: {customPhotoFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Right Interactive Configurator */}
            <div className="lg:col-span-6 bg-[#111113] p-6 rounded-2xl border border-[#222225] space-y-4 text-xs">
              
              {/* Photo Preview Stage */}
              <div className="h-44 rounded-xl border border-[#2d2d30] bg-black overflow-hidden flex items-center justify-center relative">
                {customPhotoPreview ? (
                  <img
                    src={customPhotoPreview}
                    alt="Custom Canvas"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-[#86868b] space-y-2 p-4">
                    <Upload className="w-8 h-8 mx-auto text-[#2997ff]/60" />
                    <span>Upload your photo above to preview on canvas</span>
                  </div>
                )}
                
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] text-white">
                  380 GSM Cotton Canvas
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <span className="font-semibold text-[#86868b] uppercase tracking-wider block mb-1.5">
                  Select Dimension:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {customPhotoSizes.map((s, idx) => (
                    <button
                      key={s.label}
                      onClick={() => setCustomPhotoSizeIndex(idx)}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        customPhotoSizeIndex === idx
                          ? 'bg-[#1f1f25] border-white text-white shadow-sm'
                          : 'bg-[#141416] border-[#222225] text-[#86868b]'
                      }`}
                    >
                      <div className="font-semibold">{s.label}</div>
                      <div className="text-[10px] text-[#2997ff] font-mono">{formatPrice(s.price, selectedCurrency)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#222225] flex items-center justify-between">
                <div>
                  <span className="text-[#86868b] text-[11px] block">Total Canvas Price</span>
                  <div className="text-xl font-semibold text-white">
                    {formatPrice(customPhotoSizes[customPhotoSizeIndex].price, selectedCurrency)}
                  </div>
                </div>

                <button
                  onClick={handleBuyCustomPhoto}
                  className="apple-btn-primary py-2.5 px-5 text-xs font-semibold cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                  <span>Order Custom Canvas</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* FULLSCREEN HD CANVAS LIGHTBOX MODAL */}
      {selectedPhotoModal && (
        <div 
          onClick={() => setSelectedPhotoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#161617] border border-[#2d2d30] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="relative h-[450px] sm:h-[550px] w-full bg-black">
              <img
                src={selectedPhotoModal.image}
                alt={selectedPhotoModal.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 bg-[#121214] flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">{selectedPhotoModal.name}</h4>
                <p className="text-xs text-[#86868b]">380 GSM Cotton Canvas • 100+ Years Fade-Proof • Hand-Stretched Pinewood Frame</p>
              </div>

              <button
                onClick={() => {
                  handleBuy(selectedPhotoModal);
                  setSelectedPhotoModal(null);
                }}
                className="apple-btn-primary py-2.5 px-5 text-xs font-semibold cursor-pointer"
              >
                Buy for {formatPrice(selectedPhotoModal.priceINR, selectedCurrency)}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
