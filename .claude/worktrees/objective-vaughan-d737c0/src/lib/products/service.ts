import { fetchJson } from '@/lib/api/http';
import { mockProducts } from '@/lib/products/mock-products';
import type { Product, ProductApiItem } from '@/types/product';

type ProductsApiResponse = ProductApiItem[] | { data?: ProductApiItem[]; products?: ProductApiItem[] };
type ProductsSource = 'api' | 'mock';

export type ProductsResult = {
    products: Product[];
    source: ProductsSource;
    errorMessage?: string;
};

function normalizeProduct(item: ProductApiItem, index: number): Product {
    const fallbackImage = '/products/destacados/combo.jpg';
    const normalizedImages = Array.isArray(item.images)
        ? item.images.filter((image): image is string => typeof image === 'string' && image.length > 0)
        : [];
    const primaryImage = item.image ?? normalizedImages[0] ?? fallbackImage;

    return {
        id: Number(item.id ?? index + 1),
        name: item.name ?? 'Producto sin nombre',
        image: primaryImage,
        images: normalizedImages.length > 0 ? normalizedImages : [primaryImage],
        price: item.price ?? null,
        category: item.category ?? 'Sin categoria',
        character: item.character ?? 'General',
        colors: Array.isArray(item.colors) ? item.colors : [],
        occasions: Array.isArray(item.occasions) ? item.occasions : [],
        description: item.description ?? 'Producto disponible para cotizacion personalizada.',
    };
}

function extractProducts(response: ProductsApiResponse): ProductApiItem[] {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response.products)) {
        return response.products;
    }

    if (Array.isArray(response.data)) {
        return response.data;
    }

    return [];
}

export async function getProducts(): Promise<ProductsResult> {
    const endpoint = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

    if (!endpoint) {
        return {
            products: mockProducts,
            source: 'mock',
        };
    }

    try {
        const response = await fetchJson<ProductsApiResponse>(endpoint);

        const items = extractProducts(response);

        return {
            products: items.length > 0 ? items.map(normalizeProduct) : mockProducts,
            source: items.length > 0 ? 'api' : 'mock',
            errorMessage: items.length > 0 ? undefined : 'La API no devolvio productos, se usaron datos de respaldo.',
        };
    } catch (error) {
        console.error('Unable to fetch products from API, using mock products instead.', error);
        return {
            products: mockProducts,
            source: 'mock',
            errorMessage: 'La API no respondio correctamente, se usaron datos de respaldo.',
        };
    }
}
