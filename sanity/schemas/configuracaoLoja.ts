import { defineField, defineType } from 'sanity'

export const configuracaoLojaSchema = defineType({
  name: 'configuracaoLoja',
  title: 'Configuração da Loja',
  type: 'document',

  fields: [

    // ── Faixa de anúncio (barra preta no topo) ──────────────
    defineField({
      name: 'announcementBar',
      title: '📢 Faixa de Anúncio (barra preta no topo)',
      type: 'array',
      description: 'Textos que aparecem na faixa escura no topo da página. Separe em até 3 itens.',
      of: [{ type: 'string' }],
      validation: r => r.max(3),
    }),

    // ── Slides do Hero ──────────────────────────────────────
    defineField({
      name: 'heroSlides',
      title: '🖼️ Slides do Hero (banner principal)',
      type: 'array',
      description: 'Slides que aparecem na tela inicial. Recomendado: 2 a 4 slides.',
      of: [
        {
          type: 'object',
          name: 'slide',
          title: 'Slide',
          fields: [
            defineField({
              name: 'tag',
              title: 'Tag (texto pequeno acima do título)',
              type: 'string',
              description: 'Ex: Nova Coleção · 2025',
              validation: r => r.required(),
            }),
            defineField({
              name: 'titulo',
              title: 'Título Principal',
              type: 'string',
              description: 'Texto grande. Use \\n para quebrar linha (ex: Rituais que\\ntransformam)',
              validation: r => r.required(),
            }),
            defineField({
              name: 'subtitulo',
              title: 'Subtítulo',
              type: 'text',
              rows: 2,
              description: 'Frase em itálico abaixo do título.',
              validation: r => r.required(),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Botão — Texto',
              type: 'string',
              description: 'Ex: Explorar coleção',
              validation: r => r.required(),
            }),
            defineField({
              name: 'ctaHref',
              title: 'Botão — Link',
              type: 'string',
              description: 'Ex: /produtos ou /produtos?categoria=cristais',
              validation: r => r.required(),
            }),
            defineField({
              name: 'imagem',
              title: 'Foto de Fundo (opcional)',
              type: 'image',
              description: 'Foto que aparece ao fundo do slide. Use imagens escuras ou com boa textura. Resolução mínima: 1400×900px.',
              options: { hotspot: true },
            }),
            defineField({
              name: 'tema',
              title: 'Tema de Cor',
              type: 'string',
              description: 'Define o acento e a sobreposição de cor sobre a foto (ou o fundo quando não há foto).',
              options: {
                list: [
                  { title: '🟣 Violeta (roxo profundo)', value: 'violeta' },
                  { title: '🟤 Terra (marrom escuro)', value: 'terra' },
                  { title: '🟢 Floresta (verde escuro)', value: 'floresta' },
                ],
                layout: 'radio',
              },
              initialValue: 'violeta',
              validation: r => r.required(),
            }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'tag', media: 'imagem' },
            prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
          },
        },
      ],
      validation: r => r.min(1).max(5),
    }),

    // ── Banners Promo ────────────────────────────────────────
    defineField({
      name: 'bannersPromo',
      title: '🏷️ Banners de Promoção (2 cards abaixo das categorias)',
      type: 'array',
      description: 'Dois banners promocionais na homepage. Máximo 2.',
      of: [
        {
          type: 'object',
          name: 'banner',
          title: 'Banner',
          fields: [
            defineField({ name: 'tag',    title: 'Tag pequena', type: 'string', description: 'Ex: Destaque da semana', validation: r => r.required() }),
            defineField({ name: 'titulo', title: 'Título',       type: 'string', validation: r => r.required() }),
            defineField({ name: 'desc',   title: 'Descrição',    type: 'text', rows: 2, validation: r => r.required() }),
            defineField({ name: 'href',   title: 'Link',         type: 'string', description: 'Ex: /produtos?categoria=cristais', validation: r => r.required() }),
            defineField({
              name: 'tema',
              title: 'Cor do acento',
              type: 'string',
              options: {
                list: [
                  { title: '🟣 Violeta', value: 'violeta' },
                  { title: '🟡 Ouro',    value: 'ouro' },
                ],
                layout: 'radio',
              },
              initialValue: 'violeta',
            }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'tag' },
            prepare: ({ title, subtitle }) => ({ title, subtitle }),
          },
        },
      ],
      validation: r => r.max(2),
    }),

    // ── Frase de rodapé ─────────────────────────────────────
    defineField({
      name: 'fraseDestaque',
      title: '✍️ Frase de Destaque (rodapé da home)',
      type: 'string',
      description: 'Frase em letra cursiva que aparece antes do footer. Aparece entre aspas.',
      placeholder: 'A fumaça sabe o caminho. Você só precisa seguir.',
    }),

  ],

  preview: {
    prepare: () => ({ title: 'Configuração da Loja' }),
  },
})
