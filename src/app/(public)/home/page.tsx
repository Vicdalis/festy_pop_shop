'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { OCCASIONS, OCCASION_COLORS } from "@/components/lib/data";
import ContactUsBanner from "@/components/banners/contactus-banner";
import Title from "@/components/ui/title";
import Image from 'next/image';
import PetBanner from "@/components/banners/pet-banner";
import ProductBannerComponent from "../../../components/banners/product-banner";
import AnimatedPaintDropSeparator from "@/components/ui/separators.tsx/paint-drop-animated-separator";
import ProductSlider from "@/components/ui/slider";
import { iProduct } from '@/components/ui/product';
import WavesSeparator from "@/components/ui/separators.tsx/waves-separator";
import ProductShowcaseCard from "@/components/products/product-showcase-card";
import { CONTACT } from "@/config/site";

export default function HomePage() {

  const seasonProducts = [
    { name: "Piñatas", price: "$299", image: "/products/pinatas/pinata1.jpg" },
    { name: "Figuras de Anime", price: "$149", image: "/products/pinatas/pinata_2.jpeg" },
    { name: "Chupeteras", price: "$199", image: "/products/pinatas/pinata_3.jpeg" },
    { name: "Corona de Adviento", price: "$249", image: "/products/pinatas/pinata_4.jpeg" },
    { name: "Mantel Navideño", price: "$89", image: "/products/pinatas/pinata_5.jpeg" },
    { name: "Set de Nochebuena", price: "$499", image: "/products/pinatas/pinata_6.jpg" },
    { name: "Set de Nochebuena", price: "$499", image: "/products/pinatas/pinata_7.jpg" },
    { name: "Set de Nochebuena", price: "$499", image: "/products/pinatas/pinata_8.jpg" },
  ];

  const featuredProducts: iProduct[] = [
    { id: 1, name: "Banda y Cintillo F. Cumpleaños", description: "et de Cumpleaños “Feliz Cumpleaños”: Banda de Glitter + Cintillo Holográfico.", price: 34.99, image: "/products/destacados/feliz_cumple.jpg", category: "Decoración", colors: ["Azul", "Plateado", "Dorado", "Rosado", "Fucsia"], occasions: ["Birthday"], featured: true },
    { id: 2, name: "Set globos Kuromi", description: "Set de globos de Kuromi, 5 piezas. Sirve para aire y helio ", price: 28.99, image: "/products/destacados/kuromi_balloon.jpg", category: "Balloons", colors: ["Rosado", "Negro"], occasions: ["Birthday", "Party Kits"], featured: true },
    { id: 3, name: "Combo de piñata Mickey", description: " Combo de piñatas cuadrada con 25 piezas de chuchería para rellenar", price: 45.99, image: "/products/destacados/combo.jpg", category: "Combo Piñatas", colors: [], occasions: ["Birthday"] },
    { id: 4, name: "Set de Globos Labubu", description: "Set de globos labubu, 5 piezas. Disponible en 2 colores", price: 24.99, image: "/products/destacados/labubu.jpg", category: "Balloons", colors: ["Marron", "Rosado"], occasions: ["Birthday", "Party Kits"] },
  ];

  const petImages = [
    "/pet/raya1.jpg",
    "/pet/raya2.jpg",
    "/pet/raya3.jpg",
  ];

  return (
    <div>
      <div className="min-h-screen">
        <div>
          <section className="relative overflow-hidden bg-[url(/shop/entrada1.jpg)] bg-cover bg-start bg-fixed before:absolute before:inset-0 before:bg-black/50 before:content-[''] py-20 md:py-32">
            <div className="container-custom text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-md font-semibold text-primary mb-6">
                  <PartyPopper className="h-6 w-6 text-tertiary" /> Comienza la fiesta con nosotros!
                </span>
                <div className="flex items-center justify-center">

                  <Image
                    src="/brand/iconografia.png"
                    alt="globos "
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
                  Celebraciones Inolvidables
                  <br />
                  <span className="text-primary">con un</span>{" "}
                  <span className="text-party-yellow">¡Pop!</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Contamos con globos, cortinas, bolsas de regalo, piñatas y todo lo que necesitas para hacer de tu celebración un evento memorable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/productos">
                    <Button className="text-lg gap-2 bg-main">
                      Ver Catálogo
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Occasions quick links */}
        <section className="py-20 container-custom bg-light-cream">
          <Title mainTitle="Nuestras Categorías" subtitle="Encuentra todo lo que necesitas para cada celebración" />
          <ProductBannerComponent />
        </section>
        <div className="bg-light-cream">

          <AnimatedPaintDropSeparator color="#E6AA78" />
          <section className="py-16 md:py-24" style={{ background: 'var(--color-horizontal)' }}>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <span className="inline-block bg-white/20 text-white font-body font-bold px-4 py-1 rounded-full text-sm mb-4 uppercase tracking-wider">
                  Especiales          </span>
                <Title mainTitle="Productos Personalizados" subtitle="Realizamos pedidos a tu gusto por encargo " version="light" />
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/25 transition-all duration-300 hover:scale-[1.03] mb-8 cursor-pointer border border-white/20">
                <p className="mb-[22px] text-[20px] font-semibold text-center md:text-left text-light-cream">¿Cómo hacer un pedido personalizado?</p>
                <div className="flex flex-wrap md:flex-nowrap text-left gap-[22px] md:gap-[12px]">
                  <div className="flex  gap-[19px]">
                    <span className="text-[30px] text-center font-semibold rounded-full w-[70px] text-main bg-light-cream self-center">1</span>
                    <div>
                      <span className="text-[18px] font-semibold">15 Días de Anticipación</span>
                      <p>Contáctanos con 15 días de anticipación para asegurar tu pedido</p>
                    </div>
                  </div>
                  <div className="flex gap-[19px]">
                    <span className="text-[30px] text-center font-semibold rounded-full w-[70px] text-main bg-light-cream self-center">2</span>
                    <div>
                      <span className="text-[18px] font-semibold">50% Adelantado</span>
                      <p>Realiza un depósito del 50% para confirmar tu pedido</p>
                    </div>
                  </div>
                  <div className="flex gap-[19px]">
                    <span className="text-[30px] text-center font-semibold rounded-full w-[70px] text-main bg-light-cream self-center">3</span>
                    <div>
                      <span className="text-[18px] font-semibold">Entrega Puntual</span>
                      <p>Recibe tu pedido personalizado en la fecha acordada</p>
                    </div>
                  </div>
                </div>

              </div>

              <ProductSlider seasonProducts={seasonProducts} />
              <div className="w-full text-center mt-4">
                <a href={CONTACT.PHONE_LINK} target="_blank" rel="noreferrer">
                  <Button className="mt-6 bg-main"> Hacer un pedido</Button>
                </a>
              </div>
            </div>
          </section>
          <AnimatedPaintDropSeparator color=" #E7467D" className="rotate-180" />
        </div>

        {/* Featured products */}
        <section className="py-16 bg-muted/50 bg-light-cream">
          <Title mainTitle="Temáticas Populares" subtitle="Encuentra todo lo que necesitas para cada celebración" />

          <div className="grid grid-cols-1 px-16 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OCCASIONS.map((occasion) => (
              <Link key={occasion} href={`/productos?ocasion=${encodeURIComponent(occasion)}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`flex flex-col items-center justify-start gap-6 p-6 rounded-2xl md:bg-size-[250px] ${OCCASION_COLORS[occasion as keyof typeof OCCASION_COLORS]} border border-transparent hover:border-primary/50 hover:shadow-lg transition-shadow cursor-pointer h-94`}
                >
                  <span className="font-semibold text-shadow-xs text-subtitles bold text-white uppercase bold">{occasion}</span>
                </motion.div>
              </Link>
            ))}
          </div>

        </section>
        <PetBanner imagesUrl={petImages} />
        <section className="py-16 bg-muted/50 bg-light-cream">
          <Title mainTitle="Productos destacados " subtitle="Combos imperdibles" />
          <div className="container-custom mx-auto max-w-7xl px-5">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product: iProduct, index) => (
                <ProductShowcaseCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/productos">
                <Button className="bg-main px-8 py-3 text-sm font-bold uppercase transition hover:opacity-95">
                  Ver Más
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <ContactUsBanner />
      </div>
    </div>
  )
}
