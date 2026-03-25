"use client";

import { useMemo, useState } from "react";
import { BEDSHEET_SUBCATEGORIES } from "@/lib/constants";
import { Upload, ImagePlus } from "lucide-react";

type UploadedImage = {
  url: string;
  publicId: string;
};

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mainCategory, setMainCategory] = useState<"fabric" | "bedsheet">("fabric");
  const [subCategory, setSubCategory] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [barcode, setBarcode] = useState(""); // State exist karti hai

  const showBedsheetSubcategories = useMemo(
    () => mainCategory === "bedsheet",
    [mainCategory]
  );

  async function handleImageUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);

    const uploaded: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        uploaded.push(data);
      } catch (error) {
        console.error("Upload error", error);
      }
    }

    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // FIX: Barcode ko body mein add kiya gaya hai
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price), // Price ko number mein convert karein
        barcode: barcode.trim(), // Barcode ab include ho raha hai
        mainCategory,
        subCategory: mainCategory === "bedsheet" ? subCategory : "",
        images,
      }),
    });

    if (res.ok) {
      setTitle("");
      setPrice("");
      setBarcode(""); // Form reset
      setMainCategory("fabric");
      setSubCategory("");
      setImages([]);
      alert("Product added successfully");
    } else {
      const errorData = await res.json();
      alert("Failed to add product: " + (errorData.error || "Unknown error"));
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900">Add Product</h1>
      <p className="mt-2 text-sm text-slate-500">
        Add products category-wise without mixing data.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(59,130,246,0.10)]"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-600"
              placeholder="Enter product title"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-600"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Barcode Field - Design refined */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700 text-blue-600">
              Product Barcode (Required for color grouping)
            </label>
            <input 
              value={barcode} 
              onChange={(e) => setBarcode(e.target.value)} 
              className="w-full h-12 rounded-2xl border-2 border-blue-50 bg-blue-50/20 px-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-600 font-medium" 
              placeholder="Example: BD-ROSE-101" 
              required 
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Main Product
            </label>
            <select
              value={mainCategory}
              onChange={(e) => {
                setMainCategory(e.target.value as "fabric" | "bedsheet");
                setSubCategory(""); 
              }}
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-600"
            >
              <option value="fabric">Fabric</option>
              <option value="bedsheet">Bedsheet</option>
            </select>
          </div>

          {showBedsheetSubcategories && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bedsheet Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-600"
                required
              >
                <option value="">Select subcategory</option>
                {BEDSHEET_SUBCATEGORIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Upload Images
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-8 text-center">
            <ImagePlus className="h-10 w-10 text-blue-600" />
            <p className="mt-3 text-sm text-slate-600">
              Click to upload product images
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </label>

          {uploading && (
            <p className="mt-3 text-sm text-blue-600 animate-pulse">Uploading images...</p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {images.map((image) => (
              <img
                key={image.publicId}
                src={image.url}
                alt="product"
                className="h-28 w-full rounded-2xl object-cover border border-slate-200"
              />
            ))}
          </div>
        </div>

        <button
          disabled={loading || uploading}
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 px-10 text-white font-bold shadow-[0_12px_30px_rgba(59,130,246,0.30)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          <Upload className="h-5 w-5" />
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}