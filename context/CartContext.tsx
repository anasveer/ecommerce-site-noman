'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  barcode: string;
  mainCategory?: string;
  subCategory?: string;
  kg?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const email = typeof window !== 'undefined' ? localStorage.getItem('user-email') : null;
  const cartKey = email ? `cart-${email}` : 'hania-cart';

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(cartKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Array<CartItem>;
        setItems(parsed.map(item => ({ ...item, kg: item.kg ?? 1 })));
      }
    } catch {}
  }, [cartKey]);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey]);

  const addToCart = (item: CartItem) => {
    console.log('🛒 CartContext.addToCart called with:', { title: item.title, kg: item.kg, quantity: item.quantity });
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const updated = { ...existing, ...item, quantity: existing.quantity + item.quantity };
        console.log('🛒 Item already exists, merging:', { existingKg: existing.kg, newKg: item.kg, finalKg: updated.kg });
        return prev.map(i =>
          i.id === item.id ? updated : i
        );
      }
      console.log('🛒 New item added to cart with kg:', item.kg);
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};