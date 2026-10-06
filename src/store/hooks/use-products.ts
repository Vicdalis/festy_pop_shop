'use client';

import { useCallback, useEffect, useState } from 'react';
import { getProducts, ProductFilters } from '@/lib/products/service';
import type { Product } from '@/types/product';

export function useProducts(filters: ProductFilters = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [source, setSource] = useState<'api' | 'mock'>('mock');

    // Un cambio de filtros reinicia la lista desde la primera pagina
    useEffect(() => {
        setPage(1);
    }, [filters.category, filters.character, filters.color, filters.limit, filters.personalized, filters.occasion]);

    useEffect(() => {
        let isMounted = true;
        const requestedPage = filters.page ?? page;
        const isFirstPage = requestedPage === 1;

        async function loadProducts() {
            try {
                if (isFirstPage) {
                    setIsLoading(true);
                } else {
                    setIsLoadingMore(true);
                }
                setError(null);
                console.log("FILTRANDO ", filters)
                const result = await getProducts({ ...filters, page: requestedPage });

                if (isMounted) {
                    setProducts((current) => {
                        if (isFirstPage) {
                            return result.products;
                        }

                        const knownIds = new Set(current.map((product) => product.id));
                        return [...current, ...result.products.filter((product) => !knownIds.has(product.id))];
                    });
                    setTotal(result.pagination?.total ?? null);
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
                    setIsLoadingMore(false);
                }
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, [filters.category, filters.character, filters.color, filters.limit, filters.page, filters.personalized, filters.occasion, page]);

    const hasMore = source === 'api' && total !== null && products.length < total;

    const loadMore = useCallback(() => {
        setPage((current) => current + 1);
    }, []);

    return {
        products,
        isLoading,
        isLoadingMore,
        hasMore,
        loadMore,
        error,
        source,
    };
}
