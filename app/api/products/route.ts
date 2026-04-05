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
  const fabric = searchParams.get("fabric");
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
    if (fabric) filter.fabric = fabric;
  }

  try {
    const products = await ProductModel.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    const enrichedProducts = products.map(p => ({
      ...p,
      kg: Number(p.kg || 1),
    }));
    return NextResponse.json(enrichedProducts);
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

    const bedsheetSubcategories = ["3pcs-bedsheet", "single-pair-bedsheet"];
    if (bedsheetSubcategories.includes(body.subCategory) && !body.fabric) {
      return NextResponse.json({ error: "Fabric is required for this bedsheet category." }, { status: 400 });
    }

    const slug = slugify(body.title) + "-" + Date.now();

    if (typeof body.kg !== 'number' && typeof body.kg !== 'string') {
      return NextResponse.json({ error: "Product weight (kg) is required." }, { status: 400 });
    }

    const kgValue = Number(body.kg);
    if (Number.isNaN(kgValue) || kgValue < 1 || kgValue > 10) {
      return NextResponse.json({ error: "Product weight must be a number between 1 and 10." }, { status: 400 });
    }

    const product = await ProductModel.create({
      title: body.title,
      slug: slug,
      price: Number(body.price),
      barcode: body.barcode.trim(),
      mainCategory: body.mainCategory,
      subCategory: body.subCategory || "",
      fabric: body.fabric || "",
      kg: kgValue,
      images: body.images || [],
    });

    const productObj = product.toObject ? product.toObject() : product;
    console.log('✅ Product created with kg:', { kg: productObj.kg, title: productObj.title });
    
    return NextResponse.json({
      ...productObj,
      kg: Number(productObj.kg || kgValue),
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}