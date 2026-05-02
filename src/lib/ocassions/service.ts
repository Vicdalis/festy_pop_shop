import { fetchJson } from '@/lib/api/http';
import { mockOcassions } from '@/lib/ocassions/mock-ocassions';
import type { Ocassion, OcassionApiItem } from '@/types/ocassion';

type apiResponse = OcassionApiItem[] | { data?: OcassionApiItem[]; products?: OcassionApiItem[] };
type ProductsSource = 'api' | 'mock';

export type ProductsResult = {
    ocassions: Ocassion[];
    source: ProductsSource;
    errorMessage?: string;
};

function normalizeProduct(item: OcassionApiItem, index: number): Ocassion {
    return {
        id: Number(item.id ?? index + 1),
        label: item.label ?? 'Tematica',
        code: item.code ?? 'tema'
    };
}

function extractProducts(response: apiResponse): OcassionApiItem[] {
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
            ocassions: mockOcassions,
            source: 'mock',
        };
    }

    try {
        const response = await fetchJson<apiResponse>(endpoint);

        const items = extractProducts(response);

        return {
            ocassions: items.length > 0 ? items.map(normalizeProduct) : mockOcassions,
            source: items.length > 0 ? 'api' : 'mock',
            errorMessage: items.length > 0 ? undefined : 'La API no devolvio productos, se usaron datos de respaldo.',
        };
    } catch (error) {
        console.error('Unable to fetch products from API, using mock products instead.', error);
        return {
            ocassions: mockOcassions,
            source: 'mock',
            errorMessage: 'La API no respondio correctamente, se usaron datos de respaldo.',
        };
    }
}
