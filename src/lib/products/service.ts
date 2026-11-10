import { fetchJson } from '@/lib/api/http';
import type { Product, ProductApiItem, ProductColor, Pagination } from '@/types/product';

type ProductsApiResponse = ProductApiItem[] | { products: ProductApiItem[], pagination: Pagination };

export type ProductFilters = {
    id?: number;
    // Busqueda por nombre: usa POST /product/search, que solo acepta name, category, page y limit
    name?: string;
    page?: number;
    category?: string | number;
    color?: string | number;
    character?: number;
    occasion?: number;
    personalized?: boolean;
    limit?: number;
};

export type ProductsResult = {
    products: Product[];
    pagination?: Pagination;
    errorMessage?: string;
};

function normalizeColors(colors: unknown): ProductColor[] {
    if (!Array.isArray(colors)) return [];

    return colors.flatMap((color): ProductColor[] => {
        if (typeof color === 'string') return [{ name: color }];
        if (color && typeof color === 'object' && typeof (color as ProductColor).name === 'string') {
            const { id, name, hex } = color as ProductColor;
            return [{ id, name, hex }];
        }
        return [];
    });
}

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
        colors: normalizeColors(item.colors),
        occasions: Array.isArray(item.occasions) ? item.occasions : [],
        sku: item.sku ?? 'SKU no disponible',
        is_personalized: item.is_personalized ?? false,
        description: item.description ?? 'Producto disponible para cotizacion personalizada.',
    };
}

function extractPagination(response: ProductsApiResponse): Pagination | undefined {
    if (Array.isArray(response)) {
        return undefined;
    }

    const { pagination } = response;

    return pagination && typeof pagination.total === 'number' ? pagination : undefined;
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

// Clave estable de los filtros sin la pagina: el cliente la compara con la de los datos que trajo el servidor
export function productFiltersKey(filters: ProductFilters): string {
    const { page: _page, ...rest } = filters;
    return JSON.stringify(Object.keys(rest).sort().map((key) => [key, rest[key as keyof typeof rest]]));
}

// Peticiones en curso por filtros: un montaje doble (React Strict Mode en desarrollo) o varios
// componentes pidiendo lo mismo a la vez comparten una sola llamada al API.
const pendingProducts = new Map<string, Promise<ProductsResult>>();

// Uso en el navegador: si el API falla devuelve una lista vacia con el mensaje de error (nunca datos de respaldo)
export function getProducts(filters: ProductFilters = {}): Promise<ProductsResult> {
    const key = JSON.stringify(filters);
    const pending = pendingProducts.get(key);
    if (pending) return pending;

    const request = requestProducts(filters)
        .catch((error): ProductsResult => {
            console.error('Unable to fetch products from API.', error);
            return { products: [], errorMessage: 'No se pudieron cargar los productos.' };
        })
        .finally(() => pendingProducts.delete(key));
    pendingProducts.set(key, request);
    return request;
}

// Uso en el servidor (HTML inicial): guarda la respuesta en la cache de datos de Next y lanza el error si
// el API falla, para que nunca se guarde una pagina vacia (Next solo cachea respuestas 200).
export function getProductsForServer(filters: ProductFilters = {}, revalidate = 300): Promise<ProductsResult> {
    return requestProducts(filters, { cache: 'force-cache', next: { revalidate } });
}

async function requestProducts(filters: ProductFilters, init?: RequestInit): Promise<ProductsResult> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_PRODUCTS) {
        throw new Error('Api route not available');
    }
    const isSearch = filters.name !== undefined;
    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_PRODUCTS, ...(isSearch ? ['search'] : [])].join('/');
    const body = isSearch
        ? { name: filters.name, category: filters.category, page: filters.page, limit: filters.limit }
        : filters;

    const response = await fetchJson<ProductsApiResponse>(endpoint, {
        ...init,
        method: 'POST',
        body: JSON.stringify(body),
    });

    return {
        products: extractProducts(response).map(normalizeProduct),
        pagination: extractPagination(response),
    };
}

// GET /product/:idProduct; acepta el producto directo o envuelto en { product }
export async function getProductById(id: number): Promise<Product | null> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_PRODUCTS) {
        return null;
    }

    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_PRODUCTS, id].join('/');

    try {
        const response = await fetchJson<ProductApiItem | { product: ProductApiItem }>(endpoint);
        const item = 'product' in response ? response.product : response;

        return item ? normalizeProduct(item, id - 1) : null;
    } catch (error) {
        console.error(`Unable to fetch product ${id} from API.`, error);
        return null;
    }
}
