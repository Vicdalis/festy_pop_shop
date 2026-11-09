import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// El canonical ignora los filtros (?ocasion=, ?color=...): todas las combinaciones apuntan al catalogo
export const metadata: Metadata = {
    title: 'Catálogo de globos, piñatas y artículos para fiestas',
    description: 'Explora el catálogo de FestyPOP: globos, piñatas, afiches, cotillones y decoración para cumpleaños, baby showers y todas tus celebraciones en Caracas.',
    alternates: { canonical: '/producto' },
};

export default function Page() {
    return (
        <Suspense fallback={<div className="container-custom mx-auto max-w-7xl px-5 py-12">Cargando catálogo...</div>}>
            <ProductsClient />
        </Suspense>
    );
}
