'use client';

import Link from "next/link";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { FABRICS_SINGLE_PAIR } from "@/lib/constants";

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

export default function ProductSectionSinglePair() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all single pair products
  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const url = `${baseUrl}/api/products?mainCategory=bedsheet&subCategory=single-pair-bedsheet`;
      
      try {
        console.log("🔍 Fetching from URL:", url);
        const res = await fetch(url, { cache: "no-store" });
        
        if (res.ok) {
          const data = await res.json();
          console.log("✅ API Response - Total products:", data.length);
          console.log("✅ Full API Response:", JSON.stringify(data, null, 2));
          
          // Log each product's fabric value
          data.forEach((p: Product, index: number) => {
            console.log(`Product ${index + 1}: "${p.title}" | Fabric: "${p.fabric}"`);
          });
          
          setAllProducts(data);
          setDisplayProducts(data.slice(0, 8));
        } else {
          console.error("❌ API Error - Status:", res.status);
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle fabric filter click
  const handleFabricClick = (fabric: string | null) => {
    console.log("\n🔘 BUTTON CLICKED");
    console.log("Selected fabric parameter:", fabric);
    console.log("Total products in state:", allProducts.length);
    setSelectedFabric(fabric);
    
    if (fabric === null) {
      console.log("✅ Showing ALL products");
      console.log("Display result:", allProducts.slice(0, 8).length, "products");
      setDisplayProducts(allProducts.slice(0, 8));
    } else {
      console.log(`\n🔍 Filtering for fabric: "${fabric}"`);
      
      const filtered = allProducts.filter(p => {
        const productFabric = p.fabric || "";
        const matches = productFabric === fabric;
        console.log(`  Product "${p.title}": fabric="${productFabric}" | Matches: ${matches}`);
        return matches;
      });
      
      console.log(`❌ Found ${filtered.length} products for fabric "${fabric}"`);
      if (filtered.length === 0) {
        console.log("Available fabrics in products:", [...new Set(allProducts.map(p => p.fabric || "(empty)"))]);
      }
      
      setDisplayProducts(filtered);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-800 mb-2">
              Single Pair Bedsheet <span className="text-[#1EBD87]">Edition</span>
            </h2>
            <p className="text-gray-500 max-w-xl">
              Experience premium collection for extraordinary softness.
            </p>
          </div>

          {/* Laptop View Button */}
          <div className="hidden lg:block">
            <Link
              href="/category/bedsheet/single-pair-bedsheet"
              className="px-5 py-3 rounded-full text-medium font-semibold bg-[#1EBD87] text-white border border-[#1EBD87] shadow-[0_10px_30px_rgba(30,189,135,0.15)] hover:bg-[#17a876] transition-all duration-300"
            >
              View Single Pair Bedsheet <span className="inline-block ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Fabric Selector */}
        <div className="mb-8">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleFabricClick(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                selectedFabric === null
                  ? "bg-[#1EBD87] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#1EBD87] hover:text-[#1EBD87]"
              }`}
            >
              All Fabrics
            </button>
            {FABRICS_SINGLE_PAIR.map((fabric) => (
              <button
                key={fabric.value}
                onClick={() => handleFabricClick(fabric.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                  selectedFabric === fabric.value
                    ? "bg-[#1EBD87] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#1EBD87] hover:text-[#1EBD87]"
                }`}
              >
                {fabric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayProducts.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No products found for this fabric.
          </div>
        )}

        {/* Mobile View Button */}
        <div className="mt-10 lg:hidden flex justify-center">
          <Link
            href="/category/bedsheet/single-pair-bedsheet"
            className="px-5 py-3 rounded-full text-medium font-semibold bg-[#1EBD87] text-white border border-[#1EBD87] shadow-[0_10px_30px_rgba(30,189,135,0.15)] hover:bg-[#17a876] transition-all duration-300"
          >
            View Single Pair Bedsheet <span className="inline-block ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
