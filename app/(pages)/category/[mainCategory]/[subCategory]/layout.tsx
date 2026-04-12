import { Metadata } from 'next';

const categoryMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  '3pcs-bedsheet': {
    title: '3pcs Bedsheet Collection | Crystal Cotton Premium Bedsheets Pakistan',
    description: 'Buy premium 3pcs bedsheet sets in Pakistan. Crystal cotton fabric with lifetime colour guarantee. Includes 1 bedsheet + 2 pillow covers. Wholesale rates available. Fast delivery across Pakistan.',
    keywords: ['3pcs bedsheet pakistan', '3 piece bedsheet', 'crystal cotton bedsheet', 'bedsheet set pakistan', '3pcs bedsheet wholesale', 'cotton bedsheet pakistan', 'premium bedsheet online pakistan'],
  },
  'comforter-set': {
    title: 'Comforter Set | 7pcs Luxury Printed Comforter Sets Pakistan',
    description: 'Shop luxury 7pcs printed comforter sets in Pakistan. King size filled comforter, bedsheet, pillow covers and cushion cover. Premium cotton mix fabric. Fast delivery across Pakistan.',
    keywords: ['comforter set pakistan', '7pcs comforter set', 'king size comforter pakistan', 'printed comforter set', 'luxury bedding pakistan', 'comforter set online', 'winter comforter pakistan'],
  },
  'single-pair-bedsheet': {
    title: 'Single Pair Bedsheet | Premium Crystal Cotton Bedsheets Pakistan',
    description: 'Buy single pair bedsheets in Pakistan. 2 bedsheets + 2 pillow covers. Crystal cotton 3D fabric with lifetime colour guarantee. Stylish designs for modern bedrooms. Fast delivery.',
    keywords: ['single pair bedsheet', 'single bedsheet pakistan', 'pair bedsheet online', 'crystal cotton single bedsheet', 'bedsheet pair pakistan', 'single pair bedding'],
  },
  'water-proof-mattress-cover': {
    title: 'Waterproof Mattress Cover | 100% Waterproof Fitted Sheet Pakistan',
    description: 'Buy 100% waterproof mattress protector in Pakistan. Printed fitted sheet style with PU lamination. King size 72x78 inch. Protects mattress from water and stains. Fast delivery.',
    keywords: ['waterproof mattress cover pakistan', 'mattress protector pakistan', 'waterproof fitted sheet', 'mattress cover online', 'waterproof bedsheet pakistan', 'mattress protector fitted'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ subCategory: string }> }): Promise<Metadata> {
  const { subCategory } = await params;
  const meta = categoryMeta[subCategory];

  if (!meta) {
    return {
      title: `${subCategory.replace(/-/g, ' ')} | Universal Bedding Pakistan`,
      description: 'Shop premium bedding products at Universal Bedding Pakistan.',
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `https://universalbedding.pk/category/bedsheet/${subCategory}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://universalbedding.pk/category/bedsheet/${subCategory}`,
      siteName: 'Universal Bedding',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
