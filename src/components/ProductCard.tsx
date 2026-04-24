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
          height: '200px',
          background: '#EFE9DF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid rgba(180,160,140,0.15)',
          fontSize: '3rem', position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>
            {emojiCategoria[produto.categoria] ?? '✦'}
          </span>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.07), transparent 70%)',
          }} />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.3em', color: '#6B4E8E', textTransform: 'uppercase' }}>
          {produto.categoria}
        </span>
        <Link href={`/produtos/${produto.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.05rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.02em', margin: 0, lineHeight: 1.3 }}>
            {produto.nome}
          </h3>
        </Link>
        <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.95rem', fontWeight: 300, color: '#7A6355', margin: 0, lineHeight: 1.65, flex: 1 }}>
          {produto.descricao}
        </p>
        {produto.intencao && (
          <p style={{ fontFamily: 'var(--font-script), cursive', fontSize: '1rem', color: '#C9A84C', margin: 0 }}>
            {produto.intencao}
          </p>
        )}
      </div>

      {/* Rodapé */}
      <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: '#1E1510' }}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </span>
        <button
          onClick={() => adicionar(produto)}
          className="btn-primary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.58rem', gap: '0.4rem' }}
        >
          <ShoppingBag size={12} />
          Adicionar
        </button>
      </div>
    </div>
  )
}
