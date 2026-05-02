'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CONTACT } from '@/config/site';

type ProductCardItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    colors: string[];
    occasions?: string[];
    price?: number | null;
};

type ProductCardProps = {
    product: ProductCardItem;
    index?: number;
    sizes?: string;
    badge?: string;
    badgeColor?: string;
    metaChip?: string;
    colorDisplay?: 'count' | 'swatches';
    viewHref?: string;
    viewLabel?: string;
    quoteHref?: string;
};

const colorSwatchMap: Record<string, string> = {
    Amarillo: '#ffd21f',
    Azul: '#1463ff',
    Blanco: '#ffffff',
    Celeste: '#8fd3ff',
    Dorado: '#e5b84c',
    Fucsia: '#e91e9a',
    Marron: '#8b5a3c',
    Morado: '#8d1fe8',
    Negro: '#1c1c1c',
    Rojo: '#ef3340',
    Rosado: '#ff7ab8',
};

export default function ProductCard({
    product,
    index = 0,
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw',
    badge = 'Destacado',
    badgeColor = '#8a3dc1',
    metaChip,
    colorDisplay = 'count',
    viewHref,
    viewLabel = 'Ver',
    quoteHref,
}: ProductCardProps) {
    const [isWished, setIsWished] = useState(false);
    const [isQuoted, setIsQuoted] = useState(false);

    const resolvedQuoteHref =
        quoteHref
        ?? `${CONTACT.PHONE_LINK}?text=${encodeURIComponent(`Hola, quiero cotizar ${product.name}`)}`;

    const resolvedMetaChip =
        metaChip
        ?? (product.colors.length > 0 ? `${product.colors.length} colores` : 'Edición temática');

    const hasPrice = typeof product.price === 'number';

    const handleQuoteClick = () => {
        setIsQuoted(true);

        window.setTimeout(() => {
            setIsQuoted(false);
        }, 1600);
    };

    const renderColorMeta = () => {
        if (colorDisplay === 'swatches') {
            if (product.colors.length === 0) {
                return (
                    <div className="rounded-full bg-[#f8eefc] px-3 py-1 text-[0.7rem] font-bold text-[#8a3dc1]">
                        {resolvedMetaChip}
                    </div>
                );
            }

            return (
                <div className="flex items-center gap-1.5 rounded-full bg-[#f8eefc] px-3 py-2">
                    {product.colors.map((color) => (
                        <span
                            key={`${product.id}-${color}`}
                            className="h-4 w-4 rounded-full border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                            style={{ backgroundColor: colorSwatchMap[color] ?? '#d9c2f3' }}
                            title={color}
                            aria-label={color}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div className="rounded-full bg-[#f8eefc] px-3 py-1 text-[0.7rem] font-bold text-[#8a3dc1]">
                {resolvedMetaChip}
            </div>
        );
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(38,16,51,0.10)] transition-all duration-300 hover:shadow-[0_24px_55px_rgba(38,16,51,0.16)]"
        >
            <div className="relative aspect-[0.95/1] overflow-hidden rounded-b-[24px] bg-[linear-gradient(180deg,#fff7ed_0%,#ffe7f0_100%)]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={sizes}
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#261033]/55 via-[#261033]/15 to-transparent" />
                <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.05em] text-white shadow-[0_8px_18px_rgba(38,16,51,0.18)]"
                    style={{ backgroundColor: badgeColor }}
                >
                    {badge}
                </span>
                <button
                    type="button"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-main-purple shadow-[0_8px_18px_rgba(38,16,51,0.12)] transition hover:scale-110"
                    aria-label={`Guardar ${product.name}`}
                    onClick={() => setIsWished((current) => !current)}
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${isWished ? 'fill-[#e7467d] text-[#e7467d]' : ''}`}
                    />
                </button>
            </div>

            <div className="space-y-4 p-5">
                <div className="space-y-2">
                    
                    <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#8a3dc1]">
                        <a href={viewHref}>
                            {product.category}
                    </a>
                    </p>
                    <h3 className="min-h-[3.25rem] font-display text-[1rem] font-black leading-5 text-[#261033]">
                        {product.name} </h3>
                </div>

                <div className="flex items-end justify-between gap-3">
                    {hasPrice ? (
                        <div>
                            <p className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#9f8a95]">
                                Desde
                            </p>
                            <p className="font-display text-[1.45rem] font-black leading-none text-main-purple">
                                ${product.price?.toFixed(2) ?? '0.00'}
                            </p>
                        </div>
                    ) : null}

                    <div className={`${hasPrice ? '' : 'ml-auto'}`}>
                        {renderColorMeta()}
                    </div>
                </div>

                <div className="flex gap-2">
                    <a
                        href={resolvedQuoteHref}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1"
                        onClick={handleQuoteClick}
                    >
                        <span
                            className={`flex w-full items-center justify-center rounded-full px-4 py-3 text-[0.82rem] font-black transition ${isQuoted
                                    ? 'bg-[#33c36b] text-white'
                                    : 'bg-main-purple text-white hover:bg-[var(--color-header-cta)]'
                                }`}
                        >
                            Cotizar
                        </span>
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
