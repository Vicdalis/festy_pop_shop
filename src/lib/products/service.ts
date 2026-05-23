import { fetchJson } from '@/lib/api/http';
import { mockProducts } from '@/lib/products/mock-products';
import type { Product, ProductApiItem, Pagination } from '@/types/product';

type ProductsApiResponse = ProductApiItem[] | { products: ProductApiItem[], pagination: Pagination };
type ProductsSource = 'api' | 'mock';

export type ProductFilters = {
    page?: number;
    category?: string | number;
    color?: string;
    character?: string;
    theme?: string;
    limit?: number;
};

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
    const primaryImage = item.main_image ?? normalizedImages[0] ?? fallbackImage;

    return {
        id: Number(item.id ?? index + 1),
        name: item.name ?? 'Producto sin nombre',
        main_image: primaryImage,
        images: normalizedImages.length > 0 ? normalizedImages : [primaryImage],
        price: item.price ?? null,
        category: item.category ?? null,
        character: item.character ?? null,
        colors: Array.isArray(item.colors) ? item.colors : [],
        occasions: Array.isArray(item.occasions) ? item.occasions : [],
        sku: item.sku ?? 'SKU no disponible',
        is_personalized: item.is_personalized ?? false,
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

    if (Array.isArray(response.pagination)) {
        return response.pagination;
    }

    return [];
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResult> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_PRODUCTS) {
        return {
            products: [],
            source: 'api',
            errorMessage: "Api route not available"
        }
    }
    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_PRODUCTS].join('/');
    
    if (!endpoint) {
        return {
            products: mockProducts,
            source: 'mock',
        };
    }

    try {
        const response = await fetchJson<ProductsApiResponse>(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
        });

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
