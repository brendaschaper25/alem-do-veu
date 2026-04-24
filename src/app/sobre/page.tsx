import { Moon } from 'lucide-react'

export const metadata = { title: 'Sobre | Além do Véu' }

export default function SobrePage() {
  return (
    <div style={{ paddingTop: '108px', paddingBottom: '6rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>

        <Moon size={20} strokeWidth={1} color="#C9A84C" style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.8 }} />

        <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Além do Véu
        </p>

        <h1 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', fontWeight: 700, color: '#1E1510', letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          A marca é a porta.<br />Quem entra, não volta do mesmo jeito.
        </h1>

        <div className="linha-ouro" style={{ maxWidth: '120px', margin: '0 auto 2.5rem' }} />

        <div style={{ textAlign: 'left', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.9 }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Existe um mundo que a maioria não vê. A Além do Véu nasceu para quem já sente isso — para quem sabe que uma vela não é apenas cera, que um cristal não é apenas pedra, que a fumaça do incenso carrega algo além do que o olho enxerga.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Cada produto é escolhido com intenção. Nossos cristais vêm diretamente de Teófilo Otoni — MG, a capital mundial das pedras preciosas. Nenhuma outra loja online tem esse acesso geográfico. É o nosso diferencial mais precioso.
          </p>
          <p style={{ marginBottom: '0' }}>
            Você chegou até aqui por acaso? A gente não acredita em acasos.
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-script), cursive', fontSize: '1.7rem', color: '#C9A84C', margin: '3rem 0 2.5rem' }}>
          "Para quem sente mais do que vê."
        </p>

        <a href="/produtos" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Explorar Produtos
        </a>
      </div>
    </div>
  )
}
