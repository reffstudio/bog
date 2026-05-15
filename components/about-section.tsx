"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15+", label: "AÑOS DE EXPERIENCIA" },
  { value: "120+", label: "PROYECTOS COMPLETADOS" },
  { value: "25+", label: "PREMIOS INTERNACIONALES" },
  { value: "8", label: "PAÍSES" },
]

const services = [
  {
    title: "DISEÑO ARQUITECTÓNICO",
    description: "Creamos espacios únicos que fusionan funcionalidad y estética, adaptados a las necesidades específicas de cada cliente.",
  },
  {
    title: "PLANIFICACIÓN URBANA",
    description: "Desarrollamos proyectos que transforman comunidades, integrando sostenibilidad y visión de futuro.",
  },
  {
    title: "DISEÑO DE INTERIORES",
    description: "Diseñamos ambientes que reflejan identidad y propósito, cuidando cada detalle del espacio habitable.",
  },
  {
    title: "CONSULTORÍA",
    description: "Asesoramos en todas las etapas del proyecto, desde la conceptualización hasta la ejecución final.",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section */}
        <div 
          className={`mb-24 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide mb-8">
            ACERCA DE{" "}
            <span className="text-primary">BOG</span>
          </h1>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                BOG es un estudio de arquitectura fundado con la visión de crear espacios que trascienden lo convencional. 
                Nuestro enfoque combina innovación técnica con sensibilidad artística para desarrollar proyectos que 
                impactan positivamente en las comunidades y el entorno.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Cada proyecto es una oportunidad para explorar nuevas posibilidades y desafiar los límites de lo establecido, 
                siempre manteniendo un compromiso inquebrantable con la calidad y la sostenibilidad.
              </p>
            </div>
            <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
              {/* Placeholder for architect/team photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 border-2 border-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary text-2xl font-black">BOG</span>
                  </div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Foto del equipo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className={`mb-24 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="border border-secondary p-6 lg:p-8 text-center hover:border-primary transition-colors duration-300"
              >
                <p className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div 
          className={`mb-24 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square bg-secondary overflow-hidden">
              {/* Placeholder for philosophy image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border border-primary/50" />
              </div>
              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/10" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide mb-6">
                NUESTRA <span className="text-primary">FILOSOFÍA</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Creemos que la arquitectura tiene el poder de transformar vidas. Cada línea que trazamos, 
                cada material que seleccionamos, cada espacio que definimos está pensado para generar 
                experiencias significativas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nuestro proceso de diseño es colaborativo y centrado en el usuario, combinando tecnología 
                de vanguardia con técnicas tradicionales para crear soluciones arquitectónicas que perduran.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-primary" />
                <p className="text-sm uppercase tracking-wider text-foreground font-medium">
                  Innovación con propósito
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div 
          className={`mb-24 transition-all duration-1000 ease-out delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide mb-12">
            NUESTROS <span className="text-primary">SERVICIOS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="group border border-secondary p-8 lg:p-10 hover:border-primary transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-primary text-sm font-medium">0{index + 1}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-wide mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className={`text-center transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="border border-secondary p-12 lg:p-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide mb-6">
              ¿LISTO PARA CREAR <span className="text-primary">ALGO EXTRAORDINARIO</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cada gran proyecto comienza con una conversación. Cuéntanos tu visión y hagámosla realidad juntos.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-sm uppercase tracking-wider flex items-center gap-3 mx-auto"
            >
              INICIAR PROYECTO
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
