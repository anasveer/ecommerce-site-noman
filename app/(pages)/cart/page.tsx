'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Debug: Log cart items with kg
  useEffect(() => {
    console.log('🛒 Cart Page - Current items:', items.map(i => ({ title: i.title, kg: i.kg, qty: i.quantity })));
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">You haven't added any products yet. Browse the store and start shopping.</p>
          <Link href="/" className="inline-block bg-[#1EBD87] text-white px-6 py-3 rounded-full font-bold hover:bg-[#17a876] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-5 items-center shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 text-xs mt-0.5">Code: {item.barcode}</p>
                <p className="text-[#1EBD87] font-bold text-base mt-1">Rs. {item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-gray-700"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 text-gray-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="text-sm font-bold text-gray-800">Rs. {item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Total Amount</p>
              <p className="text-3xl font-bold text-[#1EBD87]">Rs. {totalPrice}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="px-6 py-3 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:border-[#1EBD87] hover:text-[#1EBD87] transition-all text-center">
                Continue Shopping
              </Link>
              <Link href="/checkout" className="px-6 py-3 rounded-2xl font-bold bg-[#1EBD87] text-white hover:bg-[#17a876] transition-colors text-center">
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