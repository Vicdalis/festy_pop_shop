import { BUSINESS, CONTACT } from '@/config/site';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function BusinessJsonLd() {
    if (!siteUrl) return null;

    const data = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: BUSINESS.NAME,
        url: siteUrl,
        telephone: BUSINESS.PHONE_E164,
        email: CONTACT.SUPPORT_EMAIL_LINK.replace('mailto:', ''),
        address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.STREET_ADDRESS,
            addressLocality: BUSINESS.LOCALITY,
            addressRegion: BUSINESS.REGION,
            postalCode: BUSINESS.POSTAL_CODE,
            addressCountry: BUSINESS.COUNTRY,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS.LATITUDE,
            longitude: BUSINESS.LONGITUDE,
        },
        openingHoursSpecification: BUSINESS.OPENING_HOURS.map(({ days, opens, closes }) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: days,
            opens,
            closes,
        })),
        sameAs: BUSINESS.SAME_AS,
    };

    return (
        <script
            type="application/ld+json"
            // "<" escapado para que ningun valor pueda cerrar el script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}
