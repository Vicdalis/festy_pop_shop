import { NextResponse } from 'next/server';

// Rutas heredadas de la tienda WordPress/WooCommerce que tuvo antes el dominio. Google las sigue
// rastreando; responder 410 (Gone) le indica que se eliminaron para siempre y las saca del indice
// mas rapido que un 404. No bloquearlas en robots.txt: Google necesita rastrearlas para ver el 410.
export function proxy() {
    return new NextResponse('410 Gone', {
        status: 410,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Robots-Tag': 'noindex',
        },
    });
}

// El matcher es estatico y esta anclado al segmento completo: '/product/:path*' coincide con
// /product y /product/... pero no con /producto (ruta propia del catalogo).
export const config = {
    matcher: [
        // WooCommerce (ingles y espanol)
        '/product/:path*',
        '/product-category/:path*',
        '/product-tag/:path*',
        '/shop/:path*',
        '/tienda/:path*',
        '/cart/:path*',
        '/carrito/:path*',
        '/checkout/:path*',
        '/finalizar-compra/:path*',
        '/my-account/:path*',
        '/mi-cuenta/:path*',
        // WordPress
        '/wp-admin/:path*',
        '/wp-content/:path*',
        '/wp-includes/:path*',
        '/wp-json/:path*',
        '/wp-login.php',
        '/xmlrpc.php',
        '/feed/:path*',
        '/comments/feed/:path*',
        // Parametros de WooCommerce en cualquier ruta (?add-to-cart=, ?remove_item=, ?_wpnonce=, ?wc-ajax=)
        { source: '/:path*', has: [{ type: 'query', key: 'add-to-cart' }] },
        { source: '/:path*', has: [{ type: 'query', key: 'remove_item' }] },
        { source: '/:path*', has: [{ type: 'query', key: '_wpnonce' }] },
        { source: '/:path*', has: [{ type: 'query', key: 'wc-ajax' }] },
    ],
};
