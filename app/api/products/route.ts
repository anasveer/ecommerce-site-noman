import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/app/model/Product";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const mainCategory = searchParams.get("mainCategory");
  const subCategory = searchParams.get("subCategory");
  const limit = Number(searchParams.get("limit") || 0);

  let filter: any = {};

  if (q) {
    // Search by Title, Barcode, or Price
    const isNumber = !isNaN(Number(q));
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { barcode: { $regex: q, $options: "i" } },
      { subCategory: { $regex: q, $options: "i" } },
    ];
    if (isNumber) filter.$or.push({ price: Number(q) });
  } else {
    if (mainCategory) filter.mainCategory = mainCategory;
    if (subCategory) filter.subCategory = subCategory;
  }

  try {
    const products = await ProductModel.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Strict Validation: Agar barcode nahi hoga to product save nahi hogi
    if (!body.barcode || !body.title || !body.price) {
      return NextResponse.json({ error: "Title, Price, and Barcode are required!" }, { status: 400 });
    }

    const slug = slugify(body.title) + "-" + Date.now();

    const product = await ProductModel.create({
      title: body.title,
      slug: slug,
      price: Number(body.price),
      barcode: body.barcode.trim(),
      mainCategory: body.mainCategory,
      subCategory: body.subCategory || "",
      images: body.images || [],
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}