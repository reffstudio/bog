import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText, type PortableTextComponents } from "next-sanity"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client, sanityFetchOptions, urlFor } from "@/lib/sanity"

export const revalidate = 0

type SanityImage = {
  _type?: string
  asset?: { _ref?: string }
}

type PostDetail = {
  _id: string
  title?: string
  slug?: { current?: string }
  publishedAt?: string
  excerpt?: string
  mainImage?: SanityImage
  body?: unknown[]
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

function formatDate(iso?: string) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso))
  } catch {
    return null
  }
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    '*[_type == "post" && defined(slug.current)].slug.current',
    {},
    sanityFetchOptions,
  )
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = await client.fetch<string | null>(
    '*[_type == "post" && slug.current == $slug][0].title',
    { slug },
    sanityFetchOptions,
  )
  return {
    title: title ? `${title} | BOG Blog` : "Entrada | BOG",
    description: title ? `Artículo: ${title}` : undefined,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await client.fetch<PostDetail | null>(
    '*[_type == "post" && slug.current == $slug][0]',
    { slug },
    sanityFetchOptions,
  )

  if (!post) {
    notFound()
  }

  const heroUrl = post.mainImage ? urlFor(post.mainImage).width(1600).height(900).fit("crop").url() : null
  const dateLabel = formatDate(post.publishedAt)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article>
        <div className="relative aspect-[2/1] min-h-[200px] w-full bg-secondary md:min-h-[280px]">
          {heroUrl ? (
            <img src={heroUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
              <span className="text-6xl font-bold text-muted-foreground/20">BOG</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-6 pb-10 pt-20 lg:px-12">
            {dateLabel ? (
              <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
                {dateLabel}
              </time>
            ) : null}
            <h1 className="mt-2 text-3xl font-bold text-balance md:text-5xl">{post.title ?? "Publicación"}</h1>
            {post.excerpt ? <p className="mt-4 max-w-2xl text-muted-foreground">{post.excerpt}</p> : null}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12 lg:py-20">
          {post.body && post.body.length > 0 ? (
            <PortableText value={post.body} components={bodyComponents} />
          ) : (
            <p className="text-muted-foreground">Este artículo aún no tiene cuerpo de texto.</p>
          )}

          <div className="mt-16 border-t border-border pt-10">
            <Link href="/blog" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}
