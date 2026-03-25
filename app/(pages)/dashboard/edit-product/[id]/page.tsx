"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BEDSHEET_SUBCATEGORIES } from "@/lib/constants";

type UploadedImage = {
  url: string;
  publicId: string;
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mainCategory, setMainCategory] = useState<"fabric" | "bedsheet">("fabric");
  const [subCategory, setSubCategory] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      setTitle(data.product.title);
      setPrice(String(data.product.price));
      setMainCategory(data.product.mainCategory);
      setSubCategory(data.product.subCategory || "");
      setImages(data.product.images || []);
    }

    if (id) fetchProduct();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        mainCategory,
        subCategory,
        images,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/all-products");
    } else {
      alert("Failed to update product");
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 rounded-2xl border border-slate-300 px-4"
            placeholder="Title"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="h-12 rounded-2xl border border-slate-300 px-4"
            placeholder="Price"
          />

          <select
            value={mainCategory}
            onChange={(e) => {
              setMainCategory(e.target.value as "fabric" | "bedsheet");
              setSubCategory("");
            }}
            className="h-12 rounded-2xl border border-slate-300 px-4"
          >
            <option value="fabric">Fabric</option>
            <option value="bedsheet">Bedsheet</option>
          </select>

          {mainCategory === "bedsheet" && (
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="h-12 rounded-2xl border border-slate-300 px-4"
            >
              <option value="">Select subcategory</option>
              {BEDSHEET_SUBCATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <button className="h-12 rounded-2xl bg-blue-600 px-6 text-white">
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}