"use client";

import { Menu, Search, User } from "lucide-react";
import { Input } from "../ui/Input";

interface TopbarProps {
  setMobileOpen: (v: boolean) => void;
  title: string;
}

export function Topbar({ setMobileOpen, title }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-sm shrink-0">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 lg:hidden text-zinc-500 hover:text-zinc-900 transition-colors rounded-md hover:bg-zinc-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-zinc-900 hidden sm:block">
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9 bg-zinc-50 focus-visible:bg-white h-9"
          />
        </div>
        
        <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-zinc-900 leading-none">Admin</p>
            <p className="text-xs text-zinc-500 mt-1">Geral</p>
          </div>
        </div>
      </div>
      
    </header>
  );
}
