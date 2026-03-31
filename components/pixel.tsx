import React from 'react';

const PixelToPetal = () => {
  const steps = [
    {
      number: "01",
      title: "Ultra-High Scan Resolution",
      description: "We begin by digitally capturing hand-painted artworks at 2400 DPI, preserving every whisper of the artist's brush."
    },
    {
      number: "02",
      title: "Nano-Ink Infusion",
      description: "Environmentally certified inks are microscopically infused into the cotton fibers, ensuring vibrant color that becomes part of the fabric itself."
    },
    {
      number: "03",
      title: "Therapeutic Finishing",
      description: "Each piece is steam-cured and silk-softened to maintain Universal Bedding's signature tactile luxury."
    }
  ];

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image Composition Section */}
          <div className="flex-1 relative w-full max-w-[500px] aspect-square lg:aspect-auto h-[500px]">
            
            {/* Background Image (The Fabric Pattern) */}
            <div className="absolute top-0 right-0 w-[50%] aspect-square rounded-[30px] overflow-hidden shadow-2xl z-0">
              <img 
                src="/pixel2.png" // Replace with your fabric image
                alt="Fabric Detail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Image (The UI/Software Preview) */}
            <div className="absolute bottom-10 left-0 w-[55%] aspect-square rounded-[30px] overflow-hidden shadow-2xl z-10 border border-white/5">
              <img 
                src="/pixel1.png" // Replace with your UI image
                alt="Software Interface"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Glass Box (The 16.7M stat) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 
                            w-[220px] py-8 px-6 rounded-3xl 
                            bg-white/10 backdrop-blur-xl border border-white/20 
                            shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center">
              <h4 className="text-[#d4af37] text-4xl font-bold tracking-tight">16.7M</h4>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold mt-2 leading-tight">
                Colors Per <br /> Square Inch
              </p>
            </div>
          </div>

          {/* Right: Text Content Section */}
          <div className="flex-1 space-y-12">
            <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e8b2] to-[#b08c2e] leading-tight">
              From Pixel <br />
              to <span className="text-gray-400">Petal</span>
            </h2>

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl border border-[#d4af37]/30 flex items-center justify-center
                                  text-[#d4af37] font-serif italic text-xl group-hover:bg-[#d4af37]/10 transition-colors">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step Info */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm max-w-md">
                      {step.description}
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

export default PixelToPetal;