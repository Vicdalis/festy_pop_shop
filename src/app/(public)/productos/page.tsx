'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Palette, Sparkles, Tag } from 'lucide-react';
import Title from '@/components/ui/title';

type CatalogProduct = {
    id: number;
    name: string;
    image: string;
    category: string;
    character: string;
    colors: string[];
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
        description: 'Combo tematico de 5 piezas para aire o helio, ideal para mesas principales.',
    },
    {
        id: 2,
        name: 'Combo de Pinata Mickey',
        image: '/products/destacados/combo.jpg',
        category: 'Pinatas',
        character: 'Mickey',
        colors: ['Rojo', 'Amarillo', 'Negro'],
        description: 'Pinata cuadrada con relleno incluido para celebraciones infantiles llenas de color.',
    },
    {
        id: 3,
        name: 'Set de Globos Labubu',
        image: '/products/destacados/labubu.jpg',
        category: 'Globos',
        character: 'Labubu',
        colors: ['Marron', 'Rosado'],
        description: 'Arreglo de globos con acabado tierno y moderno para fiestas personalizadas.',
    },
    {
        id: 4,
        name: 'Pinata Frozen',
        image: '/products/pinatas/pinata_frozen.png',
        category: 'Pinatas',
        character: 'Frozen',
        colors: ['Azul', 'Blanco'],
        description: 'Diseño escarchado con presencia protagonista para cumpleaños inspirados en hielo y fantasia.',
    },
    {
        id: 5,
        name: 'Pinata Pony',
        image: '/products/product-category/pinata_pony.jpg',
        category: 'Pinatas',
        character: 'My Little Pony',
        colors: ['Morado', 'Rosado', 'Celeste'],
        description: 'Acabado alegre y pastel para fiestas infantiles con una paleta dulce y brillante.',
    },
    {
        id: 6,
        name: 'Afiche Spiderman',
        image: '/products/afiches/spiderman.jpeg',
        category: 'Afiches',
        character: 'Spiderman',
        colors: ['Rojo', 'Azul'],
        description: 'Afiche decorativo para destacar la mesa principal o la entrada de la celebracion.',
    },
    {
        id: 7,
        name: 'Decoracion Feliz Cumple',
        image: '/products/destacados/feliz_cumple.jpg',
        category: 'Decoracion',
        character: 'Cumpleanos',
        colors: ['Fucsia', 'Dorado', 'Azul'],
        description: 'Banda y cintillo holografico para una celebracion vibrante y lista para fotos.',
    },
    {
        id: 8,
        name: 'Pinata Artesanal Fiesta',
        image: '/products/pinatas/pinata1.jpg',
        category: 'Pinatas',
        character: 'Personalizado',
        colors: ['Rosado', 'Azul', 'Amarillo'],
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

export default function ProductsPage() {
    const [selectedColor, setSelectedColor] = useState('Todos');
    const [selectedCharacter, setSelectedCharacter] = useState('Todos');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isCharacterOpen, setIsCharacterOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const filteredProducts = products.filter((product) => {
        const matchesColor = selectedColor === 'Todos' || product.colors.includes(selectedColor);
        const matchesCharacter = selectedCharacter === 'Todos' || product.character === selectedCharacter;
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;

        return matchesColor && matchesCharacter && matchesCategory;
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
        <main className="bg-light-cream text-[#3B2830]">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,61,127,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(254,154,78,0.22),_transparent_32%),linear-gradient(180deg,#fff7ed_0%,#fff2e2_100%)]" />
                <div className="absolute left-[-4rem] top-12 h-36 w-36 rounded-full bg-[#ffbfd3]/60 blur-3xl" />
                <div className="absolute right-0 top-32 h-40 w-40 rounded-full bg-[#ffd28f]/60 blur-3xl" />

                <div className="container-custom relative z-10 mx-auto max-w-7xl px-5 py-14 md:py-20">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold text-[#d64271] shadow-sm backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Catalogo creativo para fiestas personalizadas
                            </span>
                            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#4b2737] md:text-6xl">
                                Encuentra productos por <span className="text-[#e7467d]">color</span> o
                                {' '}
                                <span className="text-[#fe9a4e]">personaje</span>
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6b4b56] md:text-lg">
                                Armamos una vitrina pensada para que la busqueda sea rapida y visual. Filtra segun
                                la paleta de tu fiesta o la tematica que quieres destacar.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-[#f6d3c0]">
                                    <p className="text-sm text-[#8a6a76]">Productos</p>
                                    <p className="text-2xl font-bold text-[#e7467d]">{products.length}</p>
                                </div>
                                <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-[#f6d3c0]">
                                    <p className="text-sm text-[#8a6a76]">Personajes</p>
                                    <p className="text-2xl font-bold text-[#fe9a4e]">{characterOptions.length - 1}</p>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-8 h-24 w-24 rounded-[2rem] bg-[#ffcad8] rotate-12" />
                            <div className="absolute -right-3 bottom-8 h-28 w-28 rounded-full bg-[#ffd78d]" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-[0_25px_80px_rgba(231,70,125,0.14)] backdrop-blur">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem]">
                                        <Image
                                            src="/products/destacados/kuromi_balloon.jpg"
                                            alt="Decoracion de Kuromi"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 30vw"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="relative min-h-[104px] overflow-hidden rounded-[1.5rem]">
                                            <Image
                                                src="/products/pinatas/pinata_frozen.png"
                                                alt="Pinata de Frozen"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 20vw"
                                            />
                                        </div>
                                        <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#e7467d_0%,#fe9a4e_100%)] p-5 text-white">
                                            <p className="text-sm uppercase tracking-[0.18em] text-white/70">Filtro activo</p>
                                            <p className="mt-2 text-2xl font-bold">{selectedColor}</p>
                                            <p className="mt-1 text-sm text-white/85">
                                                {selectedCharacter === 'Todos' ? 'Todos los personajes' : selectedCharacter}
                                            </p>
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
                    mainTitle="Filtra y combina"
                    subtitle="Explora el catalogo con una distribucion estilo ecommerce: filtros al lado izquierdo y productos al frente."
                />

                <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
                    <aside className="lg:sticky lg:top-24">
                        <div className="max-h-[calc(100vh-7rem)] overflow-hidden rounded-[2rem] border border-[#f3d7c6] bg-white shadow-[0_18px_45px_rgba(161,96,70,0.08)]">
                            <div className="bg-[linear-gradient(135deg,#fff5ee_0%,#fff0f5_100%)] p-5">
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b86c45]">Filtros</p>
                                <h2 className="mt-2 text-2xl font-bold text-[#4b2737]">Refina tu busqueda</h2>
                                <p className="mt-2 text-sm leading-6 text-[#6f5b65]">
                                    Combina color y personaje para ver productos que encajan mejor con tu celebracion.
                                </p>
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
                                    }}
                                    className="w-full rounded-full border border-[#efc9b8] px-4 py-3 text-sm font-semibold text-[#7a5662] transition hover:border-[#e7467d] hover:text-[#9f2051]"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>
                    </aside>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 rounded-[2rem] border border-[#f3d7c6] bg-white/80 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b47b62]">Catalogo</p>
                                <p className="mt-2 text-sm text-[#6f5b65]">
                                    Mostrando <span className="font-bold text-[#e7467d]">{filteredProducts.length}</span> productos
                                    {selectedColor !== 'Todos' && ` en ${selectedColor}`}
                                    {selectedCharacter !== 'Todos' && ` para ${selectedCharacter}`}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#fff4ec] px-4 py-2 text-sm font-semibold text-[#7a5662]">
                                    Tipo: {selectedCategory}
                                </span>
                                <span className="rounded-full bg-[#fff4ec] px-4 py-2 text-sm font-semibold text-[#7a5662]">
                                    Color: {selectedColor}
                                </span>
                                <span className="rounded-full bg-[#fff4ec] px-4 py-2 text-sm font-semibold text-[#7a5662]">
                                    Personaje: {selectedCharacter}
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product, index) => (
                        <motion.article
                            key={product.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: index * 0.05 }}
                            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#f1ddce] bg-white shadow-[0_20px_50px_rgba(161,96,70,0.08)]"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5">
                                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#7f4c5e]">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-4 p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#4b2737]">{product.name}</h3>
                                        <p className="mt-1 text-sm font-semibold text-[#e7467d]">{product.character}</p>
                                    </div>
                                </div>

                                <p className="text-sm leading-6 text-[#6f5b65]">{product.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <span
                                            key={`${product.id}-${color}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-[#fff4ec] px-3 py-1.5 text-xs font-semibold text-[#7a5662]"
                                        >
                                            <span className={`h-3 w-3 rounded-full border border-black/10 ${colorClasses[color] ?? 'bg-neutral-200'}`} />
                                            {color}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={`https://wa.me/584242214781?text=Hola,%20quiero%20cotizar%20${encodeURIComponent(product.name)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#e7467d_0%,#fe9a4e_100%)] px-4 py-3 text-sm font-bold text-white transition hover:opacity-95"
                                >
                                    Cotizar este producto
                                </a>
                            </div>
                        </motion.article>
                    ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="rounded-[2rem] border border-dashed border-[#efc9b8] bg-white/80 px-6 py-14 text-center">
                                <p className="text-2xl font-bold text-[#4b2737]">No encontramos coincidencias</p>
                                <p className="mt-3 text-[#6f5b65]">
                                    Prueba otra combinacion de color o personaje para seguir explorando el catalogo.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
