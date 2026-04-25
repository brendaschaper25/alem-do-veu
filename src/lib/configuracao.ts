import { getSanityClient } from '../../sanity/lib/client'
import { configuracaoLojaQuery } from '../../sanity/lib/queries'

// Temas → gradiente + cor de acento
export const TEMAS: Record<string, { bg: string; acento: string }> = {
  violeta:  { bg: 'radial-gradient(ellipse at 65% 55%, #3D2060 0%, #1A0E30 45%, #0B0716 100%)', acento: '#C9A84C' },
  terra:    { bg: 'radial-gradient(ellipse at 35% 60%, #3D1808 0%, #1E0C06 45%, #0C0604 100%)', acento: '#E8C080' },
  floresta: { bg: 'radial-gradient(ellipse at 50% 35%, #102818 0%, #071510 45%, #020806 100%)', acento: '#8FD4A8' },
}

export const CORES_BANNER: Record<string, string> = {
  violeta: '#6B4E8E',
  ouro:    '#C9A84C',
}

// Tipos
export interface HeroSlide {
  tag: string
  titulo: string
  subtitulo: string
  ctaLabel: string
  ctaHref: string
  tema: string
  imagemUrl?: string
}

export interface BannerPromo {
  tag: string
  titulo: string
  desc: string
  href: string
  tema: string
}

export interface ConfiguracaoLoja {
  announcementBar: string[]
  heroSlides: HeroSlide[]
  bannersPromo: BannerPromo[]
  fraseDestaque: string
}

// Fallback — usado quando Sanity não está configurado
export const configuracaoFallback: ConfiguracaoLoja = {
  announcementBar: [
    '⚡ 5% de desconto no PIX',
    '🌿 Frete grátis acima de R$ 150',
    '💎 Cristais direto de Teófilo Otoni — MG',
  ],
  heroSlides: [
    {
      tag: 'Nova Coleção · 2025',
      titulo: 'Rituais que\ntransformam',
      subtitulo: 'Curadoria de velas, incensos e cristais escolhidos com intenção real.',
      ctaLabel: 'Explorar coleção',
      ctaHref: '/produtos',
      tema: 'violeta',
    },
    {
      tag: 'Direto de Teófilo Otoni · MG',
      titulo: 'Cristais que\ncuram',
      subtitulo: 'Direto da capital mundial das pedras preciosas — autenticidade garantida em cada peça.',
      ctaLabel: 'Ver cristais',
      ctaHref: '/produtos?categoria=cristais',
      tema: 'terra',
    },
    {
      tag: 'Kit Ritual Completo',
      titulo: 'Uma intenção,\num ritual',
      subtitulo: 'Vela + incenso + cristal reunidos com propósito. Para cada fase da sua jornada.',
      ctaLabel: 'Ver kits',
      ctaHref: '/produtos?categoria=kits',
      tema: 'floresta',
    },
  ],
  bannersPromo: [
    {
      tag: 'Destaque da semana',
      titulo: 'Cristais de Teófilo Otoni',
      desc: 'Direto da capital mundial das pedras preciosas — autenticidade garantida.',
      href: '/produtos?categoria=cristais',
      tema: 'violeta',
    },
    {
      tag: 'Kit especial',
      titulo: 'Kit Ritual Completo',
      desc: 'Vela + incenso + cristal selecionados para cada intenção.',
      href: '/produtos?categoria=kits',
      tema: 'ouro',
    },
  ],
  fraseDestaque: 'A fumaça sabe o caminho. Você só precisa seguir.',
}

export async function getConfiguracaoLoja(): Promise<ConfiguracaoLoja> {
  const client = getSanityClient()
  if (!client) return configuracaoFallback
  try {
    const data = await client.fetch(configuracaoLojaQuery)
    if (!data) return configuracaoFallback
    return {
      announcementBar: data.announcementBar?.length ? data.announcementBar : configuracaoFallback.announcementBar,
      heroSlides:      data.heroSlides?.length      ? data.heroSlides      : configuracaoFallback.heroSlides,
      bannersPromo:    data.bannersPromo?.length     ? data.bannersPromo    : configuracaoFallback.bannersPromo,
      fraseDestaque:   data.fraseDestaque            ?? configuracaoFallback.fraseDestaque,
    }
  } catch {
    return configuracaoFallback
  }
}
