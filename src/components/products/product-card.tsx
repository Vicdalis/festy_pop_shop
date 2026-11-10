'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Images, X } from 'lucide-react';
import ProductShareButton from './product-share-button';
import ProductDetail, { buildQuoteHref, type ProductCardItem } from './product-detail';
import { useSiteOrigin } from './use-site-origin';

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
    const siteOrigin = useSiteOrigin();
    const [isQuoted, setIsQuoted] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const resolvedQuoteHref =
        quoteHref
        ?? buildQuoteHref(product, siteOrigin);

    const resolvedMetaChip =
        metaChip
        ?? (product.colors.length > 0 ? `${product.colors.length} colores` : '');

    const hasPrice = typeof product.price === 'number';
    const hasColors = product.colors.length > 0;
    const productImages = useMemo(() => {
        if (Array.isArray(product.images) && product.images.length > 0) {
            return product.images;
        }

        return [product.image];
    }, [product.image, product.images]);

    const handleQuoteClick = () => {
        setIsQuoted(true);

        window.setTimeout(() => {
            setIsQuoted(false);
        }, 1600);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isGalleryOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsGalleryOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGalleryOpen]);

    const openGallery = () => {
        setIsGalleryOpen(true);
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
                <div className="flex flex-wrap items-center gap-1 md:gap-1.5 rounded-full bg-[#f8eefc] px-2 md:px-3 py-1.5 md:py-2">
                    {product.colors.map((color) => (
                        <span
                            key={`${product.id}-${color.id ?? color.name}`}
                            className="h-3.5 w-3.5 md:h-4 md:w-4 rounded-full border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                            style={{ backgroundColor: color.hex || colorSwatchMap[color.name] || '#d9c2f3' }}
                            title={color.name}
                            role="img"
                            aria-label={color.name}
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
            className="group flex flex-col h-full overflow-hidden rounded-2xl md:rounded-[28px] border border-white/70 bg-white shadow-[0_18px_45px_rgba(38,16,51,0.10)] transition-all duration-300 hover:shadow-[0_24px_55px_rgba(38,16,51,0.16)]"
        >
            <div className="relative aspect-[0.95/1] overflow-hidden rounded-b-[24px] bg-[linear-gradient(180deg,#fff7ed_0%,#ffe7f0_100%)]">
                <button
                    type="button"
                    onClick={openGallery}
                    className="absolute inset-0 block cursor-zoom-in"
                    aria-label={`Ver imagen ampliada de ${product.name}`}
                >
                    {product.image?.trim() !== '' && product.image?.length > 0 ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes={sizes}
                        />
                    ) : null}
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#261033]/55 via-[#261033]/15 to-transparent" />
                <span
                    className="absolute left-2 top-2 md:left-4 md:top-4 rounded-full px-2 md:px-3 py-0.5 md:py-1 text-[0.58rem] md:text-[0.68rem] font-black uppercase tracking-[0.05em] text-white shadow-[0_8px_18px_rgba(38,16,51,0.18)]"
                    style={{ backgroundColor: badgeColor }}
                >
                    {badge}
                </span>
                <span className="absolute bottom-2 left-2 md:bottom-4 md:left-4 inline-flex items-center gap-1 md:gap-1.5 rounded-full bg-white/90 px-2 md:px-3 py-0.5 md:py-1 text-[0.58rem] md:text-[0.68rem] font-black uppercase tracking-[0.05em] text-[#5d1588] shadow-[0_8px_18px_rgba(38,16,51,0.14)]">
                    <Images className="h-3.5 w-3.5" />
                    {productImages.length > 1 ? `${productImages.length} fotos` : 'Ampliar'}
                </span>
                {/* Botón de favoritos oculto temporalmente (ver TODO.md, sección Favoritos). */}
            </div>

            <div className="flex flex-col space-y-3 md:space-y-4 p-3 md:p-5 flex-1">
                <div className="space-y-2">
                    <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#8a3dc1]">
                        <a href={viewHref}>
                            {product.category}
                        </a>
                    </p>
                    <h3 className="min-h-[2.5rem] md:min-h-[3.25rem] font-display text-[0.85rem] md:text-[1rem] font-black leading-5 text-[#261033]">
                        {product.name}
                    </h3>
                    <p className="mt-1 hidden text-sm text-[#6b6b6b] md:block">{product.description ? (product.description.length > 100 ? `${product.description.slice(0, 100).trim()}…` : product.description) : ''}</p>
                </div>
                

                <div className="mt-auto">
                    <div className="flex flex-wrap items-end justify-between gap-2 md:gap-3">
                        {hasPrice ? (
                            <div>
                                <p className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#9f8a95]">
                                    Desde
                                </p>
                                <p className="font-display text-[1.15rem] md:text-[1.45rem] font-black leading-none text-main-purple">
                                    ${product.price?.toFixed(2) ?? '0.00'}
                                </p>
                            </div>
                        ) : null}

                        {hasColors && (
                            <div className={`${hasPrice ? '' : 'ml-auto'}`}>
                                {renderColorMeta()}
                            </div>
                        )}
                    </div>

                    <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row">
                        <a
                            href={resolvedQuoteHref}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1"
                            onClick={handleQuoteClick}
                        >
                            <span
                                className={`flex w-full items-center justify-center rounded-full px-3 md:px-4 py-2.5 md:py-3 text-[0.75rem] md:text-[0.82rem] font-black transition ${isQuoted
                                    ? 'bg-[#33c36b] text-white'
                                    : 'bg-main-purple text-white hover:bg-light-pink'
                                    }`}
                            >
                                <Image src="/whatsapp.png" alt="WhatsApp" width={18} height={18} className="inline-block mr-1.5 md:mr-2" />
                                Cotizar
                            </span>
                        </a>
                        <ProductShareButton product={product} />
                    </div>
                </div>
            </div>

            {isMounted && isGalleryOpen && createPortal(
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1a0b2e]/70 p-3 backdrop-blur-sm md:p-6"
                    onClick={() => setIsGalleryOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={product.name}
                        className="relative flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:h-[88vh] md:max-h-[860px] md:max-w-6xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsGalleryOpen(false)}
                            className="absolute right-3 top-3 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#261033] shadow-[0_8px_24px_rgba(38,16,51,0.18)] transition hover:scale-105 md:right-5 md:top-5 md:h-12 md:w-12"
                            aria-label={`Cerrar detalle de ${product.name}`}
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <ProductDetail
                            product={product}
                            badge={badge}
                            badgeColor={badgeColor}
                            quoteHref={resolvedQuoteHref}
                        />
                    </div>
                </div>,
                document.body,
            )}
        </motion.article>
    );
}
