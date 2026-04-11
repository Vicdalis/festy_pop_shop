"use client";

import { CONTACT } from '@/config/site';
import { ChevronDown, ChevronUp, Menu, ShoppingBasket, UserCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
    { to: "/", label: "Inicio" },
    { to: "/balloons", label: "Globos" },
    {
        to: "/catalogue?occasion=",
        label: "Ocasiones",
        subItems: [
            { to: "/catalogue?occasion=Kids", label: "Niños" },
            { to: "/catalogue?occasion=Adults", label: "Adultos" },
            { to: "/catalogue?occasion=Halloween", label: "Halloween" },
            { to: "/catalogue?occasion=Christmas", label: "Navidad" },
            { to: "/catalogue?occasion=Birthday", label: "Cumpleaños" },
            { to: "/catalogue?occasion=Baby+Shower", label: "Baby Shower" },
        ],
    },
    { to: "/party", label: "Piñateria" },
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
        <header className=" top-0 z-50 w-full bg-card/80  backdrop-blur-md">
            {/* Pre-header: centered logo + login icon right */}
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
                <div className="hidden md:flex absolute left-0 right-0 justify-center pointer-events-none">
                   {NAV_LINKS.map((link) =>
                        link.subItems ? (
                            <div key={link.label} className="relative pointer-events-auto" ref={dropdownRef}>
                                <button
                                    onClick={() => setOccasionsOpen((v) => !v)}
                                    className="px-4 py-1.5 cursor-pointer rounded-full text-sm font-semibold transition-colors hover:bg-muted flex items-center gap-1 bg-primary text-primary-foreground"
                                >
                                    {link.label}
                                    {!occasionsOpen ? <ChevronDown className="h-3.5 w-3.5 transition-transform" /> : <ChevronUp className="h-3.5 w-3.5 transition-transform" />}
                                </button>
                                {occasionsOpen && (
                                    <div className="absolute top-full bg-white left-1/2 -translate-x-1/2 mt-2 w-48 bg-card  rounded-xl shadow-lg py-2 z-50">
                                        {link.subItems.map((sub) => (
                                            <Link
                                                key={sub.to}
                                                href={sub.to}
                                                onClick={() => setOccasionsOpen(false)}
                                                className="block px-4 py-2 text-sm font-medium hover:bg-main hover:text-white transition-colors"
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
                                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground pointer-events-auto"

                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </div>
                    <div className="hidden md:absolute right-28 flex items-center gap-3 text-muted-foreground">
                            <a href={CONTACT.PHONE_LINK} className="text-sm hover:underline">{CONTACT.PHONE}</a>
                        <span className="hidden md:inline">|</span>
                    </div>
                <a href="/login" target="_blank" rel="noopener noreferrer" className=" flex absolute right-8 gap-6 text-muted-foreground transition-colors">
                    <div className='hidden md:flex gap-2 hover:text-tertiary transition-colors'>
                        <UserCircle className="h-6 w-6" />
                    </div>

                    <ShoppingBasket className="h-6 w-6 hover:text-tertiary transition-colors" />
                </a>
            </div>

            {/* <nav className="hidden md:flex items-center bg-linear-65 bg-white border-b-[0.5] border-main justify-center gap-1 h-11 text-black font-bold">
                {NAV_LINKS.map((link) =>
                    link.subItems ? (
                        <div key={link.label} className="relative " ref={dropdownRef}>
                            <button
                                onClick={() => setOccasionsOpen((v) => !v)}
                                className="px-4 py-1.5 cursor-pointer rounded-full text-sm font-semibold transition-colors hover:bg-muted flex items-center gap-1 bg-primary text-primary-foreground"

                            >
                                {link.label}
                                {!occasionsOpen ? <ChevronDown className="h-3.5 w-3.5 transition-transform" /> : <ChevronUp className="h-3.5 w-3.5 transition-transform" />}
                            </button>
                            {occasionsOpen && (
                                <div className="absolute top-full bg-white left-1/2 -translate-x-1/2 mt-2 w-48 bg-card  rounded-xl shadow-lg py-2 z-50">
                                    {link.subItems.map((sub) => (
                                        <Link
                                            key={sub.to}
                                            href={sub.to}
                                            onClick={() => setOccasionsOpen(false)}
                                            className="block px-4 py-2 text-sm font-medium hover:bg-main hover:text-white transition-colors"
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
                            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors bg-primary text-primary-foreground"

                        >
                            {link.label}
                        </Link>
                    )
                )}
            </nav> */}

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
                            // className={cn(
                            //     "px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-center",
                            //     location.pathname === link.to
                            //         ? "bg-primary text-primary-foreground"
                            //         : "hover:bg-muted"
                            // )}
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