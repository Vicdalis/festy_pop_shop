import React from 'react';
import Image from 'next/image';
import './pet-banner.css';

interface PetBannerProps {
    imagesUrl: string[];
    altText?: string;
}

const PetBanner: React.FC<PetBannerProps> = ({ imagesUrl, altText = "Best Employee" }) => {
    const n = imagesUrl.length;
    const d = 10; // animation duration in seconds (matches CSS variable --d)

    let originY = 50; // default centered
    if (n > 1) {
        originY = (50 / Math.sin(Math.PI / n)) + 50; // computes percent for transform-origin
    }

    const animationName = `m-${n}`;
    // build keyframes per the SCSS logic
    const keyframesParts: string[] = [];
    keyframesParts.push(`0%,3% { transform: rotate(0deg); }`);
    for (let i = 1; i <= n; i++) {
        const pct = (i / n) * 100;
        const lower = pct - 2;
        const upper = pct + 3;
        const angle = (i / n) * -360;
        keyframesParts.push(`${lower}%,${upper}% { transform: rotate(${angle}deg); }`);
    }
    keyframesParts.push(`98%,100% { transform: rotate(-360deg); }`);
    const keyframes = `@keyframes ${animationName} { ${keyframesParts.join(' ')} }`;

    return (
    <div className="pet-banner bg-[url(/shop/background.jpg)] bg-cover bg-center bg-fixed flex flex-wrap md:flex-nowrap items-center justify-space-around p-8 min-h-[220px] shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
        <div className="flex-1 z-1">
            <h2 className='text-white m-0 bold text-3xl md:text-4xl font-bold text-center md:text-left'>
                Conoce a nuestra mejor empleada!
            </h2>
            <p className='text-white my-4 text-lg text-center md:text-left'>Te presentamos a Raya, nuestra empleada más solicitada</p>
        </div>
        <div className="gallery">
           
                {/* inject generated keyframes for this instance */}
                <style>{keyframes}</style>

                {imagesUrl.map((url, index) => {
                    const i = index + 1; // matches SCSS 1..n
                    const delaySeconds = ((1 - i) / n) * d;
                    return (
                        <Image
                            key={index}
                            src={url}
                            alt={`${altText} ${index + 1}`}
                            width={200}
                            height={200}
                            style={{
                                transformOrigin: `50% ${originY}%`,
                                animationName,
                                animationDuration: `${d}s`,
                                animationTimingFunction: 'cubic-bezier(.5,-0.2,.5,1.2)',
                                animationIterationCount: 'infinite',
                                animationDelay: `${delaySeconds}s`,
                            }}
                        />
                    );
                })}
        </div>
    </div>
); }

export default PetBanner;