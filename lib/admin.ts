import mongoose, { Schema, models, model } from "mongoose";

const AdminSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

export const Admin =
  models.Admin || model("Admin", AdminSchema);