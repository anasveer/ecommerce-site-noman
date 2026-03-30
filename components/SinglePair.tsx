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
  images: ProductImage[];
};

async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products?mainCategory=bedsheet&subCategory=single-pair-bedsheet&limit=6`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch single pair bedsheet products");
  }

  return res.json();
}

export default async function ProductSectionSinglePair() {
  const products: Product[] = await getProducts();

  return (
    <section className="py-24 bg-[#0a0f1d]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e8b2] to-[#b08c2e] mb-2">
              Single Pair Bedsheet <span className="text-[#d4af37]">Edition</span>
            </h2>
            <p className="text-gray-300 max-w-xl">
              Experience premium 3D crystal cotton for extraordinary softness.
            </p>
          </div>

          <Link
            href="/category/bedsheet/single-pair-bedsheet"
            className="px-5 py-3 rounded-full text-medium font-semibold text-white bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-white/20 transition-all duration-300 animate-pulse"
          >
            View Single Pair Bedsheet <span className="inline-block ml-2 arrow-shift">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}