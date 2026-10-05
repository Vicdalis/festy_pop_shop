'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Image as ImageIcon, Images, MessageCircle, Share2, X } from 'lucide-react';
import { CONTACT } from '@/config/site';

type ProductCardItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    images?: string[];
    category: string;
    character?: string;
    isPersonalized?: boolean;
    colors: { id?: number; name: string; hex?: string | null }[];
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
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const prepareWhatsAppText = (productName: string) => {
        // 1. Normalizar acentos (á → a, é → e, etc.)
        // 2. Reemplazar espacios por +
        // 3. Eliminar caracteres especiales que puedan romper la URL
        return `cotizar: ${productName}`
            .normalize("NFD")              // Separa acentos de letras
            .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
            .replace(/[^\w\s]/g, "")       // Elimina puntuación (!,?,.,etc)
            .trim()                        // Elimina espacios al inicio/final
            .replace(/\s+/g, "+");         // Espacios se convierten en +
    }

    const resolvedQuoteHref =
        quoteHref
        ?? `${CONTACT.PHONE_LINK}${prepareWhatsAppText(product.name)}`;

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

    const handleShare = async () => {
        const shareData = { title: product.name, text: product.name, url: window.location.href };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // El usuario cancelo el dialogo de compartir
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(shareData.url);
            setIsLinkCopied(true);
            window.setTimeout(() => setIsLinkCopied(false), 1600);
        } catch {
            // Sin acceso al portapapeles: no se muestra confirmacion
        }
    };

    const dragOffset = touchStartX !== null && touchEndX !== null ? touchEndX - touchStartX : 0;

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        setTouchStartX(event.touches[0]?.clientX ?? null);
        setTouchEndX(null);
    };

    const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
        setTouchEndX(event.touches[0]?.clientX ?? null);
    };

    const handleTouchEnd = () => {
        if (productImages.length < 2 || touchStartX === null || touchEndX === null) {
            setTouchStartX(null);
            setTouchEndX(null);
            return;
        }

        const swipeDistance = touchStartX - touchEndX;
        const minimumSwipeDistance = 50;

        if (swipeDistance > minimumSwipeDistance) {
            showNextImage();
        } else if (swipeDistance < -minimumSwipeDistance) {
            showPreviousImage();
        }

        setTouchStartX(null);
        setTouchEndX(null);
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
                <button
                    type="button"
                    className="absolute right-2 top-2 md:right-4 md:top-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white/95 text-main-purple shadow-[0_8px_18px_rgba(38,16,51,0.12)] transition hover:scale-110"
                    aria-label={`Guardar ${product.name}`}
                    onClick={() => setIsWished((current) => !current)}
                >
                    <Heart
                        className={`h-4 w-4 transition-colors ${isWished ? 'fill-[#e7467d] text-[#e7467d]' : ''}`}
                    />
                </button>
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

                    <div className="flex gap-2 mt-3">
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

                        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] md:overflow-hidden">
                            <div className="flex flex-col md:min-h-0">
                                <div
                                    className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#f3f0ee] md:aspect-auto md:min-h-0 md:flex-1"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div
                                        className="absolute inset-0 flex touch-pan-y"
                                        style={{
                                            transform: `translateX(calc(${-activeImageIndex * 100}% + ${dragOffset}px))`,
                                            transition: touchStartX === null ? 'transform 300ms ease-out' : 'none',
                                        }}
                                    >
                                        {productImages.map((image, imageIndex) => (
                                            <div key={`${product.id}-slide-${imageIndex}`} className="relative h-full w-full shrink-0">
                                                {image?.trim() ? (
                                                    <Image
                                                        src={image}
                                                        alt={`${product.name} ${imageIndex + 1}`}
                                                        fill
                                                        draggable={false}
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 60vw"
                                                    />
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>

                                    {productImages.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={showPreviousImage}
                                                className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#261033] shadow-[0_8px_24px_rgba(38,16,51,0.18)] transition hover:scale-105 md:flex"
                                                aria-label={`Ver imagen anterior de ${product.name}`}
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={showNextImage}
                                                className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#261033] shadow-[0_8px_24px_rgba(38,16,51,0.18)] transition hover:scale-105 md:flex"
                                                aria-label={`Ver siguiente imagen de ${product.name}`}
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}

                                    <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-[#261033]/80 px-3 py-1.5 text-sm font-semibold text-white md:bottom-5 md:left-5 md:px-4 md:py-2">
                                        <ImageIcon className="h-4 w-4" />
                                        {activeImageIndex + 1} / {productImages.length}
                                    </span>
                                </div>

                                {productImages.length > 1 && (
                                    <div className="flex shrink-0 gap-3 overflow-x-auto bg-[#faf6f1] p-3 md:p-4">
                                        {productImages.map((image, imageIndex) => {
                                            const isActiveImage = imageIndex === activeImageIndex;

                                            return (
                                                <button
                                                    key={`${product.id}-${imageIndex}-${image}`}
                                                    type="button"
                                                    onClick={() => setActiveImageIndex(imageIndex)}
                                                    className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition md:h-20 md:w-20 ${isActiveImage
                                                        ? 'border-[#e7467d] shadow-[0_8px_18px_rgba(231,70,125,0.25)]'
                                                        : 'border-white opacity-80 hover:opacity-100'
                                                        }`}
                                                    aria-label={`Ver imagen ${imageIndex + 1} de ${product.name}`}
                                                >
                                                    {image?.trim() !== '' && image?.length > 0 ? (
                                                        <Image
                                                            src={image}
                                                            alt={`${product.name} miniatura ${imageIndex + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                        />
                                                    ) : null}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-5 p-5 md:min-h-0 md:overflow-y-auto md:p-8 md:pr-10">
                                <div className="flex flex-wrap gap-2 md:pr-14">
                                    <span
                                        className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.05em] text-white md:px-4 md:py-1.5 md:text-sm"
                                        style={{ backgroundColor: badgeColor }}
                                    >
                                        {badge}
                                    </span>
                                    {product.category && product.category !== badge && (
                                        <span className="rounded-full bg-[#f3e8fc] px-3 py-1 text-xs font-black uppercase tracking-[0.05em] text-[#8a3dc1] md:px-4 md:py-1.5 md:text-sm">
                                            {product.category}
                                        </span>
                                    )}
                                </div>

                                <h2 className="font-display text-2xl font-black leading-tight text-[#261033] md:text-4xl">
                                    {product.name}
                                </h2>

                                {hasPrice && (
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#9f8a95] md:text-sm">Desde</p>
                                        <p className="font-display text-4xl font-black leading-none text-main-purple md:text-5xl">
                                            ${product.price?.toFixed(2) ?? '0.00'}
                                        </p>
                                    </div>
                                )}

                                {product.description && (
                                    <div className="space-y-2">
                                        <p className="font-display text-base font-black text-[#261033] md:text-lg">Descripción</p>
                                        <p className="text-sm leading-6 text-[#6b6b6b] md:text-base">{product.description}</p>
                                    </div>
                                )}

                                {(product.category || hasColors || typeof product.isPersonalized === 'boolean') && (
                                <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 rounded-2xl bg-[#faf6f1] px-6 py-4 text-sm md:text-base">
                                    {product.category && (
                                        <>
                                            <dt className="text-[#9f8a95]">Tipo de producto</dt>
                                            <dd className="font-semibold text-[#261033]">{product.category}</dd>
                                        </>
                                    )}
                                    {hasColors && (
                                        <>
                                            <dt className="text-[#9f8a95]">Color</dt>
                                            <dd className="font-semibold text-[#261033]">{product.colors.map((color) => color.name).join(', ')}</dd>
                                        </>
                                    )}
                                    {typeof product.isPersonalized === 'boolean' && (
                                        <>
                                            <dt className="text-[#9f8a95]">Personalizado</dt>
                                            <dd className="font-semibold text-[#261033]">{product.isPersonalized ? 'Sí' : 'No'}</dd>
                                        </>
                                    )}
                                </dl>
                                )}

                                <div className="mt-auto space-y-3 pt-2">
                                    <a
                                        href={resolvedQuoteHref}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={handleQuoteClick}
                                        className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-black text-white transition md:py-4 md:text-lg ${isQuoted ? 'bg-[#33c36b]' : 'bg-main-purple hover:bg-light-pink'}`}
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        Cotizar por WhatsApp
                                    </a>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsWished((current) => !current)}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#ebe4f0] px-4 py-3 text-sm font-bold text-[#261033] transition hover:border-[#e7467d] md:text-base"
                                        >
                                            <Heart className={`h-5 w-5 text-[#e7467d] ${isWished ? 'fill-[#e7467d]' : ''}`} />
                                            Favorito
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleShare}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#ebe4f0] px-4 py-3 text-sm font-bold text-[#261033] transition hover:border-[#8a3dc1] md:text-base"
                                        >
                                            <Share2 className="h-5 w-5 text-[#8a3dc1]" />
                                            {isLinkCopied ? 'Enlace copiado' : 'Compartir'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body,
            )}
        </motion.article>
    );
}
