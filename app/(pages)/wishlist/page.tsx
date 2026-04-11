'use client';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      slug: item.slug,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      barcode: '',
      mainCategory: item.mainCategory,
      subCategory: item.subCategory,
      kg: item.kg ?? 1,
    });
    setAddedIds(prev => [...prev, item.id]);
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== item.id)), 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 mt-20">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist is Empty</h1>
          <p className="text-gray-500 mb-6">Save your favourite products here.</p>
          <Link href="/" className="inline-block bg-[#1EBD87] text-white px-6 py-3 rounded-full font-bold hover:bg-[#17a876] transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <span className="bg-[#1EBD87]/10 text-[#1EBD87] text-sm font-bold px-3 py-1 rounded-full">{items.length} items</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(30,189,135,0.15)] hover:border-[#1EBD87]/30 transition-all duration-300 group">
              <div className="relative">
                <Link href={`/products/${item.slug}`}>
                  <img src={item.image} alt={item.title} className="w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="px-3 pt-3 pb-3">
                <p className="text-[#1EBD87] text-[11px] font-bold uppercase tracking-widest mb-1">
                  {item.subCategory?.replace(/-/g, ' ') || item.mainCategory}
                </p>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="text-gray-800 font-semibold text-sm mb-1 line-clamp-2 hover:text-[#1EBD87] transition-colors">{item.title}</h3>
                </Link>
                <p className="text-gray-900 font-bold text-base mb-3">Rs. {item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    addedIds.includes(item.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-[#1EBD87]/10 text-[#1EBD87] hover:bg-[#1EBD87] hover:text-white border border-[#1EBD87]/30 hover:border-[#1EBD87]'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {addedIds.includes(item.id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
