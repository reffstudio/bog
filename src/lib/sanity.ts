import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'd03fdiqa',
  dataset: 'production',
  apiVersion: '2024-05-11',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

/** Evita la caché de datos de Next.js / Vercel en cada petición a Sanity. */
export const sanityFetchOptions = {
  cache: 'no-store' as const,
  next: { revalidate: 0 },
}
