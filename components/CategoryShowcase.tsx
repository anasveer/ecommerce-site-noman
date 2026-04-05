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
];

export default function CategoryShowcase() {
  return (
    <section className="bg-transparent py-10 sm:bg-[#07101f] sm:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-[#d4af37] text-sm uppercase tracking-[0.35em] font-semibold mb-3">
            Main Categories in Bedsheet
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Discover curated bedsheet categories
          </h2>
          <p className="mt-4 hidden md:block text-gray-400 text-base md:text-lg leading-relaxed">
            A professional showcase of premium collections with elegant imagery, soft animations,
            and quick access to the perfect page for every bedsheet style.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-[2rem] bg-transparent p-4 sm:border sm:border-white/10 sm:bg-gradient-to-br sm:from-white/5 sm:via-white/10 sm:to-white/5 sm:p-5 sm:shadow-[0_20px_45px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(212,175,55,0.18)]"
            >
              <div className="hidden sm:block absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-2xl" />
              <div className="hidden sm:block absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#d4af37]/15 to-transparent blur-2xl" />

              <div className="relative flex h-full flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e8b2] to-[#d4af37] p-[2px] shadow-[0_15px_30px_rgba(212,175,55,0.15)]">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-950">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <p className="hidden sm:block text-xs leading-snug text-gray-400">{category.subtitle}</p>
                </div>

                <span className="mt-auto hidden sm:inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-2 text-xs font-semibold text-[#f8f1ce] transition duration-300 group-hover:bg-[#d4af37]/20 group-hover:text-white">
                  View page <span className="text-[#d4af37]">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
