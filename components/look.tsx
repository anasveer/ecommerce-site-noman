import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const SanctuaryLookbook = () => {
  return (
    <section className="py-35 sm:py-24 bg-[#0a0f1d] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#d4af37] text-xs font-black tracking-[0.5em] uppercase opacity-80">
            Visual Immersion
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
            The Sanctuary <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f1d592] italic font-serif">Lookbook</span>
          </h2>
        </div>

        {/* Main Composition */}
        <div className="relative group">
          {/* Main Hero Image */}
          <div className="relative z-10 rounded-[48px] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] aspect-[16/14] sm:aspect-[16/7]">
            <img 
              src="/look.png" 
              alt="Luxury Bedroom Sanctuary" 
              className="w-full h-[500px] object-cover transition-transform duration-[2000ms] "
            />
            {/* Darkening Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-1000"></div>
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Hotspot 1 - Bed */}
            <div className="absolute top-[68%] left-[41%] pointer-events-auto">
              <div className="relative">
                <div className="w-4 h-4 bg-[#d4af37] rounded-full animate-ping absolute inset-0 opacity-75"></div>
                <div className="w-4 h-4 bg-[#d4af37] rounded-full border-2 border-white shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10"></div>
              </div>
            </div>

            {/* Hotspot 2 - Window/View */}
            <div className="absolute top-[54%] left-[60%] pointer-events-auto">
              <div className="relative">
                <div className="w-4 h-4 bg-[#d4af37] rounded-full animate-ping absolute inset-0 opacity-75"></div>
                <div className="w-4 h-4 bg-[#d4af37] rounded-full border-2 border-white shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10"></div>
              </div>
            </div>
          </div>

          {/* Floating Shop Card - Overlap Effect for Mobile */}
<div className="absolute bottom-[-50] right-4 translate-y-1/2 sm:translate-y-0 sm:bottom-12 sm:right-12 z-30 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-[calc(100%-2rem)] sm:w-[380px]">
  <div className="bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card hover:bg-[#0f172a] transition-all duration-500">
    <h3 className="text-xl sm:text-3xl font-black text-white mb-2 sm:mb-4 tracking-tight leading-tight">Shop The Scene</h3>
    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-6 sm:mb-10 font-medium opacity-90">
      Experience the ultimate harmony of digital precision and artisanal comfort.
    </p>
    
    <Link href="/category/bedsheet/comforter-set" className="block w-full">
      <button className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-3 bg-transparent border border-[#d4af37]/30 px-6 py-4 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 hover:border-[#d4af37]">
        <span className="relative z-10 text-[#d4af37] group-hover/btn:text-[#0a0f1d] font-black uppercase tracking-[0.2em] text-[12px] sm:text-[14px] transition-colors duration-500">
          View Sets
        </span>
        <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
      </button>
    </Link>
  </div>
</div>

          {/* Background Decorative Glow */}
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[160px] rounded-full z-0"></div>
        </div>

      </div>
    </section>
  );
};

export default SanctuaryLookbook;