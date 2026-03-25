"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Catálogo", href: "/catalogo" },
  { name: "Contato", href: "/contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/hubex1.jpg" 
            alt="Hubex"
            className="h-10 w-auto object-contain rounded"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isHomeInvert = pathname === "/" && !isScrolled;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors relative group",
                  isHomeInvert ? "text-white/90 hover:text-white" : "text-zinc-600 hover:text-primary-dark",
                  isActive && !isHomeInvert && "text-primary font-semibold"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/catalogo">
            <Button variant={pathname === "/" && !isScrolled ? "outline" : "primary"} className={pathname === "/" && !isScrolled ? "border-white/30 text-white hover:bg-white/10" : ""}>
              <Search className="w-4 h-4 mr-2" />
              Buscar Produtos
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={cn("w-6 h-6", (pathname === "/" && !isScrolled) ? "text-white" : "text-zinc-900")} />
          ) : (
            <Menu className={cn("w-6 h-6", (pathname === "/" && !isScrolled) ? "text-white" : "text-zinc-900")} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col px-4 gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block py-3 text-base font-medium border-b border-zinc-100",
                pathname === link.href ? "text-primary" : "text-zinc-700"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/catalogo" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full mt-2">
              <Search className="w-4 h-4 mr-2" />
              Buscar Produtos
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
