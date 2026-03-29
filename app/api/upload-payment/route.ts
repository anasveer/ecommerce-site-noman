import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { base64Data } = await req.json();

    if (!base64Data || typeof base64Data !== 'string') {
      return NextResponse.json({ message: "base64Data is required" }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "ecommerce-payments",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
