import Link from 'next/link'

export default function Footer() {
  return (
    <>
    <style>{`
      .footer-link { display: block; font-size: 0.8rem; color: #C4B5D9; text-decoration: none; margin-bottom: 0.5rem; transition: color 0.2s; }
      .footer-link:hover { color: #F0EAFF; }
    `}</style>
    <footer style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(196,181,217,0.12)', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* Marca */}
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '0.5rem' }}>
              Além do Véu
            </p>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.1rem', color: '#C9A84C', marginBottom: '1rem' }}>
              Para quem sente mais do que vê.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#C4B5D9', lineHeight: 1.7, maxWidth: '220px' }}>
              Curadoria de produtos esotéricos com intenção. Velas, incensos e cristais de Teófilo Otoni.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Navegação
            </p>
            {[['Início', '/'], ['Produtos', '/produtos'], ['Sobre', '/sobre']].map(([label, href]) => (
              <Link key={href} href={href} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          {/* Contato */}
          <div>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Contato
            </p>
            <p style={{ fontSize: '0.8rem', color: '#C4B5D9', marginBottom: '0.5rem' }}>@alemdoveu</p>
            <p style={{ fontSize: '0.8rem', color: '#C4B5D9', marginBottom: '0.5rem' }}>contato@alemdoveu.com.br</p>
            <p style={{ fontSize: '0.75rem', color: '#C4B5D980', marginTop: '1rem', lineHeight: 1.6 }}>
              Cristais direto de<br />Teófilo Otoni — MG
            </p>
          </div>
        </div>

        <div className="linha-ouro" style={{ marginBottom: '1.5rem' }} />

        <p style={{ fontSize: '0.7rem', color: '#C4B5D960', textAlign: 'center', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} Além do Véu · Todos os direitos reservados
        </p>
      </div>
    </footer>
    </>
  )
}
