export type Product = {
    id: number;
    name: string;
    price?: number | null;
    main_image: string;
    images: string[];
    category: {
        id: number;
        name: string;
    }[] | null;
    character: {
        id: number;
        name: string;
    }[] | null;
    colors: string[];
    occasions: {
        id: number;
        name: string;
    }[] | null;
    description: string;
    sku: string;
    is_personalized: boolean;
};

export type ProductApiItem = Partial<Product> & {
    id?: number | string;
};

export type Pagination = {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
}
