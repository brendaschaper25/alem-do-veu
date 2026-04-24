'use client'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCarrinho, totalCarrinho } from '@/lib/store'

export default function CartDrawer() {
  const { itens, aberto, fecharCarrinho, remover, atualizarQtd } = useCarrinho()
  const total = totalCarrinho(itens)

  return (
    <>
      {/* Overlay */}
      {aberto && (
        <div
          onClick={fecharCarrinho}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 200, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        background: '#2D1B54',
        borderLeft: '1px solid rgba(196,181,217,0.15)',
        zIndex: 201,
        transform: aberto ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(196,181,217,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase' }}>
            Seu Carrinho
          </span>
          <button onClick={fecharCarrinho} style={{ background: 'none', border: 'none', color: '#E0D3F5', cursor: 'pointer' }}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Itens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {itens.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', opacity: 0.5 }}>
              <ShoppingBag size={40} strokeWidth={1} color="#C4B5D9" />
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#C4B5D9', textTransform: 'uppercase' }}>
                Carrinho vazio
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {itens.map(({ produto, quantidade }) => (
                <div key={produto.id} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1rem', background: 'rgba(61,36,100,0.4)',
                  border: '1px solid rgba(196,181,217,0.1)',
                }}>
                  {/* Imagem placeholder */}
                  <div style={{ width: 56, height: 56, background: 'rgba(61,36,100,0.8)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>🕯️</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#F0EAFF', marginBottom: '0.25rem' }}>
                      {produto.nome}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#C9A84C', fontWeight: 400 }}>
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>

                    {/* Controle de quantidade */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <button onClick={() => atualizarQtd(produto.id, quantidade - 1)}
                        style={{ background: 'rgba(196,181,217,0.1)', border: 'none', color: '#E0D3F5', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Minus size={10} />
                      </button>
                      <span style={{ fontSize: '0.8rem', color: '#F0EAFF', minWidth: '20px', textAlign: 'center' }}>{quantidade}</span>
                      <button onClick={() => atualizarQtd(produto.id, quantidade + 1)}
                        style={{ background: 'rgba(196,181,217,0.1)', border: 'none', color: '#E0D3F5', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => remover(produto.id)}
                    style={{ background: 'none', border: 'none', color: '#C4B5D960', cursor: 'pointer', padding: '2px', flexShrink: 0 }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer com total */}
        {itens.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(196,181,217,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#C4B5D9', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#C9A84C' }}>
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
