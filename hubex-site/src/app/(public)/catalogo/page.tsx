import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/public/ProductCard";
import { Search, FilterX } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";

export const metadata = {
  title: "Catálogo",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categorySlug = searchParams.category;
  const searchTerm = searchParams.search;

  // Build query
  const where: any = { active: true };
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }
  if (searchTerm) {
    where.OR = [
      { name: { contains: searchTerm } },
      { description: { contains: searchTerm } },
      { tags: { contains: searchTerm } },
    ];
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { order: "asc" },
      include: {
        category: true,
        images: { orderBy: { order: "asc" }, take: 1 },
      },
    }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: { where: { active: true } } }
        }
      }
    }),
  ]);

  return (
    <>
      <section className="bg-primary-dark text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Catálogo de Produtos</h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Encontre as melhores soluções em equipamentos e tecnologias importadas.
          </p>
        </div>
      </section>

      <section className="py-12 bg-hubex-bg min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR FILTERS */}
            <aside className="w-full lg:w-64 shrink-0 space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-zinc-900 mb-4">Buscar</h3>
                <form action="/catalogo" method="GET" className="relative">
                  {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <Input 
                    name="search"
                    defaultValue={searchTerm || ""}
                    placeholder="Nome ou código..." 
                    className="pl-9 h-10 w-full"
                  />
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-zinc-900">Categorias</h3>
                  {(categorySlug || searchTerm) && (
                    <Link href="/catalogo" className="text-xs text-primary hover:underline flex items-center">
                      <FilterX className="w-3 h-3 mr-1" /> Limpar
                    </Link>
                  )}
                </div>
                
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href={searchTerm ? `/catalogo?search=${searchTerm}` : "/catalogo"}
                      className={`flex items-center justify-between py-1.5 text-sm transition-colors ${!categorySlug ? "text-primary font-medium" : "text-zinc-600 hover:text-primary"}`}
                    >
                      <span>Todas</span>
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link 
                        href={`/catalogo?category=${cat.slug}${searchTerm ? `&search=${searchTerm}` : ""}`}
                        className={`flex items-center justify-between py-1.5 text-sm transition-colors ${categorySlug === cat.slug ? "text-primary font-medium" : "text-zinc-600 hover:text-primary"}`}
                      >
                        <span>{cat.name}</span>
                        <span className="bg-zinc-100 text-zinc-500 py-0.5 px-2 rounded-full text-xs">
                          {cat._count.products}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
              {searchTerm && (
                <div className="mb-6 pb-4 border-b">
                  <h2 className="text-xl text-zinc-800">
                    Resultados para: <span className="font-semibold text-primary">"{searchTerm}"</span>
                  </h2>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full bg-white p-12 text-center rounded-xl border border-dashed">
                    <p className="text-zinc-500 text-lg">Nenhum produto encontrado com os filtros atuais.</p>
                    <Link href="/catalogo" className="text-primary hover:underline mt-2 inline-block">
                      Ver todos os produtos
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
