"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Categorias", href: "/admin/categorias", icon: Tags },
  { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen bg-primary-dark text-white shadow-xl transition-all duration-300 flex flex-col",
          collapsed ? "w-[80px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-md overflow-hidden shrink-0">
              <img src="/hubex1.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            {!collapsed && <span className="font-display font-bold text-xl whitespace-nowrap">Hubex Admin</span>}
          </Link>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 text-white/70 transition-colors"
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
          </button>
          
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className={cn("mb-2 px-3 text-xs font-semibold text-white/40 uppercase tracking-wider", collapsed && "hidden")}>
            Menu Principal
          </div>
          
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
                title={collapsed ? item.name : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-accent-light" : "text-white/70 group-hover:text-white")} />
                {!collapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg w-full transition-colors text-white/70 hover:bg-red-500/20 hover:text-red-400 group",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? "Sair" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">Sair do painel</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
