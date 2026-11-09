'use client';

import { useEffect, useState } from 'react';

export function useSiteOrigin() {
    const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_SITE_URL ?? '');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    return origin;
}
