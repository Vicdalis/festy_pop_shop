'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getProducts, productFiltersKey, ProductFilters, type ProductsResult } from '@/lib/products/service';
import type { Product } from '@/types/product';

// Primera pagina traida en el servidor (HTML inicial) junto con los filtros con los que se pidio
export type InitialProducts = {
    filters: ProductFilters;
    result: ProductsResult;
};

export function useProducts(filters: ProductFilters = {}, initial?: InitialProducts | null) {
    const [products, setProducts] = useState<Product[]>(initial?.result.products ?? []);
    const [isLoading, setIsLoading] = useState(!initial);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<number | null>(initial?.result.pagination?.total ?? null);
    const [error, setError] = useState<string | null>(null);
    // Filtros de la primera pagina traida por el servidor: mientras no cambien, no se vuelve a pedir
    // (tampoco en el doble montaje de React Strict Mode). Al primer cambio de filtros deja de aplicar.
    const serverFiltersKey = useRef(initial ? productFiltersKey(initial.filters) : null);

    // Un cambio de filtros reinicia la lista desde la primera pagina
    useEffect(() => {
        setPage(1);
    }, [filters.name, filters.category, filters.character, filters.color, filters.limit, filters.personalized, filters.occasion]);

    useEffect(() => {
        let isMounted = true;
        const requestedPage = filters.page ?? page;
        const isFirstPage = requestedPage === 1;

        if (isFirstPage && serverFiltersKey.current !== null) {
            if (productFiltersKey(filters) === serverFiltersKey.current) return;
            serverFiltersKey.current = null;
        }

        async function loadProducts() {
            if (isFirstPage) {
                setIsLoading(true);
            } else {
                setIsLoadingMore(true);
            }
            setError(null);
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
                setError(result.errorMessage ?? null);
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, [filters.name, filters.category, filters.character, filters.color, filters.limit, filters.page, filters.personalized, filters.occasion, page]);

    const hasMore = !error && total !== null && products.length < total;

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
    };
}
