"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  order: number;
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    active: true,
    order: 0,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentId ? `/api/categories/${currentId}` : "/api/categories";
      const method = currentId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData, order: Number(formData.order)})
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao salvar");
      }

      toast.success("Categoria salva com sucesso!");
      setIsEditing(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao excluir");
      }
      
      toast.success("Categoria excluída!");
      fetchCategories();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (cat: Category) => {
    setFormData({
      name: cat.name,
      slug: cat.slug || "",
      active: cat.active,
      order: cat.order || 0
    });
    setCurrentId(cat.id);
    setIsEditing(true);
  };

  const handleNew = () => {
    setFormData({ name: "", slug: "", active: true, order: 0 });
    setCurrentId(null);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      
      {!isEditing ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Categorias</h2>
            <Button onClick={handleNew} variant="primary">
              <Plus className="w-4 h-4 mr-2" /> Nova Categoria
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-zinc-500">
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Slug</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                  <th className="pb-3 font-medium text-center">Ordem</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {loading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-zinc-500">Carregando...</td></tr>
                ) : categories.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-zinc-500">Nenhuma categoria encontrada.</td></tr>
                ) : (
                  categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-zinc-50">
                      <td className="py-3 font-medium text-zinc-900">{cat.name}</td>
                      <td className="py-3 text-zinc-500">{cat.slug}</td>
                      <td className="py-3 text-center">
                        {cat.active ? (
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-center text-zinc-500">{cat.order}</td>
                      <td className="py-3 text-right">
                        <button onClick={() => handleEdit(cat)} className="p-1.5 text-zinc-400 hover:text-primary transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors">
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
      ) : (
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-zinc-900">
              {currentId ? "Editar Categoria" : "Nova Categoria"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-zinc-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Nome da Categoria *</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Slug (opcional)</label>
                <Input 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  placeholder="gerado-automaticamente"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Ordem de Exibição</label>
                <Input 
                  type="number"
                  value={formData.order} 
                  onChange={(e) => setFormData({...formData, order: Number(e.target.value)})} 
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="w-4 h-4 text-primary rounded border-zinc-300 focus:ring-primary"
              />
              <label htmlFor="active" className="text-sm font-medium">Categoria Ativa no Site</label>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                <Check className="w-4 h-4 mr-2" /> Salvar Categoria
              </Button>
            </div>
          </form>
        </Card>
      )}

    </div>
  );
}
