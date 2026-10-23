import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ProductDetail from '@/components/products/product-detail';
import ProductJsonLd from '@/components/seo/product-json-ld';
import { getProductById } from '@/lib/products/service';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
        notFound();
    }

    const product = await getProductById(productId);
    console.log("🚀 ~ ProductPage ~ product:", product)

    if (!product) {
        notFound();
    }

    const category = product.category?.name ?? 'Sin categoria';
    const characterName = product.character?.name;
    const hasGeneralCharacter = characterName === 'General';
    const primaryCharacter = characterName ?? 'Destacado';

    return (
        <section className="container-custom mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-12">
            <ProductJsonLd product={product} />
            <Link
                href="/producto"
                className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-[#8a3dc1] transition-colors hover:text-[#e7467d]"
            >
                <ChevronLeft className="h-4 w-4" />
                Volver al catálogo
            </Link>

            <div className="flex w-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(38,16,51,0.10)] md:h-[80vh] md:max-h-[860px]">
                <ProductDetail
                    product={{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        image: product.main_image,
                        images: product.images ?? [product.main_image],
                        category,
                        character: hasGeneralCharacter ? undefined : primaryCharacter,
                        colors: product.colors,
                        isPersonalized: product.is_personalized,
                        occasions: product.occasions?.map((occasion) => occasion.name) ?? [],
                        price: product.price,
                    }}
                    badge={hasGeneralCharacter ? category : primaryCharacter}
                    badgeColor={hasGeneralCharacter ? '#8a3dc1' : '#e7467d'}
                />
            </div>
        </section>
    );
}
