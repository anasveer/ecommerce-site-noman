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
    <div className="group bg-gradient-to-br from-[#0f172a] to-[#1a1a2e] rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:scale-[1.02]">
      <div className="relative h-48 lg:h-64 overflow-hidden rounded-t-2xl">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-4 right-4 p-3 bg-[#d4af37] text-[#0a0f1d] rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg hover:shadow-[#d4af37]/50"
        >
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </div>

      <div className="p-6">
        <p className="text-[#d4af37] text-[14px] font-bold uppercase tracking-widest mb-1 ">
          {product.subCategory
            ? product.subCategory.replace(/-/g, " ")
            : product.mainCategory}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 hover:text-[#d4af37] transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-[#d4af37] font-semibold text-xl">Rs. {product.price}</p>
      </div>
    </div>
  );
}