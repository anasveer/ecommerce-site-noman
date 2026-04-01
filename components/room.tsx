import React from 'react';

const ShopTheRoom = () => {
  return (
    <section className="py-12 md:py-24 bg-[#0a0f1d] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-white tracking-tight">
            Shop the <span className="text-[#d4af37] italic font-serif">Room</span>
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-start">
          
          {/* Main Hero Image (Left) */}
          <div className="col-span-2 relative group">
            {/* Height fix: aspect-video rakha hai container chota rakhne ke liye */}
            <div className="relative z-10 overflow-hidden border border-gray-800 shadow-2xl aspect-square md:aspect-video w-full bg-[#111827]">
              <img 
                src="/room1.png" 
                alt="Luxury Master Bedroom" 
                // "object-contain" se image crop nahi hogi, balki fit ho jayegi
                // Agar aap chahte hain ke fill kare toh "object-top" use karein taake oopar se crop na ho
                className="w-full h-full object-contain md:object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Hotspot */}
              <div className="absolute top-[60%] left-[35%] z-20">
                <div className="relative group/hotspot cursor-pointer">
                  <div className="w-2 h-2 md:w-4 md:h-4 bg-[#d4af37] rounded-full animate-ping absolute inset-0 opacity-75"></div>
                  <div className="w-2 h-2 md:w-4 md:h-4 bg-[#d4af37] rounded-full border border-white shadow-lg relative z-10"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Secondary Images) */}
          <div className="flex flex-col gap-3 md:gap-4">
            
            {/* Top Detail Image */}
            <div className="relative overflow-hidden border border-gray-800 shadow-xl aspect-square md:aspect-[6/3] group bg-[#111827]">
              <img 
                src="/room2.png" 
                alt="Fabric Detail" 
                className="w-full h-full object-contain md:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Detail Image */}
            <div className="relative overflow-hidden border border-gray-800 shadow-xl aspect-square md:aspect-[5/3] group bg-[#111827]">
              <img 
                src="/room3.jpeg" 
                alt="Lighting Accent" 
                className="w-full h-full object-contain md:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>

          </div>
        </div>

        {/* Action Button */}
       {/* Action Button Section */}
<div className="mt-8 md:mt-12 flex justify-center">
  {/* Yahan 'button' ko 'a' se replace kiya hai aur 'href' add kiya hai */}
  <a 
    href="/category/bedsheet/3pcs-bedsheet" 
    className="group relative overflow-hidden px-6 py-3 md:px-12 md:py-4 bg-transparent border border-[#d4af37]/30 text-[#d4af37] font-black rounded-xl md:rounded-2xl transition-all duration-500 hover:border-[#d4af37] uppercase tracking-widest text-[8px] md:text-[10px] inline-block"
  >
    <span className="relative z-10 group-hover:text-[#0a0f1d]">Shop Entire Scene</span>
    <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
  </a>
</div>
      </div>
    </section>
  );
};

export default ShopTheRoom;