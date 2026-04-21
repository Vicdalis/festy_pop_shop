import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Inversiones VVVS | Piñatería y artículos para fiestas en Caracas",
    template: "%s | Inversiones VVVS",
  },
  description: "Catálogo de globos, piñatas, afiches y decoración para fiestas en Caracas. Pedidos personalizados, cotizaciones por WhatsApp y temáticas para cada celebración.",
  keywords: [
    "piñatería en Caracas",
    "globos para fiestas",
    "piñatas personalizadas",
    "decoración de fiestas",
    "artículos para fiestas",
    "Inversiones VVVS",
  ],
  alternates: {
    canonical: siteUrl ? "/" : undefined,
  },
  openGraph: {
    title: "Inversiones VVVS | Piñatería y artículos para fiestas en Caracas",
    description: "Explora el catálogo de globos, piñatas, afiches y decoración para celebraciones especiales.",
    type: "website",
    locale: "es_VE",
    siteName: "Inversiones VVVS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inversiones VVVS | Piñatería y artículos para fiestas en Caracas",
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
