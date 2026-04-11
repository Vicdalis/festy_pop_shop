import Link from "next/link";
import Card from "./card";
import { motion } from "framer-motion";
import Button from "./button";
import Image from 'next/image';

export interface iProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    colors: string[];
    occasions: string[];
    featured?: boolean;
}

export enum eItemType {
    Contact,
    AddToCart,
}

export default function ProductCard({ buttonType, product }: { buttonType: eItemType, product: iProduct }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                <Link href={`/catalogue?product=${product.id}`}>
                    <Card className="overflow-hidden group hover:shadow-xl h-full transition-shadow border-1 border-gray-300 rounded-2xl hover:border-primary/30">
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-4 text-black">
                            <h3 className="font-display font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
                            <div className="w-full flex justify-center">
                                <Button className="flex gap-2 mt-6" 
                                
                                >Cotizar <Image
                                    src={buttonType === eItemType.Contact ? '' : ''}
                                    alt="Whatssap logo"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                /></Button>
                            </div>
                        </div>
                    </Card>
                </Link>
            }
        </div>
    )
}