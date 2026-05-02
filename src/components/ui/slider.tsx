import { useEffect, useState } from 'react';
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

    return (
        <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-2 md:overflow-hidden">
                {seasonProducts.map((product, index) => (
                    <div
                        key={`${product.name}-${index}`}
                        className="min-w-[200px] flex-1 rounded-[20px] bg-white p-4 transition-all duration-400 ease-out"
                        style={{
                            opacity: index === activeIndex ? 1 : 0.5,
                            transform: index === activeIndex ? 'scale(1.04)' : 'scale(0.96)',
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
                        <div className="font-display text-[0.95rem] font-bold text-[#261033]">
                            {product.name}
                        </div>
                        {product.price && (
                            <div className="mt-1 font-display text-base font-extrabold text-[#8a3dc1]">
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
