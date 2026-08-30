import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  Layers, 
  ArrowRight,
  Filter
} from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../../data/products';
import { playClickSound } from '../../audio/soundEffects';

export default function ProductCatalog({
  selectedCurrency = 'INR',
  onSelectProduct,
  onAddToCart,
  onOpenVisualizer,
  onOpenStudio
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> CURATED SIGNATURE COLLECTION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            EXPLORE ALL <span className="text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 bg-clip-text">NEOCRAFT DESIGNS</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
            From iconic Instagram photo backdrops to 3D architectural storefront letters and sound-absorbing acoustic art.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wings, bar, anime, metal..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills & Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
        
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { playClickSound(); setSelectedCategory(cat.id); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end lg:self-auto text-xs text-slate-400 font-medium">
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => { playClickSound(); setSortBy(e.target.value); }}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-pink-500 cursor-pointer"
          >
            <option value="featured">Featured / Best Match</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Special Promo Card: Live Custom Studio Entry */}
        <div 
          onClick={() => { playClickSound(); onOpenStudio(); }}
          className="relative rounded-2xl bg-gradient-to-br from-pink-950/30 via-purple-950/20 to-cyan-950/30 border border-pink-500/40 p-6 flex flex-col justify-between overflow-hidden shadow-2xl group cursor-pointer hover:border-pink-400 transition-all transform hover:-translate-y-1"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-black uppercase mb-3">
              <Sparkles className="w-3 h-3" /> Live 3D Customizer
            </div>
            <h3 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Can't Find Your Dream Sign?
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Build your custom name, business logo, or wedding quote in real-time with 24+ fonts and 18+ neon colors.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-pink-300">Launch Custom Studio</span>
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Catalog Products */}
        {filteredProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            selectedCurrency={selectedCurrency}
            onSelectProduct={onSelectProduct}
            onAddToCart={onAddToCart}
            onOpenVisualizer={onOpenVisualizer}
          />
        ))}

      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No neon signs found matching "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-cyan-400 hover:underline text-xs font-bold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
}
