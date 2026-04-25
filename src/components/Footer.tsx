import Link from 'next/link'
import { Moon } from 'lucide-react'

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          display: block;
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: 1rem;
          font-weight: 300;
          color: #7A6355;
          text-decoration: none;
          margin-bottom: 0.4rem;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #1E1510; }
      `}</style>
      <footer style={{ background: '#EFE9DF', borderTop: '1px solid rgba(180,160,140,0.22)', padding: '3.5rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.4rem' }}>
                <Moon size={15} strokeWidth={1.5} color="#6B4E8E" />
                <span style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.2em', color: '#1E1510', textTransform: 'uppercase' }}>
                  Além do Véu
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', fontWeight: 300, color: '#C9A84C', marginBottom: '1rem', marginLeft: '1.6rem', letterSpacing: '0.04em' }}>
                Para quem sente mais do que vê.
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: '0.9rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7, maxWidth: '220px' }}>
                Curadoria de produtos esotéricos com intenção. Velas, incensos e cristais de Teófilo Otoni.
              </p>
            </div>

            {/* Nav */}
            <div>
              <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Navegação
              </p>
              {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
                <Link key={href} href={href} className="footer-link">{label}</Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Contato
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#7A6355', marginBottom: '0.4rem' }}>@alemdoveu</p>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#7A6355', marginBottom: '0.4rem' }}>contato@alemdoveu.com.br</p>
              <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: '0.8rem', color: '#A89487', marginTop: '1rem', lineHeight: 1.65 }}>
                Cristais direto de<br />Teófilo Otoni — MG
              </p>
            </div>
          </div>

          <div className="linha-ouro" style={{ marginBottom: '1.5rem' }} />

          <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontWeight: 300, fontSize: '0.6rem', color: '#A89487', textAlign: 'center', letterSpacing: '0.14em' }}>
            © {new Date().getFullYear()} Além do Véu · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  )
}
