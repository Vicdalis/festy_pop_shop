import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products/service';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Maximo que acepta POST /product por pagina
const PAGE_LIMIT = 50;
// Tope de seguridad para no ciclar si la API devuelve una paginacion inconsistente
const MAX_PAGES = 200;

// Recorre POST /product paginado. Si la API falla (getProducts devuelve errorMessage) se deja de
// recorrer y el sitemap queda con las paginas estaticas y los productos ya leidos.
async function getAllProductIds(): Promise<number[]> {
    const ids = new Set<number>();

    for (let page = 1; page <= MAX_PAGES; page++) {
        const { products, pagination, errorMessage } = await getProducts({ page, limit: PAGE_LIMIT });

        if (errorMessage) break;

        products.forEach((product) => ids.add(product.id));

        const totalPages = pagination?.totalPages ?? page;
        if (products.length === 0 || page >= totalPages) break;
    }

    return [...ids];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (!siteUrl) {
        return [];
    }

    const routes = ['', '/producto', '/contacto'];

    const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/producto' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    const productEntries: MetadataRoute.Sitemap = (await getAllProductIds()).map((id) => ({
        url: `${siteUrl}/producto/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticEntries, ...productEntries];
}
