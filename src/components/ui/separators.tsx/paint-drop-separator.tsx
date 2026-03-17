export default function PaintDropSeparator({color, className} : {color: string, className?: string}) {
    return (
        <div className={`w-full overflow-hidden leading-none ${className}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-28">
                <path
                    d="M0,60 C100,100 200,20 300,60 C400,100 450,30 500,50 C550,70 600,100 700,40 C800,-20 850,80 950,50 C1050,20 1100,80 1200,60 L1200,120 L0,120 Z"
                    fill={color}
                />
                {/* Paint drips */}
                {/* <circle cx="200" cy="55" r="8" fill={color} />
                <circle cx="600" cy="45" r="6" fill={color} />
                <circle cx="900" cy="50" r="10" fill={color} />
                <ellipse cx="400" cy="52" rx="5" ry="12" fill={color} />
                <ellipse cx="750" cy="48" rx="4" ry="10" fill={color} /> */}
            </svg>
        </div>
    )
}