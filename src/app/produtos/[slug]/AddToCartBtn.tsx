'use client'
import { ShoppingBag } from 'lucide-react'
import { useCarrinho } from '@/lib/store'
import type { Produto } from '@/lib/produtos'

export default function AddToCartBtn({ produto }: { produto: Produto }) {
  const { adicionar } = useCarrinho()
  return (
    <button className="btn-primary" style={{ padding: '0.85rem 2rem' }} onClick={() => adicionar(produto)}>
      <ShoppingBag size={14} />
      Adicionar ao Carrinho
    </button>
  )
}
