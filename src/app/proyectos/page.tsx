import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectGrid, type SanityProject } from "@/components/project-grid"
import { client } from "@/lib/sanity"

export const metadata = {
  title: "Proyectos",
  description: "Explora la colección de proyectos arquitectónicos de BOG. Desde residencias de lujo hasta complejos culturales.",
}

export default async function ProyectosPage() {
  const projects = await client.fetch<SanityProject[]>('*[_type == "project"]')

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-8 px-6 lg:px-12 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Portafolio</span>
          <h1 className="mt-3 text-balance text-4xl font-bold md:text-5xl lg:text-6xl">
            Nuestros <span className="text-primary">Proyectos</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Cada proyecto es una exploración del espacio, la luz y la forma.
          </p>
        </div>
      </div>
      <ProjectGrid projects={projects} variant="archive" />
      <Footer />
    </main>
  )
}
