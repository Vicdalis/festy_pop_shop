import HomeClient from './HomeClient';
import { getProductsForServer } from '@/lib/products/service';

// Pagina estatica regenerada cada 5 minutos (ISR). Los productos destacados vienen en el HTML inicial.
// Si el API falla, getProductsForServer lanza el error: en el build falla el deploy (queda el anterior) y
// al regenerar Next sigue sirviendo la ultima version buena; nunca se guarda una pagina sin productos.
export const revalidate = 300;

export default async function HomePage() {
  const filters = {};
  const result = await getProductsForServer(filters, revalidate);

  return <HomeClient initialProducts={{ filters, result }} />;
}
