"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

// Placeholder blog data - ready to be replaced with Sanity data
const posts = [
  {
    id: "1",
    title: "El futuro de la arquitectura sostenible en México",
    excerpt: "Exploramos las tendencias emergentes en construcción ecológica y cómo están transformando el panorama arquitectónico nacional.",
    category: "Sostenibilidad",
    author: "Arq. Carlos Mendoza",
    date: "15 Mayo 2024",
    readTime: "8 min",
    image: "/placeholder-blog-1.jpg",
    slug: "futuro-arquitectura-sostenible-mexico",
    featured: true,
  },
  {
    id: "2",
    title: "Diseño biofílico: Conectando espacios con la naturaleza",
    excerpt: "Cómo integrar elementos naturales en el diseño arquitectónico para mejorar el bienestar de los ocupantes.",
    category: "Diseño",
    author: "Arq. María García",
    date: "10 Mayo 2024",
    readTime: "6 min",
    image: "/placeholder-blog-2.jpg",
    slug: "diseno-biofilico-espacios-naturaleza",
    featured: false,
  },
  {
    id: "3",
    title: "Materiales innovadores en la construcción contemporánea",
    excerpt: "Un recorrido por los materiales más revolucionarios que están redefiniendo las posibilidades arquitectónicas.",
    category: "Innovación",
    author: "Arq. Roberto Sánchez",
    date: "5 Mayo 2024",
    readTime: "10 min",
    image: "/placeholder-blog-3.jpg",
    slug: "materiales-innovadores-construccion",
    featured: true,
  },
  {
    id: "4",
    title: "Arquitectura y memoria: Preservando la identidad urbana",
    excerpt: "La importancia de mantener el patrimonio arquitectónico mientras se desarrollan nuevos proyectos urbanos.",
    category: "Urbanismo",
    author: "Arq. Carlos Mendoza",
    date: "28 Abril 2024",
    readTime: "7 min",
    image: "/placeholder-blog-4.jpg",
    slug: "arquitectura-memoria-identidad-urbana",
    featured: false,
  },
  {
    id: "5",
    title: "El rol del arquitecto en el siglo XXI",
    excerpt: "Reflexiones sobre cómo ha evolucionado nuestra profesión y hacia dónde nos dirigimos.",
    category: "Reflexión",
    author: "Arq. María García",
    date: "20 Abril 2024",
    readTime: "5 min",
    image: "/placeholder-blog-5.jpg",
    slug: "rol-arquitecto-siglo-xxi",
    featured: false,
  },
  {
    id: "6",
    title: "Iluminación natural: El elemento invisible del diseño",
    excerpt: "Técnicas y estrategias para maximizar el aprovechamiento de la luz natural en proyectos arquitectónicos.",
    category: "Diseño",
    author: "Arq. Roberto Sánchez",
    date: "15 Abril 2024",
    readTime: "9 min",
    image: "/placeholder-blog-6.jpg",
    slug: "iluminacion-natural-elemento-diseno",
    featured: false,
  },
]

const categories = ["Todos", "Sostenibilidad", "Diseño", "Innovación", "Urbanismo", "Reflexión"]

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  slug: string
  featured: boolean
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block md:col-span-2 lg:col-span-2"
    >
      <article className="grid md:grid-cols-2 gap-8 p-6 lg:p-8 bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <span className="text-8xl font-bold text-muted-foreground/10">BOG</span>
          </div>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-muted-foreground text-sm">{post.readTime} lectura</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-4 text-balance">
            {post.title}
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {post.author.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
            </div>
            
            <div className="w-10 h-10 border border-foreground flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:text-primary-foreground transition-colors" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

function BlogCard({ post }: { post: Post }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <span className="text-6xl font-bold text-muted-foreground/10">BOG</span>
          </div>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-primary" />
            <span>{post.readTime} lectura</span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-3 text-balance">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            <span>Leer artículo</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  )
}

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  
  const filteredPosts = activeCategory === "Todos" 
    ? posts 
    : posts.filter(p => p.category === activeCategory)
  
  const featuredPost = filteredPosts.find(p => p.featured)
  const regularPosts = filteredPosts.filter(p => !p.featured || p.id !== featuredPost?.id)

  return (
    <section className="pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Publicaciones
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 text-balance">
            Nuestro <span className="text-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            Ideas, reflexiones y tendencias sobre arquitectura, diseño y el futuro de los espacios que habitamos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {regularPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 p-8 lg:p-12 bg-secondary/30 border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Suscríbete a nuestro <span className="text-primary">Newsletter</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Recibe las últimas publicaciones y noticias del estudio directamente en tu correo.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
