import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "FestyPOP | Piñatería y artículos para fiestas en Caracas",
    template: "%s | FestyPOP",
  },
  description: "Catálogo de globos, piñatas, afiches y decoración para fiestas en La Hoyada, Caracas. Pedidos personalizados, cotizaciones por WhatsApp y temáticas para cada celebración.",
  keywords: [
    "piñatería en Caracas",
    "piñatería en hoyada",
    "globos para fiestas",
    "piñatas personalizadas",
    "decoración de fiestas",
    "artículos para fiestas",
    "FestyPOP",
  ],
  alternates: {
    canonical: siteUrl ? "/" : undefined,
  },
  openGraph: {
    title: "FestyPOP | Piñatería y artículos para fiestas en Caracas",
    description: "Explora el catálogo de globos, piñatas, afiches y decoración para celebraciones especiales.",
    type: "website",
    locale: "es_VE",
    siteName: "FestyPOP",
  },
  twitter: {
    card: "summary_large_image",
    title: "FestyPOP | Piñatería y artículos para fiestas en Caracas",
    description: "Catálogo de productos para fiestas con pedidos personalizados y atención por WhatsApp.",
  },
  category: "shopping",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
