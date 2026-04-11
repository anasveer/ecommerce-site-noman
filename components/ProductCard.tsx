'use client';

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

type ProductImage = {
  url: string;
};

type Product = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  mainCategory: string;
  subCategory?: string;
  kg?: number;
  images: ProductImage[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product._id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images?.[0]?.url || "",
      quantity: 1,
      barcode: "",
      mainCategory: product.mainCategory,
      subCategory: product.subCategory,
      kg: product.kg ?? 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.images?.[0]?.url || "",
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
        kg: product.kg ?? 1,
      });
    }
  };

  return (
    <div className="group bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,189,135,0.15)] hover:border-[#1EBD87]/30 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist icon - top right, hover on desktop, always visible on mobile */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 ${
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-400 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="px-3 pt-3 pb-2">
        <p className="text-[#1EBD87] text-[14px] font-bold uppercase tracking-widest mb-1">
          {product.subCategory
            ? product.subCategory.replace(/-/g, " ")
            : product.mainCategory}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-gray-800 font-semibold text-sm mb-1 line-clamp-2 hover:text-[#1EBD87] transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-900 font-bold text-base mb-3">Rs. {product.price}</p>

        {/* Add to Cart - always visible at bottom */}
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-[#1EBD87] text-white md:bg-[#1EBD87]/10 md:text-[#1EBD87] md:hover:bg-[#1EBD87] md:hover:text-white border border-[#1EBD87] md:border-[#1EBD87]/30 md:hover:border-[#1EBD87]'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
