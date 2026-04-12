import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/app/model/Product";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailsClient from "../../../../components/ProductDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return { title: 'Product Not Found | Universal Bedding' };

  const image = (product.images as any[])?.[0]?.url || '/logo.png';
  return {
    title: `${product.title} | Universal Bedding Pakistan`,
    description: `Buy ${product.title} at Universal Bedding Pakistan. Premium quality ${product.subCategory?.replace(/-/g, ' ')} with lifetime colour guarantee. Rs. ${product.price}. Fast delivery across Pakistan.`,
    keywords: [product.title, product.subCategory?.replace(/-/g, ' ') || '', 'bedsheet pakistan', 'universal bedding', 'premium bedding pakistan'],
    alternates: { canonical: `https://universalbedding.pk/products/${slug}` },
    openGraph: {
      title: `${product.title} | Universal Bedding`,
      description: `Premium ${product.subCategory?.replace(/-/g, ' ')} - Rs. ${product.price}. Lifetime colour guarantee.`,
      url: `https://universalbedding.pk/products/${slug}`,
      images: [{ url: image, alt: product.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: `Rs. ${product.price} | Premium ${product.subCategory?.replace(/-/g, ' ')} at Universal Bedding Pakistan`,
      images: [image],
    }
  };
}

const CONTENT_MAP: any = {
  "single-pair-bedsheet": {
    fabric: "Crystal cotton 💯",
    note: "Colour and Fabric Life Time Guaranteed 😇",
    details: ["2 Bedsheet Size 150/240cm", "2 Pillows Cover 45/70cm", "With picture & bag packing "],
    footer: "Wholesale Rate For Resellers"
  },
  "3pcs-bedsheet": {
    fabric: "Crystal cotton 💯",
    note: "Colour and Stuff LifeTime Guaranteed 😇",
    details: ["1 Bedsheet Size 89/92", "2 Pipping Pillows Cover 19/29", "With picture & bag packing"],
    footer: "Wholesale Rate *1399"
  },
  "comforter-set": {
    fabric: "Cotton Mix 100% Fine Stuff",
    note: "7Pc Printed Comforter Set",
    details: ["1 King Size Filled Comforter", "1 King Size Bedsheet", "2 Quilted Pillow Cover", "2 Simple Pillow Cover", "1 Quilted Cushion Cover"],
    footer: "Premium Quality"
  },
  "water-proof-mattress-cover": {
    fabric: "",
    note: "PRINTED WATER PROOF MATTRESS COVER#✅ 👉100% water proof 💦mattress protector fitted Sheet Style✅",
    details: ["Standard King size:72*78 Inch (6*6.5)", "💦 proof with bottom side pu lamination"],
    footer: "100% Water Proof"
  }
};

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;

  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return notFound();

  const relatedColors = await ProductModel.find({
    barcode: product.barcode,
    subCategory: product.subCategory,
    _id: { $ne: product._id }
  }).select("slug images").lean();

  const content = CONTENT_MAP[product.subCategory] || null;

  const safeProduct = {
    ...product,
    _id: String(product._id),
    kg: Number(product.kg || 1),
    subCategory: product.subCategory,
    createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : null,
    updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : null,
  };

  console.log('🔍 Product fetched from DB:', { slug, kg: product.kg, title: product.title });

  const safeRelatedColors = relatedColors.map((color: any) => ({
    ...color,
    _id: String(color._id),
  }));

  return <ProductDetailsClient product={safeProduct} relatedColors={safeRelatedColors} content={content} />;
}