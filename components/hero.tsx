'use client';

import React, { useEffect, useState } from 'react';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2071',
    alt: 'Luxury Bedding 1',
  },
  {
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=2070',
    alt: 'Luxury Bedding 2',
  },
  {
    image:
      'hero1.jpg',
    alt: 'Luxury Bedding 3',
  },
];

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[65vh] md:h-[90vh] w-full overflow-hidden bg-[#0a0f1d] ">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105 ${
              activeSlide === index ? 'opacity-60' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent"></div>
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center mt-5">
        <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
         <span className="relative overflow-hidden inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#bf9b30] via-[#f5e8b2] to-[#bf9b30] text-[#423105] text-xs font-extrabold tracking-widest uppercase mb-4 border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
  {/* Shimmer Effect Layer */}
  <span className="animate-shine absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  
  {/* Text (Text ko relative rakha hai taakay shimmer iske neechay se guzray) */}
  <span className="relative z-10">New Arrival 2026</span>
</span>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Royal <span className="text-[#d4af37] italic">Silk</span> & <br /> Velvet Comfort
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
            Experience the ultimate in bedtime luxury with our handcrafted 3D-styled golden
            thread collections. Designed for those who seek perfection in every stitch.
          </p>

        </div>
      </div>

      {/* Optional dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              activeSlide === index ? 'bg-[#d4af37] w-8' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;