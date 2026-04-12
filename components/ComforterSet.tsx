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
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const res = await fetch(
      `${baseUrl}/api/products?mainCategory=bedsheet&subCategory=comforter-set&limit=6`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.warn("Failed to fetch comforter set products", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Error fetching comforter set products:", err);
    return [];
  }
}

export default async function ProductSectionComforterSet() {
  const products: Product[] = await getProducts();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
              Comforter Set <span className="text-[#1EBD87]">Collection</span>
            </h2>
            <p className="text-gray-500">
              Explore our latest Comforter Set collection
            </p>
          </div>

          {/* Desktop View Button (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <Link
              href="/category/bedsheet/comforter-set"
              className="btn-wave px-5 py-3 rounded-full text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,189,135,0.3)] transition-all duration-300"
            >
              View Comforter Set <span className="inline-block ml-2">→</span>
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
            className="btn-wave px-5 py-3 rounded-full text-sm font-semibold text-white shadow-[0_10px_30px_rgba(30,189,135,0.3)] transition-all duration-300"
          >
            View Comforter Set <span className="inline-block ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}