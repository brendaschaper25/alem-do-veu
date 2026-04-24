export const metadata = { title: 'Sobre | Além do Véu' }

export default function SobrePage() {
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '5rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '1rem' }}>Além do Véu</p>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#F0EAFF', fontWeight: 600, marginBottom: '1.5rem' }}>
          A marca é a porta.<br />Quem entra, não volta do mesmo jeito.
        </h1>

        <div className="linha-ouro" style={{ maxWidth: '120px', margin: '0 auto 2.5rem' }} />

        <div style={{ textAlign: 'left', fontSize: '0.88rem', color: '#C4B5D9', lineHeight: 1.95 }}>
          <p style={{ marginBottom: '1.25rem' }}>
            Existe um mundo que a maioria não vê. A Além do Véu nasceu para quem já sente isso — para quem sabe que uma vela não é apenas cera, que um cristal não é apenas pedra, que a fumaça do incenso carrega algo além do que o olho enxerga.
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            Cada produto é escolhido com intenção. Nossos cristais vêm diretamente de Teófilo Otoni — MG, a capital mundial das pedras preciosas. Nenhuma outra loja online tem esse acesso geográfico. É o nosso diferencial mais precioso.
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            Você chegou até aqui por acaso? A gente não acredita em acasos.
          </p>
        </div>

        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.5rem', color: '#C9A84C', margin: '2.5rem 0' }}>
          "Para quem sente mais do que vê."
        </p>

        <a href="/produtos" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Explorar Produtos
        </a>
      </div>
    </div>
  )
}
