import type { Product } from '@/types/product';

export const mockProducts: Product[] = [
    // {
    //     id: 1,
    //     name: 'Set de Globos Kuromi',
    //     image: '/products/destacados/kuromi_balloon.jpg',
    //     images: [
    //         '/products/destacados/kuromi_balloon.jpg',
    //         '/products/destacados/labubu.jpg',
    //     ],
    //     price: 12.99,
    //     // category: 'Globos',
    //     // character: 'Kuromi',
    //     colors: ['Rosado', 'Negro'],
    //     // occasions: ['Birthday', 'Kids'],
    //     description: 'Combo tematico de 5 piezas para aire o helio, ideal para mesas principales.',
    // },
    // {
    //     id: 2,
    //     name: 'Combo de Piñata Mickey',
    //     image: '/products/destacados/combo.jpg',
    //     images: [
    //         '/products/destacados/combo.jpg',
    //         '/products/pinatas/pinata1.jpg',
    //         '/products/pinatas/pinata_3.jpeg',
    //     ],
    //     // category: 'Piñatas',
    //     price: 12.99,
    //     // character: 'Mickey',
    //     colors: ['Rojo', 'Amarillo', 'Negro'],
    //     // occasions: ['Birthday', 'Kids'],
    //     description: 'Piñata cuadrada con relleno incluido para celebraciones infantiles llenas de color.',
    // },
    // {
    //     id: 3,
    //     name: 'Set de Globos Labubu',
    //     main_image: '/products/destacados/labubu.jpg',
    //     images: [
    //         '/products/destacados/labubu.jpg',
    //         '/products/destacados/kuromi_balloon.jpg',
    //     ],
    //     category: 1,
    //     price: 12.99,
    //     character: 1,
    //     colors: ['Marron', 'Rosado'],
    //     // occasions: ['Birthday', 'Kids'],
    //     sku: "",
    //     is_personalized: false,
    //     description: 'Arreglo de globos con acabado tierno y moderno para fiestas personalizadas.',
    // },
    // {
    //     id: 4,
    //     name: 'Piñata Frozen',
    //     image: '/products/pinatas/pinata_frozen.png',
    //     images: [
    //         '/products/pinatas/pinata_frozen.png',
    //         '/products/pinatas/pinata_4.jpeg',
    //         '/products/pinatas/pinata_6.jpg',
    //     ],
    //     category: 'Piñatas',
    //     character: 'Frozen',
    //     colors: ['Azul', 'Blanco'],
    //     occasions: ['Birthday', 'Kids'],
    //     description: 'Diseño escarchado con presencia protagonista para cumpleaños inspirados en hielo y fantasia.',
    // },
    // {
    //     id: 5,
    //     name: 'Piñata Pony',
    //     image: '/products/product-category/pinata_pony.jpg',
    //     images: [
    //         '/products/product-category/pinata_pony.jpg',
    //         '/products/pinatas/pinata_5.jpeg',
    //         '/products/pinatas/pinata_7.jpg',
    //     ],
    //     category: 'Piñatas',
    //     price: 12.99,
    //     character: 'My Little Pony',
    //     colors: ['Morado', 'Rosado', 'Celeste'],
    //     occasions: ['Birthday', 'Kids'],
    //     description: 'Acabado alegre y pastel para fiestas infantiles con una paleta dulce y brillante.',
    // },
    {
            "id": 1,
            "name": "Afiche Sirenita Pequeno",
            "category": {
                "id": 2,
                "name": "Afiches"
            },
            "description": "Afiche pequeno sirenita",
            "price": 12,
            "character": {
                "id": 1,
                "name": "Sirenita"
            },
            "main_image": "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/afiches/123-4456-789/main.jpg",
            "images": [],
            "sku": "AF0001",
            "is_personalized": false,
            "colors": [],
            "occasions": [
                {
                    "id": 1,
                    "name": "Cumpleaños"
                },
                {
                    "id": 2,
                    "name": "Infantil"
                }
            ]
        },
        {
            "id": 2,
            "name": "Piñata Stitch",
            "category": {
                "id": 3,
                "name": "Piñatas"
            },
            "description": "",
            "price": 20,
            "character": {
                "id": 7,
                "name": "Stitch"
            },
            "main_image": "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/pinatas/PI0001/main.jpg",
            "images": null,
            "sku": "PI0001",
            "is_personalized": true,
            "colors": [],
            "occasions": [
                {
                    "id": 1,
                    "name": "Cumpleaños"
                },
                {
                    "id": 2,
                    "name": "Infantil"
                }
            ]
        },
        {
            "id": 3,
            "name": "Piñat Número 1 Rey León",
            "category": {
                "id": 3,
                "name": "Piñatas"
            },
            "description": "",
            "price": 20,
            "character": {
                "id": 8,
                "name": "Rey León"
            },
            "main_image": "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/pinatas/PI0002/main.jpg",
            "images": null,
            "sku": "PI0002",
            "is_personalized": true,
            "colors": [],
            "occasions": [
                {
                    "id": 1,
                    "name": "Cumpleaños"
                },
                {
                    "id": 2,
                    "name": "Infantil"
                }
            ]
        },
        {
            "id": 4,
            "name": "Figuras Safari",
            "category": {
                "id": 7,
                "name": "Anime"
            },
            "description": "",
            "price": null,
            "character": null,
            "main_image": "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/anime/AN0001/tigre_anime.png",
            "images": [
                "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/anime/AN0001/jirafa_anime.png",
                "https://oxgbvjgfnomvclsrtoma.supabase.co/storage/v1/object/public/productos/anime/AN0001/leon_anime.png"
            ],
            "sku": "AN0001",
            "is_personalized": true,
            "colors": [],
            "occasions": [
                {
                    "id": 2,
                    "name": "Infantil"
                }
            ]
        },
        {
            "id": 5,
            "name": "Corona y banda Feliz Cumpleanos",
            "category": {
                "id": 4,
                "name": "Decoración"
            },
            "description": "",
            "price": null,
            "character": null,
            "main_image": "",
            "images": null,
            "sku": "DEC0001",
            "is_personalized": false,
            "colors": [ "Azul Oscuro", "Blanco", "Rosado", "Vinotinto" ],
            "occasions": []
        }
];
