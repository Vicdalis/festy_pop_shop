# catalogo-vvvs

## Pendiente a futuro (NO implementar todavía)

**Carga diferida de imágenes extras del producto.** Por optimización, las imágenes adicionales de un producto
(`product.images`) deben pedirse al API únicamente cuando el usuario haga click en el producto (al abrir el popup
de ampliar imagen en `src/components/products/product-card.tsx`). En el listado solo se carga la imagen principal
(`main_image`).

Estado actual: el listado ya trae todas las imágenes en cada producto. No cambiar este comportamiento hasta que se pida.

## Filtros del catálogo: cómo se envían al backend

**Regla general: el backend filtra siempre por ID numérico, nunca por nombre.** Los nombres solo se muestran en la UI.

### URL (enlaces desde header, footer, home y banners hacia `/producto`)
- Categoría/tipo: `/producto?tipo=<category.id>` (ej. `/producto?tipo=5`). Ids en `src/lib/products/mock-categories.ts`.
- Temática/ocasión: `/producto?ocasion=<occasion.id>` (ej. `/producto?ocasion=2`). Ids en `src/lib/ocassions/mock-ocassions.ts`. Debe ser un entero positivo; si no, se ignora.
- Los nombres de los parámetros son exactamente `tipo` y `ocasion` (en español, una sola "c" en ocasion). No usar `ocassion`, `category`, etc. en la URL.
- Nunca poner el nombre en la URL (`?tipo=Globos`, `?ocasion=Navidad`): buscar el id en el mock/servicio y usarlo. Un nombre sin id no es aplicable.
- Las temáticas nunca van como ruta (`/2`); siempre `/producto?ocasion=<id>`.

### Body del POST (`getProducts` en `src/lib/products/service.ts`, tipo `ProductFilters`)
JSON con solo los filtros activos (omitir las claves sin filtro; nunca enviar "Todos"/null):

| Clave | Tipo | Origen |
|---|---|---|
| `category` | number (id de categoría) | `?tipo=` o selección en la UI |
| `occasion` | number (id de ocasión) | `?ocasion=` o selección en la UI |
| `color` | number (id de color) | selección de color (id tomado de `product.colors[].id`) |
| `character` | number (id de personaje) | selección de personaje (id tomado de `product.character.id`) |
| `personalized` | boolean (`true` solo si está activo) | toggle de personalizados |
| `page` | number | paginación |
| `limit` | number | `PRODUCTS_PER_PAGE` |

Ejemplo: `{ "category": 5, "occasion": 2, "personalized": true, "limit": 12 }`

Cualquier enlace o filtro nuevo debe seguir estas reglas; si no hay un id disponible para un valor, notificarlo en lugar de enviar el nombre.

## Entorno de desarrollo y rutas

- **Se trabaja contra la API local** (`.env.dev`, `http://localhost:4500`). No tomar en cuenta lo que devuelve producción (`festypop-api.vercel.app`) ni la versión local para decidir correcciones: no ajustar el código para tolerar respuestas raras, vacías o incompletas de la API (stubs, `[]`, etc.). Si la API no se comporta como se espera, se avisa; el arreglo va en el backend.
- **Rutas públicas en singular:** catálogo `/producto` y producto individual `/producto/<id>` (carpeta `src/app/(public)/producto/`). No usar `/productos`.
- **404:** `src/app/not-found.tsx` es la pantalla por defecto para rutas inexistentes y para `notFound()` (ej. producto que no existe).
