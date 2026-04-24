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
  peso: number // gramas
  dimensoes: { altura: number; largura: number; comprimento: number }
  estoque: number
}

export const produtos: Produto[] = [
  {
    id: '1',
    slug: 'vela-7-dias-branca',
    nome: 'Vela 7 Dias Branca',
    descricao: 'Purificação e paz interior',
    descricaoLonga: 'A vela branca é o símbolo da pureza e da paz. Acenda com a intenção de limpar energias densas do seu ambiente e do seu campo energético. Ideal para rituais de limpeza, proteção e conexão com o plano espiritual.',
    preco: 24.90,
    categoria: 'velas',
    imagem: '/produtos/vela-branca.jpg',
    intencao: 'Purificação · Paz · Proteção',
    peso: 180,
    dimensoes: { altura: 23, largura: 4, comprimento: 4 },
    estoque: 50,
  },
  {
    id: '2',
    slug: 'vela-7-dias-roxa',
    nome: 'Vela 7 Dias Roxa',
    descricao: 'Espiritualidade e clareza mental',
    descricaoLonga: 'O roxo é a cor da espiritualidade e da intuição. Esta vela potencializa a conexão com sua sabedoria interior e com guias espirituais. Use em meditações, consultas de tarô ou momentos de reflexão profunda.',
    preco: 24.90,
    categoria: 'velas',
    imagem: '/produtos/vela-roxa.jpg',
    intencao: 'Espiritualidade · Intuição · Clareza',
    peso: 180,
    dimensoes: { altura: 23, largura: 4, comprimento: 4 },
    estoque: 40,
  },
  {
    id: '3',
    slug: 'vela-7-dias-verde',
    nome: 'Vela 7 Dias Verde',
    descricao: 'Prosperidade e abertura de caminhos',
    descricaoLonga: 'A vela verde atrai prosperidade, saúde e novos caminhos. Acenda nas noites de lua crescente para amplificar sua intenção de abundância. Perfeita para rituais de trabalho, negócios e saúde.',
    preco: 24.90,
    categoria: 'velas',
    imagem: '/produtos/vela-verde.jpg',
    intencao: 'Prosperidade · Saúde · Abertura',
    peso: 180,
    dimensoes: { altura: 23, largura: 4, comprimento: 4 },
    estoque: 35,
  },
  {
    id: '4',
    slug: 'incenso-nag-champa',
    nome: 'Incenso Nag Champa',
    descricao: 'O clássico da purificação e meditação',
    descricaoLonga: 'O Nag Champa é um dos incensos mais sagrados do mundo. Sua fragrância única de sândalo e flor de champaca purifica ambientes, acalma a mente e prepara o espaço para práticas espirituais profundas.',
    preco: 14.90,
    categoria: 'incensos',
    imagem: '/produtos/incenso-nag-champa.jpg',
    intencao: 'Meditação · Purificação · Calma',
    peso: 40,
    dimensoes: { altura: 25, largura: 3, comprimento: 3 },
    estoque: 80,
  },
  {
    id: '5',
    slug: 'incenso-palo-santo',
    nome: 'Incenso Palo Santo',
    descricao: 'Madeira sagrada para limpar e proteger',
    descricaoLonga: 'O Palo Santo — "madeira santa" — tem sido usado por séculos em rituais de purificação. Sua fumaça doce e amadeirada limpa energias negativas, atrai boa fortuna e cria um campo de proteção ao redor do espaço.',
    preco: 18.90,
    categoria: 'incensos',
    imagem: '/produtos/incenso-palo-santo.jpg',
    intencao: 'Limpeza · Proteção · Fortuna',
    peso: 35,
    dimensoes: { altura: 25, largura: 3, comprimento: 3 },
    estoque: 60,
  },
  {
    id: '6',
    slug: 'kit-ritual-prosperidade',
    nome: 'Kit Ritual Prosperidade',
    descricao: 'Vela verde + incenso + cristal citrino',
    descricaoLonga: 'Um conjunto completo para rituais de prosperidade e abertura de caminhos. Inclui vela 7 dias verde, incenso de canela e laranja, e um cristal citrino bruto de Teófilo Otoni. Acompanha cartão com instrução de ritual.',
    preco: 54.90,
    categoria: 'kits',
    imagem: '/produtos/kit-prosperidade.jpg',
    intencao: 'Prosperidade · Abundância · Realização',
    peso: 320,
    dimensoes: { altura: 12, largura: 10, comprimento: 10 },
    estoque: 20,
  },
  {
    id: '7',
    slug: 'cristal-quartzo-rosa',
    nome: 'Cristal Quartzo Rosa Bruto',
    descricao: 'Amor próprio e cura emocional',
    descricaoLonga: 'Cristal bruto de Teófilo Otoni — a capital mundial das pedras preciosas. O quartzo rosa é a pedra do amor incondicional. Carrega e expande o amor próprio, facilita a cura emocional e harmoniza relacionamentos.',
    preco: 22.90,
    categoria: 'cristais',
    imagem: '/produtos/quartzo-rosa.jpg',
    intencao: 'Amor · Cura · Harmonia',
    peso: 80,
    dimensoes: { altura: 5, largura: 4, comprimento: 3 },
    estoque: 30,
  },
  {
    id: '8',
    slug: 'cristal-ametista',
    nome: 'Cristal Ametista Bruta',
    descricao: 'Proteção espiritual e intuição',
    descricaoLonga: 'Ametista bruta de Teófilo Otoni. Uma das pedras mais poderosas para proteção espiritual e desenvolvimento da intuição. Coloque no quarto para proteger durante o sono ou em seu altar para amplificar práticas espirituais.',
    preco: 28.90,
    categoria: 'cristais',
    imagem: '/produtos/ametista.jpg',
    intencao: 'Proteção · Intuição · Espiritualidade',
    peso: 90,
    dimensoes: { altura: 5, largura: 4, comprimento: 3 },
    estoque: 25,
  },
]

export function getProduto(slug: string) {
  return produtos.find(p => p.slug === slug)
}

export function getProdutosPorCategoria(categoria: string) {
  return produtos.filter(p => p.categoria === categoria)
}

export const categorias = ['velas', 'incensos', 'cristais', 'kits']
