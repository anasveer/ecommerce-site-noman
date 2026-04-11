import Link from "next/link";

const categories = [
  {
    title: "3pcs Bedsheet",
    subtitle: "Premium full set with elegant finishes.",
    image:
      "c2.jpeg",
    href: "/category/bedsheet/3pcs-bedsheet",
  },
  {
    title: "Single Pair Bedsheet",
    subtitle: "Stylish single pair options for modern bedrooms.",
    image:
      "c3.jpeg",
    href: "/category/bedsheet/single-pair-bedsheet",
  },
  {
    title: "Comforter Set",
    subtitle: "Cozy luxury comforter sets with rich textures.",
    image:
      "c1.jpeg",
    href: "/category/bedsheet/comforter-set",
  },
  {
    title: "Water Proof Mattress Cover",
    subtitle: "100% water proof mattress protectors.",
    image:
      "/c4.jpeg",
    href: "/category/bedsheet/water-proof-mattress-cover",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-10 bg-white sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-[#1EBD87] text-sm uppercase tracking-[0.35em] font-bold mb-3">
            Main Categories in Bedsheet
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover curated bedsheet categories
          </h2>
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-[2rem] bg-transparent p-4 sm:border sm:border-gray-200 sm:bg-white sm:p-5 sm:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(30,189,135),0.18)]"
            >
              <div className="hidden sm:block absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#1EBD87]/15 to-transparent blur-2xl" />
              <div className="hidden sm:block absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#1EBD87]/10 to-transparent blur-2xl" />

              <div className="relative flex h-full flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-gradient-to-br from-[#1EBD87] via-[#5dd4a8] to-[#1EBD87] p-[2px] shadow-[0_15px_30px_rgba(30,189,135),0.2)]">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#1EBD87] transition-colors duration-300">{category.title}</h3>
                  <p className="hidden sm:block text-sm leading-snug text-gray-500">{category.subtitle}</p>
                </div>

                <span className="mt-auto hidden sm:inline-flex items-center gap-2 rounded-full border border-[#1EBD87]/40 bg-[#1EBD87]/10 px-4 py-2 text-xs font-semibold text-[#1EBD87] transition duration-300 group-hover:bg-[#1EBD87] group-hover:text-white">
                  View page <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
