"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error("Credenciais inválidas. Tente novamente.");
      } else {
        toast.success("Login efetuado com sucesso!");
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao fazer login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hubex-bg p-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary-dark skew-y-6 origin-top-left -z-10 shadow-lg" />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-primary-dark shadow-xl mb-4 font-display font-bold text-3xl">
            H
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Hubex Admin</h1>
          <p className="text-white/80 mt-1">Acesso restrito</p>
        </div>

        <Card className="p-8 shadow-2xl border-0 relative">
          
          <div className="absolute -top-6 right-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-lg shadow-accent/40">
            <Lock className="w-5 h-5" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">E-mail corporativo</label>
              <Input 
                {...register("email")}
                autoFocus
                placeholder="admin@hubex.com.br"
                className="h-12 bg-zinc-50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700">Senha</label>
              <Input 
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="h-12 bg-zinc-50"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full h-12 text-base shadow-lg shadow-primary/30 mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar no Painel"}
            </Button>
            
          </form>
        </Card>

        <p className="text-center text-zinc-500 text-sm mt-8">
          &copy; {new Date().getFullYear()} Hubex. Área Administrativa Segura.
        </p>
      </div>
    </div>
  );
}
