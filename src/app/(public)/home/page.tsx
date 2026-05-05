'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { OCCASIONS, OCCASION_COLORS } from "@/components/lib/data";
import ContactUsBanner from "@/components/banners/contactus-banner";
import Title from "@/components/ui/title";
import Image from 'next/image';
import PetBanner from "@/components/banners/pet-banner";
import ProductBannerComponent from "../../../components/banners/product-banner";
import AnimatedPaintDropSeparator from "@/components/ui/separators.tsx/paint-drop-animated-separator";
import ProductSlider from "@/components/ui/slider";
import { CONTACT } from "@/config/site";
import Subtitle from "@/components/ui/subtitle";
import ProductCard from "@/components/products/product-card";
import { useProducts } from "@/store/hooks/use-products";

const FEATURED_CATEGORY_FILTERS = [
  "Todo",
  "Globos",
  "Afiches",
  "Piñatas",
  "Personalizados",
  "Anime",
  "Cotillones",
] as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesFeaturedCategory(category: string, product: {
  category: string;
  character: string;
  name: string;
  description: string;
}) {
  const searchableText = [
    product.category,
    product.character,
    product.name,
    product.description,
  ]
    .map(normalizeText)
    .join(" ");

  const normalizedCategory = normalizeText(category);

  if (normalizedCategory === "pinatas") {
    return searchableText.includes("pinata") || searchableText.includes("pinatas");
  }

  if (normalizedCategory === "personalizados") {
    return searchableText.includes("personaliz");
  }

  if (normalizedCategory === "cotillones") {
    return searchableText.includes("cotillon") || searchableText.includes("cotillones");
  }

  return searchableText.includes(normalizedCategory);
}

export default function HomePage() {
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const { products, isLoading } = useProducts();
  const [selectedFeaturedCategory, setSelectedFeaturedCategory] = useState<string | null>(null);

  const handleScrollToCustom = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("personalizados")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const canvas = confettiCanvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const colors = ["#ff6b9d", "#c44dff", "#eeca21", "#4ecdc4", "#ff8c42", "#a8ff78"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      width: 6 + Math.random() * 10,
      height: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 3,
      velocityY: 2 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      rotationVelocity: (Math.random() - 0.5) * 0.2,
      alpha: 1,
    }));

    let frame = 0;
    let animationFrameId = 0;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((piece) => {
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.rotation += piece.rotationVelocity;

        if (frame > 120) {
          piece.alpha -= 0.012;
        }

        if (piece.y > canvas.height) {
          piece.y = -20;
          piece.alpha = 1;
        }

        context.save();
        context.globalAlpha = Math.max(0, piece.alpha);
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        context.restore();
      });

      frame += 1;

      if (frame < 260) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  const seasonProducts = [
    { name: "Piñatas", price: "$299", tag: "POPULAR", tagColor: "#e7467d", image: "/products/pinatas/pinata1.jpg" },
    { name: "Figuras de Anime", price: "$149", tag: "RÁPIDO", tagColor: "#7ed958", image: "/products/moana.jpeg" },
    { name: "Chupeteras", price: "$199", tag: "ESPECIAL", tagColor: "#8a3dc1", image: "/products/chupetera.jpeg" },
  ];

  const petImages = [
    "/pet/raya1.jpg",
    "/pet/raya2.jpg",
    "/pet/raya3.jpg",
  ];

  const visibleFeaturedProducts = useMemo(() => {
    const filteredProducts = selectedFeaturedCategory && selectedFeaturedCategory !== "Todo"
      ? products.filter((product) => matchesFeaturedCategory(selectedFeaturedCategory, product))
      : products;

    return filteredProducts.slice(0, 9);
  }, [products, selectedFeaturedCategory]);

  return (
    <div>
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
        aria-hidden="true"
      />
      <div className="min-h-screen">
        <div>
          <section className="relative overflow-hidden bg-[#5d1588]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(138,61,193,0.6),transparent),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(255,91,143,0.35),transparent),radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(247,217,76,0.12),transparent)]" />
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute left-[54%] top-[12%] h-72 w-72 rounded-full bg-[#ff6b9d]/15"
                animate={{ y: [0, -20, 0], rotate: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute left-[76%] top-[58%] h-48 w-48 rounded-full bg-[#f7d94c]/10"
                animate={{ y: [0, -18, 0], rotate: [0, 14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
              <motion.div
                className="absolute left-[84%] top-[18%] h-32 w-32 rounded-full bg-[#4ecdc4]/10"
                animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
              />
            </div>

            <div className="container-custom relative z-10 mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-hero-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.05em] text-[#261033]">
                  <Sparkles className="h-4 w-4" />
                  Celebraciones Únicas
                </span>
                <h1 className="font-display text-5xl font-black leading-[0.95] text-white md:text-7xl">
                  Celebraciones
                  <br />
                  <span className="text-hero-accent">Inolvidables</span>
                  <br />
                  con un <span className="text-[#ffb8d4]">¡Pop!</span>
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-white/85 lg:mx-0">
                  Todo lo que necesitas para hacer de cada fiesta un momento mágico: globos, piñatas, decoraciones y más.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/productos">
                    <Button className="rounded-full bg-hero-accent px-7 py-3 text-base font-extrabold text-[#261033] shadow-[0_8px_30px_rgba(238,202,33,0.35)] transition hover:-translate-y-0.5 hover:opacity-100">
                      Ver Catálogo
                    </Button>
                  </Link>
                  <a
                    href="#personalizados"
                    onClick={handleScrollToCustom}
                    className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3 text-base font-bold text-white transition hover:border-white hover:bg-white/10"
                  >
                    Personalizar
                  </a>
                </div>
                <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8 text-left lg:mx-0">
                  <div>
                    <p className="font-display text-3xl font-black text-hero-accent">300+</p>
                    <p className="mt-1 text-sm text-white/65">Productos</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-black text-hero-accent">1.200+</p>
                    <p className="mt-1 text-sm text-white/65">Clientes felices</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative hidden justify-center lg:flex"
              >
                <div className="relative h-[320px] w-[380px] overflow-hidden rounded-[24px] border-[3px] border-white/15 bg-[#8a3dc1]/50 shadow-[0_20px_60px_rgba(34,8,56,0.45)]">
                  <Image
                    src="/shop/Tienda.jpg"
                    alt="Tienda de fiestas Inversiones VVVS"
                    fill
                    className="object-cover opacity-90"
                    sizes="380px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(93,21,136,0.08),rgba(93,21,136,0.28))]" />
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        {/* Occasions quick links */}
        <section className="py-20 container-custom bg-light-cream">
          <div className="text-center">
            <Subtitle title="Explora" color="main-purple" />
          </div>
          <Title mainTitle="Nuestras Categorías" subtitle="Encuentra todo lo que necesitas para cada celebración" />
          <ProductBannerComponent />
        </section>
        <div className="bg-light-cream">

          <AnimatedPaintDropSeparator color="var(--color-main-purple)" />
          <section
            id="personalizados"
            className="relative overflow-hidden bg-main-purple px-4 py-16 sm:px-5 md:px-8 md:py-24"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#5D1588_0%,#ff6b9d38_100%),linear-gradient(180deg,#eeca211a_0%,rgba(93,21,136,0)_100%)]" />
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:gap-12 lg:grid-cols-[1fr_1.2fr]">
              <div className="min-w-0 text-center lg:text-left">
                <Subtitle title="Especiales" />
                <h2 className="mt-4 break-words font-display text-3xl font-black leading-tight text-white sm:text-4xl md:text-6xl">
                  Productos
                  <br />
                  Personalizados
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7 md:text-lg lg:mx-0">
                  Realizamos pedidos a tu gusto por encargo.
                </p>

                <div className="mt-8">
                  <p className="mb-6 text-center text-lg font-semibold text-white sm:text-xl lg:text-left">¿Cómo hacer un pedido personalizado?</p>
                  <div className="flex flex-col gap-5 text-left">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hero-accent font-display text-base font-black text-[#261033]">
                        1
                      </span>
                      <div className="min-w-0">
                        <span className="font-display text-base font-bold text-white">Elige tu producto</span>
                        <p className="mt-1 break-words text-sm leading-6 text-white/70">
                          Contáctanos con 15 días de anticipación para asegurar tu pedido y brindarte opciones sobre tu idea
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hero-accent font-display text-base font-black text-[#261033]">
                        2
                      </span>
                      <div className="min-w-0">
                        <span className="font-display text-base font-bold text-white">50% Adelantado</span>
                        <p className="mt-1 break-words text-sm leading-6 text-white/70">
                          Realiza un depósito del 50% para confirmar tu pedido
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hero-accent font-display text-base font-black text-[#261033]">
                        3
                      </span>
                      <div className="min-w-0">
                        <span className="font-display text-base font-bold text-white">Retira tu pedido</span>
                        <p className="mt-1 break-words text-sm leading-6 text-white/70">
                          Retira tu pedido en nuestra sede en la fecha acordada
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center lg:justify-start">
                    <a href={CONTACT.PHONE_LINK} target="_blank" rel="noreferrer">
                      <Button className="bg-hero-accent text-[#261033] shadow-[0_8px_30px_rgba(238,202,33,0.35)] hover:-translate-y-0.5 hover:opacity-100">
                        Hacer un pedido
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="min-w-0 overflow-hidden">
                <ProductSlider seasonProducts={seasonProducts} />
              </div>
            </div>
          </section>
          <AnimatedPaintDropSeparator color="var(--color-secondary-purple)" className="rotate-180" />
        </div>

        {/* Featured products */}
        <section className="py-16 bg-muted/50 bg-light-cream">
          <div className="text-center">
            <Subtitle title="Ocasiones " color="main-purple" />
          </div>
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
          <div className="text-center">
            <Subtitle title="Destacados" color="main-purple" />
          </div>
          <Title mainTitle="Productos destacados " subtitle="Combos imperdibles" />
          <div className="container-custom mx-auto max-w-7xl px-5 md:px-8 xl:px-14">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {FEATURED_CATEGORY_FILTERS.map((category) => {
                const isActive = selectedFeaturedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedFeaturedCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                      (category === "Todo" && selectedFeaturedCategory === null) || isActive
                        ? "border-[#e7467d] bg-[#e7467d] text-white shadow-[0_8px_18px_rgba(231,70,125,0.22)]"
                        : "border-[#efc9b8] bg-white text-[#7a5662] hover:border-[#e7467d] hover:text-[#9f2051]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {isLoading ? (
              <div className="rounded-3xl border border-[#f3d7c6] bg-white/80 px-6 py-12 text-center shadow-sm">
                <p className="text-lg font-bold text-[#4b2737]">Cargando productos destacados...</p>
              </div>
            ) : visibleFeaturedProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleFeaturedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    badge={product.character === 'General' ? product.category : product.character}
                    badgeColor={product.character === 'General' ? '#8a3dc1' : '#e7467d'}
                    metaChip={product.colors.length > 0 ? `${product.colors.length} colores` : 'Pedido especial'}
                    colorDisplay="swatches"
                    viewHref={`/productos?tipo=${encodeURIComponent(product.category)}`}
                    viewLabel="Filtrar"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[#efc9b8] bg-white/80 px-6 py-12 text-center">
                <p className="text-lg font-bold text-[#4b2737]">No hay productos en esta categoría por ahora.</p>
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <Link href="/productos">
                <Button variant="outlined" color="var(--color-main)" >
                  Ver todos los productos
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
