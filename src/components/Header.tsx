'use client'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCarrinho, totalItens } from '@/lib/store'
import CartDrawer from './CartDrawer'

export default function Header() {
  const { itens, abrirCarrinho } = useCarrinho()
  const [scrolled, setScrolled] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const qtd = totalItens(itens)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(45,27,84,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
          padding: '0 2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.25em', color: '#F0EAFF', textTransform: 'uppercase' }}>
                Além do Véu
              </span>
              <span style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.55rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginTop: '2px' }}>
                Loja Esotérica
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-desktop">
            {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
              <Link key={href} href={href} className="nav-link">
                {label}
              </Link>
            ))}
          </nav>

          {/* Ações */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={abrirCarrinho}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#E0D3F5', padding: '4px' }}
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {qtd > 0 && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  background: '#C9A84C', color: '#2D1B54',
                  borderRadius: '50%', width: '16px', height: '16px',
                  fontSize: '9px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Lato, sans-serif',
                }}>
                  {qtd}
                </span>
              )}
            </button>

            {/* Menu mobile */}
            <button
              onClick={() => setMenuAberto(m => !m)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E0D3F5', display: 'none' }}
              className="menu-mobile-btn"
              aria-label="Menu"
            >
              {menuAberto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile expandido */}
        {menuAberto && (
          <div style={{
            background: 'rgba(45,27,84,0.98)',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            padding: '1.5rem 2rem',
          }}>
            {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuAberto(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: '#E0D3F5',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(196,181,217,0.1)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer />

      <style>{`
        .nav-link {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #E0D3F5;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #C9A84C; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .menu-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
