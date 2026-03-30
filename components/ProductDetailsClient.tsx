'use client';

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductDetailsClientProps {
  product: {
    _id: string;
    slug: string;
    title: string;
    price: number;
    barcode: string;
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
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images?.[0]?.url || "",
      quantity,
      barcode: product.barcode,
      mainCategory: product.mainCategory || undefined,
      subCategory: product.subCategory || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section className="min-h-screen py-16 bg-[#0a0f1d] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl border border-gray-800 overflow-hidden bg-[#0f172a]">
          <img src={product.images?.[0]?.url} alt={product.title} className="w-full h-[500px] object-cover" />
        </div>

        <div className="space-y-6">
          <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full">
            Code: {product.barcode}
          </span>
          <h1 className="text-4xl font-extrabold">{product.title}</h1>
          <p className="text-3xl font-bold text-[#d4af37]">Rs. {product.price}</p>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                className="w-10 h-10 bg-gray-800 rounded-full text-xl flex items-center justify-center hover:bg-gray-700"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((qty) => qty + 1)}
                className="w-10 h-10 bg-gray-800 rounded-full text-xl flex items-center justify-center hover:bg-gray-700"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {relatedColors.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase italic">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                <div className="w-16 h-16 rounded-xl border-2 border-[#d4af37] overflow-hidden p-0.5">
                  <img src={product.images?.[0]?.url} className="w-full h-full object-cover rounded-lg opacity-40" />
                </div>
                {relatedColors.map((color) => (
                  <Link key={color._id} href={`/products/${color.slug}`} className="block">
                    <div className="w-16 h-16 rounded-xl border border-gray-700 hover:border-[#d4af37] transition-all overflow-hidden cursor-pointer">
                      <img src={color.images?.[0]?.url} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#d4af37] text-black h-14 rounded-2xl font-bold hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </div>
            </button>
            <button
              onClick={() => {
                const message = `Hi, I want to order: ${product.title} - Image: ${product.images?.[0]?.url} - ${window.location.href}`;
                window.open(`https://wa.me/923218719472?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex-1 border border-gray-700 h-14 rounded-2xl font-bold hover:bg-white/5 transition-colors"
            >
              WhatsApp Order
            </button>
          </div>

          {added && (
            <div className="text-green-300 font-semibold pt-2">Added to cart (x{quantity})</div>
          )}

          {content && (
            <div className="mt-8 p-6 bg-[#0f172a] border border-gray-800 rounded-3xl">
              <h3 className="font-bold text-[#d4af37] mb-3">Product Specifications:</h3>
              <p className="text-sm mb-2"><strong>Fabric:</strong> {content.fabric}</p>
              <p className="text-green-400 text-sm font-medium mb-4 italic">{content.note}</p>
              <ul className="text-gray-400 text-sm space-y-1">
                {content.details.map((d, i) => <li key={i}>• {d}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}