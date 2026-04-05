import Link from "next/link";
import ProductCard from "./ProductCard";

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

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products?mainCategory=bedsheet&subCategory=comforter-set&limit=6`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comforter set products");
  }

  return res.json();
}

export default async function ProductSectionComforterSet() {
  const products: Product[] = await getProducts();

  return (
    <section className="py-24 bg-[#0a0f1d]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Comforter Set <span className="text-[#d4af37]">Now</span>
            </h2>
            <p className="text-gray-400">
              Explore our latest Comforter Set collection
            </p>
          </div>

          {/* Desktop View Button (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <Link
              href="/category/bedsheet/comforter-set"
              className="px-5 py-3 rounded-full text-medium font-semibold text-white bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-white/20 transition-all duration-300 animate-pulse"
            >
              View Comforter Set <span className="inline-block ml-2 arrow-shift">→</span>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Mobile View Button (Only Visible on Mobile at the Bottom) */}
        <div className="mt-10 lg:hidden flex justify-center">
          <Link
            href="/category/bedsheet/comforter-set"
            className="px-5 py-3 rounded-full text-medium font-semibold text-white bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-white/20 transition-all duration-300 animate-pulse"
          >
            View Comforter Set <span className="inline-block ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}