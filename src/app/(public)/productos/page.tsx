'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Palette, Search, Sparkles, Tag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Title from '@/components/ui/title';
import ProductShowcaseCard from '@/components/products/product-showcase-card';

type CatalogProduct = {
    id: number;
    name: string;
    image: string;
    category: string;
    character: string;
    colors: string[];
    occasions: string[];
    description: string;
};

const products: CatalogProduct[] = [
    {
        id: 1,
        name: 'Set de Globos Kuromi',
        image: '/products/destacados/kuromi_balloon.jpg',
        category: 'Globos',
        character: 'Kuromi',
        colors: ['Rosado', 'Negro'],
        occasions: ['Birthday', 'Kids'],
        description: 'Combo tematico de 5 piezas para aire o helio, ideal para mesas principales.',
    },
    {
        id: 2,
        name: 'Combo de Piñata Mickey',
        image: '/products/destacados/combo.jpg',
        category: 'Piñatas',
        character: 'Mickey',
        colors: ['Rojo', 'Amarillo', 'Negro'],
        occasions: ['Birthday', 'Kids'],
        description: 'Piñata cuadrada con relleno incluido para celebraciones infantiles llenas de color.',
    },
    {
        id: 3,
        name: 'Set de Globos Labubu',
        image: '/products/destacados/labubu.jpg',
        category: 'Globos',
        character: 'Labubu',
        colors: ['Marron', 'Rosado'],
        occasions: ['Birthday', 'Kids'],
        description: 'Arreglo de globos con acabado tierno y moderno para fiestas personalizadas.',
    },
    {
        id: 4,
        name: 'Piñata Frozen',
        image: '/products/pinatas/pinata_frozen.png',
        category: 'Piñatas',
        character: 'Frozen',
        colors: ['Azul', 'Blanco'],
        occasions: ['Birthday', 'Kids'],
        description: 'Diseño escarchado con presencia protagonista para cumpleaños inspirados en hielo y fantasia.',
    },
    {
        id: 5,
        name: 'Piñata Pony',
        image: '/products/product-category/pinata_pony.jpg',
        category: 'Piñatas',
        character: 'My Little Pony',
        colors: ['Morado', 'Rosado', 'Celeste'],
        occasions: ['Birthday', 'Kids'],
        description: 'Acabado alegre y pastel para fiestas infantiles con una paleta dulce y brillante.',
    },
    {
        id: 6,
        name: 'Afiche Spiderman',
        image: '/products/afiches/spiderman.jpeg',
        category: 'Afiches',
        character: 'Spiderman',
        colors: ['Rojo', 'Azul'],
        occasions: ['Birthday', 'Kids'],
        description: 'Afiche decorativo para destacar la mesa principal o la entrada de la celebracion.',
    },
    {
        id: 7,
        name: 'Decoracion Feliz Cumple',
        image: '/products/destacados/feliz_cumple.jpg',
        category: 'Decoracion',
        character: 'Cumpleanos',
        colors: ['Fucsia', 'Dorado', 'Azul'],
        occasions: ['Birthday'],
        description: 'Banda y cintillo holografico para una celebracion vibrante y lista para fotos.',
    },
    {
        id: 8,
        name: 'Piñata Artesanal Fiesta',
        image: '/products/pinatas/pinata1.jpg',
        category: 'Piñatas',
        character: 'Personalizado',
        colors: ['Rosado', 'Azul', 'Amarillo'],
        occasions: ['Birthday', 'Kids'],
        description: 'Modelo base adaptable a la tematica del cliente, pensado para pedidos especiales.',
    },
];

const colorOptions = ['Todos', ...Array.from(new Set(products.flatMap((product) => product.colors)))];
const characterOptions = ['Todos', ...Array.from(new Set(products.map((product) => product.character)))];
const categoryOptions = ['Todos', ...Array.from(new Set(products.map((product) => product.category)))];

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
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function normalizeFilterValue(value: string | null) {
    if (!value) {
        return '';
    }

    return normalizeText(value.replace(/\+/g, ' ').trim());
}

function resolveOccasionKey(value: string) {
    const normalizedValue = normalizeText(value);

    return Object.entries(occasionAliases).find(([, aliases]) => aliases.includes(normalizedValue))?.[0] ?? normalizedValue;
}

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const requestedTypeLabel = searchParams.get('tipo')?.replace(/\+/g, ' ').trim() ?? '';
    const requestedOccasionLabel = searchParams.get('ocasion')?.replace(/\+/g, ' ').trim() ?? '';
    const requestedType = normalizeFilterValue(searchParams.get('tipo'));
    const requestedOccasion = normalizeFilterValue(searchParams.get('ocasion'));
    const matchedCategory = categoryOptions.find(
        (category) => normalizeText(category) === requestedType,
    );
    const hasTypeFilterFromUrl = requestedType.length > 0;
    const hasOccasionFilterFromUrl = requestedOccasion.length > 0;
    const hasValidTypeFilter = !hasTypeFilterFromUrl || Boolean(matchedCategory);
    const [selectedColor, setSelectedColor] = useState('Todos');
    const [selectedCharacter, setSelectedCharacter] = useState('Todos');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isCharacterOpen, setIsCharacterOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSelectedCategory(matchedCategory ?? 'Todos');
        setSelectedOccasion(requestedOccasion ? resolveOccasionKey(requestedOccasion) : '');
    }, [matchedCategory, requestedOccasion]);

    const filteredProducts = products.filter((product) => {
        const matchesRequestedType = hasValidTypeFilter
            && (!hasTypeFilterFromUrl || normalizeText(product.category) === requestedType);
        const matchesColor = selectedColor === 'Todos' || product.colors.includes(selectedColor);
        const matchesCharacter = selectedCharacter === 'Todos' || product.character === selectedCharacter;
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesOccasion =
            selectedOccasion.length === 0
            || product.occasions.some((occasion) => resolveOccasionKey(occasion) === selectedOccasion);
        const normalizedSearch = normalizeText(searchTerm.trim());
        const searchableFields = [product.category, product.character, ...product.colors];
        const matchesSearch =
            normalizedSearch.length === 0
            || searchableFields.some((field) => normalizeText(field).includes(normalizedSearch));

        return matchesRequestedType && matchesColor && matchesCharacter && matchesCategory && matchesOccasion && matchesSearch;
    });

    const visibleColorOptions = isColorOpen
        ? colorOptions
        : colorOptions.filter((color) => color === selectedColor);

    const visibleCharacterOptions = isCharacterOpen
        ? characterOptions
        : characterOptions.filter((character) => character === selectedCharacter);

    const visibleCategoryOptions = isCategoryOpen
        ? categoryOptions
        : categoryOptions.filter((category) => category === selectedCategory);

    return (
        <main className="bg-white text-[#3B2830]">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,61,127,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(254,154,78,0.22),_transparent_32%),linear-gradient(180deg,#fff7ed_0%,#fff2e2_100%)]" />
                <div className="absolute left-[-4rem] top-12 h-36 w-36 rounded-full bg-[#ffbfd3]/60 blur-3xl" />
                <div className="absolute right-0 top-32 h-40 w-40 rounded-full bg-[#ffd28f]/60 blur-3xl" />

                <div className="container-custom relative z-10 mx-auto max-w-7xl px-5 py-14 md:py-20">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-[#d64271] shadow-sm backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Realizamos pedidos personalizados
                            </span>
                            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#4b2737] md:text-6xl">
                                Encuentra productos por <span className="text-[#e7467d]">ocasión</span> o
                                {' '}
                                <span className="text-[#fe9a4e]">personaje</span>
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6b4b56] md:text-lg">
                                Conoce lo que podemos ofrecer para tus fiestas especiales o inspírate para realizar un pedido enfocado en ti
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-8 h-24 w-24 rounded-2xl bg-[#ffcad8] rotate-12" />
                            <div className="absolute -right-3 bottom-8 h-28 w-28 rounded-full bg-[#ffd78d]" />
                            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-3 shadow-[0_25px_80px_rgba(231,70,125,0.14)] backdrop-blur">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="relative min-h-[220px] overflow-hidden rounded-2xl">
                                        <Image
                                            src="/products/destacados/kuromi_balloon.jpg"
                                            alt="Decoracion de Kuromi"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 30vw"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="relative min-h-[104px] overflow-hidden rounded-2xl">
                                            <Image
                                                src="/products/pinatas/pinata_frozen.png"
                                                alt="Piñata de Frozen"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 20vw"
                                            />
                                        </div>
                                        <div className="relative min-h-[140px] overflow-hidden rounded-2xl">
                                            <Image
                                                src="/products/product-category/pinata_pony.jpg"
                                                alt="Piñata colorida de My Little Pony"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 20vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="container-custom mx-auto max-w-7xl px-5 py-12 md:py-16">
                <Title
                    mainTitle="Catálogo"
                    subtitle="Explora nuestros productos disponibles y algunos encargos anteriores que podrían inspirarte"
                />

                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
                    <aside className="lg:sticky lg:top-24">
                        <div className="max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-[#f3d7c6] bg-white shadow-[0_18px_45px_rgba(161,96,70,0.08)]">
                            <div className="bg-[linear-gradient(135deg,#fff5ee_0%,#fff0f5_100%)] p-5">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b86c45]">Filtros</p>
                                <h2 className="mt-2 text-2xl font-bold text-[#4b2737]">Refina tu busqueda</h2>
                            </div>

                            <div className="max-h-[calc(100vh-14rem)] space-y-6 overflow-y-auto p-5">
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryOpen((current) => !current)}
                                        className="flex w-full items-center justify-between gap-3 text-left"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Tag className="h-5 w-5 text-[#b86c45]" />
                                            <span className="text-base font-semibold">Tipo de producto</span>
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 cursor-pointer text-[#a15b73] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        {visibleCategoryOptions.map((category) => {
                                            const isActive = selectedCategory === category;

                                            return (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                                                        isActive
                                                            ? 'border-[#b86c45] bg-[#fff4ec] text-[#9a5428] shadow-sm'
                                                            : 'border-[#f1ddce] bg-white text-[#6f5b65] hover:border-[#e7467d] hover:text-[#9f2051]'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsColorOpen((current) => !current)}
                                        className="flex w-full items-center justify-between gap-3 text-left"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Palette className="h-5 w-5 text-[#e7467d]" />
                                            <span className="text-base font-semibold">Color</span>
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 cursor-pointer text-[#a15b73] transition-transform ${isColorOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        {visibleColorOptions.map((color) => {
                                            const isActive = selectedColor === color;

                                            return (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                                                        isActive
                                                            ? 'border-[#e7467d] bg-[#fff0f5] text-[#9f2051] shadow-sm'
                                                            : 'border-[#f1ddce] bg-white text-[#6f5b65] hover:border-[#fe9a4e] hover:text-[#b45126]'
                                                    }`}
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className={`h-3.5 w-3.5 rounded-full border border-black/10 ${colorClasses[color] ?? 'bg-neutral-200'}`} />
                                                        {color}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCharacterOpen((current) => !current)}
                                        className="flex w-full items-center justify-between gap-3 text-left"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Tag className="h-5 w-5 text-[#fe9a4e]" />
                                            <span className="text-base font-semibold">Personaje</span>
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 cursor-pointer text-[#a15b73] transition-transform ${isCharacterOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        {visibleCharacterOptions.map((character) => {
                                            const isActive = selectedCharacter === character;

                                            return (
                                                <button
                                                    key={character}
                                                    type="button"
                                                    onClick={() => setSelectedCharacter(character)}
                                                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                                                        isActive
                                                            ? 'border-[#fe9a4e] bg-[#fff1e5] text-[#b85b1f] shadow-sm'
                                                            : 'border-[#f1ddce] bg-white text-[#6f5b65] hover:border-[#e7467d] hover:text-[#9f2051]'
                                                    }`}
                                                >
                                                    <span className="flex items-center justify-between gap-3">
                                                        <span>{character}</span>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedCategory('Todos');
                                        setSelectedColor('Todos');
                                        setSelectedCharacter('Todos');
                                        setSelectedOccasion('');
                                        setSearchTerm('');
                                    }}
                                    className="w-full rounded-full border border-[#efc9b8] px-4 py-3 text-sm font-semibold text-[#7a5662] transition hover:border-[#e7467d] hover:text-[#9f2051]"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>
                    </aside>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 rounded-2xl border border-[#f3d7c6] bg-white/80 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b47b62]">Catálogo</p>
                                <p className="mt-2 text-sm text-[#6f5b65]">
                                    Mostrando <span className="font-bold text-[#e7467d]">{filteredProducts.length}</span> productos
                                    {selectedCategory !== 'Todos' && ` de ${selectedCategory}`}
                                    {selectedOccasion === 'cumpleanos' && ' para cumpleaños'}
                                    {selectedOccasion === 'baby shower' && ' para baby shower'}
                                    {selectedOccasion === 'navidad' && ' para Navidad'}
                                    {selectedOccasion === 'halloween' && ' para Halloween'}
                                    {selectedOccasion === 'ninos' && ' para niños'}
                                    {selectedOccasion === 'adultos' && ' para adultos'}
                                    {selectedColor !== 'Todos' && ` en ${selectedColor}`}
                                    {selectedCharacter !== 'Todos' && ` para ${selectedCharacter}`}
                                </p>
                            </div>

                            <label className="relative block w-full md:max-w-md">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b47b62]" />
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Buscar productos..."
                                    className="w-full rounded-full border border-[#efc9b8] bg-white px-11 py-3 text-sm text-[#4b2737] outline-none transition placeholder:text-[#b58b7a] focus:border-[#e7467d] focus:ring-2 focus:ring-[#ffd4e3]"
                                />
                            </label>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product, index) => (
                        <ProductShowcaseCard
                            key={product.id}
                            product={product}
                            index={index}
                            subtitle={product.character}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                    ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-[#efc9b8] bg-white/80 px-6 py-14 text-center">
                                <p className="text-2xl font-bold text-[#4b2737]">No encontramos coincidencias</p>
                                <p className="mt-3 text-[#6f5b65]">
                                    {hasTypeFilterFromUrl && requestedTypeLabel
                                        ? `No hay productos disponibles para el filtro "${requestedTypeLabel}".`
                                        : hasOccasionFilterFromUrl && requestedOccasionLabel
                                            ? `No hay productos disponibles para la ocasión "${requestedOccasionLabel}".`
                                            : 'Prueba otra combinacion de filtros o ajusta la busqueda para seguir explorando el catalogo.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
