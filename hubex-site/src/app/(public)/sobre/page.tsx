import Image from "next/image";
import { CheckCircle2, ShieldCheck, Globe, Truck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  return (
    <>
      {/* HERO SOBRE */}
      <section className="bg-hero-gradient text-white py-24 mt-20 relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Conectando seu negócio<br/>ao mercado global
          </h1>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            A Hubex é referência em importação corporativa, trazendo equipamentos e tecnologias das melhores marcas do mundo com segurança e agilidade.
          </p>
        </div>
      </section>

      {/* HISTÓRIA E MISSÃO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Nossa História</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-6">
                Excelência em importação
              </h3>
              <div className="space-y-4 text-lg text-zinc-600 leading-relaxed">
                <p>
                  Fundada por especialistas em comércio exterior, a Hubex nasceu com a missão de simplificar e democratizar o acesso a tecnologias e equipamentos internacionais para empresas de todos os portes.
                </p>
                <p>
                  Com anos de expertise no mercado, construímos uma sólida rede de parceiros globais, garantindo produtos originais, de alta qualidade e com o melhor custo-benefício.
                </p>
                <p>
                  Nossa atuação vai além da venda: oferecemos consultoria completa, desde a escolha do equipamento ideal até o desembaraço aduaneiro e entrega final na sua empresa.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?auto=format&fit=crop&q=80&w=1200" 
                  alt="Logística internacional Hubex" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-zinc-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-display font-bold text-primary">+10</div>
                  <div className="text-sm font-medium text-zinc-600 uppercase leading-snug">Anos de<br/>Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-24 bg-hubex-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Por que escolher a Hubex</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-dark">
              Nossos Diferenciais
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-card-hover transition-shadow bg-white border-0">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3">Garantia e Origem</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Trabalhamos apenas com equipamentos novos, originais e com garantia de fábrica.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-card-hover transition-shadow bg-white border-0">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3">Rede Global</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Parcerias diretas com os maiores fabricantes da Ásia, Europa e Estados Unidos.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-card-hover transition-shadow bg-white border-0">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3">Logística Eficiente</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Acompanhamento ponta a ponta e fretes otimizados para garantir o melhor prazo.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-card-hover transition-shadow bg-white border-0">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-3">Assessoria Completa</h4>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Nossa equipe cuida de toda a documentação, impostos e trâmites alfandegários para você.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
