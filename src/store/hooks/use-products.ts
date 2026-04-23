'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/products/service';
import type { Product } from '@/types/product';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [source, setSource] = useState<'api' | 'mock'>('mock');

    useEffect(() => {
        let isMounted = true;

        async function loadProducts() {
            try {
                setIsLoading(true);
                setError(null);
                const result = await getProducts();

                if (isMounted) {
                    setProducts(result.products);
                    setSource(result.source);
                    setError(result.errorMessage ?? null);
                }
            } catch (loadError) {
                if (isMounted) {
                    setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los productos.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        products,
        isLoading,
        error,
        source,
    };
}
