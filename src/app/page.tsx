import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProdutos } from '@/lib/produtos'

export default async function Home() {
  const todos = await getProdutos()
  const destaques = todos.filter(p => p.destaque).slice(0, 4)
  const exibidos = destaques.length >= 2 ? destaques : todos.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
        padding: '6rem 2rem 4rem',
      }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,91,168,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(196,181,217,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', borderRadius: '50%', border: '1px solid rgba(196,181,217,0.04)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #C9A84C88)' }} />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase' }}>Loja Esotérica</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #C9A84C88, transparent)' }} />
          </div>

          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, color: '#F0EAFF', letterSpacing: '0.06em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Além do Véu
          </h1>
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#C9A84C', marginBottom: '1.5rem' }}>
            Para quem sente mais do que vê.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#C4B5D9', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            Curadoria de velas, incensos e cristais com intenção. Cada produto carrega uma energia — e chegou até você por um motivo.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/produtos"><button className="btn-primary">Explorar Produtos</button></Link>
            <Link href="/sobre"><button className="btn-outline">Sobre a Marca</button></Link>
          </div>
        </div>
      </section>

      <div className="linha-ouro" style={{ margin: '0 2rem' }} />

      {/* Destaques */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Curadoria</p>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F0EAFF', fontWeight: 600 }}>Produtos em Destaque</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {exibidos.map(p => <ProductCard key={p.id} produto={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/produtos"><button className="btn-outline">Ver Todos os Produtos</button></Link>
        </div>
      </section>

      {/* Valores */}
      <section style={{ padding: '4rem 2rem', borderTop: '1px solid rgba(196,181,217,0.08)', borderBottom: '1px solid rgba(196,181,217,0.08)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          {[
            { icon: '💎', titulo: 'Cristais de Teófilo Otoni', desc: 'Capital mundial das pedras — nosso diferencial único' },
            { icon: '🕯️', titulo: 'Intenção em cada vela', desc: 'Selecionados com propósito espiritual real' },
            { icon: '📦', titulo: 'Embalagem especial', desc: 'Unboxing pensado para criar uma experiência única' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#F0EAFF', marginBottom: '0.5rem' }}>{titulo}</h3>
              <p style={{ fontSize: '0.8rem', color: '#C4B5D9', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frase */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#C9A84C', opacity: 0.85 }}>
          "A fumaça sabe o caminho. Você só precisa seguir."
        </p>
        <div className="linha-ouro" style={{ maxWidth: '200px', margin: '1.5rem auto 0' }} />
      </section>
    </>
  )
}
