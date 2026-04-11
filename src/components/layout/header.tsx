"use client";

import { CONTACT } from '@/config/site';
import { ChevronDown, ChevronUp, Menu, ShoppingBasket, UserCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
    { to: "/", label: "Inicio" },
    { to: "/productos?tipo=Globos", label: "Globos" },
    {
        to: "/productos?occasion=",
        label: "Ocasiones",
        subItems: [
            { to: "/productos?occasion=Kids", label: "Niños" },
            { to: "/productos?occasion=Adults", label: "Adultos" },
            { to: "/productos?occasion=Halloween", label: "Halloween" },
            { to: "/productos?occasion=Christmas", label: "Navidad" },
            { to: "/productos?occasion=Birthday", label: "Cumpleaños" },
            { to: "/productos?occasion=Baby+Shower", label: "Baby Shower" },
        ],
    },
    { to: "/productos?label=Piñateria", label: "Piñateria" },
    { to: "/productos", label: "Catálogo" },
    { to: "/contacto", label: "Contacto" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [occasionsOpen, setOccasionsOpen] = useState(false);
    const [mobileOccasionsOpen, setMobileOccasionsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOccasionsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="relative top-0 z-50 w-full bg-card/80 backdrop-blur-md">
            <div className="relative flex h-12 items-center bg-main">
                <div className="md:hidden flex absolute left-3  items-center h-10">
                    <button className="p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
                <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary absolute left-16 md:left-8">
                    <Image
                        src="/brand/logo_fiesta3.png"
                        alt="Marca VVVS"
                        width={140}
                        height={40}
                        className="object-contain width-[140px] md:width-[160px]"
                    />
                </Link>
                <nav className="hidden md:flex absolute inset-x-0 z-20 justify-center gap-2">
                    {NAV_LINKS.map((link) =>
                        link.subItems ? (
                            <div key={link.label} className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setOccasionsOpen((v) => !v)}
                                    className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:text-light-pink"
                                >
                                    {link.label}
                                    {!occasionsOpen ? <ChevronDown className="h-3.5 w-3.5 transition-transform" /> : <ChevronUp className="h-3.5 w-3.5 transition-transform" />}
                                </button>
                                {occasionsOpen && (
                                    <div className="absolute left-1/2 top-full z-[60] mt-2 w-48 -translate-x-1/2 rounded-xl bg-main py-2 shadow-lg ring-1 ring-white/15">
                                        {link.subItems.map((sub) => (
                                            <Link
                                                key={sub.to}
                                                href={sub.to}
                                                onClick={() => setOccasionsOpen(false)}
                                                className="block px-4 py-2 text-sm font-medium text-white transition-colors hover:text-light-pink"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.to}
                                href={link.to}
                                className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:text-light-pink"

                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>
                <div className="hidden md:absolute right-28 flex items-center gap-3 text-muted-foreground">
                    <a href={CONTACT.PHONE_LINK} className="text-sm hover:underline">{CONTACT.PHONE}</a>
                    <span className="hidden md:inline">|</span>
                </div>
                <a href="/login" target="_blank" rel="noopener noreferrer" className="flex absolute right-8 gap-6 text-primary-foreground transition-colors">
                    <div className='hidden md:flex gap-2 transition-colors hover:text-light-pink'>
                        <UserCircle className="h-6 w-6" />
                    </div>

                    {/* <ShoppingBasket className="h-6 w-6 hover:text-tertiary transition-colors" /> */}
                </a>
            </div>

            {/* Mobile nav */}
            {open && (
                <nav className="md:hidden bg-card bg-light-main p-4 flex flex-col gap-2">
                    {NAV_LINKS.map((link) =>
                        link.subItems ? (
                            <div key={link.label} >
                                <button
                                    className='cursor-pointer'
                                    onClick={() => setMobileOccasionsOpen((v) => !v)}
                                >
                                    {link.label}
                                    {mobileOccasionsOpen ? <ChevronUp className="h-3.5 w-3.5 transition-transform inline" /> : <ChevronDown className="h-3.5 w-3.5 transition-transform inline" />}
                                </button>
                                {mobileOccasionsOpen && (
                                    <div className="mt-1 ml-4 flex flex-col gap-1">
                                        {link.subItems.map((sub) => (
                                            <Link
                                                key={sub.to}
                                                href={sub.to}
                                                onClick={() => { setOpen(false); setMobileOccasionsOpen(false); }}
                                                className="px-2  rounded-lg text-sm font-medium hover:bg-muted transition-colors text-start"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.to}
                                href={link.to}
                                className="hover:bg-muted transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>
            )}
        </header>
    )
}
