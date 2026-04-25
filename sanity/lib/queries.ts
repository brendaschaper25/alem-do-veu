import { groq } from 'next-sanity'

export const todosProdutosQuery = groq`
  *[_type == "produto"] | order(_createdAt asc) {
    _id,
    nome,
    "slug": slug.current,
    "imagem": imagem.asset->url,
    categoria,
    preco,
    descricao,
    descricaoLonga,
    intencao,
    peso,
    dimensoes,
    estoque,
    destaque,
  }
`

export const produtoPorSlugQuery = groq`
  *[_type == "produto" && slug.current == $slug][0] {
    _id,
    nome,
    "slug": slug.current,
    "imagem": imagem.asset->url,
    categoria,
    preco,
    descricao,
    descricaoLonga,
    intencao,
    peso,
    dimensoes,
    estoque,
    destaque,
  }
`

export const produtosPorCategoriaQuery = groq`
  *[_type == "produto" && categoria == $categoria] | order(_createdAt asc) {
    _id,
    nome,
    "slug": slug.current,
    "imagem": imagem.asset->url,
    categoria,
    preco,
    descricao,
    intencao,
    peso,
    dimensoes,
    estoque,
    destaque,
  }
`

export const slugsQuery = groq`
  *[_type == "produto"] { "slug": slug.current }
`

export const configuracaoLojaQuery = groq`
  *[_type == "configuracaoLoja"][0] {
    announcementBar,
    heroSlides[] {
      tag, titulo, subtitulo, ctaLabel, ctaHref, tema,
    },
    bannersPromo[] {
      tag, titulo, desc, href, tema,
    },
    fraseDestaque,
  }
`
