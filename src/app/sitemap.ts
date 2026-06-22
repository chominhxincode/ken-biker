import { MetadataRoute } from 'next';
import db from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Configured default base URL
  const settings = await db.getSettings().catch(() => null);
  const siteName = settings?.site_name || 'Ken Motor';
  const baseUrl = 'https://kenmotor.vn';

  // 1. Static Pages
  const routes = [
    '',
    '/vehicles',
    '/tu-van-chon-xe',
    '/so-sanh',
    '/tra-gop',
    '/ban-xe-cu',
    '/lai-thu',
    '/blog',
    '/lien-he'
  ];

  const staticUrls = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  // 2. Dynamic Motorbike Detail URLs
  let vehicleUrls: MetadataRoute.Sitemap = [];
  try {
    const { data: vehicles } = await db.getVehicles({ limit: 500 });
    vehicleUrls = vehicles
      .filter(v => v.is_visible)
      .map(v => ({
        url: `${baseUrl}/vehicles/${v.slug}`,
        lastModified: v.created_at ? new Date(v.created_at).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      }));
  } catch (e) {
    console.error('Sitemap vehicle fetch error:', e);
  }

  // 3. Dynamic Blog Post URLs
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.getPosts();
    blogUrls = posts.map(p => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.created_at ? new Date(p.created_at).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    }));
  } catch (e) {
    console.error('Sitemap blog fetch error:', e);
  }

  return [...staticUrls, ...vehicleUrls, ...blogUrls];
}
