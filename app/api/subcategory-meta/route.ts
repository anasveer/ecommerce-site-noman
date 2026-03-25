import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/mongodb";
import { SubcategoryMetaModel } from "@/app/model/SubcategoryMeta";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const mainCategory = searchParams.get("mainCategory");
  const subCategory = searchParams.get("subCategory") || "";

  const meta = await SubcategoryMetaModel.findOne({
    mainCategory,
    subCategory,
  }).lean();

  return NextResponse.json(meta);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const meta = await SubcategoryMetaModel.findOneAndUpdate(
    {
      mainCategory: body.mainCategory,
      subCategory: body.subCategory || "",
    },
    {
      heading: body.heading,
      descriptionHtml: body.descriptionHtml,
    },
    { upsert: true, new: true }
  );

  return NextResponse.json(meta);
}