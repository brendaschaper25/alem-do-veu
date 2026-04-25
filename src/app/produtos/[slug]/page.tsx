import { notFound } from 'next/navigation'
import { getProduto, getSlugs } from '@/lib/produtos'
import AddToCartBtn from './AddToCartBtn'
import CategoriaIcon from '@/components/CategoriaIcon'

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
    <div style={{ paddingTop: '108px', paddingBottom: '5rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem', fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.12em', color: '#A89487' }}>
          <a href="/" style={{ color: '#A89487', textDecoration: 'none', transition: 'color 0.2s' }}>Início</a>
          <span style={{ margin: '0 0.5rem', color: '#C9A84C', opacity: 0.5 }}>›</span>
          <a href="/produtos" style={{ color: '#A89487', textDecoration: 'none' }}>Produtos</a>
          <span style={{ margin: '0 0.5rem', color: '#C9A84C', opacity: 0.5 }}>›</span>
          <span style={{ color: '#1E1510' }}>{produto.nome}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Imagem */}
          <div style={{
            aspectRatio: '1',
            background: '#EFE9DF',
            border: '1px solid rgba(180,160,140,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '5rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(201,168,76,0.07), transparent 70%)' }} />
            <span style={{ position: 'relative', zIndex: 1, color: '#C9A84C', opacity: 0.75 }}>
              <CategoriaIcon categoria={produto.categoria} size={64} strokeWidth={1} />
            </span>
          </div>

          {/* Info */}
          <div>
            <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.15em', color: '#6B4E8E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              {produto.categoria}
            </span>
            <h1 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1E1510', letterSpacing: '0.03em', marginBottom: '0.5rem', lineHeight: 1.2 }}>
              {produto.nome}
            </h1>
            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', fontWeight: 300, color: '#C9A84C', marginBottom: '1.5rem', letterSpacing: '0.04em' }}>
              {produto.intencao}
            </p>

            <div className="linha-ouro" style={{ marginBottom: '1.5rem' }} />

            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.05rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.9, marginBottom: '2rem' }}>
              {produto.descricaoLonga}
            </p>

            {/* Detalhes */}
            <div style={{ background: '#F8F5F0', border: '1px solid rgba(180,160,140,0.2)', padding: '1rem', marginBottom: '2rem' }}>
              {[
                ['Peso', `${produto.peso}g`],
                ['Dimensões', produto.dimensoes],
                ['Estoque', produto.estoque > 0 ? `${produto.estoque} disponíveis` : 'Esgotado'],
              ].map(([label, valor]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(180,160,140,0.12)', fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 300, color: '#A89487', letterSpacing: '0.05em' }}>{label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 300, color: '#1E1510' }}>{valor}</span>
                </div>
              ))}
            </div>

            {/* Preço e CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '1.9rem', fontWeight: 700, color: '#1E1510' }}>
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
                <span style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.6rem', fontWeight: 300, color: '#A89487', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>à vista</span>
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
