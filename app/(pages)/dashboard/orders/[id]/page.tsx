'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trash2 } from 'lucide-react';

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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [productDetails, setProductDetails] = useState<Record<string, any>>({});
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderId = params.id;
        console.log('Loading order with ID:', orderId);
        if (!orderId) return;
        
        // Fetch the order directly by ID from API
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const foundOrder: Order | null = await res.json();
          console.log('Found order:', foundOrder ? 'YES' : 'NO');
          if (foundOrder && foundOrder.id) {
            setOrder(foundOrder);
            // Fetch product details
            const allIds: string[] = (foundOrder.items ?? [])
              .map((item: OrderItem & { _id?: string }) => item.id || item._id || item.barcode || '')
              .filter(Boolean);
            console.log('Fetching product details for IDs:', allIds);
            if (allIds.length === 0) {
              console.warn('No valid product ids found in order items');
            }
            const fetches = allIds.map(id =>
              fetch(`/api/products/${id}`)
                .then(res => {
                  console.log(`Product ${id} fetch result:`, res.status);
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
                  console.log('Adding product to map:', prodId, res.product.title);
                  if (prodId) map[prodId] = res.product;
                }
              });
              console.log('Final product details map:', map);
              setProductDetails(map);
            });
          } else {
            console.log('Order not found, redirecting back');
            router.push('/dashboard/orders');
          }
        }
      } catch (error) {
        console.error('Error loading order:', error);
        router.push('/dashboard/orders');
      }
    };
    loadOrder();
  }, [params.id, router]);

  const setStatus = async (next: OrderStatus) => {
    if (!order) return;
    const updatedOrder = { ...order, status: next };
    setOrder(updatedOrder);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: next }),
      });
      if (!res.ok) {
        console.error('Failed to update order status');
        setOrder(order); // Revert on error
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setOrder(order); // Revert on error
    }
  };

  const removeOrder = async () => {
    if (!order) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this order? This action cannot be undone.');
    if (!confirmDelete) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id }),
      });
      if (res.ok) {
        router.push('/dashboard/orders');
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-10 px-4 flex items-center justify-center">
        <p className="text-black">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Orders
          </button>
          <h1 className="text-3xl font-bold text-black">Order #{order.id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-black">Order Details</h2>
                  <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(order.status)}`}>
                    {order.status.replace('-', ' ').toUpperCase()}
                  </div>
                  <button
                    onClick={removeOrder}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-100 text-red-700 px-2 py-1 text-xs font-semibold hover:bg-red-200"
                    title="Delete order"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 text-black">Product</th>
                      <th className="py-2 text-black">Barcode</th>
                      <th className="py-2 text-black">Qty</th>
                      <th className="py-2 text-black">Price</th>
                      <th className="py-2 text-black">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={`${order.id}-${item.id}-${index}`} className="border-b border-slate-100">
                        <td className="py-2 flex items-center gap-2">
                          <img src={item.image || productDetails[item.id]?.images?.[0]?.url || '/placeholder.png'} alt={item.title} className="h-10 w-10 object-cover rounded cursor-pointer" onClick={() => setPreviewSrc(item.image || productDetails[item.id]?.images?.[0]?.url)} />
                          <div>
                            <div className="text-black">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.mainCategory || 'Unknown'} / {item.subCategory || 'Unknown'}</div>
                          </div>
                        </td>
                        <td className="py-2 text-black">{item.barcode || productDetails[item.id]?.barcode || 'N/A'}</td>
                        <td className="py-2 text-black">{item.quantity}</td>
                        <td className="py-2 text-black">Rs. {item.price}</td>
                        <td className="py-2 text-black">Rs. {item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
              <div className="flex flex-wrap gap-2">
                {statusOrder.map(s => (
                  <button key={s} onClick={() => setStatus(s)} className={`rounded-lg px-3 py-2 text-sm ${s === order.status ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-slate-200 hover:bg-slate-50'}`}>
                    {s.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="text-black">Name:</strong> {order.user.fullName}</p>
                <p><strong className="text-black">Email:</strong> {order.user.email}</p>
                <p><strong className="text-black">Phone:</strong> {order.user.phone}</p>
                <p><strong className="text-black">City:</strong> {order.user.city}</p>
                <p><strong className="text-black">Address:</strong> {order.user.address}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="text-black">Mode:</strong> {order.paymentMode}</p>
                <p><strong className="text-black">Info:</strong> {order.paymentInfo}</p>
                <p><strong className="text-black">Subtotal:</strong> Rs. {order.total}</p>
                <p><strong className="text-black">Shipping:</strong> Rs. {order.shippingCost}</p>
                <p><strong className="text-black">Total:</strong> Rs. {order.amountPayable}</p>
              </div>
              {order.paymentScreenshot && (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Advance payment proof:</p>
                  <img
                    src={order.paymentScreenshot}
                    alt="Payment proof"
                    className="w-full h-auto cursor-pointer rounded-lg border"
                    onClick={() => setPreviewSrc(order.paymentScreenshot || '')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {previewSrc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreviewSrc(null)}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full">
              <img src={previewSrc} alt="Preview" className="w-full h-auto" />
              <button onClick={() => setPreviewSrc(null)} className="w-full py-3 bg-blue-700 text-white font-semibold">Close Preview</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}