'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

type OrderStatus = 'pending' | 'on-the-way' | 'completed';

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  shipping: 'standard' | 'express';
  payment: 'cod' | 'advance';
};

const defaultForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  shipping: 'standard',
  payment: 'cod',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(defaultForm);
  const [error, setError] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const totalWithShipping = useMemo(() => {
    const shippingRate = form.shipping === 'standard' ? 150 : 350;
    return totalPrice + shippingRate;
  }, [totalPrice, form.shipping]);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const saveOrder = (order: any) => {
    try {
      const existing = localStorage.getItem('hania-orders');
      const arr = existing ? JSON.parse(existing) : [];
      localStorage.setItem('hania-orders', JSON.stringify([...arr, order]));
    } catch (e) {
      console.error('Order save failed', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.city || !form.address) {
      setError('Please fill all required fields.');
      return;
    }

    if (form.payment === 'advance' && !screenshotFile) {
      setError('Advance payment requires screenshot proof.');
      return;
    }

    const screenshotData = screenshotPreview || null;

    const order = {
      id: `ORD-${Date.now()}`,
      user: { ...form },
      items: items.map(item => ({
        ...item,
        mainCategory: item.mainCategory || 'unknown',
        subCategory: item.subCategory || 'unknown',
      })),
      total: totalPrice,
      shippingCost: form.shipping === 'standard' ? 150 : 350,
      amountPayable: totalWithShipping,
      paymentMode: form.payment === 'cod' ? 'Cash on Delivery' : 'Advance (Bank Transfer)',
      paymentInfo: form.payment === 'advance' ? 'Bank: Hania Bank | IBAN: PK00HANIA1234567890' : 'Pay on delivery',
      paymentScreenshot: screenshotData,
      status: 'pending' as OrderStatus,
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    clearCart();
    router.push('/dashboard/orders');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Contact & Shipping</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="space-y-3">
              <input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} type="text" placeholder="Full Name" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="Email" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" placeholder="Phone" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} type="text" placeholder="City" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Full address" rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
            </div>

            <div className="mt-5">
              <p className="font-medium">Shipping method</p>
              <select value={form.shipping} onChange={e => setForm({...form, shipping: e.target.value as CheckoutForm['shipping']})} className="w-full mt-2 border border-slate-300 rounded-lg px-3 py-2">
                <option value="standard">Standard Shipping (Rs. 150)</option>
                <option value="express">Express Shipping (Rs. 350)</option>
              </select>
            </div>

            <div className="mt-5">
              <p className="font-medium">Payment</p>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2"><input type="radio" name="payment" checked={form.payment === 'cod'} onChange={() => setForm({...form, payment: 'cod'})} /> Cash on delivery</label>
                <label className="flex items-center gap-2"><input type="radio" name="payment" checked={form.payment === 'advance'} onChange={() => setForm({...form, payment: 'advance'})} /> Advance (Bank transfer) <span className="text-xs text-blue-600 font-semibold">(Recommended for secure higher trust)</span></label>
              </div>
              {form.payment === 'advance' && (
                <div className="text-sm bg-sky-50 border border-sky-200 p-3 rounded-lg mt-2">
                  Bank: Hania Bank<br />IBAN: PK00HANIA1234567890<br />Branch: Main<br />Name: Hania Amir
                </div>
              )}

              {form.payment === 'advance' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">Upload payment screenshot (required)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setScreenshotFile(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setScreenshotPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setScreenshotPreview(null);
                      }
                    }}
                    className="w-full rounded-lg border border-slate-300 p-2"
                  />
                  {screenshotPreview && (
                    <img src={screenshotPreview} alt="Proof preview" className="mt-2 max-h-32 rounded-lg border border-slate-300" />
                  )}
                </div>
              )}
            </div>

            <button type="submit" className="mt-6 w-full bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700 transition">Complete Order</button>
          </form>

          <aside className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center border-b border-slate-100 pb-3">
                  <img src={item.image} alt={item.title} className="col-span-3 h-16 w-16 object-cover rounded-lg" />
                  <div className="col-span-7">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-slate-500">Qty: {item.quantity} | Price: Rs. {item.price}</div>
                    <div className="text-xs text-slate-400">Category: {item.mainCategory || 'N/A'} / {item.subCategory || 'N/A'}</div>
                  </div>
                  <div className="col-span-2 text-right font-semibold">Rs. {item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Sub total</span><span>Rs. {totalPrice}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Rs. {form.shipping === 'standard' ? 150 : 350}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>Rs. {totalWithShipping}</span></div>
            </div>

            <p className="text-xs text-slate-500 mt-2">Fill the form and click Complete Order. You will be redirected to your orders list.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
