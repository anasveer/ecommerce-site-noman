"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BEDSHEET_SUBCATEGORIES } from "@/lib/constants";

type Product = {
  _id: string;
  title: string;
  price: number;
  barcode: string;
  mainCategory: string;
  subCategory?: string;
  images: { url: string }[];
};

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  async function loadProducts() {
    const params = new URLSearchParams();
    if (mainCategory) params.set("mainCategory", mainCategory);
    if (subCategory) params.set("subCategory", subCategory);

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, [mainCategory, subCategory]);

  async function removeProduct(id: string) {
    const ok = window.confirm(
      "Are you sure? This product will be removed permanently from database."
    );

    if (!ok) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadProducts();
    } else {
      alert("Failed to remove product");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-black">All Products</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <select
          value={mainCategory}
          onChange={(e) => {
            setMainCategory(e.target.value);
            setSubCategory("");
          }}
          className="h-12 rounded-2xl border border-slate-300 px-4 text-black"
        >
          <option value="">All Main Categories</option>
          <option value="fabric">Fabric</option>
          <option value="bedsheet">Bedsheet</option>
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={mainCategory !== "bedsheet"}
          className="h-12 rounded-2xl border border-slate-300 px-4 text-black"
        >
          <option value="">All Bedsheet Categories</option>
          {BEDSHEET_SUBCATEGORIES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4">Image</th>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Barcode</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Main</th>
              <th className="px-5 py-4">Sub</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-slate-100">
                <td className="px-5 py-4">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.title}
                    className="h-14 w-14 rounded-xl object-cover border"
                  />
                </td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  {product.title}
                </td>
                <td className="px-5 py-4">{product.barcode}</td>
                <td className="px-5 py-4">Rs. {product.price}</td>
                <td className="px-5 py-4 capitalize">{product.mainCategory}</td>
                <td className="px-5 py-4 capitalize">{product.subCategory || "-"}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/edit-product/${product._id}`}
                      className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!products.length && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}