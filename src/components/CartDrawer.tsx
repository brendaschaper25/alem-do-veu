'use client'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCarrinho, totalCarrinho } from '@/lib/store'

export default function CartDrawer() {
  const { itens, aberto, fecharCarrinho, remover, atualizarQtd } = useCarrinho()
  const total = totalCarrinho(itens)

  return (
    <>
      {aberto && (
        <div
          onClick={fecharCarrinho}
          style={{ position: 'fixed', inset: 0, background: 'rgba(30,21,16,0.35)', zIndex: 200, backdropFilter: 'blur(3px)' }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        background: '#F8F5F0',
        borderLeft: '1px solid rgba(180,160,140,0.2)',
        zIndex: 201,
        transform: aberto ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(180,160,140,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', textTransform: 'uppercase' }}>
            Seu Carrinho
          </span>
          <button onClick={fecharCarrinho} style={{ background: 'none', border: 'none', color: '#7A6355', cursor: 'pointer' }}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Itens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {itens.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', opacity: 0.45 }}>
              <ShoppingBag size={40} strokeWidth={1} color="#A89487" />
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.9rem', fontWeight: 300, letterSpacing: '0.15em', color: '#A89487' }}>
                Carrinho vazio
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {itens.map(({ produto, quantidade }) => (
                <div key={produto.id} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1rem',
                  background: '#FFFFFF',
                  border: '1px solid rgba(180,160,140,0.18)',
                }}>
                  <div style={{ width: 52, height: 52, background: '#EFE9DF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>🕯️</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em', color: '#1E1510', marginBottom: '0.2rem' }}>
                      {produto.nome}
                    </p>
                    <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.95rem', fontWeight: 300, color: '#C9A84C' }}>
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button
                        onClick={() => atualizarQtd(produto.id, quantidade - 1)}
                        style={{ background: '#EFE9DF', border: 'none', color: '#7A6355', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={10} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.8rem', fontWeight: 300, color: '#1E1510', minWidth: '20px', textAlign: 'center' }}>{quantidade}</span>
                      <button
                        onClick={() => atualizarQtd(produto.id, quantidade + 1)}
                        style={{ background: '#EFE9DF', border: 'none', color: '#7A6355', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => remover(produto.id)}
                    style={{ background: 'none', border: 'none', color: '#A89487', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total */}
        {itens.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(180,160,140,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.2em', color: '#7A6355', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.1rem', fontWeight: 700, color: '#1E1510' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <Link href="/checkout" onClick={fecharCarrinho}>
              <button className="btn-primary" style={{ width: '100%' }}>
                Finalizar Pedido
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
