'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

type OrderStatus = 'pending' | 'on-the-way' | 'completed';

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
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

const statusOrder: OrderStatus[] = ['pending', 'on-the-way', 'completed'];

function badgeClass(status: OrderStatus) {
  if (status === 'pending') return 'bg-amber-100 text-amber-800';
  if (status === 'on-the-way') return 'bg-sky-100 text-sky-800';
  return 'bg-emerald-100 text-emerald-800';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(0);


  useEffect(() => {
    try {
      const stored = localStorage.getItem('hania-orders');
      const parsed = stored ? JSON.parse(stored) : [];
      setOrders(parsed);
      const seen = Number(localStorage.getItem('hania-orders-seen') || '0');
      setNotifications(Math.max(0, parsed.length - seen));
    } catch {
      setOrders([]);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    const list = filter === 'all' ? orders : orders.filter(order => order.status === filter);
    return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, filter]);

  const setStatus = (id: string, next: OrderStatus) => {
    const nextOrders = orders.map(o => (o.id === id ? { ...o, status: next } : o));
    setOrders(nextOrders);
    localStorage.setItem('hania-orders', JSON.stringify(nextOrders));
  };

  const removeOrder = (id: string) => {
    const nextOrders = orders.filter(o => o.id !== id);
    setOrders(nextOrders);
    localStorage.setItem('hania-orders', JSON.stringify(nextOrders));
    localStorage.setItem('hania-orders-seen', String(nextOrders.length));
    setNotifications(Math.max(0, nextOrders.length - Number(localStorage.getItem('hania-orders-seen') || '0')));
  };

  const markNotificationsSeen = () => {
    localStorage.setItem('hania-orders-seen', String(orders.length));
    setNotifications(0);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Order Management</h1>
            <p className="text-slate-500 mt-1">All user orders appear here with status and detailed checkout data.</p>
          </div>
          <div className="flex items-center gap-3">
            {notifications > 0 && (
              <button onClick={markNotificationsSeen} className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                {notifications} new order(s)
              </button>
            )}
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-sm font-medium text-slate-700">Filter status:</label>
              <select value={filter} onChange={e => setFilter(e.target.value as OrderStatus | 'all')} className="rounded-lg border border-slate-300 bg-white px-3 py-2">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="on-the-way">On the way</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </header>

        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center">
            <p className="text-slate-600">No orders matching this filter.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map(order => (
              <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">Order #{order.id}</h2>
                    <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(order.status)}`}>
                      {order.status.replace('-', ' ').toUpperCase()}
                    </div>
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
                        if (confirmDelete) removeOrder(order.id);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-100 text-red-700 px-2 py-1 text-xs font-semibold"
                      title="Delete order"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Customer</h3>
                    <p className="text-sm text-slate-600">{order.user.fullName}</p>
                    <p className="text-sm text-slate-600">{order.user.email}</p>
                    <p className="text-sm text-slate-600">{order.user.phone}</p>
                    <p className="text-sm text-slate-600">{order.user.city}</p>
                    <p className="text-sm text-slate-600">{order.user.address}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Payment</h3>
                    <p className="text-sm text-slate-600">Mode: {order.paymentMode}</p>
                    <p className="text-sm text-slate-600">Info: {order.paymentInfo}</p>
                    <p className="text-sm text-slate-600">Shipping: Rs. {order.shippingCost}</p>
                    <p className="text-sm text-slate-600">Amount: Rs. {order.amountPayable}</p>
                    {order.paymentScreenshot && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-500">Advance payment proof (click to enlarge):</p>
                        <img
                          src={order.paymentScreenshot}
                          alt="Payment proof"
                          className="mt-1 h-16 w-16 cursor-pointer rounded-lg object-cover border"
                          onClick={() => setPreviewSrc(order.paymentScreenshot || '')}
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Progress</h3>
                    <div className="flex flex-wrap gap-2">
                      {statusOrder.map(s => (
                        <button key={s} onClick={() => setStatus(order.id, s)} className={`rounded-lg px-2 py-1 text-xs ${s === order.status ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>
                          {s.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-2">Product</th>
                        <th className="py-2">Qty</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map(item => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="py-2 flex items-center gap-2">
                            <img src={item.image} alt={item.title} className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setPreviewSrc(item.image)} />
                            <div>
                              <div>{item.title}</div>
                              <div className="text-xs text-slate-500">{item.mainCategory || 'Unknown'} / {item.subCategory || 'Unknown'}</div>
                            </div>
                          </td>
                          <td className="py-2">{item.quantity}</td>
                          <td className="py-2">Rs. {item.price}</td>
                          <td className="py-2">Rs. {item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {previewSrc && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreviewSrc(null)}>
                    <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full">
                      <img src={previewSrc} alt="Preview" className="w-full h-auto" />
                      <button onClick={() => setPreviewSrc(null)} className="w-full py-3 bg-blue-700 text-white font-semibold">Close Preview</button>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
                  <div className="text-sm text-slate-500">Products: {order.items.length}</div>
                  <div className="text-lg font-semibold">Total Payable: Rs. {order.amountPayable}</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
