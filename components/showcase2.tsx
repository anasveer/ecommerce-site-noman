import React from 'react';

const QualityShowcase = () => {
  const qualities = [
    {
      title: "Premium Cotton",
      description: "1000+ thread count Egyptian cotton that breathes with you, ensuring a cool and restful sleep every single night.",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
        </svg>
      ),
      color: "bg-[#1EBD87]"
    },
    {
      title: "Soft Velour",
      description: "Our signature velvet finish provides a majestic touch and deep sheen that transforms any bedroom into a palace suite.",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "bg-[#1EBD87]/80"
    },
    {
     title: "Durable Cotton",
  description: "High-quality cotton fibers engineered for strength and breathability, offering long-lasting comfort and softness for everyday use.",
      icon: (
        <svg className="w-6 h-6 text-[#1EBD87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "border border-[#1EBD87]/30 bg-[#1EBD87]/10"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Double Image Overlay Style */}
          <div className="flex-1 relative w-full max-w-xl">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#1EBD87]/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 rounded-[40px] overflow-hidden border border-gray-200 shadow-xl h-[380px] lg:h-[500px]">
              <img 
                src="/s3.png" 
                alt="Main Fabric" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-10 -left-10 z-20 w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
              <img 
                src="/s4.png" 
                alt="Fabric Detail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Right: Content Section */}
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <span className="text-[#1EBD87] text-xs font-bold tracking-[0.4em] uppercase">3D Crystal Cotton Premium</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                Single Pair Bedsheet <br />
                <span className="text-[#1EBD87]">
                  Elite Comfort & Crystal Softness
                </span>
              </h2>
              <p className="text-gray-500 max-w-lg">
                Engineered with modern 3D crystallization technology, this fine cotton blend delivers a luminous texture.
              </p>
            </div>

            <div className="space-y-8">
              {qualities.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className={`flex-shrink-0 w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}>
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-gray-800 font-bold text-xl">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QualityShowcase;