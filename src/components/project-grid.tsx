import Link from "next/link"
import { urlFor } from "@/lib/sanity"

export type SanityProject = {
  _id: string
  title?: string
  slug?: { current?: string }
  mainImage?: {
    asset?: { _ref?: string }
    _type?: string
  }
}

function ProjectCard({ project }: { project: SanityProject }) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).url() : null
  const slug = project.slug?.current

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title ?? ""}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-6xl font-bold text-muted-foreground/20">BOG</span>
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <h3 className="text-2xl font-bold text-foreground">{project.title ?? "Sin título"}</h3>
        </div>
      </div>
      <div className="py-4">
        <h3 className="mt-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.title ?? "Sin título"}
        </h3>
      </div>
    </>
  )

  if (!slug) {
    return (
      <div className="group relative block cursor-not-allowed overflow-hidden opacity-80">
        {inner}
        <p className="text-xs text-muted-foreground">Falta slug en Sanity</p>
      </div>
    )
  }

  return (
    <Link href={`/proyectos/${slug}`} className="group relative block overflow-hidden">
      {inner}
    </Link>
  )
}

type ProjectGridProps = {
  projects: SanityProject[]
  variant?: "home" | "archive"
}

export function ProjectGrid({ projects, variant = "home" }: ProjectGridProps) {
  const hasProjects = projects.length > 0
  const isArchive = variant === "archive"

  return (
    <section className={isArchive ? "px-6 pb-24 lg:px-12" : "px-6 py-24 lg:px-12"}>
      <div className="mx-auto max-w-7xl">
        {!isArchive ? (
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-primary">Portafolio</span>
              <h2 className="mt-2 text-4xl font-bold md:text-5xl">
                Proyectos <span className="text-primary">Destacados</span>
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="group mt-4 inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary md:mt-0"
            >
              Ver todos los proyectos
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        ) : null}

        {hasProjects ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 px-8 py-16 text-center">
            <p className="mx-auto max-w-md text-lg font-semibold text-foreground">
              Todavía no hay proyectos para mostrar
            </p>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Cuando publiques proyectos en Sanity, aparecerán automáticamente en esta cuadrícula.
            </p>
            <Link
              href="/proyectos"
              className="mt-8 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Ir a proyectos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
