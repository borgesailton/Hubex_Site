import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, MessageCircle, Share2, Tag, ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!product || !product.active) {
    notFound();
  }

  const primaryImage = product.images[0]?.url || "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800";
  
  // Create wpp msg
  const msg = `Olá! Gostaria de saber mais informações sobre o produto: *${product.name}* (SKU: ${product.sku || 'N/A'}).`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, msg);

  // Related products
  const related = await prisma.product.findMany({
    where: { 
      active: true, 
      categoryId: product.categoryId,
      NOT: { id: product.id }
    },
    take: 3,
    include: { images: { take: 1, orderBy: { order: 'asc' } }, category: true }
  });

  return (
    <div className="bg-hubex-bg min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-zinc-400" />
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-zinc-400" />
          <Link href={`/catalogo?category=${product.category.slug}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-zinc-400" />
          <span className="text-zinc-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Area */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Gallery */}
            <div className="p-8 lg:border-r border-b lg:border-b-0 space-y-4">
              <div className="aspect-square bg-zinc-50 rounded-xl overflow-hidden relative">
                <img 
                  src={primaryImage} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img: any, i: number) => (
                    <div key={img.id} className="w-20 h-20 shrink-0 rounded-lg border bg-white overflow-hidden cursor-pointer hover:border-primary transition-colors">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <Badge variant="blue" className="w-fit mb-4">{product.category.name}</Badge>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
                {product.name}
              </h1>
              
              {product.sku && (
                <div className="flex items-center text-sm text-zinc-500 mb-6 bg-zinc-50 w-fit px-3 py-1 rounded-full border">
                  <Tag className="w-3.5 h-3.5 mr-2" />
                  SKU: <span className="font-mono ml-1">{product.sku}</span>
                </div>
              )}

              <div className="mb-8">
                <div className="text-3xl font-display font-bold text-primary-dark">
                  {product.priceOnRequest || !product.price ? (
                    "Preço sob consulta"
                  ) : (
                    formatPrice(product.price)
                  )}
                </div>
                {!product.priceOnRequest && product.price && (
                  <p className="text-sm text-zinc-500 mt-1">Condições especiais para CNPJ</p>
                )}
              </div>

              {product.description && (
                <div className="prose prose-zinc mb-8 text-zinc-600 leading-relaxed">
                  <p>{product.description}</p>
                </div>
              )}

              <div className="space-y-4 mt-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button size="lg" variant="primary" className="w-full h-14 text-base shadow-xl">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Solicitar Orçamento
                  </Button>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        {/* Rich Content / Description */}
        {product.richContent && (
          <div className="bg-white rounded-2xl shadow-sm border p-8 lg:p-12 mb-12">
            <h2 className="text-2xl font-display font-bold border-b pb-4 mb-6">Especificações Técnicas</h2>
            <div className="prose prose-zinc max-w-none prose-headings:font-display prose-headings:text-primary-dark"
                 dangerouslySetInnerHTML={{ __html: product.richContent }} />
          </div>
        )}

      </div>
    </div>
  );
}
