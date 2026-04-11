'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  mainCategory?: string;
  subCategory?: string;
  kg?: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const removeFromWishlist = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const isWishlisted = (id: string) => items.some(i => i.id === id);

  const totalWishlist = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isWishlisted, totalWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
