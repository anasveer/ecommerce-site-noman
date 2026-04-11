import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const SanctuaryLookbook = () => {
  return (
    <section className="py-35 sm:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#1EBD87] text-xs font-black tracking-[0.5em] uppercase opacity-80">
            Visual Immersion
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tighter">
            The Sanctuary <span className="text-[#1EBD87] italic font-serif">Lookbook</span>
          </h2>
        </div>

        {/* Main Composition */}
        <div className="relative group">
          {/* Main Hero Image */}
          <div className="relative z-10 rounded-[48px] overflow-hidden border border-gray-200 shadow-[0_40px_100px_rgba(0,0,0,0.1)] aspect-[16/14] sm:aspect-[16/7]">
            <img 
              src="/look.png" 
              alt="Luxury Bedroom Sanctuary" 
              className="w-full h-[500px] object-cover transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-1000"></div>
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-[68%] left-[41%] pointer-events-auto">
              <div className="relative">
                <div className="w-4 h-4 bg-[#1EBD87] rounded-full animate-ping absolute inset-0 opacity-75"></div>
                <div className="w-4 h-4 bg-[#1EBD87] rounded-full border-2 border-white shadow-[0_0_15px_rgba(30,189,135,0.8)] relative z-10"></div>
              </div>
            </div>

            <div className="absolute top-[54%] left-[60%] pointer-events-auto">
              <div className="relative">
                <div className="w-4 h-4 bg-[#1EBD87] rounded-full animate-ping absolute inset-0 opacity-75"></div>
                <div className="w-4 h-4 bg-[#1EBD87] rounded-full border-2 border-white shadow-[0_0_15px_rgba(30,189,135,0.8)] relative z-10"></div>
              </div>
            </div>
          </div>

          {/* Floating Shop Card */}
          <div className="absolute bottom-[-50] right-4 translate-y-1/2 sm:translate-y-0 sm:bottom-12 sm:right-12 z-30 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-[calc(100%-2rem)] sm:w-[380px] hidden sm:block">
            <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] shadow-[0_20px_50px_rgba(30,189,135,0.1)] group/card hover:shadow-[0_20px_50px_rgba(30,189,135,0.2)] transition-all duration-500">
              <h3 className="text-xl sm:text-3xl font-black text-gray-800 mb-2 sm:mb-4 tracking-tight leading-tight">Shop The Scene</h3>
              <p className="text-gray-500 leading-relaxed text-xs sm:text-sm mb-6 sm:mb-10 font-medium">
                Experience the ultimate harmony of digital precision and artisanal comfort.
              </p>
              
              <Link href="/category/bedsheet/comforter-set" className="block w-full">
                <button className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-3 bg-transparent border border-[#1EBD87]/40 px-6 py-4 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 hover:border-[#1EBD87]">
                  <span className="relative z-10 text-[#1EBD87] group-hover/btn:text-white font-black uppercase tracking-[0.2em] text-[12px] sm:text-[14px] transition-colors duration-500">
                    View Sets
                  </span>
                  <div className="absolute inset-0 bg-[#1EBD87] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Background Decorative Glow */}
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#1EBD87]/5 blur-[160px] rounded-full z-0"></div>
        </div>

      </div>
    </section>
  );
};

export default SanctuaryLookbook;