"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearch() {
      setLoading(true);
      const res = await fetch(`/api/products?q=${query}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    if (query) fetchSearch();
  }, [query]);

  return (
    <section className="min-h-screen py-20 bg-[#0a0f1d] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for: <span className="text-[#d4af37]">"{query}"</span>
        </h1>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p: any) => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 border border-gray-800 rounded-3xl">
            <p className="text-gray-400">No products found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}