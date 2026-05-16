"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Instagram, ArrowUpRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "INICIO", isHome: true },
  { href: "/acerca", label: "ACERCA DE", isHome: false },
  { href: "/blog", label: "BLOG", isHome: false },
]

function forceTransparentImage(el: HTMLImageElement | null) {
  if (!el) return
  el.style.setProperty("background-color", "transparent", "important")
  el.style.setProperty("filter", "none", "important")
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const onHome = pathname === "/"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6 ${onHome ? "text-white" : ""}`}
      style={onHome ? { colorScheme: "light" } : undefined}
    >
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/"
          className={`block shrink-0 bg-transparent leading-none outline-none ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${onHome ? "focus-visible:ring-offset-transparent" : ""}`}
          aria-label="Inicio"
        >
          <img
            ref={forceTransparentImage}
            src="/images/bog-logo-clean.png"
            alt="BOG"
            width={150}
            height={150}
            decoding="async"
            className="block h-10 w-10 bg-transparent object-contain mix-blend-normal sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            style={{ backgroundColor: "transparent", filter: "none" }}
          />
        </Link>

        <nav
          className={`flex items-center backdrop-blur-sm px-1 py-1 sm:px-2 sm:py-2 ${onHome ? "bg-black/35" : "bg-secondary/80"}`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center px-2 py-1.5 text-[10px] font-medium tracking-wider transition-colors sm:px-4 sm:py-2 sm:text-xs lg:px-5 lg:text-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : onHome
                      ? "text-white/90 hover:text-primary"
                      : "text-foreground hover:text-primary"
                }`}
                aria-label={link.isHome ? "Inicio" : undefined}
              >
                {link.isHome ? <Home className="h-3 w-3 sm:h-4 sm:w-4" /> : link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <div className="hidden items-center gap-1 md:flex sm:gap-2">
            <Link
              href="#"
              className={`flex h-8 w-8 items-center justify-center transition-colors sm:h-9 sm:w-9 lg:h-10 lg:w-10 ${onHome ? "bg-white/10 hover:bg-white/20" : "bg-secondary hover:bg-secondary/80"}`}
              aria-label="Facebook"
            >
              <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
            <Link
              href="#"
              className={`flex h-8 w-8 items-center justify-center transition-colors sm:h-9 sm:w-9 lg:h-10 lg:w-10 ${onHome ? "bg-white/10 hover:bg-white/20" : "bg-secondary hover:bg-secondary/80"}`}
              aria-label="Instagram"
            >
              <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
            <Link
              href="#"
              className={`flex h-8 w-8 items-center justify-center transition-colors sm:h-9 sm:w-9 lg:h-10 lg:w-10 ${onHome ? "bg-white/10 hover:bg-white/20" : "bg-secondary hover:bg-secondary/80"}`}
              aria-label="X (Twitter)"
            >
              <XIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <Button
            asChild
            className={`items-center gap-1 bg-primary px-2 py-1.5 text-[10px] text-primary-foreground hover:bg-primary/90 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs lg:px-4 lg:text-sm ${
              onHome ? "hidden lg:inline-flex" : "inline-flex"
            }`}
          >
            <Link href="/proyectos">
              <span>PROYECTOS</span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
