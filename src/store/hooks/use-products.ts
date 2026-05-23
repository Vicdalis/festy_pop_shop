'use client';

import { useEffect, useState } from 'react';
import { getProducts, ProductFilters } from '@/lib/products/service';
import type { Product } from '@/types/product';

export function useProducts(filters: ProductFilters = {}) {
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
                const result = await getProducts(filters);

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
    }, [filters.category, filters.character, filters.color, filters.limit, filters.page, filters.theme]);

    return {
        products,
        isLoading,
        error,
        source,
    };
}
