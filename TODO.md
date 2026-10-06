# Tareas pendientes — Catálogo VVVS (catalogo-vvvs)

Actualizado: 2026-10-05 — revisión del código en `src/`, de `CLAUDE.md` y de la API en producción (consultas de solo lectura al listado de productos). `tsc --noEmit`: sin errores. No hay tests ni script de lint. `npm audit --omit=dev`: 5 vulnerabilidades (1 crítica, 3 altas, 1 moderada).

## Estado general

| Fase | Estado | Hechas | Total | Avance |
| --- | --- | --- | --- | --- |
| Fase 1 — Favoritos, compartir, filtros, SEO y seguridad | En curso | 9 | 38 | **24 %** |
| Fase 2 — Todo lo demás | No iniciada | 0 | 11 | **0 %** |

La fase 1 incluye lo que pediste (favoritos locales sin login, botón compartir, filtros en inicio y catálogo, SEO) más los problemas de seguridad. Cada tarea pesa lo mismo, así que el porcentaje es aproximado.

| Sección de la fase 1 | Hechas | Total | Avance |
| --- | --- | --- | --- |
| Hecho | 9 | 9 | 100 % |
| Favoritos (sesión local) | 0 | 3 | 0 % |
| Compartir | 0 | 3 | 0 % |
| Filtros (inicio y catálogo) | 0 | 9 | 0 % |
| SEO | 0 | 11 | 0 % |
| Seguridad | 0 | 3 | 0 % |
| **Fase 1** | **9** | **38** | **24 %** |

Al marcar una tarea, actualizar las dos tablas (hechas ÷ 38 en la fase 1, hechas ÷ 11 en la fase 2).

## Dependencias del backend (expressjs)

Varias tareas de esta fase no se pueden cerrar sin cambios en la API. Probé el listado en producción (`POST /product`):

| Petición | Respuesta hoy |
| --- | --- |
| `{ "category": 3 }` | Funciona (7 productos) |
| `{ "character": "Kuromi" }` | 400: `"character" must be a number` |
| `{ "theme": "Cumpleaños" }` | 400: `"theme" must be a number` |
| `{ "theme": 1 }` | 200, pero ignora el filtro (devuelve los 13 productos) |
| `{ "color": 1 }` | 500 con cuerpo `{}` |
| `{ "occasion": 1 }` | 500 con cuerpo `{}` |
| `{ "personalized": true }` | Devuelve los 13 productos aunque solo 8 son personalizados; puede que el despliegue no incluya el último commit del backend |

Además, `GET /product/:id` sigue siendo un stub (necesario para la página de producto). Estos puntos se tratan en [expressjs/TODO.md](../expressjs/TODO.md) o hay que agregarlos allí.

## Hecho

- [x] Catálogo conectado a la API de productos (`POST /product`) con paginación y botón "Mostrar más productos"
- [x] Popup del producto con galería (miniaturas y deslizar en móvil), cierre con Escape y botón "Cotizar por WhatsApp"
- [x] Cabecera responsive con menús de categorías y temáticas
- [x] Filtro «Temáticas» (ocasión) en el panel de filtros del catálogo, encima de Color y con icono `Cake`; muestra las mismas temáticas del menú de la cabecera (`mockOcassions`) y envía el id a la API (`ProductsClient.tsx`). **Pendiente de commit (2026-10-05).** Sigue dependiendo de que el backend arregle `occasion` (500) y de cargar las opciones desde `GET /occasion`.
- [x] Panel de filtros (escritorio) y hoja de filtros (móvil) con chips de filtros activos y "Limpiar filtros"
- [x] Botón Compartir con Web Share API y respaldo de copiar el enlace
- [x] Metadata global (título, descripción, Open Graph, Twitter), `robots.ts` y `sitemap.ts` base
- [x] Vercel Analytics y Speed Insights
- [x] `.env` fuera de git (nunca estuvo en el historial) y imágenes remotas limitadas al dominio de Supabase

## Favoritos (sesión local, sin inicio de sesión)

Hoy el corazón es un `useState` dentro de cada tarjeta (`product-card.tsx:64`): no se guarda, se pierde al recargar y no hay lista de favoritos.

- [ ] **Persistir favoritos en el navegador:** hook `useFavorites` con `localStorage` (clave versionada), estado compartido entre todas las tarjetas (Context o `useSyncExternalStore`) y sincronizado entre pestañas con el evento `storage`. Envolver lecturas y escrituras en `try/catch` (modo privado) y validar la forma de lo guardado antes de usarlo.
- [ ] **Vista de favoritos:** página `/favoritos` (o filtro "Mis favoritos" en el catálogo) y contador en la cabecera. Decidir qué se guarda: un resumen del producto (id, nombre, imagen, categoría, precio) evita depender del backend; guardar solo el id exigiría un filtro por ids en la API.
- [ ] **Botones accesibles y coherentes:** el corazón de la tarjeta y el botón "Favorito" del popup comparten estado, usan `aria-pressed` y cambian el texto a "Quitar de favoritos". Mostrar un estado vacío con enlace al catálogo.

## Compartir

Hoy `handleShare` comparte `window.location.href` (`product-card.tsx:168`), es decir, la URL del catálogo con sus filtros, no la del producto.

- [ ] **Compartir el enlace del producto:** usar la URL propia del producto en lugar de la página actual, con el nombre del producto como título del mensaje.
- [ ] **Página de producto `/productos/[id]`:** renderizada en el servidor, con `generateMetadata` (título, descripción e imagen del producto) para que WhatsApp e Instagram muestren una vista previa al pegar el enlace. Requiere `GET /product/:id` en el backend.
- [ ] **Respaldo sin portapapeles:** si `navigator.clipboard` falla (por ejemplo sin HTTPS) mostrar el enlace para copiarlo a mano en lugar de no hacer nada, y poner el botón Compartir también en la tarjeta, no solo dentro del popup.

## Filtros (inicio y catálogo)

- [ ] **Personaje:** `ProductsClient.tsx:97` envía el nombre (`character: 'Kuromi'`) y la API exige un número, así que responde 400. Guardar el id de cada personaje (como ya se hace con los colores) y enviarlo.
- [ ] **Temática/ocasión:** `ProductsClient.tsx:98` envía `theme` con el nombre de la ocasión; la API pide un número y el controlador lee `occasion`, no `theme`. Enviar el id y acordar con el backend un solo nombre de parámetro.
- [ ] **Color, temática y personalizados en el backend:** hoy `color` y `occasion` responden 500 y `personalized: true` no filtra en producción (ver tabla de dependencias). Sin esto, los filtros de color y temática dejan la pantalla sin productos.
- [ ] **Opciones de filtro desde la API:** los tipos salen de `mockCategories` (ids fijos) y los colores y personajes se calculan con los 12 productos cargados, así que las opciones cambian o desaparecen al filtrar. Cargar categorías, personajes, colores y ocasiones desde `GET /category`, `/character`, `/colors` y `/occasion`. La variable `NEXT_PUBLIG_GET_PRODUCT_CATEGORIES` del `.env` tiene un typo y no se usa.
- [ ] **Búsqueda por texto:** `searchTerm` solo filtra los productos ya cargados (`ProductsClient.tsx:147`), por lo que lo que está en páginas siguientes no aparece. Usar `POST /product/search` con debounce y paginación.
- [ ] **Filtros en la URL:** reflejar tipo, color, personaje, ocasión y personalizados en la query para poder compartir una búsqueda y que el botón Atrás funcione. Hoy un `useEffect` (`ProductsClient.tsx:125`) reinicia todos los filtros cuando cambia la URL.
- [ ] **Error con reintento:** si falla una petición con filtros activos se muestra "No encontramos coincidencias" (`ProductsClient.tsx:106`), como si no hubiera productos. Mostrar un mensaje de error con botón "Reintentar".
- [ ] **Filtros de "Productos destacados" en el inicio:** los botones (Globos, Afiches, Piñatas, Personalizados, Anime, Cotillones) filtran por texto solo los 10 productos de la primera página (`home/page.tsx:190`). Pedir a la API por categoría (`category`) y `personalized`, y mapear "Anime" a "Figuras Anime".
- [ ] **Enlaces del inicio y la cabecera:** el menú "Temáticas" usa `?ocassion=` (`header.tsx:26`) pero el catálogo lee `?ocasion=`, así que no filtra. Revisar también que las ocasiones del inicio (4 fijas en `data.tsx`, la API tiene 6) y las categorías de los banners lleguen al catálogo con el filtro aplicado.

## SEO

- [ ] **Metadata y canonical por página:** `layout.tsx` define `alternates.canonical: "/"` y todas las páginas lo heredan, así que `/productos` y `/contacto` declaran que su canonical es el inicio. Definir título, descripción y canonical en cada página; inicio y contacto son componentes de cliente (no pueden exportar `metadata`), hay que separarlos en una página de servidor que renderice el componente. Las URL con filtros deben apuntar su canonical a `/productos`. `productos/page.tsx` además tiene código muerto antes de los imports.
- [ ] **Una sola URL para el inicio:** `/` y `/home` muestran lo mismo y ambas están en el sitemap. `proxy.ts` tiene el redirect pero su `matcher` es `/about/:path*`, así que nunca se ejecuta. Elegir una URL, redirigir la otra (308) y dejar una sola en el sitemap.
- [ ] **Definir `NEXT_PUBLIC_SITE_URL` en producción:** no está en el `.env` local (solo el placeholder `https://tu-dominio.com` en `.env.example`). Sin ella, `metadataBase` queda indefinido, `sitemap.xml` sale vacío y `robots.txt` no apunta al sitemap. Verificar en Vercel y abrir `/sitemap.xml` y `/robots.txt`.
- [ ] **Imagen Open Graph:** no hay `openGraph.images` ni imagen en `public/`, y la tarjeta de Twitter es `summary_large_image` sin imagen. Agregar una imagen de 1200×630 con el logo.
- [ ] **Íconos que no existen:** `layout.tsx` referencia `/favicon-16x16.png` y `/apple-touch-icon.png` y no están en `public/` (dan 404). Crearlos o quitarlos de la metadata.
- [ ] **Datos estructurados del negocio:** JSON-LD `LocalBusiness` con dirección, teléfono, horarios y redes (ya están en `config/site.ts`).
- [ ] **Datos estructurados de producto:** JSON-LD `Product` en la página `/productos/[id]` (nombre, imagen, descripción y precio cuando exista).
- [ ] **Contenido en el HTML inicial:** el inicio y el catálogo cargan los productos con `useEffect` en el navegador, así que los buscadores reciben "Cargando productos...". Traer la primera página en el servidor (con `revalidate`) y pasarla al componente de cliente.
- [ ] **Estructura del `layout.tsx`:** `<Analytics />` y `<SpeedInsights />` están fuera de `<html>` (`layout.tsx:67`); moverlos dentro del `<body>`.
- [ ] **Sitemap con productos:** agregar las páginas `/productos/[id]` al `sitemap.ts` (depende de la página de producto).
- [ ] **Verificación:** enviar el sitemap a Google Search Console y medir con Lighthouse (SEO y Core Web Vitals) antes de cerrar la fase.

## Seguridad

- [ ] **Actualizar `next` y dependencias:** `npm audit --omit=dev` marca `next` (crítica, versiones hasta 16.3.2; la instalada es 16.1.6), `nanoid`, `postcss` y `sharp` (altas) y `baseline-browser-mapping` (moderada). `npm install next@16.3.8` corrige las de `next`, `postcss` y `sharp` sin salto de versión mayor; luego `npm audit fix`.
- [ ] **Cabeceras de seguridad HTTP:** `next.config.ts` no define `headers()`. Agregar `X-Content-Type-Options`, `X-Frame-Options` (o `frame-ancestors`), `Referrer-Policy`, `Permissions-Policy` y una `Content-Security-Policy` que permita Vercel Analytics, las imágenes de Supabase y los enlaces a WhatsApp.
- [ ] **CORS del backend para este sitio:** la API solo acepta orígenes de su lista (`ACCEPTED_ORIGINS`; por defecto `localhost:3000` y `festy-pop-shop.vercel.app`). Confirmar que el dominio de producción de este catálogo está en la lista, y que `NEXT_PUBLIC_MAIN_API` apunta a la API de producción en Vercel.

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
