import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
