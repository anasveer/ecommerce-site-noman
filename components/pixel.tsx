import React from 'react';

const DigitalArtistryShowcase = () => {
  const steps = [
    {
      number: "01",
      title: "Premium Fabric Selection",
      description: "We carefully select the finest cotton and blends, ensuring softness, durability, and breathability for ultimate comfort and satisfaction."
    },
    {
      number: "02",
      title: "Precision Cutting & Sewing",
      description: "Expert artisans use advanced machinery for perfect cuts and reinforced stitching, guaranteeing longevity and a flawless fit on your bed."
    },
    {
      number: "03",
      title: "Quality Control & Finishing",
      description: "Each bedsheet undergoes rigorous testing for colorfastness, shrinkage resistance, and comfort, ensuring you get premium quality that lasts."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image Composition Section */}
          <div className="flex-1 relative w-full max-w-[500px] aspect-square lg:aspect-auto h-[500px]">
            
            <div className="absolute top-0 right-0 w-[50%] aspect-square rounded-[30px] overflow-hidden shadow-xl z-0">
              <img 
                src="/pixel2.png"
                alt="Fabric Detail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 left-0 w-[55%] aspect-square rounded-[30px] overflow-hidden shadow-xl z-10 border border-gray-100">
              <img 
                src="/pixel1.png"
                alt="Software Interface"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                            w-[220px] py-8 px-6 rounded-3xl
                            bg-white border border-gray-200
                            shadow-[0_20px_50px_rgba(30,189,135,0.12)] text-center">
              <h4 className="text-[#1EBD87] text-4xl font-bold tracking-tight">16.7M</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-2 leading-tight">
                Colors Per <br /> Square Inch
              </p>
            </div>
          </div>

          {/* Right: Text Content Section */}
          <div className="flex-1 space-y-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Crafting Excellence <br />
              in Every <span className="text-[#1EBD87]">Bedsheet</span>
            </h2>

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl border border-[#1EBD87]/30 flex items-center justify-center
                                  text-[#1EBD87] font-serif italic text-xl group-hover:bg-[#1EBD87]/10 transition-colors">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xl font-bold text-gray-800 tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm max-w-md">
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

export default DigitalArtistryShowcase;