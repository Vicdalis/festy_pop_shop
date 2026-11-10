import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { getProductsForServer, type ProductFilters } from '@/lib/products/service';
import type { InitialProducts } from '@/store/hooks/use-products';
import { PRODUCTS_PER_PAGE } from './constants';

// El canonical ignora los filtros (?ocasion=, ?color=...): todas las combinaciones apuntan al catalogo
export const metadata: Metadata = {
    title: 'Catálogo de globos, piñatas y artículos para fiestas',
    description: 'Explora el catálogo de FestyPOP: globos, piñatas, afiches, cotillones y decoración para cumpleaños, baby showers y todas tus celebraciones en Caracas.',
    alternates: { canonical: '/producto' },
};

type PageProps = {
    searchParams: Promise<{ tipo?: string | string[]; ocasion?: string | string[] }>;
};

function firstValue(value?: string | string[]) {
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
}

function toPositiveId(value: string) {
    const id = Number(value);
    return value !== '' && Number.isInteger(id) && id > 0 ? id : null;
}

// Primera pagina en el servidor para que el HTML inicial traiga los productos (SEO, LCP y CLS).
// La respuesta del API queda en la cache de datos (revalidate en getProductsForServer); si falla,
// el cliente la pide como antes. Los filtros deben coincidir con los que arma ProductsClient al montar.
async function getInitialProducts(tipo: string, ocasion: string): Promise<InitialProducts | null> {
    const categoryId = toPositiveId(tipo);
    const occasionId = toPositiveId(ocasion);

    // Un ?tipo= que no es id (nombre antiguo) lo resuelve el cliente
    if (tipo !== '' && categoryId === null) return null;

    const filters: ProductFilters = {
        ...(categoryId !== null ? { category: categoryId } : {}),
        ...(occasionId !== null ? { occasion: occasionId } : {}),
        limit: PRODUCTS_PER_PAGE,
    };

    try {
        return { filters, result: await getProductsForServer({ ...filters, page: 1 }) };
    } catch (error) {
        console.error('Unable to prefetch catalog products on the server.', error);
        return null;
    }
}

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;
    const tipo = firstValue(params.tipo).replace(/\+/g, ' ');
    const ocasion = firstValue(params.ocasion);
    const initialProducts = await getInitialProducts(tipo, ocasion);

    return <ProductsClient tipo={tipo} ocasion={ocasion} initialProducts={initialProducts} />;
}
