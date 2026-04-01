// components/WhatsAppFloat.tsx
'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const phoneNumber = "923218719472"; 
  const message = "Hi, I'm interested in your products!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] group"
    >
      {/* Tooltip (Hover par dikhega) */}
      <span className="absolute right-16 bottom-2 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-100">
        Chat with us! 💬
      </span>

      {/* Main Icon Container with Animation */}
      <div className="bg-[#25D366] p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] text-white hover:scale-110 transition-transform duration-300 animate-bounce-slow">
        <MessageCircle size={32} fill="currentColor" className="text-white" />
      </div>

      {/* Background Pulse Effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 -z-10"></div>
    </a>
  );
}