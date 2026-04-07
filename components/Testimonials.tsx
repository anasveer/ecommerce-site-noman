'use client';
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Khan",
      rating: 5,
      content: "The 3pcs bedsheet set from Hania Textile is absolutely amazing! The quality is top-notch and the colors are vibrant. Highly recommend!"
    },
    {
      name: "Fatima Ali",
      rating: 5,
      content: "I love the comforter set. It's so cozy and warm. Perfect for our Pakistani winters. The fabric feels premium."
    },
    {
      name: "Muhammad Rizwan",
      rating: 4,
      content: "The single pair bedsheet is exactly what I needed. Good quality and affordable. Will buy again."
    },
    {
      name: "Ayesha Noor",
      rating: 5,
      content: "Hania Textile's 3pcs bedsheet has transformed our bedroom. The stitching is perfect and it's very durable."
    },
    {
      name: "Imran Hussain",
      rating: 5,
      content: "The comforter set is luxurious. Soft, comfortable, and the design is beautiful. Great value for money."
    },
    {
      name: "Zara Iqbal",
      rating: 4,
      content: "Bought the single pair bedsheet for my guest room. Looks elegant and the material is high quality."
    },
    {
      name: "Bilal Ahmed",
      rating: 5,
      content: "Excellent 3pcs bedsheet. The fit is perfect and the colors don't fade. Hania Textile is my go-to brand now."
    },
    {
      name: "Sadia Khan",
      rating: 5,
      content: "The comforter set keeps us warm all night. Ethical sourcing and premium quality. Love it!"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#f4e4bc] to-[#d4af37] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-[#0a0f1d] mb-12">What Our Customers Say</h2>
        
        {/* Main Wrapper */}
        <div className="relative flex overflow-hidden group">
          {/* Scrolling Container */}
          <div className="flex animate-scroll whitespace-nowrap group-hover:pause-animation">
            {/* Duplicate the array to ensure seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index} 
                className="inline-block w-[280px] sm:w-[350px] mx-4 bg-white rounded-lg shadow-lg p-6 whitespace-normal align-top"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-900 mb-4 text-sm sm:text-base">
                  "{testimonial.content}"
                </p>
                <p className="font-bold text-[#0a0f1d] text-right">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Transform exactly half of the total duplicated width */
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        /* Mobile par animation smooth rakhne ke liye pause on hover (optional) */
        .pause-animation:hover {
          animation-play-state: paused;
        }
        
        /* Mobile specific speed adjustment */
        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 50s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;