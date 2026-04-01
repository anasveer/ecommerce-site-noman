import ProductCard from "@/components/ProductCard";

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

type PageProps = {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
  }>;
};

async function getProducts(mainCategory: string, subCategory: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/products?mainCategory=${mainCategory}&subCategory=${subCategory}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  return res.json();
}

export default async function CategoryPage({ params }: PageProps) {
  const { mainCategory, subCategory } = await params;
  const products: Product[] = await getProducts(mainCategory, subCategory);

  return (
    <section className="min-h-screen py-32 bg-[#0a0f1d]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold mb-3">
            Category Products
          </p>
          <h1 className="text-4xl font-bold text-white capitalize">
            {subCategory.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-400 mt-3">
            Browse all products from this category
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-800 bg-[#0f172a] p-10 text-center">
            <p className="text-gray-400">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}