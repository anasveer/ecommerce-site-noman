import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const FabricShowcaseDetail = () => {
  return (
    <section className="py-24 bg-[#0a0f1d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content Section */}
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              The Luxury of <br />
              <span className="text-[#d4af37] italic">Crystal Cotton</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Our premium Crystal Cotton is crafted with fine long-staple fibers, providing an unmatched softness and a luxurious feel. This fabric is designed for those who seek ultimate comfort, breathability, and lasting durability, perfect for a 3-piece bedsheet set that exudes elegance and sophistication.
            </p>

            <ul className="space-y-4">
              {[
                "Luxurious Softness",
                "Breathable and Moisture-Wicking",
                "Perfect for All Seasons",
                "Gets Softer with Every Wash",
                "Highly Durable & Long-lasting"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-200 font-medium group">
                  <div className="bg-[#d4af37]/20 p-1 rounded-full group-hover:bg-[#d4af37] transition-colors duration-300">
                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] group-hover:text-[#0a0f1d]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a 
                href="category/bedsheet/3pcs-bedsheet" 
                className="text-[#d4af37] font-bold text-sm uppercase tracking-widest border-b-2 border-[#d4af37]/30 hover:border-[#d4af37] pb-1 transition-all"
              >
                Learn more about Crystal Cotton
              </a>
            </div>
          </div>

          {/* Right: Image Section with Luxury Border */}
          <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-1000">
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-[#d4af37]/5 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-gray-800 shadow-2xl group">
              <img 
                src="/s5.png" 
                alt="Crystal Cotton 3 Pcs Bedsheet" 
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/20 to-transparent"></div>
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-6 -right-6 bg-gray-900 border border-gray-800 p-6 rounded-3xl shadow-2xl  z-20">
               <span className="text-[#d4af37] block font-black text-2xl">100%</span>
               <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">Pure Crystal Cotton</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FabricShowcaseDetail;