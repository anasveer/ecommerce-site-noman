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
        <div className="flex justify-between items-end mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Comforter Set <span className="text-[#d4af37]">Now</span>
            </h2>
            <p className="text-gray-400">
              Explore our latest Comforter Set collection
            </p>
          </div>

          <Link
            href="/category/bedsheet/comforter-set"
            className="text-[#d4af37] text-sm font-semibold hover:underline"
          >
            View All Products →
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