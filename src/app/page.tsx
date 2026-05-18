import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import type { SanityPost } from "@/components/latest-blog"
import { client, sanityFetchOptions } from "@/lib/sanity"

export const revalidate = 0

export default async function Home() {
  const latestPost = await client.fetch<SanityPost | null>(
    '*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc)[0]',
    {},
    sanityFetchOptions,
  )

  return (
    <main className="relative bg-background">
      <Header />
      <Hero latestPost={latestPost} />
    </main>
  )
}
