import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const metadata = {
  title: "Fale Conosco",
};

export default function ContatoPage() {
  return (
    <>
      {/* HEADER COMPACTO */}
      <section className="bg-primary-dark text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Fale Conosco</h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para ajudar sua empresa a encontrar as melhores soluções em importação.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="py-20 bg-hubex-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* INFO DE CONTATO */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-primary-dark">Informações de Contato</h2>
              <p className="text-zinc-600 mb-10 leading-relaxed">
                Tem dúvidas sobre nossos produtos, prazos de entrega ou precisa de uma cotação especial? Entre em contato pelos canais abaixo ou utilize o formulário.
              </p>

              <div className="space-y-6">
                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">Nosso Endereço</h3>
                    <p className="text-zinc-600">São Paulo, SP — Brasil<br/>Atendimento nacional</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent-dark">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">Telefone / WhatsApp</h3>
                    <p className="text-zinc-600">+55 11 9999-9999<br/>Seg a Sex, das 8h às 18h</p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">E-mail</h3>
                    <p className="text-zinc-600">contato@hubex.com.br<br/>vendas@hubex.com.br</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div>
              <Card className="p-8 shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-zinc-900">Envie uma Mensagem</h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-zinc-700">Nome Completo</label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-zinc-700">Empresa</label>
                      <Input id="company" placeholder="Nome da sua empresa" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-zinc-700">E-mail Corporativo</label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-zinc-700">Telefone / WhatsApp</label>
                      <Input id="phone" placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-medium text-zinc-700">Assunto</label>
                    <Input id="subject" placeholder="Ex: Cotação de equipamento" />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-zinc-700">Sua Mensagem</label>
                    <Textarea id="message" placeholder="Como podemos ajudar?" className="h-32" />
                  </div>

                  <Button type="button" variant="primary" className="w-full h-12 text-base">
                    Enviar Mensagem
                  </Button>
                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
