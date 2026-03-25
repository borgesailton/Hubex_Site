import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Package, Tags, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Dashboard Admin",
};

export default async function DashboardPage() {
  const [
    productsCount,
    activeProductsCount,
    featuredCount,
    categoriesCount,
    recentProducts
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { featured: true } }),
    prisma.category.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    })
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-bold text-zinc-900">Bom dia, Admin!</h2>
          <p className="text-zinc-500">Aqui está o resumo do seu catálogo hoje.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/catalogo" target="_blank">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-zinc-50 transition-colors">
              <Eye className="w-4 h-4" /> Ver Site
            </button>
          </Link>
          <Link href="/admin/produtos/novo">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark shadow-glow-primary transition-all">
              Novo Produto
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Total de Produtos</p>
            <h3 className="text-2xl font-bold text-zinc-900">{productsCount}</h3>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Produtos Ativos</p>
            <h3 className="text-2xl font-bold text-zinc-900">{activeProductsCount}</h3>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center shrink-0">
            <Tags className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Categorias</p>
            <h3 className="text-2xl font-bold text-zinc-900">{categoriesCount}</h3>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 mb-1">Destaques (Home)</p>
            <h3 className="text-2xl font-bold text-zinc-900">{featuredCount}</h3>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-lg text-zinc-900">Últimos Produtos Cadastrados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-6 py-3 font-medium">Produto</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium">Preço</th>
                <th className="px-6 py-3 font-medium">Estado</th>
                <th className="px-6 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recentProducts.length > 0 ? recentProducts.map(product => (
                <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    <Link href={`/admin/produtos/${product.id}`} className="hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{product.category.name}</td>
                  <td className="px-6 py-4 text-zinc-500">
                    {product.priceOnRequest || !product.price ? "Sob consulta" : formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {product.createdAt.toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    Nenhum produto cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-zinc-50 border-t text-center">
          <Link href="/admin/produtos" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            Ver todos os produtos &rarr;
          </Link>
        </div>
      </Card>

    </div>
  );
}
