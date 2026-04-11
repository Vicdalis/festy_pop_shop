import Link from "next/link";
import { motion } from "framer-motion";
import './banner.css';

export default function ProductBannerComponent() { //Filter Products from type of category 
    const products = [
        { name: "Globos", id: 'globos', image: "bg-[url(/products/product-category/decoracion3.jpg)]", color: "bg-blue-500" },
        { name: "Velas", id: 'velas', image: "bg-[url(/products/product-category/velas.jpg)]", color: "bg-yellow-500" },
        { name: "Piñatas", id: 'piñatas',  image: "bg-[url(/products/product-category/pinata_pony.jpg)]", color: "bg-green-500" },
        { name: "Afiches", id: 'afiches', image:  "bg-[url(/products/product-category/afiche2.jpg)]", color: "bg-red-500" },
        { name: "Hora Loca", id: 'hora-locA', image: "bg-[url(/products/product-category/hora_loca.jpg)]",  color: "bg-purple-500" },
        { name: "Decoración", id: 'decoracion-fiesta', image: "bg-[url(/products/product-category/decoracion2.jpg)]", color: "bg-pink-500" },
    ];

    return (
        <div className="custom-container flex justify-center flex-wrap">
            <div>
                {/* Left Items select */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products.map((product, index) => (
                        <Link key={product.id} href={`/productos?product=${product.id}`}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="relative flex flex-col items-center justify-center gap-6 p-6 border border-transparent cursor-pointer h-64"
                            >
                                {/* Background image or color */}
                                <div 
                                    className={`absolute inset-0 bg-cover bg-center ${product.image ?? product.color}  no-repeat bg-center-bottom bg-size[250px] rounded-2xl`}
                                ></div>
                                {/* Dark overlay - adjust opacity as needed */}
                                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                                {/* Content on top */}
                                <span className="font-semibold z-1 text-shadow-lg md:text-subtitles text-[1.3rem] font-title text-white uppercase">{product.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}