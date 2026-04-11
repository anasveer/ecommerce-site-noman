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
  kg?: number;
  images: ProductImage[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group  overflow-hidden hover:border-[#1EBD87]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#1EBD87]/10 hover:scale-[1.02]">
     <div className="relative overflow-hidden">
  <Link href={`/products/${product.slug}`}>
    <img
      src={product.images?.[0]?.url || "/placeholder.png"}
      alt={product.title}
      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
    />
  </Link>

  <Link
    href={`/products/${product.slug}`}
    className="absolute bottom-4 right-4 p-3 bg-[#1EBD87] text-white rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-lg hover:shadow-[#1EBD87]/50"
  >
    <ShoppingBag className="w-5 h-5" />
  </Link>
</div>

      <div className="px-4 py-3">
        <p className="text-[#1EBD87] text-[15px] font-bold uppercase tracking-widest mb-1">
          {product.subCategory
            ? product.subCategory.replace(/-/g, " ")
            : product.mainCategory}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-gray-700 font-bold text-base mb-1 line-clamp-2  transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-black font-semibold text-lg">Rs. {product.price}</p>
      </div>
    </div>
  );
}
