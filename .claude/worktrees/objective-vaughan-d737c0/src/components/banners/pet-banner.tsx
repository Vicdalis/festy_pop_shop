import { CONTACT } from '@/config/site';
import Link from 'next/link';

interface PetBannerProps {
    imagesUrl?: string[];
    altText?: string;
}

const PetBanner: React.FC<PetBannerProps> = () => {
    return (
        <section className="relative overflow-hidden bg-light-pink px-5 py-12 md:px-8">
            <div className="absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/10" />
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute bottom-[-2.5rem] right-1/3 h-32 w-32 rounded-full bg-white/8" />

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                <div className="flex-1">
                    <h2 className="font-display text-2xl font-black leading-tight text-white md:text-3xl">
                        ¿Buscas precios al mayor?
                        <br />
                        ¡Pide hoy con envío por MRW y ZOOM! 📦
                    </h2>
                    <p className="mt-3 text-base leading-7 text-white/90">
                        Consulta disponibilidad, y cantidades minimas para hacer un pedido.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <Link
                        href={CONTACT.PHONE_LINK_MAYOR}
                        target="_blank"
                        className="inline-flex items-center rounded-full bg-white px-7 py-3 font-display text-base font-extrabold text-light-pink shadow-[0_4px_20px_rgba(38,16,51,0.18)] transition duration-150 hover:-translate-y-0.5"
                    >
                        Consultar por mayor →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PetBanner;
