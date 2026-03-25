import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductCard } from "@/components/public/ProductCard";
import { Package, Globe2, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { active: true, featured: true },
    orderBy: { order: "asc" },
    take: 4,
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary-dark">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000" 
            alt="Hubex Importação Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <TrendIndicator /> Especialistas em Importação Exclusiva
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-slide-up">
              Acesso exclusivo aos melhores <br />
              <span className="text-accent">tênis e roupas importadas.</span>
            </h1>
            
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
              Trazemos para você as marcas mais exclusivas e desejadas do mundo com garantia de 100% de autenticidade e entrega segura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link href="/catalogo">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg h-14 px-8">
                  Explorar Catálogo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-white/30 text-white hover:bg-white/10 hover:text-white">
                  Falar com Consultor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-100">
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-1">+5000</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Entregas Realizadas</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-1">+50</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Marcas Exclusivas</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-1">+500</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Modelos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-1">100%</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Autenticidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="py-24 bg-hubex-bg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Linha Premium</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-dark">
                Produtos em Destaque
              </h3>
            </div>
            <Link href="/catalogo">
              <Button variant="outline" className="bg-white">
                Ver todo o catálogo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-4 text-center py-12 text-zinc-500">
                Nenhum produto em destaque no momento.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Nosso Catálogo</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-dark">
              Navegue por Categoria
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, i) => (
              <Link key={category.id} href={`/catalogo?category=${category.slug}`} className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                {/* Fallback image logic based on index mimicking different categories */}
                <img 
                  src={`https://images.unsplash.com/photo-${i%2===0 ? "1581244277943-fe4a9c777189" : "1504917596113-a4fa0a4fa5e2"}?auto=format&fit=crop&q=80&w=800`} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent p-8 flex flex-col justify-end">
                  <h4 className="text-2xl font-display font-bold text-white mb-2 group-hover:-translate-y-2 transition-transform duration-300">{category.name}</h4>
                  <p className="text-zinc-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                    {category.description || "Veja todos os produtos desta linha."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-accent relative overflow-hidden">
        {/* Decorator */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-light/50 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Pronto para garantir seu novo hype?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Nossa equipe está pronta para te ajudar a encontrar aquele modelo exclusivo que você tanto procura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-accent hover:bg-zinc-100 shadow-xl group">
                Solicitar Cotação <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TrendIndicator() {
  return <TrendingUp className="w-4 h-4 text-accent-light" />;
}
