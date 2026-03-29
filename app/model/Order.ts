import "server-only";
import mongoose, { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: false },
    barcode: { type: String, required: false },
    mainCategory: { type: String, required: false },
    subCategory: { type: String, required: false },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    user: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, index: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: { type: [OrderItemSchema], default: [] },
    total: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    amountPayable: { type: Number, required: true, min: 0 },
    paymentMode: { type: String, required: true },
    paymentInfo: { type: String, required: true },
    paymentScreenshot: { type: String, required: false },
    status: { type: String, required: true, enum: ["pending", "on-the-way", "completed"], default: "pending" },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true }
);

OrderSchema.index({ id: 1 });
OrderSchema.index({ "user.email": 1 });

export const OrderModel = models.Order || model("Order", OrderSchema);
