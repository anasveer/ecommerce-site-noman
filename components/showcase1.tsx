import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

const CategoryShowcase = () => {
  const categories = [
    {
      title: "Elegant Comfort",
      subtitle: "EXCLUSIVE ARTISTRY",
      description: "Experience the pinnacle of relaxation with our premium comforter sets, meticulously crafted for the modern home",
      buttonText: "View Comforter Sets",
      image: "/s1.png",
      tag: "Premium",
      link: "/category/bedsheet/comforter-set"
    },
    {
      title: "Royal Drape",
      subtitle: "SIGNATURE SERIES",
      description: "Intricate patterns meet superior thread counts. Transform your bedroom into a masterpiece of comfort",
      buttonText: "View Comforter Sets",
      image: "/s2.png",
      tag: "Premium",
      link: "/category/bedsheet/comforter-set"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f1d]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e8b2] to-[#b08c2e]">Premium Comforter Sets</h2>
          <p className="text-gray-400 mt-2 max-w-2xl">Discover premium comforter sets and bedding collections designed for luxury, quality, and modern style.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="group relative h-[500px] rounded-[40px] overflow-hidden border border-gray-800 hover:border-[#d4af37]/50 transition-all duration-700 shadow-2xl"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-fit transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/40 to-transparent"></div>
              </div>

              {/* Content Container */}
              <div className="relative h-full p-10 flex flex-col justify-end items-start text-white">
                <span className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase mb-2 opacity-80">
                  {cat.subtitle}
                </span>
                
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="text-5xl font-extrabold tracking-tighter">
                    {cat.title.split(' ')[0]} <span className="text-[#d4af37] font-light italic">{cat.title.split(' ')[1]}</span>
                  </h2>
                </div>

                <p className="text-gray-300 text-lg max-w-sm mb-8 leading-relaxed  group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {cat.description}
                </p>

                <Link href={cat.link} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-[#d4af37] hover:text-[#0a0f1d] hover:border-[#d4af37] transition-all duration-300 shadow-lg group/btn">
                  {cat.buttonText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </Link>

                {/* Floating 3D Tag Effect */}
                <div className="absolute top-10 right-10 flex flex-col items-end">
                   <div className="bg-[#d4af37]/10 backdrop-blur-xl border border-[#d4af37]/30 text-[#d4af37] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      {cat.tag}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;