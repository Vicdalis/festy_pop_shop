import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
    title: 'Catálogo de globos, piñatas y artículos para fiestas',
    description: 'Explora el catálogo de FestyPOP: globos, piñatas, afiches, cotillones y decoración para cumpleaños, baby showers y todas tus celebraciones en Caracas.',
    alternates: { canonical: '/producto' },
};

export default function Page() {
    return (
        // useSearchParams obliga a prerenderizar solo este fallback: ocupa al menos una pantalla para que el
        // footer no aparezca arriba y luego salte al hidratar (CLS)
        <Suspense fallback={<div className="container-custom mx-auto min-h-screen max-w-7xl px-5 py-12">Cargando catálogo...</div>}>
            <ProductsClient />
        </Suspense>
    );
}
