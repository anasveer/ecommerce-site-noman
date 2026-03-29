'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

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
  const { items: cartItems, totalPrice } = useCart();

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
        console.log('Orders data:', data);
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
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">My Orders</h1>

        <div className="mb-6 flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 h-12 rounded-2xl border border-slate-300 px-4 text-black"
          />
          <button
            onClick={() => fetchOrders()}
            disabled={loading}
            className="h-12 px-6 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Orders'}
          </button>
        </div>

        {cartItems.length > 0 && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <img src={item.image} alt={item.title} className="h-12 w-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-slate-500">Qty: {item.quantity} | Rs. {item.price}</p>
                  </div>
                  <p className="font-semibold">Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold mt-3">Total: Rs. {totalPrice}</p>
          </div>
        )}

        {orders.length === 0 && !loading && email && (
          <p className="text-slate-800">No orders found for this email.</p>
        )}

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-bold">Order #{order.id}</h2>
                  <p className="text-slate-800 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(order.status)}`}>
                  {order.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Customer Details</h3>
                  <p className="text-sm text-slate-800">{order.user.fullName}</p>
                  <p className="text-sm text-slate-800">{order.user.email}</p>
                  <p className="text-sm text-slate-800">{order.user.phone}</p>
                  <p className="text-sm text-slate-800">{order.user.city}</p>
                  <p className="text-sm text-slate-800">{order.user.address}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Payment</h3>
                  <p className="text-sm text-slate-800">Mode: {order.paymentMode}</p>
                  <p className="text-sm text-slate-800">Subtotal: Rs. {order.total}</p>
                  <p className="text-sm text-slate-800">Shipping: Rs. {order.shippingCost}</p>
                  <p className="text-sm text-slate-800">Total: Rs. {order.amountPayable}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2">Product</th>
                      <th className="py-2">Barcode</th>
                      <th className="py-2">Qty</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-2 flex items-center gap-2">
                          <img src={item.image} alt={item.title} className="h-10 w-10 object-cover rounded" />
                          <div>
                            <div>{item.title}</div>
                            <div className="text-xs text-slate-700">{item.mainCategory || 'Unknown'} / {item.subCategory || 'Unknown'}</div>
                          </div>
                        </td>
                        <td className="py-2">{item.barcode || 'N/A'}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">Rs. {item.price}</td>
                        <td className="py-2">Rs. {item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}