import { fetchJson } from '@/lib/api/http';
import type { Ocassion } from '@/types/ocassion';

// GET /occasion; si falla se devuelve [] porque el filtro no debe bloquear el catalogo
export async function getOccasions(): Promise<Ocassion[]> {
    if (!process.env.NEXT_PUBLIC_MAIN_API || !process.env.NEXT_PUBLIC_GET_OCCASIONS) {
        return [];
    }

    const endpoint = [process.env.NEXT_PUBLIC_MAIN_API, process.env.NEXT_PUBLIC_GET_OCCASIONS].join('/');

    try {
        const response = await fetchJson<(Ocassion & { active?: boolean })[]>(endpoint);
        return response
            .filter((occasion) => occasion.active !== false)
            .map(({ id, name }) => ({ id, name }));
    } catch (error) {
        console.error('Unable to fetch occasions from API.', error);
        return [];
    }
}
