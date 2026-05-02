export type Product = {
    id: number;
    name: string;
    price?: number | null;
    image: string;
    category: string;
    character: string;
    colors: string[];
    occasions: string[];
    description: string;
};

export type ProductApiItem = Partial<Product> & {
    id?: number | string;
};
