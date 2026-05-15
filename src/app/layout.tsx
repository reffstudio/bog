import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const gabarito = Gabarito({ 
  subsets: ["latin"],
  variable: '--font-gabarito',
})

export const metadata: Metadata = {
  title: 'BOG | Estudio de Arquitectura',
  description: 'La Arquitectura es parte de la búsqueda del ser humano por encontrar un lugar propio en el universo.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${gabarito.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
