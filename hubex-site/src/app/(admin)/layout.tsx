"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

const titles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/produtos": "Produtos",
  "/admin/produtos/novo": "Novo Produto",
  "/admin/categorias": "Categorias",
  "/admin/configuracoes": "Configurações",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine topbar title based on route
  let title = "Painel Admin";
  for (const key in titles) {
    if (pathname.startsWith(key)) {
      title = titles[key];
    }
  }

  // Se a rota for login, nao renderiza sidebar nem topbar
  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-hubex-bg">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar setMobileOpen={setMobileOpen} title={title} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
