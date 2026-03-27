'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type OrderStatus = 'pending' | 'on-the-way' | 'completed';

type Order = {
  id: string;
  user: { fullName: string; email: string; phone: string; city: string; address: string; };
  items: Array<{ id: string; title: string; price: number; quantity: number; mainCategory?: string; subCategory?: string; }>;
  total: number;
  shippingCost: number;
  amountPayable: number;
  paymentMode: string;
  paymentInfo: string;
  paymentScreenshot?: string;
  status: OrderStatus;
  createdAt: string;
};

const DashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('hania-orders');
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch {
      setOrders([]);
    }

    async function loadProductsCount() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProductsCount(data.length || 0);
        }
      } catch {
        setProductsCount(0);
      }
    }

    loadProductsCount();
  }, []);

  const statusSummary = useMemo(() => {
    const summary = { pending: 0, 'on-the-way': 0, completed: 0 } as Record<OrderStatus, number>;
    orders.forEach((order) => {
      summary[order.status] += 1;
    });
    return summary;
  }, [orders]);

  const categorySales = useMemo(() => {
    const totals: Record<string, number> = {};
    orders.forEach((order) => {
      if (order.status !== 'completed') return;
      order.items.forEach((item) => {
        const key = item.subCategory || item.mainCategory || 'Unknown';
        totals[key] = (totals[key] || 0) + item.price * item.quantity;
      });
    });
    return totals;
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0a0f1d] py-10 px-4 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl border border-blue-400/20 bg-white/5 p-6 shadow-[0_20px_60px_rgba(59,130,246,0.2)] backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-300">Your store overview with orders and category sales.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-wider text-blue-200">Total Orders</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </div>
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-wider text-blue-200">Pending</p>
            <p className="text-3xl font-bold">{statusSummary.pending}</p>
          </div>
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-wider text-blue-200">On the way</p>
            <p className="text-3xl font-bold">{statusSummary['on-the-way']}</p>
          </div>
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-wider text-blue-200">Completed</p>
            <p className="text-3xl font-bold">{statusSummary.completed}</p>
          </div>
        </div>

        <div className=" rounded-2xl border border-blue-400/20 bg-white/10 p-5">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-2xl font-bold">{productsCount}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold mb-3">Category Sales (Completed)</h3>
            {Object.entries(categorySales).length ? (
              <ul className="space-y-2 text-sm">
                {Object.entries(categorySales).map(([cat, value]) => (
                  <li key={cat} className="flex justify-between">
                    <span>{cat}</span>
                    <span>Rs. {value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No completed sales yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold mb-3">Quick links</h3>
            <div className="grid gap-2">
              <Link href="/dashboard/orders" className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white">Go to Orders</Link>
              <Link href="/dashboard/all-products" className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white">Go to Products</Link>
              <Link href="/cart" className="rounded-lg bg-slate-600 px-4 py-2 font-medium text-white">Open Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;