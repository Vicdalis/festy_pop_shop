'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brush, ChevronDown, Filter, Palette, Search, Sparkles, Star, Tag, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Title from '@/components/ui/title';
import ProductCard from '@/components/products/product-card';
import { mockCategories } from '@/lib/products/mock-categories';
import { useProducts } from '@/store/hooks/use-products';

const PRODUCTS_PER_PAGE = 12;

// Circulo multicolor para la opcion "Todos": representa mas de un color
const ALL_COLORS_GRADIENT =
    'conic-gradient(#ef4444, #f97316, #facc15, #22c55e, #06b6d4, #3b82f6, #a855f7, #ec4899, #ef4444)';

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

export default function ProductsClient() {
    const searchParams = useSearchParams();
    const catalogSectionRef = useRef<HTMLElement | null>(null);
    const requestedTypeParam = searchParams.get('tipo')?.replace(/\+/g, ' ').trim() ?? '';
    const requestedOccasionLabel = searchParams.get('ocasion')?.replace(/\+/g, ' ').trim() ?? '';
    const requestedCategoryId = Number(requestedTypeParam);
    const matchedCategoryFromId = Number.isNaN(requestedCategoryId)
        ? null
        : mockCategories.find((category) => category.id === requestedCategoryId) ?? null;
    const requestedTypeLabel = matchedCategoryFromId?.name ?? requestedTypeParam;
    const hasTypeFilterFromUrl = requestedTypeParam.length > 0;
    const hasOccasionFilterFromUrl = requestedOccasionLabel.length > 0;
    const shouldAutoScrollToCatalog = hasTypeFilterFromUrl || hasOccasionFilterFromUrl;
    const [selectedColor, setSelectedColor] = useState('Todos');
    const [selectedCharacter, setSelectedCharacter] = useState('Todos');
    const [onlyPersonalized, setOnlyPersonalized] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(requestedTypeLabel || 'Todos');
    const [selectedOccasion, setSelectedOccasion] = useState(requestedOccasionLabel);
    const [isColorOpen, setIsColorOpen] = useState(true);
    const [isCharacterOpen, setIsCharacterOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
    // El API filtra por id de color; se recuerda el id de cada nombre aunque luego la lista se reduzca
    const colorIdByName = useRef(new Map<string, number>());
    const selectedOccasionKey = selectedOccasion ? resolveOccasionKey(selectedOccasion) : '';
    const selectedCategoryMatch = mockCategories.find((category) => category.name === selectedCategory) ?? null;
    const productFilters = {
        ...(selectedCategory !== 'Todos'
            ? { category: selectedCategoryMatch?.id ?? selectedCategory }
            : {}),
        ...(colorIdByName.current.has(selectedColor) ? { color: colorIdByName.current.get(selectedColor) } : {}),
        ...(selectedCharacter !== 'Todos' ? { character: selectedCharacter } : {}),
        ...(selectedOccasion ? { theme: selectedOccasion } : {}),
        ...(onlyPersonalized ? { personalized: true } : {}),
        limit: PRODUCTS_PER_PAGE,
    };
    const { products: loadedProducts, isLoading, isLoadingMore, hasMore, loadMore, error, source } = useProducts(productFilters);
    // Con un filtro activo y un error del API, los datos de respaldo no corresponden al filtro:
    // se muestra "sin productos" en lugar de la lista de respaldo.
    const hasActiveApiFilter = Object.keys(productFilters).some((key) => key !== 'limit');
    const products = hasActiveApiFilter && error ? [] : loadedProducts;
    products.forEach((product) => product.colors.forEach((color) => {
        if (color.id !== undefined) colorIdByName.current.set(color.name, color.id);
    }));
    const colorHexByName = new Map(
        products.flatMap((product) => product.colors).map((color) => [color.name, color.hex] as const),
    );
    const colorOptions = ['Todos', ...Array.from(new Set(products.flatMap((product) => product.colors.map((color) => color.name))))];
    const characterOptions = ['Todos', ...Array.from(new Set(products.flatMap((product) => extractObjectNames(product.character))))];
    // El API filtra por categoria, asi que los productos cargados solo traen la seleccionada;
    // la lista de tipos sale del catalogo completo para que no desaparezcan los demas.
    const categoryOptions = [
        'Todos',
        ...Array.from(new Set([
            ...mockCategories.map((category) => category.name),
            ...products.flatMap((product) => extractObjectNames(product.category)),
        ])),
    ];

    useEffect(() => {
        setSelectedCategory(requestedTypeLabel || 'Todos');
        setSelectedOccasion(requestedOccasionLabel);
        setSelectedColor('Todos');
        setSelectedCharacter('Todos');
        setOnlyPersonalized(false);
        setSearchTerm('');
    }, [requestedOccasionLabel, requestedTypeLabel]);

    useEffect(() => {
        if (!shouldAutoScrollToCatalog || !catalogSectionRef.current) {
            return;
        }

        window.requestAnimationFrame(() => {
            catalogSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }, [shouldAutoScrollToCatalog]);

    const filteredProducts = products.filter((product) => {
        const productCategoryNames = extractObjectNames(product.category);
        const productCharacterNames = extractObjectNames(product.character);
        const productOccasionNames = extractNames(product.occasions);
        const searchableFields = [
            product.name,
            product.description,
            ...productCategoryNames,
            ...productCharacterNames,
            ...product.colors.map((color) => color.name),
            ...productOccasionNames,
        ];

        const normalizedSearch = normalizeText(searchTerm.trim());
        const matchesSearch = normalizedSearch.length === 0
            || searchableFields.some((field) => normalizeText(field).includes(normalizedSearch));

        return matchesSearch;
    });

    const visibleColorOptions = isColorOpen
        ? colorOptions
        : [selectedColor];

    const visibleCharacterOptions = isCharacterOpen
        ? characterOptions
        : [selectedCharacter];

    const visibleCategoryOptions = isCategoryOpen
        ? categoryOptions
        : [selectedCategory];

    const clearFilters = () => {
        setSelectedCategory('Todos');
        setSelectedColor('Todos');
        setSelectedCharacter('Todos');
        setOnlyPersonalized(false);
        setSelectedOccasion('');
        setSearchTerm('');
    };

    const activeFilterChips = [
        onlyPersonalized && { key: 'personalized', label: 'Personalizados', onRemove: () => setOnlyPersonalized(false) },
        selectedCategory !== 'Todos' && { key: 'category', label: selectedCategory, onRemove: () => setSelectedCategory('Todos') },
        selectedColor !== 'Todos' && { key: 'color', label: selectedColor, onRemove: () => setSelectedColor('Todos') },
        selectedCharacter !== 'Todos' && { key: 'character', label: selectedCharacter, onRemove: () => setSelectedCharacter('Todos') },
        selectedOccasion && { key: 'occasion', label: selectedOccasion, onRemove: () => setSelectedOccasion('') },
    ].filter((chip) => !!chip) as { key: string; label: string; onRemove: () => void }[];

    const filterGroups = (
        <div className="space-y-6">
            <button
                type="button"
                role="switch"
                aria-checked={onlyPersonalized}
                onClick={() => setOnlyPersonalized((current) => !current)}
                className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    onlyPersonalized
                        ? 'border-[#8a3dc1] bg-[#f6eefc]'
                        : 'border-[#f1ddce] bg-white hover:border-[#8a3dc1]'
                }`}
            >
                <span className="flex items-center gap-3">
                    <Brush className="h-5 w-5 shrink-0 text-[#8a3dc1]" />
                    <span className="whitespace-nowrap text-base font-semibold">Solo personalizados</span>
                </span>
                <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${onlyPersonalized ? 'bg-[#8a3dc1]' : 'bg-[#e5dce8]'}`}
                >
                    <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${onlyPersonalized ? 'left-[22px]' : 'left-0.5'}`}
                    />
                </span>
            </button>

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
                                    <div className="flex flex-wrap gap-2">
                                        {visibleCategoryOptions.map((category) => {
                                            const isActive = selectedCategory === category;

                                            return (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => setSelectedCategory(category)}
                                                    className={`rounded-full border-2 px-4 py-2 text-left text-sm font-semibold transition-all ${
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
                                    <div className="flex flex-wrap gap-2">
                                        {visibleColorOptions.map((color) => {
                                            const isActive = selectedColor === color;

                                            return (
                                                <button
                                                    key={color}
                                                    type="button"
                                                    onClick={() => setSelectedColor(color)}
                                                    className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-left text-sm font-semibold transition-all ${
                                                        isActive
                                                            ? 'border-[#e7467d] bg-[#fff0f5] text-[#9f2051] shadow-sm'
                                                            : 'border-[#f1ddce] bg-white text-[#6f5b65] hover:border-[#fe9a4e] hover:text-[#b45126]'
                                                    }`}
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <span
                                                            className={`h-3.5 w-3.5 rounded-full border border-black/10 ${color === 'Todos' || colorHexByName.get(color) ? '' : (colorClasses[color] ?? 'bg-neutral-200')}`}
                                                            style={
                                                                color === 'Todos'
                                                                    ? { backgroundImage: ALL_COLORS_GRADIENT }
                                                                    : colorHexByName.get(color)
                                                                        ? { backgroundColor: colorHexByName.get(color) as string }
                                                                        : undefined
                                                            }
                                                        />
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
                                            <Star className="h-5 w-5 text-[#fe9a4e]" />
                                            <span className="text-base font-semibold">Personaje</span>
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 cursor-pointer text-[#a15b73] transition-transform ${isCharacterOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div className="flex flex-wrap gap-2">
                                         {visibleCharacterOptions.map((character) => {
                                            const isActive = selectedCharacter === character;

                                            return (
                                                <button
                                                    key={character}
                                                    type="button"
                                                    onClick={() => setSelectedCharacter(character)}
                                                    className={`rounded-full border-2 px-4 py-2 text-left text-sm font-semibold transition-all ${
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
        </div>
    );

    return (
        <main className="bg-white text-[#3B2830]">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,61,127,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(254,154,78,0.22),_transparent_32%),linear-gradient(180deg,#fff7ed_0%,#fff2e2_100%)]" ></div>
                <div className="absolute left-[-4rem] top-12 h-36 w-36 rounded-full bg-[#ffbfd3]/60 blur-3xl" ></div>
                <div className="absolute right-0 top-32 h-40 w-40 rounded-full bg-[#ffd28f]/60 blur-3xl" ></div>

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
                            className="relative hidden lg:block"
                        >
                            <div className="absolute -left-4 top-8 h-24 w-24 rounded-2xl bg-[#ffcad8] rotate-12" ></div>
                            <div className="absolute -right-3 bottom-8 h-28 w-28 rounded-full bg-[#ffd78d]" ></div>
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

            <section ref={catalogSectionRef} className="container-custom mx-auto max-w-7xl scroll-mt-24 px-4 py-12 lg:px-3 md:py-16">
                <Title
                    mainTitle="Catálogo"
                    subtitle="Explora nuestros productos disponibles y algunos encargos anteriores que podrían inspirarte"
                />

                <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
                    <aside className="hidden lg:sticky lg:top-24 lg:block">
                        <div className="max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-[#f3d7c6] bg-white shadow-[0_18px_45px_rgba(161,96,70,0.08)]">
                            <div className="bg-[linear-gradient(135deg,#fff5ee_0%,#fff0f5_100%)] p-5">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b86c45]">Filtros</p>
                                <h2 className="mt-2 text-2xl font-bold text-[#4b2737]">Refina tu busqueda</h2>
                            </div>

                            <div className="max-h-[calc(100vh-14rem)] space-y-6 overflow-y-auto p-5">
                                {filterGroups}

                                <button
                                    type="button"
                                    onClick={clearFilters}
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
                                    {selectedOccasionKey === 'cumpleanos' && ' para cumpleaños'}
                                    {selectedOccasionKey === 'baby shower' && ' para baby shower'}
                                    {selectedOccasionKey === 'navidad' && ' para Navidad'}
                                    {selectedOccasionKey === 'halloween' && ' para Halloween'}
                                    {selectedOccasionKey === 'ninos' && ' para niños'}
                                    {selectedOccasionKey === 'adultos' && ' para adultos'}
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

                        {activeFilterChips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {activeFilterChips.map((chip) => (
                                    <button
                                        key={chip.key}
                                        type="button"
                                        onClick={chip.onRemove}
                                        aria-label={`Quitar filtro ${chip.label}`}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#2a1245] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4a1a82]"
                                    >
                                        {chip.label}
                                        <X className="h-4 w-4" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-[#f3d7c6] bg-white/80 px-6 text-center shadow-sm">
                                <span className="h-14 w-14 animate-spin rounded-full border-4 border-[#ffd4e3] border-t-[#e7467d]" />
                                <p className="mt-6 text-2xl font-bold text-[#4b2737]">Cargando productos...</p>
                                <p className="mt-2 max-w-md text-[#6f5b65]">
                                    Estamos consultando el catálogo para mostrarte los productos disponibles.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-3">
                                {filteredProducts.map((product, index) => {
                                    const categoryNames = extractObjectNames(product.category);
                                    const characterNames = extractObjectNames(product.character);
                                    const hasGeneralCharacter = characterNames.includes('General');
                                    const primaryCategory = categoryNames[0] ?? 'Sin categoria';
                                    const primaryCharacter = characterNames[0] ?? 'Destacado';
                                    return (
                                        <ProductCard
                                            key={product.id}
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                description: product.description,
                                                image: product.main_image,
                                                images: product.images ?? [],
                                                category: primaryCategory,
                                                character: hasGeneralCharacter ? undefined : primaryCharacter,
                                                colors: product.colors,
                                                isPersonalized: product.is_personalized,
                                                occasions: extractNames(product.occasions),
                                                price: product.price,
                                            }}
                                            index={index}
                                            badge={hasGeneralCharacter ? primaryCategory : primaryCharacter}
                                            badgeColor={hasGeneralCharacter ? '#8a3dc1' : '#e7467d'}
                                            metaChip={product.colors.length > 0 ? `${product.colors.length} colores` : undefined}
                                            colorDisplay="swatches"
                                            viewHref={`/productos?tipo=${encodeURIComponent(primaryCategory)}`}
                                            viewLabel="Filtrar"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {!isLoading && hasMore && (
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={isLoadingMore}
                                    className="rounded-full bg-main-purple px-8 py-3 text-sm font-black text-white transition hover:bg-light-pink disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoadingMore ? 'Cargando...' : 'Mostrar más productos'}
                                </button>
                            </div>
                        )}

                        {!isLoading && filteredProducts.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-[#efc9b8] bg-white/80 px-6 py-14 text-center">
                                <p className="text-2xl font-bold text-[#4b2737]">No encontramos coincidencias</p>
                                <p className="mt-3 text-[#6f5b65]">
                                    {selectedCategory !== 'Todos'
                                        ? `No hay productos disponibles para el tipo "${selectedCategory}".`
                                    : hasTypeFilterFromUrl && requestedTypeLabel
                                        ? `No hay productos disponibles para el filtro "${requestedTypeLabel}".`
                                        : hasOccasionFilterFromUrl && requestedOccasionLabel
                                            ? `No hay productos disponibles para la ocasión "${requestedOccasionLabel}".`
                                            : 'Prueba otra combinacion de filtros o ajusta la busqueda para seguir explorando el catalogo.'}
                                </p>
                            </div>
                        )}

                        {process.env.NODE_ENV === 'development' && !isLoading && source === 'mock' && error && (
                            <div className="rounded-2xl border border-[#efc9b8] bg-[#fff8f4] px-6 py-5 text-sm text-[#7a5662]">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <button
                type="button"
                onClick={() => setIsFilterSheetOpen(true)}
                className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#4a1a82] to-[#6a2cb0] px-6 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(74,26,130,0.45)] transition active:scale-95 lg:hidden"
            >
                <Filter className="h-5 w-5" />
                Filtrar
            </button>

            {isFilterSheetOpen && (
                <div className="fixed inset-0 z-50 flex items-end lg:hidden" role="dialog" aria-modal="true" aria-label="Refina tu búsqueda">
                    <div className="absolute inset-0 bg-black/45" onClick={() => setIsFilterSheetOpen(false)} />
                    <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#eee] px-6 py-5">
                            <h2 className="text-2xl font-bold text-[#2a1245]">Refina tu búsqueda</h2>
                            <button
                                type="button"
                                onClick={() => setIsFilterSheetOpen(false)}
                                aria-label="Cerrar filtros"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1ecf8] text-[#2a1245]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto px-6 py-5">{filterGroups}</div>
                        <div className="flex gap-3 border-t border-[#eee] px-6 py-4">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="flex-1 rounded-full border-2 border-[#e5e0ee] px-4 py-3 text-base font-bold text-[#5b2a9a]"
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsFilterSheetOpen(false)}
                                className="flex-[1.6] rounded-full bg-gradient-to-r from-[#4a1a82] to-[#6a2cb0] px-4 py-3 text-base font-bold text-white"
                            >
                                Ver productos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
