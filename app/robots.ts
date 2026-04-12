import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/login', '/checkout', '/cart', '/my-orders'],
      },
    ],
    sitemap: 'https://universalbedding.pk/sitemap.xml',
  };
}
