import type { Product } from '@/types/product';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

function toAbsoluteUrl(path: string) {
    return /^https?:\/\//.test(path) ? path : `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

export default function ProductJsonLd({ product }: { product: Product }) {
    if (!siteUrl) return null;

    const images = (product.images?.length ? product.images : [product.main_image]).map(toAbsoluteUrl);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: images,
        sku: product.sku,
        url: `${siteUrl}/producto/${product.id}`,
        ...(product.category && { category: product.category.name }),
        // Sin precio no se declara oferta: el catalogo cotiza por WhatsApp. El precio se muestra en USD ($)
        ...(typeof product.price === 'number' && {
            offers: {
                '@type': 'Offer',
                price: product.price.toFixed(2),
                priceCurrency: 'USD',
                url: `${siteUrl}/producto/${product.id}`,
            },
        }),
    };

    return (
        <script
            type="application/ld+json"
            // "<" escapado para que ningun valor pueda cerrar el script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
