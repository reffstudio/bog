import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 py-16 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand: placeholder hasta restaurar logo */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 block" aria-label="Inicio">
              <div className="flex h-14 w-14 items-center justify-center rounded bg-[#222] text-xs font-bold text-white">
                BOG
              </div>
            </Link>
            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Creamos espacios que inspiran y transforman la manera en que las personas viven y trabajan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-muted-foreground transition-colors hover:text-primary">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="text-muted-foreground transition-colors hover:text-primary">
                  Acerca de Mí
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contacto
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="mailto:contacto@bog.studio" className="transition-colors hover:text-primary">
                  contacto@bog.studio
                </a>
              </li>
              <li>
                <a href="tel:+521234567890" className="transition-colors hover:text-primary">
                  +52 123 456 7890
                </a>
              </li>
              <li>Ciudad de México, MX</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row md:gap-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} BOG Estudio de Arquitectura. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
