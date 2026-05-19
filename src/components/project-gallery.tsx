"use client"

import { useCallback, useState, type CSSProperties } from "react"
import Lightbox from "yet-another-react-lightbox"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

import "yet-another-react-lightbox/styles.css"

export type GalleryImage = {
  src: string
  srcFull?: string
  alt?: string
}

type ProjectGalleryProps = {
  images: GalleryImage[]
  title?: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = images.map((image) => ({
    src: image.srcFull ?? image.src,
    alt: image.alt ?? "",
  }))

  const openAt = useCallback((slideIndex: number) => {
    setIndex(slideIndex)
    setOpen(true)
  }, [])

  if (images.length === 0) return null

  return (
    <>
      <section
        className="mt-16 border-t border-border pt-16 md:mt-20 md:pt-20"
        aria-label={title ? `Galería: ${title}` : "Galería del proyecto"}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-14 md:gap-20 lg:gap-24">
          {images.map((image, slideIndex) => (
            <figure key={`${image.src}-${slideIndex}`} className="m-0 w-full">
              <button
                type="button"
                onClick={() => openAt(slideIndex)}
                className={cn(
                  "group w-full cursor-zoom-in overflow-hidden rounded-lg border border-border/60 bg-muted/20 text-left shadow-sm",
                  "transition-[border-color,box-shadow] duration-300",
                  "hover:border-border hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label={image.alt ? `Ampliar: ${image.alt}` : `Ampliar imagen ${slideIndex + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt ?? ""}
                  width={1920}
                  height={1280}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              </button>
            </figure>
          ))}
        </div>
      </section>

      <Lightbox
        className="bog-lightbox"
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: current }) => setIndex(current) }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        carousel={{ finite: images.length <= 1, padding: 0, spacing: 0 }}
        animation={{ fade: 280, swipe: 320 }}
        styles={{
          container: { backgroundColor: "#000000" },
          root: { "--yarl__color_backdrop": "#000000" } as CSSProperties,
        }}
        render={{
          buttonClose: ({ close }) => (
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar galería"
              className="yarl__button_close bog-lightbox__close"
            >
              <X className="h-5 w-5" strokeWidth={1.25} aria-hidden />
            </button>
          ),
          iconPrev: () => <ChevronLeft className="h-7 w-7" strokeWidth={1.25} aria-hidden />,
          iconNext: () => <ChevronRight className="h-7 w-7" strokeWidth={1.25} aria-hidden />,
        }}
      />
    </>
  )
}
