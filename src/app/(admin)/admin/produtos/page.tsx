"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function ProdutosPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const qs = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
      const res = await fetch(`/api/products${qs}`);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir o produto "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      toast.success("Produto excluído!");
      fetchProducts();
    } catch {
      toast.error("Falha ao excluir produto.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-zinc-900">Gerenciar Produtos</h2>
          <Button variant="primary" onClick={() => router.push("/admin/produtos/novo")}>
            <Plus className="w-4 h-4 mr-2" /> Novo Produto
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input 
            placeholder="Buscar por nome, SKU ou tags..." 
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-zinc-500">
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Categoria</th>
                <th className="pb-3 font-medium">Preço / SKU</th>
                <th className="pb-3 font-medium text-center">Status</th>
                <th className="pb-3 font-medium text-center">Destaque</th>
                <th className="pb-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {loading ? (
                <tr><td colSpan={6} className="py-8 text-center text-zinc-500">Carregando...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-zinc-500">Nenhum produto encontrado.</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="hover:bg-zinc-50">
                    <td className="py-3 font-medium text-zinc-900">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-zinc-100 flex-shrink-0 overflow-hidden border">
                          {product.images[0] && <img src={product.images[0].url} className="w-full h-full object-cover" alt="" />}
                        </div>
                        <span className="line-clamp-2">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-500">{product.category.name}</td>
                    <td className="py-3 text-zinc-500">
                      <div className="font-medium text-zinc-800">
                        {product.priceOnRequest || !product.price ? "Sob consulta" : formatPrice(product.price)}
                      </div>
                      <div className="text-xs">{product.sku || "S/ SKU"}</div>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      {product.featured && <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-dark">Sim</span>}
                    </td>
                    <td className="py-3 text-right">
                      <Link href={`/admin/produtos/${product.id}`}>
                        <button className="p-1.5 text-zinc-400 hover:text-primary transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
