import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Novo Produto | Hubex Admin",
};

export default function NovoProdutoPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/produtos" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Produtos
      </Link>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Novo Produto</h1>
        <p className="text-zinc-500">Cadastre um novo item no catálogo.</p>
      </div>

      <ProductForm />
    </div>
  );
}
