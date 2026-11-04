import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

// Origen del backend (el navegador hace fetch a la API desde los componentes de cliente)
function getApiOrigin() {
  try {
    return process.env.NEXT_PUBLIC_MAIN_API ? new URL(process.env.NEXT_PUBLIC_MAIN_API).origin : '';
  } catch {
    return '';
  }
}

// Next inyecta scripts inline (hidratacion) y sin nonce necesita 'unsafe-inline'; en desarrollo
// ademas usa eval. Los enlaces a WhatsApp/redes son navegacion, no los limita la CSP.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://oxgbvjgfnomvclsrtoma.supabase.co",
  `connect-src 'self' ${getApiOrigin()} https://vitals.vercel-insights.com https://va.vercel-scripts.com`.trim(),
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Una sola URL para el inicio: /home redirige (308) a /
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oxgbvjgfnomvclsrtoma.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ]
  }
};

export default nextConfig;
