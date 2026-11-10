# Tareas pendientes — Catálogo VVVS (catalogo-vvvs)

Actualizado: 2026-11-04 — según las tareas que marcaste como hechas y las que dejaste pendientes. Dependencias del backend contrastadas con [expressjs/TODO.md](../expressjs/TODO.md). `npm audit --omit=dev` (revisión del 2026-10-28): 0 vulnerabilidades. No hay tests ni script de lint.

## Estado general

| Fase | Estado | Hechas | Total | Avance |
| --- | --- | --- | --- | --- |
| Fase 1 — Favoritos, compartir, filtros, SEO y seguridad | En curso | 26 | 34 | **76 %** |
| Fase 2 — Todo lo demás | No iniciada | 0 | 11 | **0 %** |

La fase 1 incluye lo que pediste (favoritos locales sin login, botón compartir, filtros en inicio y catálogo, SEO) más los problemas de seguridad. Cada tarea pesa lo mismo, así que el porcentaje es aproximado.

| Sección de la fase 1 | Hechas | Total | Avance |
| --- | --- | --- | --- |
| Hecho | 15 | 15 | 100 % |
| Favoritos (sesión local) | 0 | 3 | 0 % |
| Compartir | 2 | 2 | 100 % |
| SEO | 7 | 12 | 58 % |
| Seguridad | 2 | 2 | 100 % |
| **Fase 1** | **26** | **34** | **76 %** |

Al marcar una tarea, actualizar las dos tablas (hechas ÷ 34 en la fase 1, hechas ÷ 11 en la fase 2).

## Dependencias del backend (expressjs)

Qué tareas pendientes de este proyecto esperan cambios en la API (estado según [expressjs/TODO.md](../expressjs/TODO.md)):

| Dependencia en el backend | Estado | Bloquea en este proyecto |
| --- | --- | --- |
| Filtros `color`, `occasion` y `personalized` en `POST /product` | Corregidos, pendientes de commit | Nada (ya no bloquea) |
| `POST /product/search` (falta importar `geByNameSchema` en `routers/product.js`; la API no arranca con los cambios actuales) | Pendiente de commit | Probar la búsqueda por texto ya hecha |
| `GET /product/:id` | Disponible (commiteado) | Ya no bloquea. Solo queda la carga diferida de imágenes (fase 2) |
| `GET /character` | Disponible | Cargar el filtro de personajes desde la API (pendiente en este proyecto) |

`GET /product/:id`, la página de producto, compartir, JSON-LD y sitemap de productos ya están hechos. Favoritos, SEO de metadata y seguridad no dependen del backend.

## Hecho

- [x] **Botones de favoritos ocultos (2026-11-04):** se quitó el corazón de la tarjeta (`product-card.tsx`) y el botón «Favorito» del popup/detalle (`product-detail.tsx`, que ahora deja solo Compartir) junto con su `useState` local. Quedó un comentario en cada sitio. Las tareas de la sección Favoritos siguen pendientes; al retomarlas, volver a mostrar los botones.
- [x] Catálogo conectado a la API de productos (`POST /product`) con paginación y botón "Mostrar más productos"
- [x] Popup del producto con galería (miniaturas y deslizar en móvil), cierre con Escape y botón "Cotizar por WhatsApp"
- [x] Cabecera responsive con menús de categorías y temáticas
- [x] Filtro «Temáticas» (ocasión) en el panel de filtros del catálogo, encima de Color y con icono `Cake`; muestra las mismas temáticas del menú de la cabecera (`mockOcassions`) y envía el id a la API (`ProductsClient.tsx`). Pendiente de commit. El backend ya arregló `occasion`; falta cargar las opciones desde `GET /occasion`.
- [x] Panel de filtros (escritorio) y hoja de filtros (móvil) con chips de filtros activos y "Limpiar filtros"
- [x] Temática/ocasión: el catálogo envía `occasion` con el id numérico (`ProductsClient.tsx:106`) y la API ya lo acepta
- [x] Filtros de color, temática y personalizados corregidos en el backend
- [x] Filtro por personaje: envía el id (`product.character.id`) y la lista de personajes se acumula, así que no desaparecen al seleccionar uno
- [x] Botón Compartir con Web Share API y respaldo de copiar el enlace
- [x] Metadata global (título, descripción, Open Graph, Twitter), `robots.ts` y `sitemap.ts` base
- [x] Vercel Analytics y Speed Insights
- [x] `.env` fuera de git (nunca estuvo en el historial) y imágenes remotas limitadas al dominio de Supabase
- [x] **Opciones de filtro desde la API:** el catálogo carga colores, categorías y temáticas desde `GET /colors`, `/category` y `/occasion` (`src/lib/colors`, `categories` y `ocassions/service.ts`). Queda aparte: los personajes se calculan con los productos cargados (cargarlos desde `GET /character`, ver Mejoras). El menú de la cabecera, el pie y el inicio siguen con `mockCategories` y `mockOcassions` a propósito. La variable `NEXT_PUBLIG_GET_PRODUCT_CATEGORIES` del `.env.dev` tiene un typo y no se usa.
- [x] **Búsqueda por texto:** usa `POST /product/search` con debounce y paginación, así encuentra también productos de páginas no cargadas. Requiere que el backend arranque con el import de `geByNameSchema` corregido.

## Favoritos (sesión local, sin inicio de sesión)

**Los botones de favoritos están ocultos** en la tarjeta y en el detalle (2026-11-04); no hay estado de favoritos en el código. Las tareas siguientes quedan en pausa hasta que se pida retomarlas.

- [ ] **Persistir favoritos en el navegador:** hook `useFavorites` con `localStorage` (clave versionada), estado compartido entre todas las tarjetas (Context o `useSyncExternalStore`) y sincronizado entre pestañas con el evento `storage`. Envolver lecturas y escrituras en `try/catch` (modo privado) y validar la forma de lo guardado antes de usarlo.
- [ ] **Vista de favoritos:** página `/favoritos` (o filtro "Mis favoritos" en el catálogo) y contador en la cabecera. Decidir qué se guarda: un resumen del producto (id, nombre, imagen, categoría, precio) evita depender del backend; guardar solo el id exigiría un filtro por ids en la API. **Depende de:** el hook `useFavorites`; si se guarda solo el id, de un filtro por ids en la API.
- [ ] **Botones accesibles y coherentes:** el corazón de la tarjeta y el botón "Favorito" del popup comparten estado, usan `aria-pressed` y cambian el texto a "Quitar de favoritos". Mostrar un estado vacío con enlace al catálogo. **Depende de:** el hook `useFavorites`.

## Compartir

Hoy `handleShare` comparte `window.location.href` (`product-card.tsx:168`), es decir, la URL del catálogo con sus filtros, no la del producto.

- [x] **Compartir el enlace del producto:** `product-share-button.tsx` comparte `${origen}/producto/<id>` (copiar, WhatsApp, Messenger, Facebook y X) con el nombre del producto en el mensaje. Se usa en la tarjeta y en el detalle.
- [x] **Página de producto `/producto/[id]`:** `producto/[id]/page.tsx` se renderiza en el servidor con `GET /product/:id` (`getProductById`), `generateMetadata` (título, descripción recortada a 160, Open Graph y Twitter con la imagen principal), JSON-LD y `notFound()` si el id es inválido o no existe. Los productos ocultos (`is_active`) los resuelve el backend devolviendo 404, sin cambios en el front. Pendiente: tras desplegar, pegar un enlace de producto en el depurador de Facebook/WhatsApp para confirmar la vista previa (necesita `NEXT_PUBLIC_SITE_URL` por `metadataBase`).

## SEO

- [x] **Metadata y canonical por página:** `/producto` (canonical `/producto`, también para las URL con filtros), `/contacto` (pasó a página de servidor con `framer-motion/client`; el banner compartido lleva `'use client'`) y `/producto/[id]` (canonical propio) definen su título, descripción y canonical. El inicio usa los de `layout.tsx` (canonical `/`).
- [x] **Una sola URL para el inicio:** el inicio vive solo en `/` (`(public)/page.tsx`); `/home` redirige con 308 desde `next.config.ts` y el sitemap solo lista `/`. Se eliminó `proxy.ts` (su redirect nunca se ejecutaba).
- [x] **Definir `NEXT_PUBLIC_SITE_URL` en producción (2026-11-10):** en Vercel vale `https://www.festypop.com`, sin `/` final (con la barra el sitemap generaba `//producto`). Al ser `NEXT_PUBLIC_*` se fija al compilar: cualquier cambio requiere volver a desplegar.
- [x] **Dominio propio y redirección (2026-11-10):** el sitio vive en `www.festypop.com`; el `.vercel.app` redirige con 301 al dominio, configurado en Vercel (no en `next.config.ts`).
- [x] **Imagen Open Graph:** `src/app/opengraph-image.tsx` y `twitter-image.tsx` generan una imagen de 1200×630 (logo `logo_fiesta3.png` sobre degradado morado-rosado) que Next agrega solo como `og:image` y `twitter:image`; las páginas sin imagen propia la heredan como respaldo. Pendiente: verificarla con el depurador de compartir de Facebook/WhatsApp tras desplegar.
- [x] **Íconos que no existen:** se quitaron `/favicon-16x16.png` y `/apple-touch-icon.png` de la metadata de `layout.tsx` (daban 404); queda solo `/favicon.ico` (`src/app/favicon.ico`). Opcional a futuro: crear un `apple-touch-icon.png` de 180×180 con el logo.
- [x] **Datos estructurados del negocio:** JSON-LD `LocalBusiness` en `components/seo/business-json-ld.tsx`, renderizado en el `layout.tsx` con los datos de `BUSINESS` en `config/site.ts`. Usa `NEXT_PUBLIC_SITE_URL` (si falta, no se renderiza). Pendiente: validarlo en la "Prueba de resultados enriquecidos" de Google una vez desplegado.
- [x] **Datos estructurados de producto:** JSON-LD `Product` en `components/seo/product-json-ld.tsx`, renderizado en `/producto/[id]` (nombre, descripción, imágenes con URL absoluta, sku, categoría y oferta en USD solo cuando hay precio). Sin `availability` porque el catálogo no maneja stock. Pendiente: validarlo en la "Prueba de resultados enriquecidos" de Google una vez desplegado.
- [ ] **Contenido en el HTML inicial:** el inicio y el catálogo cargan los productos con `useEffect` en el navegador, así que los buscadores reciben "Cargando productos...". Traer la primera página en el servidor (con `revalidate`) y pasarla al componente de cliente. **Depende de:** separar las páginas de servidor y cliente (tarea de metadata y canonical).
- [x] **Estructura del `layout.tsx`:** `<Analytics />` y `<SpeedInsights />` ahora están dentro del `<body>` y `<html>` es la raíz del layout.
- [x] **Sitemap con productos:** `sitemap.ts` (async) recorre `POST /product` paginado (50 por página) y agrega `/producto/[id]`; si la API falla (datos mock) omite los productos. Los productos ocultos los excluye el backend. Pendiente: usar una fecha real en `lastModified` si la API la expone.
- [x] **Revisar `/sitemap.xml` y `/robots.txt` en producción (2026-11-10):** con el dominio `www.festypop.com` el sitemap lista las páginas estáticas y los `/producto/[id]` sin doble barra, y `robots.txt` apunta a `https://www.festypop.com/sitemap.xml`. Repetir si cambia `NEXT_PUBLIC_SITE_URL`.
- [x] **Árbol de accesibilidad (Lighthouse, 2026-11-10):** un solo `<main>` en `(public)/layout.tsx` (los de `/producto` y `/contacto` pasaron a `<div>`); `/producto/[id]` usa `<h1>` para el nombre (`ProductDetail` recibe `headingLevel`, en el popup sigue `h2`); las dos `<nav>` de la cabecera tienen `aria-label`; los títulos del pie pasaron de `h3` a `h2` con el mismo estilo; el popup de compartir de escritorio usa `role="group"` en vez de `dialog`; las muestras de color de `product-card.tsx` llevan `role="img"` para que su `aria-label` (nombre del color) sea válido. Pendiente: confirmar con Lighthouse.
- [x] **CLS en `/producto` (2026-11-10):** por `useSearchParams` el HTML estático solo trae el `fallback` del `<Suspense>`; era una línea de texto y el footer aparecía arriba y saltaba al hidratar. El fallback ahora tiene `min-h-screen`. Pendiente: confirmar con Lighthouse. El arreglo de fondo es «Contenido en el HTML inicial».
- [ ] **Verificación:** ~~enviar el sitemap a Google Search Console~~ (hecho 2026-11-10, con el dominio nuevo). Falta: confirmar en Search Console que el sitemap queda en «Correcto» con las URLs descubiertas, y medir con Lighthouse (SEO y Core Web Vitals) antes de cerrar la fase.

## Seguridad

- [x] **Actualizar `next` y dependencias:** `next` pasó de 16.1.6 a 16.4.3 (fijada sin `^`, como antes) y se corrió `npm audit fix`; `npm audit --omit=dev` queda en 0 vulnerabilidades (antes 6: 1 crítica, 4 altas, 1 moderada). `tsc --noEmit` y `next build` pasan. Pendiente: recorrer el sitio en local (`npm start`) y revisar que todo siga igual.
- [x] **Cabeceras de seguridad HTTP:** `next.config.ts` define `headers()` para todas las rutas: CSP (Vercel Analytics, imágenes de Supabase, origen de la API tomado de `NEXT_PUBLIC_MAIN_API`, Google Fonts, mapa embebido de Google, `frame-ancestors 'none'`), `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` y HSTS. Pendiente: abrir el sitio desplegado y confirmar que la consola no muestra errores de CSP.

## Mejoras (fase 2)

- [ ] Quitar los datos de respaldo y el código muerto: `mock-products.ts` (si la API falla se muestran productos de ejemplo como si fueran reales), `mock-categories.ts`, `mock-ocassions.ts`, `components/lib/data.tsx` (`MOCK_PRODUCTS` en inglés), `components/ui/product.tsx` (enlaza a `/catalogue`, que no existe), `card.tsx`, `page.module.css` y los SVG de plantilla en `public/`.
- [ ] Carga diferida de las imágenes extras del producto (ver `CLAUDE.md`: pedirlas solo al abrir el popup; requiere `GET /product/:id`). No implementar hasta que se pida.
- [ ] Formulario de contacto: `ContactUsBanner` guarda el estado y hace `console.log` de nombre, correo, teléfono y mensaje (`contactus-banner.tsx:20`), pero no renderiza ningún formulario ni envía nada. Implementarlo (WhatsApp o correo) o eliminar el código.
- [ ] Productos de temporada del slider: están escritos a mano en `home/page.tsx:177` (nombre, precio e imagen). Traerlos de la API.
- [ ] Tests: configurar Vitest y Playwright (hook de favoritos, filtros, compartir).
- [ ] ESLint: no hay configuración ni script `lint`; agregarlo y correrlo en CI.
- [ ] `fetchJson` robusto: timeout con `AbortController`, errores tipados y esqueletos de carga en lugar del spinner.
- [ ] Variables de entorno: quitar las que no se usan (`NEXT_PUBLIC_PRODUCTS_API_URL`, `NEXT_PUBLIC_DEV_API`, `VERSION`), documentarlas, y evitar que `.gitignore` ignore `.env.example` (el patrón `.env*` lo excluye).
- [ ] README: reemplazar el texto genérico de `create-next-app` por la documentación del proyecto.
- [ ] Renombrar `ocassion` → `occasion` (carpeta `lib/ocassions`, `types/ocassion.ts`) y conectar `lib/ocassions/service.ts` a `GET /occasion` (hoy no se usa y apunta a otra variable de entorno).
- [ ] Rendimiento: revisar imágenes (`priority`, `sizes`), el peso de `framer-motion` y el confeti del inicio.
