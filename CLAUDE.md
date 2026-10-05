# catalogo-vvvs

## Pendiente a futuro (NO implementar todavía)

**Carga diferida de imágenes extras del producto.** Por optimización, las imágenes adicionales de un producto
(`product.images`) deben pedirse al API únicamente cuando el usuario haga click en el producto (al abrir el popup
de ampliar imagen en `src/components/products/product-card.tsx`). En el listado solo se carga la imagen principal
(`main_image`).

Estado actual: el listado ya trae todas las imágenes en cada producto. No cambiar este comportamiento hasta que se pida.
