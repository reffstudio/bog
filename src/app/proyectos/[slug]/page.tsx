import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText, type PortableTextComponents } from "next-sanity"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectGallery } from "@/components/project-gallery"
import { client, sanityFetchOptions, urlFor } from "@/lib/sanity"

export const revalidate = 0

type SanityImage = {
  _type?: string
  asset?: { _ref?: string }
}

type ProjectDetail = {
  _id: string
  title?: string
  slug?: { current?: string }
  year?: string
  location?: string
  mainImage?: SanityImage
  gallery?: SanityImage[]
  body?: unknown[]
  videoUrl?: string
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground last:mb-0">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-10 text-2xl font-bold text-foreground first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={typeof value?.href === "string" ? value.href : "#"}
        className="text-primary underline underline-offset-4 hover:no-underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
}

function vimeoPlayerSrc(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? `https://player.vimeo.com/video/${m[1]}` : null
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    '*[_type == "project" && defined(slug.current)].slug.current',
    {},
    sanityFetchOptions,
  )
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = await client.fetch<string | null>(
    '*[_type == "project" && slug.current == $slug][0].title',
    { slug },
    sanityFetchOptions,
  )
  return {
    title: title ? `${title} | BOG` : "Proyecto | BOG",
    description: title ? `Proyecto de arquitectura: ${title}.` : undefined,
  }
}

export default async function ProyectoDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await client.fetch<ProjectDetail | null>(
    '*[_type == "project" && slug.current == $slug][0]',
    { slug },
    sanityFetchOptions,
  )

  if (!project) {
    notFound()
  }

  const heroUrl = project.mainImage ? urlFor(project.mainImage).width(1920).height(1080).fit("crop").url() : null
  const vimeoSrc = project.videoUrl ? vimeoPlayerSrc(project.videoUrl) : null
  const galleryImages =
    project.gallery
      ?.map((img, index) => {
        if (!img) return null
        const src = urlFor(img).width(1920).fit("max").url()
        const srcFull = urlFor(img).width(2800).fit("max").url()
        return {
          src,
          srcFull,
          alt: `${project.title ?? "Proyecto"} — imagen ${index + 1}`,
        }
      })
      .filter(
        (item): item is { src: string; srcFull: string; alt: string } => item !== null,
      ) ?? []

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article>
        <div className="relative aspect-[21/9] min-h-[240px] w-full bg-secondary md:min-h-[320px]">
          {heroUrl ? (
            <img src={heroUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
              <span className="text-7xl font-bold text-muted-foreground/20">BOG</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-6 pb-12 pt-24 lg:px-12">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {[project.year, project.location].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-balance md:text-5xl">{project.title ?? "Proyecto"}</h1>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-20">
          {project.body && project.body.length > 0 ? (
            <div className="portable-text">
              <PortableText value={project.body} components={bodyComponents} />
            </div>
          ) : null}

          {vimeoSrc ? (
            <div className="mt-12 aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
              <iframe
                title="Video del proyecto"
                src={vimeoSrc}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}


        </div>

        {galleryImages.length > 0 ? (
          <div className="px-6 lg:px-12">
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-6 pb-16 lg:px-12 lg:pb-20">
          <div className="border-t border-border pt-10">
            <Link
              href="/proyectos"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              ← Volver a proyectos
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
