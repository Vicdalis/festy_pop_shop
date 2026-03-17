export default function ConfetiSeparator() {
    return (
        <div className="w-full overflow-hidden leading-none relative" style={{ marginTop: '-1px', marginBottom: '-1px' }}>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-28">

                {/* Confetti pieces */}
                <rect x="100" y="20" width="8" height="8" rx="1" fill="#E91E8C" transform="rotate(30 104 24)" />
                <rect x="250" y="50" width="6" height="6" rx="1" fill="#FFD700" transform="rotate(45 253 53)" />
                <rect x="400" y="15" width="10" height="5" rx="1" fill="#00CED1" transform="rotate(-20 405 17)" />
                <rect x="550" y="55" width="7" height="7" rx="1" fill="#8B5CF6" transform="rotate(60 554 59)" />
                <rect x="700" y="25" width="9" height="4" rx="1" fill="#FF6B35" transform="rotate(-45 705 27)" />
                <rect x="850" y="45" width="6" height="8" rx="1" fill="#E91E8C" transform="rotate(15 853 49)" />
                <rect x="1000" y="30" width="8" height="6" rx="1" fill="#FFD700" transform="rotate(-30 1004 33)" />
                <circle cx="180" cy="35" r="4" fill="#8B5CF6" />
                <circle cx="480" cy="40" r="3" fill="#FF6B35" />
                <circle cx="780" cy="20" r="5" fill="#00CED1" />
                <circle cx="1050" cy="50" r="3" fill="#E91E8C" />
            </svg>
        </div>
    )
}