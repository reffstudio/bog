type GalleryImage = {
  src: string
  alt?: string
}

type ProjectGalleryProps = {
  images: GalleryImage[]
  title?: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null

  return (
    <section
      className="mt-16 border-t border-border pt-16 md:mt-20 md:pt-20"
      aria-label={title ? `Galería: ${title}` : "Galería del proyecto"}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 md:gap-20 lg:gap-24">
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="m-0 w-full">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-muted/20 shadow-sm">
              <img
                src={image.src}
                alt={image.alt ?? ""}
                width={1920}
                height={1280}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}
