
const colorClasses: Record<string, string> = {
    Amarillo: 'bg-yellow-300',
    Azul: 'bg-blue-500',
    Blanco: 'bg-white',
    Celeste: 'bg-sky-300',
    Dorado: 'bg-amber-300',
    Fucsia: 'bg-fuchsia-500',
    Marron: 'bg-amber-700',
    Morado: 'bg-violet-500',
    Negro: 'bg-neutral-900',
    Rojo: 'bg-red-500',
    Rosado: 'bg-pink-400',
    Todos: 'bg-[var(--color-main)]',
};

const occasionAliases: Record<string, string[]> = {
    cumpleanos: ['cumpleanos', 'cumpleaños', 'birthday'],
    'baby shower': ['baby shower'],
    navidad: ['navidad', 'christmas'],
    halloween: ['halloween'],
    ninos: ['ninos', 'niños', 'kids'],
    adultos: ['adultos', 'adults'],
};

function normalizeText(value: string) {
    if(!value) return '';
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function resolveOccasionKey(value: string) {
    const normalizedValue = normalizeText(value);

    return Object.entries(occasionAliases).find(([, aliases]) => aliases.includes(normalizedValue))?.[0] ?? normalizedValue;
}

function extractNames(items?: { name: string }[] | null) {
    return items?.map((item) => item.name) ?? [];
}

function extractObjectNames(items?: { name: string } | null) {
    return items ? [items.name] : [];
}

import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export default function Page() {
    return (
        <Suspense fallback={<div className="container-custom mx-auto max-w-7xl px-5 py-12">Cargando catálogo...</div>}>
            <ProductsClient />
        </Suspense>
    );
}
