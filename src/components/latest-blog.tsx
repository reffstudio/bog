import Link from "next/link"
import { urlFor } from "@/lib/sanity"

export type SanityPost = {
  _id: string
  title?: string
  slug?: { current?: string }
  publishedAt?: string
  excerpt?: string
  mainImage?: {
    asset?: { _ref?: string }
    _type?: string
  }
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

export function LatestBlogSection({ post }: { post: SanityPost | null }) {
  if (!post) {
    return (
      <section className="border-y border-border bg-muted/30 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Blog</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">Aún no hay publicaciones</h2>
          <p className="mt-4 text-muted-foreground">
            Cuando publiquemos la primera nota, aparecerá aquí. Mientras tanto puedes visitar la sección del blog.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ir al blog
          </Link>
        </div>
      </section>
    )
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null
  const dateLabel = formatDate(post.publishedAt)
  const postHref = post.slug?.current ? `/blog/${post.slug.current}` : "/blog"

  return (
    <section className="border-y border-border bg-muted/30 px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Blog</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Última publicación</h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            Ver todas las notas
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <Link href={postHref} className="group block">
          <article className="overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-[4/3] bg-secondary md:aspect-auto md:min-h-[280px]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={post.title ?? "Publicación del blog"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                    <span className="text-5xl font-bold text-muted-foreground/25">BOG</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                {dateLabel ? (
                  <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
                    {dateLabel}
                  </time>
                ) : null}
                <h3 className="mt-2 text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                  {post.title ?? "Sin título"}
                </h3>
                {post.excerpt ? (
                  <p className="mt-4 line-clamp-4 text-muted-foreground">{post.excerpt}</p>
                ) : null}
                <div className="mt-8">
                  <span className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
                    Leer más
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  )
}
