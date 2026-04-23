'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/button';
import type { Product } from '@/types/product';

type ProductCardPreview = Pick<Product, 'id' | 'name' | 'description' | 'image' | 'category' | 'colors'>;

export default function ProductShowcaseCard({
    product,
    index = 0,
    subtitle,
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw',
}: {
    product: ProductCardPreview;
    index?: number;
    subtitle?: string;
    sizes?: string;
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#f1ddce] bg-white shadow-[0_20px_50px_rgba(161,96,70,0.08)]"
        >
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes={sizes}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5">
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7f4c5e]">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                    <h3 className="text-2xl font-bold text-[#4b2737]">{product.name}</h3>
                    {subtitle && (
                        <p className="mt-1 text-sm font-semibold text-[#e7467d]">{subtitle}</p>
                    )}
                    <p className="mt-3 text-sm leading-6 text-[#6f5b65]">{product.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                        <span
                            key={`${product.id}-${color}`}
                            className="inline-flex items-center rounded-full bg-[#fff4ec] px-3 py-1.5 text-xs font-semibold text-[#7a5662]"
                        >
                            {color}
                        </span>
                    ))}
                </div>

                <a
                    href={`https://wa.me/584242214781?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto block w-full"
                >
                    <Button className="flex w-full items-center justify-center gap-2 bg-main py-3 text-sm font-bold uppercase transition hover:opacity-95">
                        <Image
                            src="/whatsapp.png"
                            alt="Logo de WhatsApp"
                            width={18}
                            height={18}
                            className="object-contain"
                        />
                        Cotizar
                    </Button>
                </a>
            </div>
        </motion.article>
    );
}
