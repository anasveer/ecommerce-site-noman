import { Schema, model, models } from "mongoose";

const SubcategoryMetaSchema = new Schema(
  {
    mainCategory: {
      type: String,
      required: true,
      enum: ["fabric", "bedsheet"],
    },
    subCategory: {
      type: String,
      enum: ["comforter-set", "3pcs-bedsheet", "single-pair-bedsheet", ""],
      default: "",
    },
    heading: { type: String, required: true, trim: true },
    descriptionHtml: { type: String, required: true },
  },
  { timestamps: true }
);

SubcategoryMetaSchema.index(
  { mainCategory: 1, subCategory: 1 },
  { unique: true }
);

export const SubcategoryMetaModel =
  models.SubcategoryMeta || model("SubcategoryMeta", SubcategoryMetaSchema);