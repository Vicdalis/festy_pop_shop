import { fetchJson } from '@/lib/api/http';

export type CatalogCategory = {
    id: number;
    name: string;
};

// GET /category; si falla se devuelve [] porque el filtro no debe bloquear el catalogo
export async function getCategories(): Promise<CatalogCategory[]> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_CATEGORIES) {
        return [];
    }

    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_CATEGORIES].join('/');

    try {
        const response = await fetchJson<(CatalogCategory & { active?: boolean })[]>(endpoint);
        return response
            .filter((category) => category.active !== false)
            .map(({ id, name }) => ({ id, name }));
    } catch (error) {
        console.error('Unable to fetch categories from API.', error);
        return [];
    }
}
