import { getSanityClient } from '../../sanity/lib/client'
import { todosProdutosQuery, produtoPorSlugQuery, slugsQuery } from '../../sanity/lib/queries'

export interface Produto {
  id: string
  slug: string
  nome: string
  descricao: string
  descricaoLonga: string
  preco: number
  categoria: string
  imagem: string
  intencao: string
  peso: number
  dimensoes: string
  estoque: number
  destaque?: boolean
}

// Dados estáticos de fallback — usados quando Sanity não está configurado
export const produtosEstaticos: Produto[] = [
  {
    id: '1', slug: 'vela-7-dias-branca', nome: 'Vela 7 Dias Branca',
    descricao: 'Purificação e paz interior',
    descricaoLonga: 'A vela branca é o símbolo da pureza e da paz. Acenda com a intenção de limpar energias densas do seu ambiente e do seu campo energético.',
    preco: 24.90, categoria: 'velas', imagem: '/produtos/vela-branca.jpg',
    intencao: 'Purificação · Paz · Proteção', peso: 180, dimensoes: '23 × 4 × 4 cm', estoque: 50, destaque: true,
  },
  {
    id: '2', slug: 'vela-7-dias-roxa', nome: 'Vela 7 Dias Roxa',
    descricao: 'Espiritualidade e clareza mental',
    descricaoLonga: 'O roxo é a cor da espiritualidade e da intuição. Esta vela potencializa a conexão com sua sabedoria interior e com guias espirituais.',
    preco: 24.90, categoria: 'velas', imagem: '/produtos/vela-roxa.jpg',
    intencao: 'Espiritualidade · Intuição · Clareza', peso: 180, dimensoes: '23 × 4 × 4 cm', estoque: 40,
  },
  {
    id: '3', slug: 'vela-7-dias-verde', nome: 'Vela 7 Dias Verde',
    descricao: 'Prosperidade e abertura de caminhos',
    descricaoLonga: 'A vela verde atrai prosperidade, saúde e novos caminhos. Acenda nas noites de lua crescente para amplificar sua intenção de abundância.',
    preco: 24.90, categoria: 'velas', imagem: '/produtos/vela-verde.jpg',
    intencao: 'Prosperidade · Saúde · Abertura', peso: 180, dimensoes: '23 × 4 × 4 cm', estoque: 35,
  },
  {
    id: '4', slug: 'incenso-nag-champa', nome: 'Incenso Nag Champa',
    descricao: 'O clássico da purificação e meditação',
    descricaoLonga: 'O Nag Champa é um dos incensos mais sagrados do mundo. Sua fragrância única de sândalo e flor de champaca purifica ambientes.',
    preco: 14.90, categoria: 'incensos', imagem: '/produtos/incenso-nag-champa.jpg',
    intencao: 'Meditação · Purificação · Calma', peso: 40, dimensoes: '25 × 3 × 3 cm', estoque: 80, destaque: true,
  },
  {
    id: '5', slug: 'incenso-palo-santo', nome: 'Incenso Palo Santo',
    descricao: 'Madeira sagrada para limpar e proteger',
    descricaoLonga: 'O Palo Santo — "madeira santa" — tem sido usado por séculos em rituais de purificação.',
    preco: 18.90, categoria: 'incensos', imagem: '/produtos/incenso-palo-santo.jpg',
    intencao: 'Limpeza · Proteção · Fortuna', peso: 35, dimensoes: '25 × 3 × 3 cm', estoque: 60,
  },
  {
    id: '6', slug: 'kit-ritual-prosperidade', nome: 'Kit Ritual Prosperidade',
    descricao: 'Vela verde + incenso + cristal citrino',
    descricaoLonga: 'Um conjunto completo para rituais de prosperidade e abertura de caminhos.',
    preco: 54.90, categoria: 'kits', imagem: '/produtos/kit-prosperidade.jpg',
    intencao: 'Prosperidade · Abundância · Realização', peso: 320, dimensoes: '12 × 10 × 10 cm', estoque: 20, destaque: true,
  },
  {
    id: '7', slug: 'cristal-quartzo-rosa', nome: 'Cristal Quartzo Rosa Bruto',
    descricao: 'Amor próprio e cura emocional',
    descricaoLonga: 'Cristal bruto de Teófilo Otoni. O quartzo rosa é a pedra do amor incondicional.',
    preco: 22.90, categoria: 'cristais', imagem: '/produtos/quartzo-rosa.jpg',
    intencao: 'Amor · Cura · Harmonia', peso: 80, dimensoes: '5 × 4 × 3 cm', estoque: 30,
  },
  {
    id: '8', slug: 'cristal-ametista', nome: 'Cristal Ametista Bruta',
    descricao: 'Proteção espiritual e intuição',
    descricaoLonga: 'Ametista bruta de Teófilo Otoni. Uma das pedras mais poderosas para proteção espiritual.',
    preco: 28.90, categoria: 'cristais', imagem: '/produtos/ametista.jpg',
    intencao: 'Proteção · Intuição · Espiritualidade', peso: 90, dimensoes: '5 × 4 × 3 cm', estoque: 25, destaque: true,
  },
]

// Retorna todos os produtos — do Sanity se configurado, senão fallback estático
export async function getProdutos(): Promise<Produto[]> {
  const client = getSanityClient()
  if (!client) return produtosEstaticos
  try {
    const data = await client.fetch(todosProdutosQuery)
    return data?.length ? data : produtosEstaticos
  } catch {
    return produtosEstaticos
  }
}

export async function getProduto(slug: string): Promise<Produto | undefined> {
  const client = getSanityClient()
  if (!client) return produtosEstaticos.find(p => p.slug === slug)
  try {
    const data = await client.fetch(produtoPorSlugQuery, { slug })
    return data ?? produtosEstaticos.find(p => p.slug === slug)
  } catch {
    return produtosEstaticos.find(p => p.slug === slug)
  }
}

export async function getSlugs(): Promise<string[]> {
  const client = getSanityClient()
  if (!client) return produtosEstaticos.map(p => p.slug)
  try {
    const data = await client.fetch(slugsQuery)
    return data?.map((d: { slug: string }) => d.slug) ?? produtosEstaticos.map(p => p.slug)
  } catch {
    return produtosEstaticos.map(p => p.slug)
  }
}

// Mantém compatibilidade síncrona para a API de pagamento (busca por ID)
export { produtosEstaticos as produtos }

export const categorias = ['velas', 'incensos', 'cristais', 'kits']
