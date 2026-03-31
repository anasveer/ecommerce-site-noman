'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0f1d] text-white flex items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">You haven't added any products yet. Browse the store and start shopping.</p>
          <Link href="/" className="inline-block bg-[#d4af37] text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white py-16 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2">
                <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded-xl" />
              </div>
              <div className="col-span-5">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-400 text-sm">Code: {item.barcode}</p>
                <p className="text-[#d4af37] font-bold text-lg mt-1">Rs. {item.price}</p>
              </div>

              <div className="col-span-3 flex items-center gap-2 justify-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="col-span-2 flex flex-col items-end justify-between">
                <p className="text-gray-300">Subtotal:</p>
                <p className="text-xl font-bold text-[#d4af37]">Rs. {item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#0f172a] border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Total</p>
              <p className="text-3xl font-bold text-[#d4af37]">Rs. {totalPrice}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/" className="px-6 py-3 border border-gray-700 rounded-2xl font-bold bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-white/20 transition-all duration-300">
                Continue Shopping
              </Link>
              <Link href="/checkout" className="px-6 py-3 rounded-2xl font-bold bg-[#d4af37] text-black hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;