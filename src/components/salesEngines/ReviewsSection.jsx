import React from 'react';
import { Star, CheckCircle2, ShieldCheck, Zap, Heart, MapPin } from 'lucide-react';
import { REVIEWS, TRUST_STATS } from '../../data/reviews';

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      
      {/* Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
        {TRUST_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0b0e17] border border-slate-800/80 text-center shadow-lg flex flex-col items-center justify-center space-y-1 group hover:border-pink-500/40 transition-colors"
          >
            <span className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" /> 100% VERIFIED CUSTOMER REVIEWS
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
          LOVED BY <span className="text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-pink-400 bg-clip-text">CREATORS, FOUNDERS & HOMES</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Read unfiltered stories from verified owners across India who transformed their walls with Neocraft.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#0c0f1a] border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Top Star Rating & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500">{rev.date}</span>
              </div>

              {/* Review Title & Content */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                "{rev.title}"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {rev.content}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  {rev.image}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{rev.role}</div>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-500 hidden sm:block">
                <MapPin className="w-3 h-3 text-pink-400 inline mr-0.5" />
                <span>{rev.location}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
