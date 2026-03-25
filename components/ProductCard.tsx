import Link from "next/link";
import { ShoppingBag } from "lucide-react";

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
  images: ProductImage[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#d4af37]/50 transition-all">
      <div className="relative h-72 overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-4 right-4 p-3 bg-[#d4af37] text-[#0a0f1d] rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </div>

      <div className="p-6">
        <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mb-1">
          {product.subCategory
            ? product.subCategory.replace(/-/g, " ")
            : product.mainCategory}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 hover:text-[#d4af37] transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-white font-medium">Rs. {product.price}</p>
      </div>
    </div>
  );
}