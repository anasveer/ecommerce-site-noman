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
  payment: 'cod' | 'advance';
};

const defaultForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  payment: 'cod',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(defaultForm);
  const [error, setError] = useState('');
  const [screenshotError, setScreenshotError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  useEffect(() => {
    console.log('📋 Checkout page loaded with items:', items.map(i => ({ title: i.title, kg: i.kg, qty: i.quantity })));
  }, [items]);

  const getShippingRate = (kg: number) => {
    const kgValue = Math.round(Number(kg) || 1);
    const rates: Record<number, number> = {
      1: 250,
      2: 340,
      3: 430,
      4: 470,
      5: 500,
      6: 650,
      7: 750,
      8: 950,
      9: 1200,
      10: 1500,
    };
    const rate = rates[kgValue] || 250;
    console.log(`⚙️ getShippingRate input: ${kg} → parsed: ${kgValue} → rate: Rs. ${rate}`);
    return rate;
  };

  const shippingCost = useMemo(() => {
    const calculated = items.reduce((sum, item) => {
      const itemWeight = item.kg ?? 1;
      const rate = getShippingRate(itemWeight);
      console.log(`📦 Item "${item.title}": kg=${itemWeight}, rate=${rate}, qty=${item.quantity}, subtotal=${rate * item.quantity}`);
      return sum + rate * item.quantity;
    }, 0);
    console.log(`🚚 Total shipping cost: Rs. ${calculated}`);
    return calculated;
  }, [items]);

  const totalWithShipping = useMemo(() => totalPrice + shippingCost, [totalPrice, shippingCost]);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/my-orders');
    }
  }, [items.length, router]);

  const saveOrder = async (order: any) => {
    try {
      console.log('Saving order:', JSON.stringify(order, null, 2));
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.details || 'Failed to save order');
      }
      
      // Store email in localStorage for my-orders page
      localStorage.setItem('user-email', order.user.email);
      console.log('Order saved successfully');
      return true;
    } catch (error) {
      console.error('Failed to save order:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      alert(`Order placed but failed to save: ${errorMsg}`);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.city || !form.address) {
      setError('Please fill all required fields.');
      return;
    }

    // Clear screenshot error when starting validation
    setScreenshotError('');

    // Validate screenshot only if advance payment is selected
    if (form.payment === 'advance' && !screenshotFile) {
      setScreenshotError('Payment screenshot is required for advance payment (Proof).');
      return;
    }

    let paymentScreenshotUrl = null;
    if (screenshotPreview) {
      try {
        const uploadRes = await fetch('/api/upload-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data: screenshotPreview }),
        });
        if (!uploadRes.ok) {
          throw new Error('Upload failed');
        }
        const uploadData = await uploadRes.json();
        paymentScreenshotUrl = uploadData.url;
      } catch (uploadError) {
        console.error('Screenshot upload failed:', uploadError);
        setError('Failed to upload payment screenshot. Please try again.');
        return;
      }
    }

    const order = {
      id: `ORD-${Date.now()}`,
      user: { ...form },
      items: items.map(item => ({
        ...item,
        mainCategory: item.mainCategory || 'unknown',
        subCategory: item.subCategory || 'unknown',
        kg: item.kg ?? 1,
      })),
      total: totalPrice,
      shippingCost,
      amountPayable: totalWithShipping,
      paymentMode: form.payment === 'cod' ? 'Cash on Delivery' : 'Advance (Bank Transfer)',
      paymentInfo: form.payment === 'advance' ? 'Bank: Hania Bank | IBAN: PK00HANIA1234567890' : 'Pay on delivery',
      paymentScreenshot: paymentScreenshotUrl,
      status: 'pending' as OrderStatus,
      createdAt: new Date().toISOString(),
    };

    const success = await saveOrder(order);
    if (success) {
      clearCart();
      setSuccessMessage(`Order placed successfully! Your Order ID is ${order.id}`);
      
      // Hide notification after 3 seconds and redirect
      setTimeout(() => {
        setSuccessMessage('');
        router.push('/my-orders');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      {/* Success Notification */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Contact & Shipping</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="space-y-3">
              <input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} type="text" placeholder="Full Name" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" placeholder="Option (Email)" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} type="tel" placeholder="Phone" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} type="text" placeholder="City" className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
              <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Full address" rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2" required />
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
                  {screenshotError && <p className="text-red-500 text-sm mt-2">{screenshotError}</p>}
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
              <div className="flex justify-between"><span>Shipping</span><span>Rs. {shippingCost}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>Rs. {totalWithShipping}</span></div>
            </div>

            <p className="text-xs text-slate-500 mt-2">Fill the form and click Complete Order. You will be redirected to your orders list.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
