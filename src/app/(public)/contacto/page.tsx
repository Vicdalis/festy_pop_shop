'use client';

import ContactUsBanner from "@/components/banners/contactus-banner";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage(){
    return(
        <main className=" text-[#3B2830] min-h-screen">
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#fff0e1_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,61,127,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(254,154,78,0.18),_transparent_30%)]" />
                <div className="container-custom relative mx-auto max-w-7xl px-5 py-16 md:py-24">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#d64271] shadow-sm backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Estamos listos para ayudarte
                            </span>
                            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#4b2737] md:text-6xl">
                                Hablemos de tu
                                {' '}
                                <span className="text-[#e7467d]">proxima fiesta</span>
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6b4b56] md:text-lg">
                                Escríbenos para cotizaciones, pedidos personalizados o dudas sobre disponibilidad.
                                Te acompañamos para que cada detalle quede a la medida de tu celebración.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-8 h-24 w-24 rounded-[2rem] bg-[#ffcad8] rotate-12" />
                            <div className="absolute -right-3 bottom-8 h-28 w-28 rounded-full bg-[#ffd78d]" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-3 shadow-[0_25px_80px_rgba(231,70,125,0.12)] backdrop-blur">
                                <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem]">
                                    <Image
                                        src="/shop/entrada2.jpg"
                                        alt="Decoracion de fiestas VVVS"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <ContactUsBanner />
        </main>
    )
}
