import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/app/model/Product";
import Link from "next/link";
import { notFound } from "next/navigation";

const CONTENT_MAP: any = {
  "single-pair-bedsheet": {
    fabric: "Crystal cotton 💯",
    note: "Colour and Fabric Life Time Guaranteed 😇",
    details: ["2 Bedsheet Size 150/240cm", "2 Pillows Cover 45/70cm"],
    footer: "Wholesale Rate For Resellers"
  },
  "3pcs-bedsheet": {
    fabric: "Crystal cotton 💯",
    note: "Colour and Stuff LifeTime Guaranteed 😇",
    details: ["1 Bedsheet Size 89/92", "2 Pipping Pillows Cover 19/29"],
    footer: "Wholesale Rate *1399"
  },
  "comforter-set": {
    fabric: "Cotton Mix 100% Fine Stuff",
    note: "7Pc Printed Comforter Set",
    details: ["1 King Comforter", "1 King Bedsheet", "4 Pillows", "1 Cushion"],
    footer: "Premium Quality"
  }
};

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;

  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return notFound();

  // FIX: Only show colors with SAME barcode AND SAME subCategory
  const relatedColors = await ProductModel.find({ 
    barcode: product.barcode,
    subCategory: product.subCategory, 
    _id: { $ne: product._id } 
  }).select("slug images").lean();

  const content = CONTENT_MAP[product.subCategory];

  return (
    <section className="min-h-screen py-16 bg-[#0a0f1d] text-white">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
        {/* Left: Image */}
        <div className="rounded-3xl border border-gray-800 overflow-hidden bg-[#0f172a]">
          <img src={product.images?.[0]?.url} alt={product.title} className="w-full h-[500px] object-cover" />
        </div>

        {/* Right: Info */}
        <div className="space-y-6">
          <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase bg-[#d4af37]/10 px-3 py-1 rounded-full">
            Code: {product.barcode}
          </span>
          <h1 className="text-4xl font-extrabold">{product.title}</h1>
          <p className="text-3xl font-bold text-[#d4af37]">Rs. {product.price}</p>

          {/* Color Variants (Strict Barcode Match) */}
          {relatedColors.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase italic">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {/* Active Color */}
                <div className="w-16 h-16 rounded-xl border-2 border-[#d4af37] overflow-hidden p-0.5">
                  <img src={product.images[0]?.url} className="w-full h-full object-cover rounded-lg opacity-40" />
                </div>
                {/* Other Related Colors */}
                {relatedColors.map((color: any) => (
                  <Link key={color._id} href={`/products/${color.slug}`}>
                    <div className="w-16 h-16 rounded-xl border border-gray-700 hover:border-[#d4af37] transition-all overflow-hidden cursor-pointer">
                      <img src={color.images[0]?.url} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-[#d4af37] text-black h-14 rounded-2xl font-bold hover:scale-[1.02] transition-transform">Add to Cart</button>
            <button className="flex-1 border border-gray-700 h-14 rounded-2xl font-bold hover:bg-white/5 transition-colors">WhatsApp Order</button>
          </div>

          {/* Benefits */}
          {content && (
            <div className="mt-8 p-6 bg-[#0f172a] border border-gray-800 rounded-3xl">
              <h3 className="font-bold text-[#d4af37] mb-3">Product Specifications:</h3>
              <p className="text-sm mb-2"><strong>Fabric:</strong> {content.fabric}</p>
              <p className="text-green-400 text-sm font-medium mb-4 italic">{content.note}</p>
              <ul className="text-gray-400 text-sm space-y-1">
                {content.details.map((d: string, i: number) => <li key={i}>• {d}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}