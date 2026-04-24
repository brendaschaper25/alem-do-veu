import { notFound } from 'next/navigation'
import { getProduto, getSlugs } from '@/lib/produtos'
import AddToCartBtn from './AddToCartBtn'

export async function generateStaticParams() {
  const slugs = await getSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const produto = await getProduto(slug)
  if (!produto) return {}
  return {
    title: `${produto.nome} | Além do Véu`,
    description: produto.descricao,
  }
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const produto = await getProduto(slug)
  if (!produto) notFound()

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem', fontSize: '0.7rem', color: '#C4B5D9', letterSpacing: '0.1em' }}>
          <a href="/" style={{ color: '#C4B5D9', textDecoration: 'none' }}>Início</a>
          <span style={{ margin: '0 0.5rem', color: '#C9A84C55' }}>›</span>
          <a href="/produtos" style={{ color: '#C4B5D9', textDecoration: 'none' }}>Produtos</a>
          <span style={{ margin: '0 0.5rem', color: '#C9A84C55' }}>›</span>
          <span style={{ color: '#F0EAFF' }}>{produto.nome}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Imagem */}
          <div style={{
            aspectRatio: '1', background: 'linear-gradient(145deg, #3D2464, #2D1B54)',
            border: '1px solid rgba(196,181,217,0.12)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '5rem',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.1), transparent 70%)' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>
              {{ velas: '🕯️', incensos: '🌿', cristais: '💎', kits: '✨' }[produto.categoria] ?? '✦'}
            </span>
          </div>

          {/* Info */}
          <div>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              {produto.categoria}
            </span>
            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F0EAFF', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem', lineHeight: 1.3 }}>
              {produto.nome}
            </h1>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.1rem', color: '#C9A84C', marginBottom: '1.5rem', opacity: 0.85 }}>
              {produto.intencao}
            </p>

            <div className="linha-ouro" style={{ marginBottom: '1.5rem' }} />

            <p style={{ fontSize: '0.85rem', color: '#C4B5D9', lineHeight: 1.9, marginBottom: '2rem' }}>
              {produto.descricaoLonga}
            </p>

            {/* Detalhes */}
            <div style={{ background: 'rgba(61,36,100,0.3)', border: '1px solid rgba(196,181,217,0.1)', padding: '1rem', marginBottom: '2rem' }}>
              {[
                ['Peso', `${produto.peso}g`],
                ['Dimensões', produto.dimensoes],
                ['Estoque', produto.estoque > 0 ? `${produto.estoque} disponíveis` : 'Esgotado'],
              ].map(([label, valor]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(196,181,217,0.06)', fontSize: '0.78rem' }}>
                  <span style={{ color: '#C4B5D9', letterSpacing: '0.05em' }}>{label}</span>
                  <span style={{ color: '#F0EAFF' }}>{valor}</span>
                </div>
              ))}
            </div>

            {/* Preço e CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#C9A84C' }}>
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#C4B5D9', marginLeft: '0.5rem' }}>à vista</span>
              </div>
              <AddToCartBtn produto={produto} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  )
}
