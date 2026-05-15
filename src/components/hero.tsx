"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { SanityPost } from "@/components/latest-blog"
import { urlFor } from "@/lib/sanity"

type HeroProps = {
  latestPost: SanityPost | null
}

function forceTransparentImage(el: HTMLImageElement | null) {
  if (!el) return
  el.style.setProperty("background-color", "transparent", "important")
  el.style.setProperty("filter", "none", "important")
}

export function Hero({ latestPost }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  const blogHref = latestPost?.slug?.current ? `/blog/${latestPost.slug.current}` : "/blog"
  const blogTitle = latestPost?.title?.trim() || "Explorar el blog"
  const coverUrl = latestPost?.mainImage ? urlFor(latestPost.mainImage).width(280).height(280).fit("crop").url() : null

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative h-screen w-full overflow-hidden text-white"
      style={{ colorScheme: "light" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero-video.mp4"
        poster="/video-poster.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/80 from-[8%] via-black/48 via-[42%] to-transparent to-[100%]"
      />

      <div className="relative z-30 flex min-h-[50vh] w-full flex-col items-center justify-center px-4 pt-24 pb-12 sm:px-6">
        <div
          className={`w-full max-w-3xl shrink-0 text-center transition-all duration-1000 ease-out sm:max-w-2xl md:max-w-3xl lg:max-w-[1200px] xl:max-w-[1400px] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-balance text-2xl font-black uppercase leading-snug tracking-wide sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.1] xl:text-6xl">
            LA ARQUITECTURA ES PARTE DE LA BÚSQUEDA DEL SER HUMANO POR ENCONTRAR{" "}
            <span className="text-primary">UN LUGAR PROPIO EN EL UNIVERSO.</span>
          </h1>
        </div>

        <div
          className={`relative isolate mt-8 w-full max-w-[19rem] shrink-0 overflow-hidden rounded-lg p-px sm:mt-10 md:max-w-md lg:mt-10 ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 ease-out`}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute left-1/2 top-1/2 h-[240%] w-[240%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(222,15,43,0.12)_50deg,#de0f2b_110deg,rgba(222,15,43,0.2)_170deg,transparent_230deg,transparent_360deg)] opacity-95 animate-[hero-blog-orbit_4s_linear_infinite]" />
          </div>
          <Link
            href={blogHref}
            className="group relative z-[1] flex flex-row overflow-hidden rounded-[calc(0.5rem-1px)] border border-white/10 bg-black/70 backdrop-blur-md transition-[border-color,transform] duration-300 hover:border-white/20 hover:-translate-y-px"
          >
            <div className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden sm:h-24 sm:w-24">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt=""
                  className="h-full w-full bg-transparent object-cover mix-blend-normal transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ backgroundColor: "transparent" }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">BOG</span>
                </div>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center border-l border-white/10 px-3 py-2.5 text-left sm:px-4 sm:py-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-primary">Blog</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-primary sm:text-base">
                {blogTitle}
              </p>
              <p className="mt-1.5 text-[10px] font-medium text-white/70 transition-colors group-hover:text-white/90 sm:text-xs">
                Leer nota{" "}
                <span className="inline-block text-primary transition-transform group-hover:translate-x-0.5">→</span>
              </p>
            </div>
          </Link>
        </div>
      </div>

      <img
        ref={forceTransparentImage}
        src="/images/render-BOG-final-v2.png"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 block h-auto w-full max-w-none object-contain object-bottom mix-blend-normal"
        style={{ backgroundColor: "transparent", filter: "none" }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] px-4 pb-6 text-center sm:pb-8">
        <div className="pointer-events-auto mx-auto max-w-[90vw] space-y-0 text-xs leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_0_2px_rgba(0,0,0,1)] sm:text-sm">
          <p className="m-0">© 2026 BOG. All rights reserved.</p>
          <p className="m-0 mt-0">
            Powered by{" "}
            <a
              href="https://www.reff.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              REFF STUDIO
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
