import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    if (!siteUrl) {
        return [];
    }

    const routes = ['', '/home', '/productos', '/contacto'];

    return routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/productos' ? 'weekly' : 'monthly',
        priority: route === '' || route === '/home' ? 1 : 0.8,
    }));
}
