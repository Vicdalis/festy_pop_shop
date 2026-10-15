
export default function AnimatedPaintDropSeparator({color, className} : {color: string, className?: string}) {
    const path1 = "M0,60 C100,100 200,20 300,60 C400,100 450,30 500,50 C550,70 600,100 700,40 C800,-20 850,80 950,50 C1050,20 1100,80 1200,60 L1200,120 L0,120 Z";
    const path2 = "M0,70 C100,90 200,30 300,70 C400,90 450,40 500,60 C550,80 600,90 700,50 C800,-10 850,90 950,40 C1050,30 1100,70 1200,70 L1200,120 L0,120 Z";
    const path3 = "M0,50 C100,110 200,10 300,50 C400,110 450,20 500,40 C550,60 600,110 700,30 C800,-30 850,70 950,60 C1050,10 1100,90 1200,50 L1200,120 L0,120 Z";

    return (
        <div className={`w-full overflow-hidden leading-none ${className}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
            <style>
                {`
                    @keyframes drip {
                        0% { transform: translateY(0); opacity: 1; }
                        50% { transform: translateY(20px); opacity: 0.8; }
                        100% { transform: translateY(40px); opacity: 0; }
                    }
                    .drip-animation {
                        animation: drip 3s infinite ease-in-out;
                    }
                    .drip-delay-1 { animation-delay: 0s; }
                    .drip-delay-2 { animation-delay: 1s; }
                    .drip-delay-3 { animation-delay: 2s; }
                    .drip-delay-4 { animation-delay: 0.5s; }
                    .drip-delay-5 { animation-delay: 1.5s; }
                `}
            </style>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-28">
                <path fill={color}>
                    <animate attributeName="d" values={`${path1};${path2};${path3};${path2};${path1}`} dur="6s" repeatCount="indefinite" />
                </path>
                {/* Paint drips */}
                {/* <circle cx="200" cy="55" r="8" fill={color} className="drip-animation drip-delay-1" />
                <circle cx="600" cy="45" r="6" fill={color} className="drip-animation drip-delay-2" />
                <circle cx="900" cy="50" r="10" fill={color} className="drip-animation drip-delay-3" />
                <ellipse cx="400" cy="52" rx="5" ry="12" fill={color} className="drip-animation drip-delay-4" />
                <ellipse cx="750" cy="48" rx="4" ry="10" fill={color} className="drip-animation drip-delay-5" /> */}
            </svg>
        </div>
    )
}