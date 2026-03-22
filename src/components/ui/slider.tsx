import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
    name: string;
    image: string;
}

interface ProductSliderProps {
    seasonProducts: Product[];
    autoPlayInterval?: number;
}

export default function ProductSlider ({ seasonProducts, autoPlayInterval = 5000 }: ProductSliderProps) {
    const [startIndex, setStartIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    //   const autoPlayInterval = props.autoPlayInterval || 5000;
    const productsPerView: number = 3;

    const totalGroups = Math.ceil(seasonProducts.length / productsPerView);
    const currentGroup = Math.floor(startIndex / productsPerView);

    const handleSlideChange = (newIndex: number): void => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setStartIndex(newIndex);
    };

    const nextSlide = useCallback((): void => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        handleSlideChange((startIndex + 1) % seasonProducts.length);
        setStartIndex((prevIndex) => (prevIndex + 1) % seasonProducts.length);
    }, [isTransitioning, seasonProducts.length]);

    const prevSlide = (): void => {
        handleSlideChange(startIndex === 0 ? seasonProducts.length - 1 : startIndex - 1);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsTransitioning(false), 300);
        return () => clearTimeout(timer);
    }, [startIndex]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isHovered) {
            timer = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isHovered, autoPlayInterval, startIndex]);

    return (
        <div className="relative w-full group ">
            {/* Slider container */}
            <div className="overflow-hidden rounded-xl mr-[40px] ml-[40px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${startIndex * (100 / productsPerView)}%)` }}
                >
                    {seasonProducts.map((product, index) => (
                        <div key={`${product.name}-${index}`} className="flex-shrink-0 w-full max-h-[450px] sm:w-1/2 lg:w-1/3 px-3">
                            <div className="text-center hover:bg-white/25 h-full  transition-all duration-300 hover:scale-[1.03] cursor-pointer">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons with hover effect */}
            <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg 
                   bg-new-green hover:bg-white hover:scale-110 transition-all group-hover:opacity-100 
                   disabled:opacity-30 disabled:cursor-not-allowed z-10 cursor-pointer"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-5 h-5 text-black" />
            </button>

            <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg 
                   bg-new-green hover:bg-white hover:scale-110 transition-all group-hover:opacity-100 
                   disabled:opacity-30 disabled:cursor-not-allowed z-10 cursor-pointer"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-5 h-5 text-black" />
            </button>

            {/* Dots indicator - single active dot */}
            <div className="flex justify-center mt-4 gap-1.5">
                {Array.from({ length: totalGroups }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlideChange(index * productsPerView)}
                        disabled={isTransitioning}
                        className={`transition-all duration-300 ${currentGroup === index
                            ? 'w-6 h-2 bg-main rounded-full'
                            : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                            }`}
                        aria-label={`Ir a grupo ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};