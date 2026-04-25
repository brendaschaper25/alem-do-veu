'use client'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCarrinho, totalItens } from '@/lib/store'
import CartDrawer from './CartDrawer'

export default function Header() {
  const { itens, abrirCarrinho } = useCarrinho()
  const [scrolled, setScrolled] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const pathname = usePathname()
  const qtd = totalItens(itens)

  // Header transparente apenas na homepage quando não rolou
  const transparent = pathname === '/' && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler() // checa posição inicial
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const cor = transparent ? '#FFFFFF' : '#1E1510'
  const corSub = transparent ? 'rgba(255,255,255,0.62)' : '#7A6355'
  const corIcone = transparent ? '#C9A84C' : '#6B4E8E'

  return (
    <>
      <header style={{
        position: 'fixed',
        top: '36px',
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: transparent ? 'transparent' : 'rgba(248,245,240,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        borderBottom: transparent
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(180,160,140,0.2)',
        padding: '0 2rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Moon size={17} strokeWidth={1.5} color={corIcone} style={{ flexShrink: 0, transition: 'color 0.4s' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-bodoni), Georgia, serif',
                fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.22em',
                color: cor, textTransform: 'uppercase', transition: 'color 0.4s',
              }}>
                Além do Véu
              </span>
              <span style={{
                fontFamily: 'var(--font-lato), system-ui, sans-serif',
                fontSize: '0.47rem', fontWeight: 300, letterSpacing: '0.18em',
                color: corSub, textTransform: 'uppercase', marginTop: '3px',
                transition: 'color 0.4s',
              }}>
                Loja Esotérica
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-desktop">
            {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
              <Link key={href} href={href} className={transparent ? 'nav-link nav-link-light' : 'nav-link'}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={abrirCarrinho}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: cor, padding: '4px', transition: 'color 0.4s' }}
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {qtd > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#6B4E8E', color: '#F8F5F0', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-lato)' }}>
                  {qtd}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuAberto(m => !m)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: cor, display: 'none', transition: 'color 0.4s' }}
              className="menu-mobile-btn"
              aria-label="Menu"
            >
              {menuAberto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuAberto && (
          <div style={{ background: 'rgba(248,245,240,0.99)', borderTop: '1px solid rgba(180,160,140,0.15)', padding: '1.5rem 2rem' }}>
            {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuAberto(false)} style={{ display: 'block', padding: '0.75rem 0', fontFamily: 'var(--font-lato)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.18em', color: '#1E1510', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(180,160,140,0.12)' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer />

      <style>{`
        .nav-link {
          font-family: var(--font-lato), system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: #1E1510;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #6B4E8E; }
        .nav-link-light { color: rgba(255,255,255,0.82) !important; }
        .nav-link-light:hover { color: #FFFFFF !important; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .menu-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
