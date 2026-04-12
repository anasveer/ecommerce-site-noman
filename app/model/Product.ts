import "server-only";
import mongoose, { Schema, model, models } from "mongoose";

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
}, { _id: false });

const ProductSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  barcode: { type: String, required: true }, // Search optimized
  mainCategory: { type: String, required: true, enum: ["fabric", "bedsheet"] },
  subCategory: { type: String, enum: ["comforter-set", "3pcs-bedsheet", "single-pair-bedsheet", "water-proof-mattress-cover", ""], default: "" },
  fabric: { type: String, default: "" }, // Fabric type for bedsheets
  kg: { type: Number, required: true, min: 1, max: 10, default: 1 },
  images: { type: [ProductImageSchema], default: [] },
}, { timestamps: true });

ProductSchema.index({ barcode: 1 });
ProductSchema.index({ fabric: 1 });
ProductSchema.index({ title: "text" }); // Text search enabled

export const ProductModel = models.Product || model("Product", ProductSchema);