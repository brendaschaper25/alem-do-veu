import type { Metadata } from 'next'
import { Bodoni_Moda, Cormorant_Garamond, Lato, Great_Vibes } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnnouncementBar from '@/components/AnnouncementBar'

// next/font carrega fontes direto no servidor — mais confiável que @import
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal'],
  variable: '--font-lato',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Além do Véu | Loja Esotérica',
  description: 'Velas, incensos e cristais com curadoria e propósito. Para quem sente mais do que vê.',
  keywords: 'velas esotéricas, incenso, cristais, umbanda, espiritualidade, ritual, meditação',
  openGraph: {
    title: 'Além do Véu | Loja Esotérica',
    description: 'Para quem sente mais do que vê.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${bodoni.variable} ${cormorant.variable} ${lato.variable} ${greatVibes.variable}`}
    >
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnnouncementBar />
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
