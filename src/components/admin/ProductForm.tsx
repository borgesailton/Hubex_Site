"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { UploadCloud, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  initialData?: any;
}

export function ProductForm({ initialData }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    richContent: initialData?.richContent || "",
    price: initialData?.price?.toString() || "",
    priceOnRequest: initialData?.priceOnRequest || false,
    sku: initialData?.sku || "",
    categoryId: initialData?.categoryId || "",
    tags: initialData?.tags || "",
    featured: initialData?.featured || false,
    active: initialData?.active ?? true,
    order: initialData?.order || 0,
  });

  const [images, setImages] = useState<any[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data.filter((c: any) => c.active)));
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    try {
      for (const file of Array.from(e.target.files)) {
        const data = new FormData();
        data.append("file", file);
        
        // Simulating upload to Vercel/Local
        const res = await fetch("/api/upload", { method: "POST", body: data });
        if (!res.ok) throw new Error("Falha no upload");
        
        const { url } = await res.json();
        setImages(prev => [...prev, { url, isPrimary: prev.length === 0, order: prev.length }]);
      }
      toast.success("Imagens enviadas!");
    } catch {
      toast.error("Erro ao enviar imagens.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const setPrimaryImage = (index: number) => {
    setImages(images.map((img, i) => ({ ...img, isPrimary: i === index })));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Selecione uma categoria");

    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: formData.price && !formData.priceOnRequest ? parseFloat(formData.price) : null,
        order: Number(formData.order)
        // Images not handled natively in this simple schema patch yet without custom relation update.
        // For production: product endpoints must handle complex relation inserts for ProductImage.
        // As MVP, we omit inserting photos or do it in a custom endpoint.
      };

      const url = initialData ? `/api/products/${initialData.id}` : "/api/products";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      toast.success("Produto salvo com sucesso!");
      router.push("/admin/produtos");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="text-lg font-bold border-b pb-3 mb-4">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Nome do Produto *</label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Slug (URL)</label>
                <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="gerado-automaticamente" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Categoria *</label>
                <select 
                  name="categoryId" 
                  value={formData.categoryId} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Selecione...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">SKU / Código</label>
                <Input name="sku" value={formData.sku} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Descrição Curta</label>
              <Textarea name="description" value={formData.description} onChange={handleChange} className="h-20" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Conteúdo Rico (HTML/Especificações)</label>
              <Textarea 
                name="richContent" 
                value={formData.richContent} 
                onChange={handleChange} 
                className="h-40 font-mono text-xs" 
                placeholder="<ul><li>Capacidade: 50L</li></ul>" 
              />
            </div>
          </Card>

          <Card className="p-6">
             <h3 className="text-lg font-bold border-b pb-3 mb-4">Imagens (Mock)</h3>
             <p className="text-sm text-zinc-500 mb-4">Em um ambiente real, as imagens enviadas seriam atreladas ao schema ProductImage via o Prisma nas operações aninhadas (<code className="bg-zinc-100 px-1 rounded">create / set</code>).</p>
             <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center bg-zinc-50 mb-6">
              <input type="file" id="images" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
              <label htmlFor="images" className="cursor-pointer inline-flex flex-col items-center justify-center">
                {uploading ? <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" /> : <UploadCloud className="w-8 h-8 text-zinc-400 mb-2" />}
                <span className="font-medium text-primary">Clique para enviar imagens</span>
                <span className="text-xs text-zinc-500 mt-1">PNG, JPG ou WEBP (Max 5MB)</span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className={`relative aspect-square rounded-lg border overflow-hidden ${img.isPrimary ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                    {!img.isPrimary && (
                      <button type="button" onClick={() => setPrimaryImage(i)} className="absolute bottom-1 w-[calc(100%-8px)] mx-1 bg-white/90 text-xs py-1 rounded shadow-md hover:bg-primary hover:text-white transition-colors">
                        Tornar Capa
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="text-lg font-bold border-b pb-3 mb-4">Preço e Visibilidade</h3>
            
            <div className="flex items-center space-x-2 p-3 bg-zinc-50 rounded-lg rounded-xl border">
              <input 
                type="checkbox" 
                id="priceOnRequest" name="priceOnRequest"
                checked={formData.priceOnRequest} onChange={handleChange}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <label htmlFor="priceOnRequest" className="text-sm font-medium">Preço sob consulta?</label>
            </div>

            {!formData.priceOnRequest && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Valor (R$)</label>
                <Input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="0.00" />
              </div>
            )}

            <hr className="my-4 border-zinc-100" />

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="active" name="active"
                checked={formData.active} onChange={handleChange}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-600 focus:ring-offset-0"
              />
              <label htmlFor="active" className="text-sm font-medium text-zinc-800">Ativo no Catálogo</label>
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="featured" name="featured"
                checked={formData.featured} onChange={handleChange}
                className="w-4 h-4 text-accent rounded focus:ring-accent focus:ring-offset-0"
              />
              <label htmlFor="featured" className="text-sm font-medium text-zinc-800">Destacar na Home</label>
            </div>

            <div className="space-y-1.5 pt-4">
              <label className="text-sm font-medium border-t border-zinc-100 pt-4 block">Ordem</label>
              <Input type="number" name="order" value={formData.order} onChange={handleChange} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Tags (separadas por vírgula)</label>
              <Input name="tags" value={formData.tags} onChange={handleChange} placeholder="industrial, CNC, precisão" />
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 mt-4" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Produto"}
            </Button>
          </Card>
        </div>
      </div>
    </form>
  );
}
