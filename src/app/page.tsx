import Link from 'next/link'
import { Moon, Sparkles, ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { getProdutos } from '@/lib/produtos'

// ── EDITE AQUI: conteúdo do hero promocional ──────────────
const HERO = {
  badge: 'Nova coleção',
  titulo: 'Rituais que\ntransformam',
  subtitulo: 'Descubra nossa curadoria de velas, incensos e cristais com intenção.',
  cta1: { label: 'Ver Produtos', href: '/produtos' },
  cta2: { label: 'Sobre a Marca', href: '/sobre' },
  destaquePix: '5% de desconto no PIX',
}

// ── EDITE AQUI: banners de promoção (até 2) ───────────────
const BANNERS = [
  {
    tag: 'Destaque da semana',
    titulo: 'Cristais de Teófilo Otoni',
    desc: 'Direto da capital mundial das pedras preciosas — autenticidade garantida.',
    href: '/produtos?categoria=cristais',
    cor: '#6B4E8E',
  },
  {
    tag: 'Kit especial',
    titulo: 'Kit Ritual Completo',
    desc: 'Vela + incenso + cristal selecionados para cada intenção.',
    href: '/produtos?categoria=kits',
    cor: '#C9A84C',
  },
]
// ─────────────────────────────────────────────────────────

const categorias = [
  { slug: 'velas',    label: 'Velas',    icon: '🕯️', desc: 'Intenção e energia' },
  { slug: 'incensos', label: 'Incensos', icon: '🌿', desc: 'Purificação e calma' },
  { slug: 'cristais', label: 'Cristais', icon: '💎', desc: 'Cura e proteção' },
  { slug: 'kits',     label: 'Kits',     icon: '✨', desc: 'Rituais completos' },
]

export default async function Home() {
  const todos = await getProdutos()
  const destaques = todos.filter(p => p.destaque).slice(0, 4)
  const exibidos = destaques.length >= 2 ? destaques : todos.slice(0, 4)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        paddingTop: '108px', /* bar(36) + nav(72) */
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #F8F5F0 55%, #EFE9DF 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ornamentos */}
        <div style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(107,78,142,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', width: '420px', height: '420px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.08)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Texto */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(107,78,142,0.08)', border: '1px solid rgba(107,78,142,0.15)', padding: '0.35rem 0.85rem', marginBottom: '2rem' }}>
              <Sparkles size={11} color="#6B4E8E" />
              <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.3em', color: '#6B4E8E', textTransform: 'uppercase' }}>
                {HERO.badge}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 700, color: '#1E1510', lineHeight: 1.08, letterSpacing: '0.03em', marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
              {HERO.titulo}
            </h1>

            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem', fontWeight: 300, fontStyle: 'italic', color: '#7A6355', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '420px' }}>
              {HERO.subtitulo}
            </p>

            {/* PIX badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1E1510', padding: '0.4rem 0.9rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.18em', color: '#C9A84C', textTransform: 'uppercase' }}>
                ⚡ {HERO.destaquePix}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href={HERO.cta1.href}><button className="btn-primary" style={{ gap: '0.6rem' }}>{HERO.cta1.label} <ArrowRight size={13} /></button></Link>
              <Link href={HERO.cta2.href}><button className="btn-outline">{HERO.cta2.label}</button></Link>
            </div>
          </div>

          {/* Área de foto — adicione sua imagem aqui via Sanity */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/5',
              background: '#EFE9DF',
              border: '1px solid rgba(180,160,140,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              maxHeight: '520px',
            }}>
              <Moon size={40} strokeWidth={1} color="#C9A84C" style={{ opacity: 0.5 }} />
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', fontWeight: 300, color: '#A89487', textAlign: 'center', lineHeight: 1.6, padding: '0 2rem' }}>
                Adicione uma foto do produto aqui<br />
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>via Sanity → Produto → Imagem</span>
              </p>
            </div>
            {/* Badge flutuante */}
            <div style={{ position: 'absolute', bottom: '24px', left: '-24px', background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1rem 1.25rem', boxShadow: '0 8px 24px rgba(30,21,16,0.06)' }}>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.25em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Autenticidade</p>
              <p style={{ fontFamily: 'var(--font-bodoni)', fontSize: '0.9rem', fontWeight: 700, color: '#1E1510' }}>Teófilo Otoni</p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Categorias ────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#F8F5F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>O que você busca?</p>
            <h2 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1E1510' }}>Explore por Categoria</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {categorias.map(c => (
              <Link key={c.slug} href={`/produtos?categoria=${c.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.18)', padding: '2rem 1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.25s' }} className="product-card">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{c.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.05rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.4rem' }}>{c.label}</h3>
                  <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.85rem', fontWeight: 300, color: '#A89487' }}>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <style>{`
            @media (max-width: 640px) {
              div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      <div className="linha-ouro" />

      {/* ── Banners Promo ─────────────────────────────────── */}
      <section style={{ padding: '4rem 2rem', background: '#EFE9DF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {BANNERS.map((b, i) => (
            <Link key={i} href={b.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#FFFFFF', border: `1px solid rgba(180,160,140,0.18)`, padding: '2.5rem', cursor: 'pointer', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }} className="product-card">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: b.cor }} />
                <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.3em', color: b.cor, textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  {b.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.75rem' }}>
                  {b.titulo}
                </h3>
                <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7 }}>
                  {b.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem', color: b.cor }}>
                  <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Ver coleção</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
          <style>{`
            @media (max-width: 640px) {
              section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ── Produtos em Destaque ──────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#F8F5F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Curadoria</p>
              <h2 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#1E1510' }}>Produtos em Destaque</h2>
            </div>
            <Link href="/produtos"><button className="btn-outline" style={{ padding: '0.6rem 1.5rem' }}>Ver todos <ArrowRight size={12} /></button></Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {exibidos.map(p => <ProductCard key={p.id} produto={p} />)}
          </div>
        </div>
      </section>

      {/* ── Valores ───────────────────────────────────────── */}
      <section style={{ padding: '4rem 2rem', background: '#EFE9DF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          {[
            { icon: '💎', titulo: 'Cristais de Teófilo Otoni', desc: 'Capital mundial das pedras — autenticidade garantida em cada pedra' },
            { icon: '🕯️', titulo: 'Intenção em cada vela', desc: 'Selecionados com propósito espiritual real, não por aparência' },
            { icon: '📦', titulo: 'Embalagem especial', desc: 'Unboxing pensado para criar uma experiência que vai além do produto' },
            { icon: '🌙', titulo: 'Curadoria com propósito', desc: 'Cada item escolhido com intenção — o que chegou até você não foi por acaso' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.95rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.5rem' }}>{titulo}</h3>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.95rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Frase ─────────────────────────────────────────── */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center', background: '#F8F5F0' }}>
        <Moon size={22} strokeWidth={1} color="#C9A84C" style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.65 }} />
        <p style={{ fontFamily: 'var(--font-script), cursive', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#1E1510', opacity: 0.75, maxWidth: '700px', margin: '0 auto', lineHeight: 1.4 }}>
          "A fumaça sabe o caminho. Você só precisa seguir."
        </p>
        <div className="linha-ouro" style={{ maxWidth: '160px', margin: '2rem auto 0' }} />
      </section>
    </>
  )
}
