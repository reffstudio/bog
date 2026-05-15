import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { type SanityPost } from "@/components/latest-blog"
import { client, urlFor } from "@/lib/sanity"

export const metadata = {
  title: "Blog | BOG Estudio de Arquitectura",
  description: "Artículos y notas del estudio BOG.",
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

export default async function BlogPage() {
  const posts = await client.fetch<SanityPost[]>(
    '*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc)',
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-12 lg:pt-36">
        <span className="text-sm font-medium uppercase tracking-wider text-primary">Blog</span>
        <h1 className="mt-3 text-balance text-4xl font-bold md:text-5xl lg:text-6xl">
          Publicaciones
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Ideas, proceso y mirada del estudio.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-xl border border-dashed border-border bg-muted/20 px-8 py-16 text-center">
            <p className="text-lg font-semibold text-foreground">Aún no hay entradas</p>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Cuando publiques posts en Sanity, aparecerán aquí.
            </p>
            <Link href="/" className="mt-8 inline-block text-sm font-medium text-primary hover:underline">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const href = post.slug?.current ? `/blog/${post.slug.current}` : "/blog"
              const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(600).fit("crop").url() : null
              const dateLabel = formatDate(post.publishedAt)

              return (
                <li key={post._id}>
                  <Link href={href} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
                          <span className="text-4xl font-bold text-muted-foreground/25">BOG</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      {dateLabel ? (
                        <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                          {dateLabel}
                        </time>
                      ) : null}
                      <h2 className="mt-1 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title ?? "Sin título"}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                      ) : null}
                      <span className="mt-3 inline-block text-sm font-medium text-primary">Leer más →</span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  )
}
