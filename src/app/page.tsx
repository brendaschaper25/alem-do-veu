import Link from 'next/link'
import { Moon, ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import HeroSlider from '@/components/HeroSlider'
import { getProdutos } from '@/lib/produtos'
import { getConfiguracaoLoja, CORES_BANNER } from '@/lib/configuracao'

const categorias = [
  { slug: 'velas',    label: 'Velas',    icon: '🕯️', desc: 'Intenção e energia' },
  { slug: 'incensos', label: 'Incensos', icon: '🌿', desc: 'Purificação e calma' },
  { slug: 'cristais', label: 'Cristais', icon: '💎', desc: 'Cura e proteção' },
  { slug: 'kits',     label: 'Kits',     icon: '✨', desc: 'Rituais completos' },
]

export default async function Home() {
  const [todos, config] = await Promise.all([getProdutos(), getConfiguracaoLoja()])
  const destaques = todos.filter(p => p.destaque).slice(0, 4)
  const exibidos = destaques.length >= 2 ? destaques : todos.slice(0, 4)

  return (
    <>
      {/* ── Hero com slideshow (conteúdo via Sanity) ─────── */}
      <HeroSlider slides={config.heroSlides} />

      {/* ── Categorias ────────────────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#F8F5F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              O que você busca?
            </p>
            <h2 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1E1510' }}>
              Explore por Categoria
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {categorias.map(c => (
              <Link key={c.slug} href={`/produtos?categoria=${c.slug}`} style={{ textDecoration: 'none' }}>
                <div className="product-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.85rem' }}>{c.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.05rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.35rem' }}>
                    {c.label}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.85rem', fontWeight: 300, color: '#A89487' }}>
                    {c.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      <div className="linha-ouro" />

      {/* ── Banners Promo (via Sanity) ────────────────────── */}
      <section style={{ padding: '4rem 2rem', background: '#EFE9DF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {config.bannersPromo.map((b, i) => {
            const cor = CORES_BANNER[b.tema] ?? '#6B4E8E'
            return (
            <Link key={i} href={b.href} style={{ textDecoration: 'none' }}>
              <div className="product-card" style={{ padding: '2.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: cor }} />
                <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.48rem', fontWeight: 300, letterSpacing: '0.22em', color: cor, textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  {b.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.75rem' }}>
                  {b.titulo}
                </h3>
                <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7 }}>
                  {b.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem', color: cor }}>
                  <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Ver coleção</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
            )
          })}
        </div>

        <style>{`
          @media (max-width: 640px) {
            section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Produtos em Destaque ──────────────────────────── */}
      <section style={{ padding: '5rem 2rem', background: '#F8F5F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Curadoria
              </p>
              <h2 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#1E1510' }}>
                Produtos em Destaque
              </h2>
            </div>
            <Link href="/produtos">
              <button className="btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                Ver todos <ArrowRight size={12} />
              </button>
            </Link>
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
            { icon: '🕯️', titulo: 'Intenção em cada vela',    desc: 'Selecionados com propósito espiritual real, não por aparência' },
            { icon: '📦', titulo: 'Embalagem especial',        desc: 'Unboxing pensado para criar uma experiência que vai além do produto' },
            { icon: '🌙', titulo: 'Curadoria com propósito',   desc: 'Cada item escolhido com intenção — o que chegou até você não foi por acaso' },
          ].map(({ icon, titulo, desc }) => (
            <div key={titulo}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.95rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.5rem' }}>
                {titulo}
              </h3>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.95rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Frase ─────────────────────────────────────────── */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center', background: '#F8F5F0' }}>
        <Moon size={22} strokeWidth={1} color="#C9A84C" style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.65 }} />
        <p style={{ fontFamily: 'var(--font-script), cursive', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#1E1510', opacity: 0.75, maxWidth: '700px', margin: '0 auto', lineHeight: 1.4 }}>
          "{config.fraseDestaque}"
        </p>
        <div className="linha-ouro" style={{ maxWidth: '160px', margin: '2rem auto 0' }} />
      </section>
    </>
  )
}
