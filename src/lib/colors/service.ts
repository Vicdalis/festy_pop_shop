import { fetchJson } from '@/lib/api/http';
import type { ProductColor } from '@/types/product';

export type CatalogColor = ProductColor & { id: number };

// GET /colors; si falla se devuelve [] porque el filtro de color no debe bloquear el catalogo
export async function getColors(): Promise<CatalogColor[]> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_COLORS) {
        return [];
    }

    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_COLORS].join('/');

    try {
        const response = await fetchJson<CatalogColor[]>(endpoint);
        return response.map(({ id, name, hex }) => ({ id, name, hex }));
    } catch (error) {
        console.error('Unable to fetch colors from API.', error);
        return [];
    }
}
