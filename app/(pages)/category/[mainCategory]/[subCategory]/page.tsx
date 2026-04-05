'use client';

import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FABRICS_3PCS, FABRICS_SINGLE_PAIR } from "@/lib/constants";

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
  fabric?: string;
  kg?: number;
  images: ProductImage[];
};

export default function CategoryPage() {
  const params = useParams();
  const mainCategory = params.mainCategory as string;
  const subCategory = params.subCategory as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);

  const fabricOptions = subCategory === "3pcs-bedsheet" ? FABRICS_3PCS : 
                       subCategory === "single-pair-bedsheet" ? FABRICS_SINGLE_PAIR : [];

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      
      let url = `${baseUrl}/api/products?mainCategory=${mainCategory}&subCategory=${subCategory}`;
      if (selectedFabric) {
        url += `&fabric=${selectedFabric}`;
      }

      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mainCategory, subCategory, selectedFabric]);

  const filteredProducts = selectedFabric 
    ? products.filter(p => p.fabric === selectedFabric)
    : products;

  return (
    <section className="min-h-screen py-12 bg-[#0a0f1d] mt-13">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
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

        {/* Fabric Filter - Show only if available */}
        {fabricOptions.length > 0 && (
          <div className="mb-8">
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedFabric(null)}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedFabric === null
                    ? "bg-[#d4af37] text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                All Fabrics
              </button>
              {fabricOptions.map((fabric) => (
                <button
                  key={fabric.value}
                  onClick={() => setSelectedFabric(fabric.value)}
                  className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                    selectedFabric === fabric.value
                      ? "bg-[#d4af37] text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {fabric.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
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