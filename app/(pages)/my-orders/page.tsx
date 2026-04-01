'use client';

import { useState, useEffect } from 'react';

type OrderStatus = 'pending' | 'on-the-way' | 'completed';

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  barcode?: string;
  mainCategory?: string;
  subCategory?: string;
};

type Order = {
  id: string;
  user: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  shippingCost: number;
  amountPayable: number;
  paymentMode: string;
  paymentInfo: string;
  paymentScreenshot?: string | null;
  status: OrderStatus;
  createdAt: string;
};

function badgeClass(status: OrderStatus) {
  if (status === 'pending') return 'bg-amber-100 text-amber-800';
  if (status === 'on-the-way') return 'bg-sky-100 text-sky-800';
  return 'bg-emerald-100 text-emerald-800';
}

export default function MyOrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Image Preview State

  useEffect(() => {
    const savedEmail = localStorage.getItem('user-email');
    if (savedEmail) {
      setEmail(savedEmail);
      fetchOrders(savedEmail);
    }
  }, []);

  const fetchOrders = async (userEmail?: string) => {
    const targetEmail = userEmail || email;
    if (!targetEmail.trim()) return;
    setLoading(true);
    localStorage.setItem('user-email', targetEmail);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(targetEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 mt-20 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">My Orders History</h1>

        <div className="mb-8 flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to track orders"
            className="flex-1 h-12 rounded-2xl border border-slate-300 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => fetchOrders()}
            disabled={loading}
            className="h-12 px-6 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Loading...' : 'Fetch Orders'}
          </button>
        </div>

        {orders.length === 0 && !loading && email && (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">No placed orders found for this email.</p>
          </div>
        )}

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Order #{order.id}</h2>
                  <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ${badgeClass(order.status)}`}>
                  {order.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-600 mb-3">Shipping Address</h3>
                  <div className="text-sm text-slate-800 space-y-1">
                    <p className="font-semibold">{order.user.fullName}</p>
                    <p>{order.user.phone}</p>
                    <p>{order.user.city}</p>
                    <p className="italic">{order.user.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-600 mb-3">Payment Summary</h3>
                  <div className="text-sm text-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>Rs. {order.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>Rs. {order.shippingCost}</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-600 border-t border-slate-100 pt-2 text-base">
                      <span>Payable:</span>
                      <span>Rs. {order.amountPayable}</span>
                    </div>
                    
                    {/* NEW: Payment Screenshot Display */}
                    {order.paymentScreenshot && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-[11px] font-bold text-blue-700 uppercase mb-2">Advance Payment Proof:</p>
                        <img 
                          src={order.paymentScreenshot} 
                          alt="Payment Proof" 
                          className="h-20 w-20 object-cover rounded-lg border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setSelectedImage(order.paymentScreenshot!)}
                        />
                      </div>
                    )}
                    
                    <p className="text-[15px] text-slate-600 mt-2 italic text-right">Mode: {order.paymentMode}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="py-3 px-3 rounded-l-xl text-slate-600">Product</th>
                      <th className="py-3 px-3 text-slate-600">Qty</th>
                      <th className="py-3 px-3 rounded-r-xl text-slate-600 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id} className="border-b border-slate-50 last:border-0">
                        <td className="py-4 px-3 flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="h-12 w-12 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity" 
                            onClick={() => setSelectedImage(item.image)}
                          />
                          <div>
                            <div className="text-[18px] text-blue-600">{item.title}</div>
                            <div className="text-[15px] text-slate-600 font-mono mb-1 mt-1">Code: {item.barcode || 'N/A'}</div>
                            <div className="text-[15px] text-slate-600">{item.mainCategory} / {item.subCategory}</div>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-slate-600">
                          {item.quantity} × {item.price}
                        </td>
                        <td className="py-4 px-3 text-right font-semibold text-slate-900">
                          Rs. {item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- IMAGE VIEW MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative animate-in zoom-in duration-200">
            <button 
              className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img 
              src={selectedImage} 
              alt="Large Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-blue-500/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}