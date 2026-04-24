'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Produto } from './produtos'

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

interface CarrinhoStore {
  itens: ItemCarrinho[]
  aberto: boolean
  adicionar: (produto: Produto) => void
  remover: (id: string) => void
  atualizarQtd: (id: string, quantidade: number) => void
  limpar: () => void
  abrirCarrinho: () => void
  fecharCarrinho: () => void
}

export const useCarrinho = create<CarrinhoStore>()(
  persist(
    (set) => ({
      itens: [],
      aberto: false,
      adicionar: (produto) =>
        set((s) => {
          const existe = s.itens.find(i => i.produto.id === produto.id)
          if (existe) {
            return {
              itens: s.itens.map(i =>
                i.produto.id === produto.id
                  ? { ...i, quantidade: i.quantidade + 1 }
                  : i
              ),
              aberto: true,
            }
          }
          return { itens: [...s.itens, { produto, quantidade: 1 }], aberto: true }
        }),
      remover: (id) =>
        set((s) => ({ itens: s.itens.filter(i => i.produto.id !== id) })),
      atualizarQtd: (id, quantidade) =>
        set((s) => ({
          itens: quantidade <= 0
            ? s.itens.filter(i => i.produto.id !== id)
            : s.itens.map(i => i.produto.id === id ? { ...i, quantidade } : i),
        })),
      limpar: () => set({ itens: [] }),
      abrirCarrinho: () => set({ aberto: true }),
      fecharCarrinho: () => set({ aberto: false }),
    }),
    { name: 'alem-do-veu-carrinho' }
  )
)

export function totalCarrinho(itens: ItemCarrinho[]) {
  return itens.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0)
}

export function totalItens(itens: ItemCarrinho[]) {
  return itens.reduce((acc, i) => acc + i.quantidade, 0)
}
