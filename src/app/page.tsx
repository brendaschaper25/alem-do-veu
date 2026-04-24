import Link from 'next/link'
import { Moon } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { getProdutos } from '@/lib/produtos'

export default async function Home() {
  const todos = await getProdutos()
  const destaques = todos.filter(p => p.destaque).slice(0, 4)
  const exibidos = destaques.length >= 2 ? destaques : todos.slice(0, 4)

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', padding: '6rem 2rem 5rem',
        background: 'linear-gradient(180deg, #F8F5F0 0%, #EFE9DF 100%)',
      }}>
        {/* Ornamento de fundo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          border: '1px solid rgba(107,78,142,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px', height: '400px', borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.08)',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          {/* Lua + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }} />
            <Moon size={14} strokeWidth={1.5} color="#C9A84C" />
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#A89487', textTransform: 'uppercase' }}>
              Loja Esotérica
            </span>
            <Moon size={14} strokeWidth={1.5} color="#C9A84C" />
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }} />
          </div>

          <h1 style={{
            fontFamily: "'Bodoni Moda', Georgia, serif",
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 700,
            color: '#1E1510',
            letterSpacing: '0.06em',
            lineHeight: 1.05,
            marginBottom: '1.75rem',
          }}>
            Além do Véu
          </h1>

          <p style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            color: '#C9A84C',
            marginBottom: '1.75rem',
            lineHeight: 1.4,
          }}>
            Para quem sente mais do que vê.
          </p>

          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.1rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#7A6355',
            lineHeight: 1.8,
            maxWidth: '460px',
            margin: '0 auto 2.75rem',
          }}>
            Curadoria de velas, incensos e cristais com intenção.<br />
            Cada produto carrega uma energia — e chegou até você por um motivo.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/produtos"><button className="btn-primary">Explorar Produtos</button></Link>
            <Link href="/sobre"><button className="btn-outline">Sobre a Marca</button></Link>
          </div>
        </div>
      </section>

      <div className="linha-ouro" />

      {/* ── Destaques ── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Curadoria
          </p>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#1E1510', letterSpacing: '0.04em' }}>
            Produtos em Destaque
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {exibidos.map(p => <ProductCard key={p.id} produto={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/produtos"><button className="btn-outline">Ver Todos os Produtos</button></Link>
        </div>
      </section>

      <div className="linha-ouro" style={{ maxWidth: '800px', margin: '0 auto' }} />

      {/* ── Valores ── */}
      <section style={{ padding: '5rem 2rem', background: '#EFE9DF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          {[
            { icon: '💎', titulo: 'Cristais de Teófilo Otoni', desc: 'Capital mundial das pedras — nosso diferencial único' },
            { icon: '🕯️', titulo: 'Intenção em cada vela', desc: 'Selecionados com propósito espiritual real' },
            { icon: '📦', titulo: 'Embalagem especial', desc: 'Unboxing pensado para criar uma experiência única' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.06em', color: '#1E1510', marginBottom: '0.5rem' }}>
                {titulo}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.95rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Frase ── */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center', background: '#F8F5F0' }}>
        <Moon size={20} strokeWidth={1} color="#C9A84C" style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.7 }} />
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          color: '#1E1510',
          opacity: 0.75,
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.4,
        }}>
          "A fumaça sabe o caminho. Você só precisa seguir."
        </p>
        <div className="linha-ouro" style={{ maxWidth: '180px', margin: '2rem auto 0' }} />
      </section>
    </>
  )
}
