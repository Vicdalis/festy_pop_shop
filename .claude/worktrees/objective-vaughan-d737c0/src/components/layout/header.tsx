"use client";

import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/config/site';

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Catálogo' },
    {
        to: '/productos?ocasion=',
        label: 'Temáticas',
        subItems: [
            { to: '/productos?ocasion=Niños', label: 'Niños' },
            { to: '/productos?ocasion=Adultos', label: 'Adultos' },
            { to: '/productos?ocasion=Halloween', label: 'Halloween' },
            { to: '/productos?ocasion=Navidad', label: 'Navidad' },
            { to: '/productos?ocasion=Cumpleaños', label: 'Cumpleaños' },
            { to: '/productos?ocasion=Baby+Shower', label: 'Baby Shower' },
        ],
    },
    { to: '/#personalizados', label: 'Personalizar' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [themesOpen, setThemesOpen] = useState(false);
    const [mobileThemesOpen, setMobileThemesOpen] = useState(false);
    const [compact, setCompact] = useState(false);

    const handleScrollToCustom = (
        event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
        closeMobileMenu = false,
    ) => {
        const targetSection = document.getElementById('personalizados');

        if (!targetSection) {
            return;
        }

        event.preventDefault();
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        if (closeMobileMenu) {
            setOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setCompact(window.scrollY > 60);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="sticky top-0 z-[100] bg-[#5d1588] px-4 shadow-[0_2px_20px_rgba(35,9,53,0.3)] transition-all duration-300 md:px-8">
            <div className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${compact ? 'h-[52px]' : 'h-16'}`}>
                <Link href="/" className="flex items-center gap-2 no-underline">
                    <Image
                        src="/brand/logo_fiesta3.png"
                        alt="Marca VVVS"
                        width={148}
                        height={40}
                        className="h-auto w-[132px] object-contain md:w-[148px]"
                    />
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {NAV_LINKS.map((link) =>
                        link.subItems ? (
                            <div
                                key={link.label}
                                className="relative -mb-3 pb-3"
                                onMouseEnter={() => setThemesOpen(true)}
                                onMouseLeave={() => setThemesOpen(false)}
                            >
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                >
                                    {link.label}
                                    {themesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>

                                {themesOpen && (
                                    <div className="absolute left-1/2 top-full z-[120] w-52 -translate-x-1/2 rounded-2xl bg-[#5d1588] py-2 shadow-[0_18px_40px_rgba(35,9,53,0.35)] ring-1 ring-white/15">
                                        {link.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.to}
                                                href={subItem.to}
                                                onClick={() => setThemesOpen(false)}
                                                className="block px-4 py-2 text-sm font-medium text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            link.label === 'Personalizar' ? (
                                <Link
                                    key={link.to}
                                    href={link.to}
                                    onClick={(event) => handleScrollToCustom(event)}
                                    className="text-sm font-semibold text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <Link
                                    key={link.to}
                                    href={link.to}
                                    className="text-sm font-semibold text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                >
                                    {link.label}
                                </Link>
                            )
                        ),
                    )}

                    <Link
                        href="/contacto"
                        className="inline-flex items-center rounded-full bg-light-pink px-[18px] py-2 text-[0.85rem] font-bold text-white transition duration-150 hover:scale-105 hover:brightness-110"
                    >
                        Contáctanos
                    </Link>
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    <Link
                        href={CONTACT.PHONE_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center rounded-full bg-light-pink px-3 text-[0.76rem] font-bold leading-none text-white transition duration-150 hover:scale-105 hover:brightness-110"
                    >
                        Contáctanos
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-t border-white/10 py-4 md:hidden">
                    <div className="flex flex-col gap-3">
                        {NAV_LINKS.map((link) =>
                            link.subItems ? (
                                <div key={link.label}>
                                    <button
                                        type="button"
                                        onClick={() => setMobileThemesOpen((current) => !current)}
                                        className="flex w-full items-center justify-between text-left text-sm font-semibold text-[#f6edd8]"
                                    >
                                        {link.label}
                                        {mobileThemesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>

                                    {mobileThemesOpen && (
                                        <div className="mt-2 flex flex-col gap-2 pl-4">
                                            {link.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.to}
                                                    href={subItem.to}
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setMobileThemesOpen(false);
                                                    }}
                                                    className="text-sm font-medium text-[#f6edd8]/90 transition-colors hover:text-[#eeca21]"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                link.label === 'Personalizar' ? (
                                    <Link
                                        key={link.to}
                                        href={link.to}
                                        onClick={(event) => handleScrollToCustom(event, true)}
                                        className="text-sm font-semibold text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <Link
                                        key={link.to}
                                        href={link.to}
                                        onClick={() => setOpen(false)}
                                        className="text-sm font-semibold text-[#f6edd8] transition-colors hover:text-[#eeca21]"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ),
                        )}

                    </div>
                </nav>
            )}
        </header>
    );
}
