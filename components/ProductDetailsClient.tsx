'use client';

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Truck, RefreshCcw, ChevronDown } from "lucide-react";

interface ProductDetailsClientProps {
  product: {
    _id: string;
    slug: string;
    title: string;
    price: number;
    barcode: string;
    kg?: number;
    images: { url: string }[];
    mainCategory?: string;
    subCategory?: string;
  };
  relatedColors: Array<{ _id: string; slug: string; images: { url: string }[] }>;
  content: {
    fabric: string;
    note: string;
    details: string[];
  } | null;
}

export default function ProductDetailsClient({ product, relatedColors, content }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart, items } = useCart();

  const faqs = [
    {
      icon: <Truck className="w-5 h-5 text-[#1EBD87]" />,
      question: "Shipping Policy",
      answer: "Shipping charged per kg with fast and reliable delivery options."
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-[#1EBD87]" />,
      question: "Return & Refund Policy",
      answer: "7-day refund and exchange policy with quality guarantee."
    }
  ];

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images?.[0]?.url || "",
      quantity,
      barcode: product.barcode,
      mainCategory: product.mainCategory || undefined,
      subCategory: product.subCategory || undefined,
      kg: product.kg ?? 1,
    };
    
    console.log('🛒 Adding to cart:', { title: product.title, productKg: product.kg, cartItemKg: cartItem.kg });
    
    addToCart(cartItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="min-h-screen py-16 bg-white text-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
       <div className="relative h-[300px] sm:h-[420px] md:h-[500px]">
  <img
    src={product.images?.[0]?.url}
    alt={product.title}
    className="w-full h-full object-contain"
  />
</div>

        <div className="space-y-5">
          <span className="text-[#1EBD87] text-xs font-bold tracking-widest uppercase bg-[#1EBD87]/10 px-3 py-1 rounded-full">
            Code: {product.barcode}
          </span>
          <h1 className="text-4xl font-extrabold mt-5 text-gray-800">{product.title}</h1>
          <p className="text-3xl font-bold text-[#1EBD87]">Rs. {product.price}</p>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                className="w-10 h-10 bg-gray-100 rounded-full text-xl flex items-center justify-center hover:bg-gray-200 text-gray-800"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity((qty) => qty + 1)}
                className="w-10 h-10 bg-gray-100 rounded-full text-xl flex items-center justify-center hover:bg-gray-200 text-gray-800"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {relatedColors.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase italic">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                <div className="w-16 h-16 rounded-xl border-2 border-[#1EBD87] overflow-hidden p-0.5">
                  <img src={product.images?.[0]?.url} className="w-full h-full object-cover rounded-lg opacity-40" />
                </div>
                {relatedColors.map((color) => (
                  <Link key={color._id} href={`/products/${color.slug}`} className="block">
                    <div className="w-16 h-16 rounded-xl border border-gray-200 hover:border-[#1EBD87] transition-all overflow-hidden cursor-pointer">
                      <img src={color.images?.[0]?.url} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ))}
                {product.subCategory && (
                  <Link href={`/category/bedsheet/${product.subCategory}`} className="block">
                    <div className="w-16 h-16 rounded-xl border border-dashed border-gray-300 hover:border-[#1EBD87] bg-gray-50 flex flex-col items-center justify-center transition-all cursor-pointer group">
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#1EBD87] uppercase text-center leading-tight">
                        View<br/>More
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#1EBD87] text-white h-14 rounded-2xl font-bold hover:bg-[#17a876] hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </div>
            </button>
            <button
              onClick={() => {
                const message = `Hi, I want to order: ${product.title} - Image: ${product.images?.[0]?.url} - ${window.location.href}`;
                window.open(`https://wa.me/923290135661?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex-1 h-14 rounded-2xl font-bold bg-white border border-[#1EBD87] text-[#1EBD87] hover:border-[#1EBD87] hover:text-[#1EBD87] transition-all duration-300"
            >
              WhatsApp Order
            </button>
          </div>

          {added && (
            <div className="text-[#1EBD87] font-semibold pt-2">Added to cart (x{quantity})</div>
          )}

          {items.length > 0 && (
            <Link href="/cart">
              <button className="relative overflow-hidden w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white h-14 rounded-2xl font-bold hover:scale-[1.02] transition-all mt-4">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_ease-in-out_infinite]"></span>
                <span className="relative z-10">View Cart</span>
              </button>
            </Link>
          )}

          {content && (
            <div className="mt-8 p-6 bg-white border border-[#1EBD87]/20 shadow-[0_8px_30px_rgba(30,189,135,0.1)] rounded-3xl">
              <h3 className="font-bold text-[#1EBD87] mb-3">Product Specifications:</h3>
              <p className="text-sm mb-2 text-gray-700"><strong>Fabric:</strong> {content.fabric}</p>
              <p className="text-[#1EBD87] text-sm font-medium mb-4 italic">{content.note}</p>
              <ul className="text-gray-500 text-sm space-y-1">
                {content.details.map((d, i) => <li key={i}>• {d}</li>)}
              </ul>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-4 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#1EBD87]/20 rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(30,189,135,0.08)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#1EBD87]/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {faq.icon}
                    <span className="font-semibold text-gray-800 text-sm">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#1EBD87] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-5 py-4 text-sm text-gray-500 border-t border-[#1EBD87]/10 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}