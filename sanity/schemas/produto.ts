import { defineField, defineType } from 'sanity'

export const produtoSchema = defineType({
  name: 'produto',
  title: 'Produto',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do Produto',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'imagem',
      title: 'Foto Principal',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: '🕯️ Velas', value: 'velas' },
          { title: '🌿 Incensos', value: 'incensos' },
          { title: '💎 Cristais', value: 'cristais' },
          { title: '✨ Kits', value: 'kits' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      validation: r => r.required().min(0),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição Curta',
      type: 'string',
      description: 'Aparece na listagem de produtos (1 linha)',
      validation: r => r.required().max(120),
    }),
    defineField({
      name: 'descricaoLonga',
      title: 'Descrição Completa',
      type: 'text',
      rows: 5,
      description: 'Aparece na página do produto',
    }),
    defineField({
      name: 'intencao',
      title: 'Intenção / Propósito',
      type: 'string',
      description: 'Ex: Proteção, Amor, Prosperidade',
    }),
    defineField({
      name: 'peso',
      title: 'Peso (gramas)',
      type: 'number',
      description: 'Usado para calcular o frete',
      validation: r => r.required().min(1),
    }),
    defineField({
      name: 'dimensoes',
      title: 'Dimensões',
      type: 'string',
      description: 'Ex: 10 × 3 cm',
    }),
    defineField({
      name: 'estoque',
      title: 'Estoque',
      type: 'number',
      initialValue: 1,
      validation: r => r.required().min(0),
    }),
    defineField({
      name: 'destaque',
      title: 'Produto em Destaque?',
      type: 'boolean',
      description: 'Aparece na seção de destaques da home',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'categoria',
      media: 'imagem',
    },
    prepare({ title, subtitle, media }) {
      const categorias: Record<string, string> = {
        velas: '🕯️ Velas',
        incensos: '🌿 Incensos',
        cristais: '💎 Cristais',
        kits: '✨ Kits',
      }
      return { title, subtitle: categorias[subtitle] ?? subtitle, media }
    },
  },
})
