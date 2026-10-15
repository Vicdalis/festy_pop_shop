import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Product {
    name: string;
    image: string;
    price?: string;
    tag?: string;
    tagColor?: string;
}

interface ProductSliderProps {
    seasonProducts: Product[];
    autoPlayInterval?: number;
}

export default function ProductSlider({
    seasonProducts,
    autoPlayInterval = 3000,
}: ProductSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        if (seasonProducts.length <= 1) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % seasonProducts.length);
        }, autoPlayInterval);

        return () => {
            window.clearInterval(timer);
        };
    }, [autoPlayInterval, seasonProducts.length]);

    useEffect(() => {
        const slider = sliderRef.current;
        const activeItem = itemRefs.current[activeIndex];

        if (!slider || !activeItem) {
            return;
        }

        if (!window.matchMedia('(max-width: 767px)').matches) {
            return;
        }

        const targetScrollLeft =
            activeItem.offsetLeft - (slider.clientWidth / 2) + (activeItem.clientWidth / 2);

        slider.scrollTo({
            left: Math.max(0, targetScrollLeft),
            behavior: 'smooth',
        });
    }, [activeIndex]);

    return (
        <div className="relative w-full max-w-full overflow-hidden">
            <div
                ref={sliderRef}
                className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:gap-4 md:overflow-hidden"
            >
                {seasonProducts.map((product, index) => (
                    <div
                        key={`${product.name}-${index}`}
                        ref={(element) => {
                            itemRefs.current[index] = element;
                        }}
                        className="min-w-0 shrink-0 basis-[78%] snap-center rounded-[20px] bg-white p-3 transition-all duration-400 ease-out sm:basis-[62%] sm:p-4 md:basis-0 md:flex-1"
                        style={{
                            opacity: index === activeIndex ? 1 : 0.5,
                            transform: index === activeIndex ? 'scale(1)' : 'scale(0.96)',
                        }}
                    >
                        <div className="relative mb-3 aspect-square overflow-hidden rounded-[14px]">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 70vw, (max-width: 1280px) 33vw, 220px"
                            />
                        </div>
                        <div className="break-words font-display text-[0.95rem] font-bold text-[#261033]">
                            {product.name}
                        </div>
                        {product.price && (
                            <div className="mt-1 font-display text-sm font-extrabold text-[#8a3dc1] sm:text-base">
                               Desde {product.price}
                            </div>
                        )}
                        {product.tag && (
                            <span
                                className="mt-2 inline-block rounded-full px-3 py-1 text-[0.65rem] font-bold text-white"
                                style={{ backgroundColor: product.tagColor ?? '#ff6b9d' }}
                            >
                                {product.tag}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
                {seasonProducts.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                            index === activeIndex
                                ? 'w-6 bg-[var(--color-hero-accent)]'
                                : 'w-2 bg-white/30'
                        }`}
                        aria-label={`Ir al producto ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
