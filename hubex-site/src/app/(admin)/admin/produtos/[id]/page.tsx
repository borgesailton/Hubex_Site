import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Editar Produto | Hubex Admin",
};

export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } }
  });

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/produtos" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Produtos
      </Link>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Editar Produto</h1>
        <p className="text-zinc-500 text-sm mt-1 font-mono">ID: {product.id}</p>
      </div>

      {/* Since images and price logic can differ between db output and form input, we could massage data, but for MVP it's handled in the form effect internally. */}
      <ProductForm initialData={product} />
    </div>
  );
}
