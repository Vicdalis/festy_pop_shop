
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import PaintDropSeparator from "../ui/separators.tsx/paint-drop-separator";
import { CONTACT } from '@/config/site';
import { mockOcassions } from "@/lib/ocassions/mock-ocassions";

const NAV_LINKS = [
    { to: "/", label: "Inicio" },
    { to: "/productos?ocasion=Globos", label: "Globos" },
    { to: "/productos", label: "Catálogo" },
    { to: "/contacto", label: "Contacto" },
];

const TEAM_LINKS = mockOcassions.slice(0,4).map((ocassion) => {
    return { to: "/" + ocassion.code, label: ocassion.label}
})

export default function Footer() {
    return (
        <section>
            <PaintDropSeparator color="#5d1588" />
            <footer className="bg-[#5d1588] text-primary-foreground">
                <div className="container-custom py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {/* Brand */}
                        <div className="flex flex-col gap-4 justify-center md:justify-start">
                            <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold justify-center md:justify-start">
                                <Image
                                    src="/brand/logo_fiesta3.png"
                                    alt="Marca VVVS"
                                    width={160}
                                    height={40}
                                    className="object-contain"
                                />
                            </Link>
                            <p className="text-primary-foreground/80 text-sm w-full text-center max-w-full md:max-w-xs md:text-left">
                               Dónde empieza la alegría
                            </p>
                            <div className="flex gap-3 mt-2 justify-center md:justify-start">
                                <a href={CONTACT.INSTAGRAM_LINK} target="_blank" className="p-2 rounded-full bg-tertiary/10 hover:text-hover transition-colors" aria-label="Instagram">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href={CONTACT.FACEBOOK_LINK} target="_blank" className="p-2 rounded-full bg-tertiary/10 hover:text-hover transition-colors" aria-label="Facebook">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href={CONTACT.TIKTOK_LINK} target="_blank" className="p-2 rounded-full bg-tertiary/10 hover:text-hover transition-colors" aria-label="TikTok">
                                    <FaTiktok className="h-5 w-5" />
                                </a>
                                <a href={CONTACT.PINTEREST_LINK} target="_blank" className="p-2 rounded-full bg-tertiary/10 hover:text-hover transition-colors" aria-label="Pinterest">
                                    <FaPinterest className="h-5 w-5" />
                                </a>
                                <a href={CONTACT.PHONE_LINK} target="_blank" className="p-2 rounded-full bg-tertiary/10 hover:text-hover transition-colors" aria-label="WhatsApp">
                                    <Image
                                        src="/whatsapp.png"
                                        alt="Whatssap logo"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                    />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-display text-lg font-bold mb-4">Temáticas</h3>
                            <ul className="flex flex-col gap-2">
                                {TEAM_LINKS.map((link) => (
                                    <li key={link.to}>
                                        <Link href={link.to} className="text-light-pink-foreground/80 hover:text-hover transition-colors text-sm font-medium">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-display text-lg font-bold mb-4">Enlaces</h3>
                            <ul className="flex flex-col gap-2">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.to}>
                                        <Link href={link.to} className="text-light-pink-foreground/80 hover:text-hover transition-colors text-sm font-medium">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-display text-lg font-bold mb-4">Contáctanos</h3>
                            <ul className="flex flex-col gap-3 text-sm text-light-pink-foreground/80">
                                <li className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-tertiary" />
                                    <a href={CONTACT.PHONE_LINK} className="hover:underline">{CONTACT.PHONE}</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-tertiary" />
                                    <a href={CONTACT.SUPPORT_EMAIL_LINK} className="hover:underline">{CONTACT.SUPPORT_EMAIL}</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPin className="h-8 w-8 text-tertiary" />
                                    {CONTACT.ADDRESS}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-main-foreground/10">
                    <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between text-xs text-light-pink-foreground/60 gap-2">
                        <span>© 2026 Inversiones VVVS. Todos los derechos reservados.</span>
                        <span>Realizado por <a href="https://www.linkedin.com/in/vicdalis-anazco/" target="_blank" className="hover:text-blue/80 transition-colors">Vicdalis Añazco</a></span>
                    </div>
                </div>
            </footer>
        </section>
    )
}
