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
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch('/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch {
        setOrders([]);
      }
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

    loadOrders();
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

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    orders.forEach(order => order.items.forEach(item => cats.add(item.subCategory || item.mainCategory || 'Unknown')));
    return Array.from(cats).sort();
  }, [orders]);

  const filteredCategorySales = useMemo(() => {
    if (selectedCategory === 'all') return categorySales;
    const filtered: Record<string, number> = {};
    if (categorySales[selectedCategory]) filtered[selectedCategory] = categorySales[selectedCategory];
    return filtered;
  }, [categorySales, selectedCategory]);

  const overallTotal = useMemo(() => Object.values(categorySales).reduce((sum, val) => sum + val, 0), [categorySales]);

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
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{productsCount}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold mb-3">Category Sales (Completed)</h3>
            <div className="mb-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black"
              >
                <option value="all">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {Object.entries(filteredCategorySales).length ? (
              <ul className="space-y-2 text-sm mb-3">
                {Object.entries(filteredCategorySales).map(([cat, value]) => (
                  <li key={cat} className="flex justify-between">
                    <span>{cat}</span>
                    <span>Rs. {value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 mb-3">No sales for selected category.</p>
            )}
            <div className="border-t border-slate-600 pt-3">
              <p className="text-sm text-slate-300">Selected Total: Rs. {Object.values(filteredCategorySales).reduce((sum, val) => sum + val, 0)}</p>
              <p className="text-lg font-bold text-white">Overall Total Sales: Rs. {overallTotal}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-white/10 p-5">
            <h3 className="text-lg font-semibold mb-3">Quick links</h3>
            <div className="grid gap-2">
              <Link href="/dashboard/orders" className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white">Go to Orders</Link>
              <Link href="/dashboard/all-products" className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white">Go to Products</Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;