import Link from "next/link";
import Card from "./card";
import { motion } from "framer-motion";
import Button from "./button";
import Image from 'next/image';

interface Product {
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

export default function Product() {
    const allProducts: Product[] = [
        { id: 1, name: "Banda y Cintillo F. Cumpleaños", description: "et de Cumpleaños “Feliz Cumpleaños”: Banda de Glitter + Cintillo Holográfico.", price: 34.99, image: "/products/destacados/feliz_cumple.jpg", category: "Decoración", colors: ["Azul", "Plateado", "Dorado", "Rosado", "Fucsia"], occasions: ["Birthday"], featured: true },
        { id: 2, name: "Set globos Kuromi", description: "Set de globos de Kuromi, 5 piezas. Sirve para aire y helio ", price: 28.99, image: "/products/destacados/kuromi_balloon.jpg", category: "Balloons", colors: ["Rosado", "Negro"], occasions: ["Birthday", "Party Kits"], featured: true },
        { id: 3, name: "Combo de piñata Mickey", description: " Combo de piñatas cuadrada con 25 piezas de chuchería para rellenar", price: 45.99, image: "/products/destacados/combo.jpg", category: "Combo Piñatas", colors: [], occasions: ["Birthday"] },
        { id: 4, name: "Set de Globos Labubu", description: "Set de globos labubu, 5 piezas. Disponible en 2 colores", price: 24.99, image: "/products/destacados/labubu.jpg", category: "Balloons", colors: ["Marron", "Rosado"], occasions: ["Birthday", "Party Kits"] },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                allProducts.map((product: Product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: product.id * 0.1 }}
                    >
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
                                    {/* <span className="text-main font-bold text-lg">${product.price.toFixed(2)}</span> */}
                                    <div className="w-full flex justify-center">
                                        <Button className="flex gap-2 mt-6" >Cotizar <Image
                                            src="/whatsapp.png"
                                            alt="Whatssap logo"
                                            width={20}
                                            height={20}
                                            className="object-contain"
                                        /></Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))
            }
        </div>
    )
}