'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCarrinho } from '@/lib/store'
import type { Produto } from '@/lib/produtos'

const emojiCategoria: Record<string, string> = {
  velas: '🕯️', incensos: '🌿', cristais: '💎', kits: '✨',
}

export default function ProductCard({ produto }: { produto: Produto }) {
  const { adicionar } = useCarrinho()

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Imagem */}
      <Link href={`/produtos/${produto.slug}`} style={{ textDecoration: 'none' }}>
        <div style={{
          height: '200px', background: 'linear-gradient(145deg, #3D2464, #2D1B54)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid rgba(196,181,217,0.08)',
          fontSize: '3rem', position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {emojiCategoria[produto.categoria] ?? '✦'}
          </span>
          {/* Glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.08), transparent 70%)',
          }} />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', fontFamily: 'Cinzel, serif' }}>
          {produto.categoria}
        </span>
        <Link href={`/produtos/${produto.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 600, color: '#F0EAFF', letterSpacing: '0.05em', margin: 0, lineHeight: 1.4 }}>
            {produto.nome}
          </h3>
        </Link>
        <p style={{ fontSize: '0.75rem', color: '#C4B5D9', margin: 0, lineHeight: 1.6, flex: 1 }}>
          {produto.descricao}
        </p>
        <p style={{ fontSize: '0.65rem', color: '#C9A84C88', letterSpacing: '0.1em', fontStyle: 'italic', margin: 0 }}>
          {produto.intencao}
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#C9A84C' }}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </span>
        <button
          onClick={() => adicionar(produto)}
          className="btn-primary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.6rem', gap: '0.4rem' }}
        >
          <ShoppingBag size={12} />
          Adicionar
        </button>
      </div>
    </div>
  )
}
