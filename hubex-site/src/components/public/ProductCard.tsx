import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | null;
    priceOnRequest: boolean;
    category: {
      name: string;
      slug: string;
    };
    images: {
      url: string;
      alt: string | null;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.length > 0 ? product.images[0].url : "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=600";
  
  return (
    <Link href={`/catalogo/${product.slug}`} className="block group">
      <Card className="h-full border-0 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col bg-white">
        
        {/* Imagem do Produto */}
        <div className="aspect-[4/3] relative bg-zinc-100 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.images[0]?.alt || product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="blue">{product.category.name}</Badge>
          </div>
        </div>

        {/* Info do Produto */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <div className="font-display font-bold text-accent-dark">
              {product.priceOnRequest || !product.price ? (
                "Sob consulta"
              ) : (
                formatPrice(product.price)
              )}
            </div>
            
            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        
      </Card>
    </Link>
  );
}
