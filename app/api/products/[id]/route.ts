import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/mongodb";
import { ProductModel } from "@/app/model/Product";
import { SubcategoryMetaModel } from "@/app/model/SubcategoryMeta";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// products/[id]/route.ts (GET function update)
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;

  // 1. Current Product dhundo
  const product = await ProductModel.findById(id).lean();
  if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // 2. Same barcode wale dusre products (Colors) dhundo
  const relatedColors = await ProductModel.find({ 
    barcode: product.barcode, 
    _id: { $ne: id } // Current product ko exclude kar do
  }).select("slug images").lean();

  return NextResponse.json({ product, relatedColors });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();

  const updateData = {
    title: body.title,
    slug: slugify(body.title),
    price: Number(body.price),
    mainCategory: body.mainCategory,
    subCategory:
      body.mainCategory === "bedsheet" ? body.subCategory || "" : "",
    images: body.images || [],
  };

  const product = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  await ProductModel.findByIdAndDelete(id);

  return NextResponse.json({ message: "Product removed permanently" });
}