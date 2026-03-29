'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

const statusOrder: OrderStatus[] = ['pending', 'on-the-way', 'completed'];

function badgeClass(status: OrderStatus) {
  if (status === 'pending') return 'bg-amber-100 text-amber-800';
  if (status === 'on-the-way') return 'bg-sky-100 text-sky-800';
  return 'bg-emerald-100 text-emerald-800';
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(0);
  const [productDetails, setProductDetails] = useState<Record<string, any>>({});


  useEffect(() => {
    async function loadOrders() {
      try {
        console.log('Loading orders...');
        const res = await fetch('/api/orders');
        console.log('Orders API response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('Loaded orders:', data.length, 'orders');
          console.log('Sample order:', data[0]);
          setOrders(data);
          const seen = Number(localStorage.getItem('hania-orders-seen') || '0');
          setNotifications(Math.max(0, data.length - seen));
        } else {
          console.error('Failed to load orders:', res.status);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      console.log('Fetching product details for orders...');
      const allIds = [...new Set(orders.flatMap(order => order.items.map(item => item.id || (item as any)._id || item.barcode || '')))].filter(Boolean);
      console.log('Product IDs to fetch:', allIds);
      if (allIds.length === 0) {
        console.warn('No valid product ids found in orders');
      }
      const fetches = allIds.map(id =>
        fetch(`/api/products/${id}`)
          .then(res => {
            console.log(`Product ${id} fetch status:`, res.status);
            return res.ok ? res.json() : null;
          })
          .catch(err => {
            console.error(`Error fetching product ${id}:`, err);
            return null;
          })
      );
      Promise.all(fetches).then(results => {
        console.log('Product fetch results:', results);
        const map: Record<string, any> = {};
        results.forEach(res => {
          if (res?.product) {
            const prodId = res.product._id || res.product.id;
            console.log('Storing product:', prodId, res.product.title);
            if (prodId) map[prodId] = res.product;
          }
        });
        console.log('Product details map:', Object.keys(map).length, 'products');
        setProductDetails(map);
      });
    }
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const list = filter === 'all' ? orders : orders.filter(order => order.status === filter);
    return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, filter]);

  const setStatus = async (id: string, next: OrderStatus) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: next }),
      });
      setOrders(orders.map(o => (o.id === id ? { ...o, status: next } : o)));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const removeOrder = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
    if (!confirmDelete) return;
    try {
      await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setOrders(orders.filter(o => o.id !== id));
      localStorage.setItem('hania-orders-seen', String(orders.length - 1));
      setNotifications(Math.max(0, orders.length - 1 - Number(localStorage.getItem('hania-orders-seen') || '0')));
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <div key={`${order.id}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Order #{order.id}</h3>
                    <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
                      if (confirmDelete) removeOrder(order.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Delete order"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={order.items[0]?.image || '/placeholder.png'}
                    alt="Product"
                    className="h-16 w-16 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{order.user.fullName}</p>
                    <p className="text-xs text-slate-500">{order.items.length} product(s)</p>
                    <p className="text-xs text-slate-500">{order.items[0]?.mainCategory || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(order.status)}`}>
                    {order.status.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className="text-lg font-bold text-slate-900">Rs. {order.amountPayable}</div>
                </div>

                <button
                  onClick={() => {
                    console.log('View details clicked for order:', order.id);
                    const encodedId = encodeURIComponent(order.id);
                    console.log('Navigating to:', `/dashboard/orders/${encodedId}`);
                    router.push(`/dashboard/orders/${encodedId}`);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
