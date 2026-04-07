import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  const phoneNumber = "923290135661"; 
  const message = "Hi, I'm interested in your products!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="bg-[#0a0f1d] border-t border-gray-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Universal Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight uppercase">
                Universal <span className="text-[#d4af37]">Bedding</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">Crafting elegance for the modern home since 2022. We specialize in luxury bedding that combines traditional craftsmanship with contemporary design.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-[#d4af37] transition-all"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-[#d4af37] transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-[#d4af37] transition-all"><Twitter size={20} /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-[#d4af37] transition-all"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/category/bedsheet/3pcs-bedsheet" className="hover:text-[#d4af37]">3pcs Bedsheet</a></li>
              <li><a href="/category/bedsheet/comforter-set" className="hover:text-[#d4af37]">Comforter Set</a></li>
              <li><a href="/category/bedsheet/single-pair-bedsheet" className="hover:text-[#d4af37]">Single Pair Bedsheet</a></li>
              <li><a href="/my-orders" className="hover:text-[#d4af37]">My Order</a></li>
            </ul>
          </div>

          

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <p className="text-gray-400 text-sm mb-4">Get in touch with us via WhatsApp for quick support and inquiries.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#d4af37] text-[#0a0f1d] px-4 py-2 rounded-lg font-bold inline-flex items-center gap-2">
              <MessageCircle size={20} /> Contact on WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          <p>© 2022 Universal Premium Bedding. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;