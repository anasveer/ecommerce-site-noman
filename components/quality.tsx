import React from 'react';
import { Truck, ShieldCheck, Leaf, Headphones } from 'lucide-react';

const Features = () => {
  const featureList = [
    {
      icon: <Truck className="w-10 h-10 text-[#d4af37]" />,
      title: "Express Shipping",
      description: "Shipping charged per kg with fast and reliable delivery options."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#d4af37]" />,
      title: "Refund & Quality Guarantee",
      description: "7-day refund and exchange policy with 2-month quality guarantee."
    },
    {
      icon: <Leaf className="w-10 h-10 text-[#d4af37]" />,
      title: "Ethically Sourced",
      description: "All our fabrics are harvested from sustainable and fair-trade farms."
    },
    {
      icon: <Headphones className="w-10 h-10 text-[#d4af37]" />,
      title: "24/7 Premium Support",
      description: "Dedicated concierge service for all your inquiries."
    }
  ];

  return (
    <section className="py-20  bg-[#0a0f1d] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {featureList.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 group">
              <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800 group-hover:border-[#d4af37]/50 transition-all shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;