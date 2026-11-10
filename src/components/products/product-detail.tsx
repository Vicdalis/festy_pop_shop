'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/site';
import ProductShareButton from './product-share-button';
import { useSiteOrigin } from './use-site-origin';

export { useSiteOrigin };

export type ProductCardItem = {
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

export function buildQuoteHref(product: { id: number; name: string }, origin: string) {
    const text = `${CONTACT.PHONE_LINK}${prepareWhatsAppText(product.name)}`;
    return `${text}%0A${encodeURIComponent(`${origin}/producto/${product.id}`)}`;
}

export function prepareWhatsAppText(productName: string) {
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

type ProductDetailProps = {
    product: ProductCardItem;
    badge?: string;
    badgeColor?: string;
    quoteHref?: string;
    // h1 en la pagina /producto/[id]; h2 en el popup del catalogo (la pagina ya tiene su h1)
    headingLevel?: 'h1' | 'h2';
};

// Contenido del detalle de producto: lo usa el popup de la tarjeta y la pagina /producto/[id]
export default function ProductDetail({
    product,
    badge = 'Destacado',
    badgeColor = '#8a3dc1',
    quoteHref,
    headingLevel = 'h2',
}: ProductDetailProps) {
    const Heading = headingLevel;
    const siteOrigin = useSiteOrigin();
    const [isQuoted, setIsQuoted] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const resolvedQuoteHref = quoteHref ?? buildQuoteHref(product, siteOrigin);
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
        setActiveImageIndex(0);
    }, [product.id]);

    useEffect(() => {
        if (productImages.length < 2) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setActiveImageIndex((current) => (current + 1) % productImages.length);
            }

            if (event.key === 'ArrowLeft') {
                setActiveImageIndex((current) => (current - 1 + productImages.length) % productImages.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [productImages.length]);

    const showPreviousImage = () => {
        setActiveImageIndex((current) => (current - 1 + productImages.length) % productImages.length);
    };

    const showNextImage = () => {
        setActiveImageIndex((current) => (current + 1) % productImages.length);
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

    return (
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

                <Heading className="font-display text-2xl font-black leading-tight text-[#261033] md:text-4xl">
                    {product.name}
                </Heading>

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
                    {/* Botón "Favorito" oculto temporalmente (ver TODO.md, sección Favoritos). */}
                    <div className="grid grid-cols-1 gap-3">
                        <ProductShareButton product={product} variant="detail" />
                    </div>
                </div>
            </div>
        </div>
    );
}
