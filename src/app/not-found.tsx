import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, HeartCrack } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Página no encontrada',
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <>
            <main className="flex min-h-screen flex-col text-[#3B2830]">
                <section className="relative flex flex-1 items-center overflow-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#fff0e1_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,61,127,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(254,154,78,0.18),_transparent_30%)]" />
                    <div className="container-custom relative mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
                        <div className="relative mx-auto max-w-2xl text-center">
                            <div className="absolute -left-6 top-4 h-20 w-20 rotate-12 rounded-[2rem] bg-[#ffcad8]" />
                            <div className="absolute -right-4 bottom-4 h-24 w-24 rounded-full bg-[#ffd78d]" />

                            <div className="relative rounded-[2rem] border border-white/70 bg-white/75 px-6 py-12 shadow-[0_25px_80px_rgba(231,70,125,0.12)] backdrop-blur md:px-12">
                                <HeartCrack className="mx-auto h-12 w-12 text-[#8a3dc1]" />
                                <p className="mt-4 text-7xl font-bold leading-none text-[#e7467d] md:text-8xl">404</p>
                                <h1 className="mt-4 text-3xl font-bold leading-tight text-[#4b2737] md:text-4xl">
                                    Esta fiesta no existe
                                </h1>
                                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#6b4b56]">
                                    La página o el producto que buscas no está disponible o cambió de lugar.
                                    Vuelve al catálogo y encuentra lo ideal para tu celebración.
                                </p>

                                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                    <Link
                                        href="/producto"
                                        className="inline-flex items-center rounded-full bg-[#e7467d] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#8a3dc1]"
                                    >
                                        Ver catálogo
                                    </Link>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-1 text-sm font-bold text-[#8a3dc1] transition-colors hover:text-[#e7467d]"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Volver al inicio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
