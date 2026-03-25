import Link from "next/link";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-4">Hubex</h3>
          <p className="text-zinc-300 text-sm leading-relaxed mb-6">
            Conectamos sua empresa às melhores marcas e fornecedores do mundo com qualidade, segurança e eficiência.
          </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent-light">Navegação</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-zinc-300 hover:text-white transition-colors">Início</Link></li>
            <li><Link href="/sobre" className="text-zinc-300 hover:text-white transition-colors">Sobre a Hubex</Link></li>
            <li><Link href="/catalogo" className="text-zinc-300 hover:text-white transition-colors">Catálogo de Produtos</Link></li>
            <li><Link href="/contato" className="text-zinc-300 hover:text-white transition-colors">Fale Conosco</Link></li>
          </ul>
        </div>

        {/* Categorias (Placeholder for now) */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent-light">Categorias</h4>
          <ul className="space-y-3">
            <li><Link href="/catalogo?category=equipamentos-industriais" className="text-zinc-300 hover:text-white transition-colors">Equipamentos Industriais</Link></li>
            <li><Link href="/catalogo?category=ferramentas" className="text-zinc-300 hover:text-white transition-colors">Ferramentas</Link></li>
            <li><Link href="/catalogo?category=eletronicos" className="text-zinc-300 hover:text-white transition-colors">Eletrônicos</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent-light">Contato</h4>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-accent shrink-0 mt-0.5" />
              <span className="text-zinc-300 text-sm">São Paulo, SP — Brasil</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
              <span className="text-zinc-300 text-sm">+55 11 9999-9999</span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
              <span className="text-zinc-300 text-sm">contato@hubex.com.br</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-sm text-zinc-400">
        <p>&copy; {new Date().getFullYear()} Hubex Importadora. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
