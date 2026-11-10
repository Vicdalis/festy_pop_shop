'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Facebook, Link2, MessageCircle, Send, Share2 } from 'lucide-react';
import { useSiteOrigin } from './use-site-origin';

type ShareOptionId = 'copy' | 'whatsapp' | 'messenger' | 'facebook' | 'x';

const SHARE_OPTIONS: { id: ShareOptionId; label: string; bg: string; icon: React.ReactNode }[] = [
    { id: 'copy', label: 'Copiar enlace', bg: 'bg-[#e4e4de]', icon: <Link2 className="h-6 w-6 text-[#261033]" /> },
    { id: 'whatsapp', label: 'WhatsApp', bg: 'bg-[#25d366]', icon: <MessageCircle className="h-6 w-6 text-white" /> },
    { id: 'messenger', label: 'Messenger', bg: 'bg-gradient-to-br from-[#00b2ff] via-[#a033ff] to-[#ff5280]', icon: <Send className="h-6 w-6 text-white" /> },
    { id: 'facebook', label: 'Facebook', bg: 'bg-[#1877f2]', icon: <Facebook className="h-6 w-6 fill-white text-white" /> },
    { id: 'x', label: 'X', bg: 'bg-[#111]', icon: <span className="text-xl font-bold text-white">𝕏</span> },
];

type ProductShareButtonProps = {
    product: { id: number; name: string };
    // card: boton compacto con menu en modal (portal); detail: boton ancho con menu anclado al boton
    variant?: 'card' | 'detail';
};

export default function ProductShareButton({ product, variant = 'card' }: ProductShareButtonProps) {
    const siteOrigin = useSiteOrigin();
    const [isOpen, setIsOpen] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isCard = variant === 'card';

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (!isCard) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, isCard]);

    const handleShare = async (optionId: ShareOptionId) => {
        setIsOpen(false);

        const productUrl = `${siteOrigin}/producto/${product.id}`;

        switch (optionId) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`${product.name} ${productUrl}`)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'messenger':
                window.open(`fb-messenger://share/?link=${encodeURIComponent(productUrl)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'x':
                window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(productUrl)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'copy':
            default:
                try {
                    await navigator.clipboard.writeText(productUrl);
                    setIsLinkCopied(true);
                    window.setTimeout(() => setIsLinkCopied(false), 1600);
                } catch {
                    // Sin acceso al portapapeles: no se muestra confirmacion
                }
        }
    };

    const renderOptions = () => (
        <div className={`flex justify-between gap-1 overflow-x-auto pb-1 ${isCard ? '' : 'sm:justify-start sm:gap-3'}`}>
            {SHARE_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => handleShare(option.id)}
                    className={`flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1 text-center text-[11px] font-medium leading-tight text-[#261033] ${isCard ? '' : 'sm:w-14 sm:flex-none sm:shrink-0 sm:text-xs'}`}
                >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isCard ? '' : 'sm:h-12 sm:w-12'} ${option.bg}`}>
                        {option.icon}
                    </span>
                    {option.label}
                </button>
            ))}
        </div>
    );

    if (isCard) {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label={`Compartir ${product.name}`}
                    aria-expanded={isOpen}
                    className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 self-end rounded-full border-2 text-[0.75rem] font-black transition sm:h-auto sm:w-auto sm:self-auto sm:px-3 md:px-4 md:text-[0.82rem] ${isLinkCopied ? 'border-[#33c36b] text-[#33c36b]' : 'border-[#ebe4f0] text-[#261033] hover:border-[#8a3dc1]'}`}
                >
                    {isLinkCopied ? (
                        <Check className="h-4 w-4 text-[#33c36b] sm:hidden" />
                    ) : null}
                    <Share2 className={`h-4 w-4 ${isLinkCopied ? 'hidden text-[#33c36b] sm:block' : 'text-[#8a3dc1]'}`} />
                    {isLinkCopied ? <span className="hidden sm:inline">Copiado</span> : <span className="hidden sm:inline">Compartir</span>}
                </button>

                {isMounted && isOpen && createPortal(
                    <div
                        className="fixed inset-0 z-[310] flex items-end justify-center bg-[#1a0b2e]/50 p-3 sm:items-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <div
                            role="dialog"
                            aria-label="Compartir"
                            className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(38,16,51,0.25)]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <p className="mb-3 text-center text-sm font-bold text-[#261033]">Compartir</p>
                            {renderOptions()}
                        </div>
                    </div>,
                    document.body,
                )}
            </>
        );
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#ebe4f0] px-4 py-3 text-sm font-bold text-[#261033] transition hover:border-[#8a3dc1] md:text-base"
            >
                <Share2 className="h-5 w-5 text-[#8a3dc1]" />
                {isLinkCopied ? 'Enlace copiado' : 'Compartir'}
            </button>

            {isOpen && (
                <div
                    role="group"
                    aria-label="Compartir"
                    className="fixed bottom-6 left-1/2 z-20 w-[94vw] max-w-md -translate-x-1/2 rounded-2xl bg-white p-3 shadow-[0_12px_40px_rgba(38,16,51,0.25)] sm:absolute sm:bottom-full sm:left-auto sm:right-0 sm:mb-3 sm:w-[22rem] sm:max-w-none sm:translate-x-0 sm:p-4"
                >
                    <p className="mb-2 text-center text-sm font-bold text-[#261033] sm:mb-3 sm:text-base">Compartir</p>
                    {renderOptions()}
                </div>
            )}
        </div>
    );
}
