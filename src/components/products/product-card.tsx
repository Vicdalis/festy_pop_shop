'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Images, X } from 'lucide-react';
import { CONTACT } from '@/config/site';

type ProductCardItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    images?: string[];
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
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const resolvedQuoteHref =
        quoteHref
        ?? `${CONTACT.PHONE_LINK}?text=${encodeURIComponent(`Hola, quiero cotizar ${product.name}`)}`;

    const resolvedMetaChip =
        metaChip
        ?? (product.colors.length > 0 ? `${product.colors.length} colores` : 'Edición temática');

    const hasPrice = typeof product.price === 'number';
    const productImages = useMemo(() => {
        if (Array.isArray(product.images) && product.images.length > 0) {
            return product.images;
        }

        return [product.image];
    }, [product.image, product.images]);
    const activeImage = productImages[activeImageIndex] ?? product.image;

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

            if (productImages.length < 2) {
                return;
            }

            if (event.key === 'ArrowRight') {
                setActiveImageIndex((current) => (current + 1) % productImages.length);
            }

            if (event.key === 'ArrowLeft') {
                setActiveImageIndex((current) => (current - 1 + productImages.length) % productImages.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGalleryOpen, productImages.length]);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [product.id]);

    const openGallery = () => {
        setActiveImageIndex(0);
        setIsGalleryOpen(true);
    };

    const showPreviousImage = () => {
        setActiveImageIndex((current) => (current - 1 + productImages.length) % productImages.length);
    };

    const showNextImage = () => {
        setActiveImageIndex((current) => (current + 1) % productImages.length);
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
                <button
                    type="button"
                    onClick={openGallery}
                    className="absolute inset-0 block cursor-zoom-in"
                    aria-label={`Ver imagen ampliada de ${product.name}`}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes={sizes}
                    />
                </button>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#261033]/55 via-[#261033]/15 to-transparent" />
                <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.05em] text-white shadow-[0_8px_18px_rgba(38,16,51,0.18)]"
                    style={{ backgroundColor: badgeColor }}
                >
                    {badge}
                </span>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.05em] text-[#5d1588] shadow-[0_8px_18px_rgba(38,16,51,0.14)]">
                    <Images className="h-3.5 w-3.5" />
                    {productImages.length > 1 ? `${productImages.length} fotos` : 'Ampliar'}
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
                        {product.name}
                    </h3>
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

            {isMounted && isGalleryOpen && createPortal(
                <div
                    className="fixed inset-0 z-[300] bg-black/88 backdrop-blur-md"
                    onClick={() => setIsGalleryOpen(false)}
                >
                    <div
                        className="flex h-full w-full items-center justify-center p-3 md:p-6"
                    >
                        <div
                            className="relative flex h-[92vh] w-[96vw] max-w-[1600px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#120916] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setIsGalleryOpen(false)}
                                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:scale-105 hover:bg-white/18"
                                aria-label={`Cerrar galería de ${product.name}`}
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="grid h-full min-h-0 gap-4 p-3 md:grid-cols-[minmax(0,1fr)_148px] md:p-5">
                                <div className="relative min-h-0 overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_45%),linear-gradient(180deg,#1b0e23_0%,#0f0814_100%)]">
                                    <Image
                                        src={activeImage}
                                        alt={`${product.name} ${activeImageIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="95vw"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5 text-white">
                                        <p className="font-display text-xl font-black md:text-2xl">{product.name}</p>
                                        <p className="mt-1 text-sm text-white/70">
                                            Imagen {activeImageIndex + 1} de {productImages.length}
                                        </p>
                                    </div>

                                    {productImages.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={showPreviousImage}
                                                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:scale-105 hover:bg-white/22"
                                                aria-label={`Ver imagen anterior de ${product.name}`}
                                            >
                                                <ChevronLeft className="h-6 w-6" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={showNextImage}
                                                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition hover:scale-105 hover:bg-white/22"
                                                aria-label={`Ver siguiente imagen de ${product.name}`}
                                            >
                                                <ChevronRight className="h-6 w-6" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {productImages.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto">
                                        {productImages.map((image, imageIndex) => {
                                            const isActiveImage = imageIndex === activeImageIndex;

                                            return (
                                                <button
                                                    key={`${product.id}-${imageIndex}-${image}`}
                                                    type="button"
                                                    onClick={() => setActiveImageIndex(imageIndex)}
                                                    className={`relative h-24 min-h-24 min-w-24 overflow-hidden rounded-2xl border-2 transition md:h-28 md:min-w-0 ${isActiveImage
                                                        ? 'border-[#e7467d] shadow-[0_12px_24px_rgba(231,70,125,0.25)]'
                                                        : 'border-white/10 hover:border-white/30'
                                                        }`}
                                                    aria-label={`Ver imagen ${imageIndex + 1} de ${product.name}`}
                                                >
                                                    <Image
                                                        src={image}
                                                        alt={`${product.name} miniatura ${imageIndex + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="112px"
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </motion.article>
    );
}
