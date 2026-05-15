import Link from "next/link"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"

export const metadata = {
  title: "Acerca",
  description: "Conoce a BOG, arquitectura dedicada a crear espacios que trascienden lo convencional.",
}

export default function AcercaPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <AboutSection />
      
      {/* Simple Copyright */}
      <footer className="py-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 BOG - Powered by{" "}
          <Link 
            href="https://www.reff.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            REFF STUDIO
          </Link>
        </p>
      </footer>
    </main>
  )
}
