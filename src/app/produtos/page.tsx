import ProductCard from '@/components/ProductCard'
import { getProdutos, categorias } from '@/lib/produtos'

export const metadata = {
  title: 'Produtos | Além do Véu',
  description: 'Velas, incensos e cristais com curadoria e propósito espiritual.',
}

export default async function ProdutosPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria: cat } = await searchParams
  const todos = await getProdutos()
  const lista = cat ? todos.filter(p => p.categoria === cat) : todos

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '5rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.38em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Curadoria Completa
          </p>
          <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#1E1510', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Nossos Produtos
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem', fontWeight: 300, fontStyle: 'italic', color: '#7A6355', maxWidth: '460px', margin: '0 auto', lineHeight: 1.8 }}>
            Cada item foi escolhido com intenção. O que chegou até você não foi por acaso.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="/produtos" style={{ textDecoration: 'none' }}>
            <button className={!cat ? 'btn-primary' : 'btn-outline'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.58rem' }}>
              Todos
            </button>
          </a>
          {categorias.map(c => (
            <a key={c} href={`/produtos?categoria=${c}`} style={{ textDecoration: 'none' }}>
              <button className={cat === c ? 'btn-primary' : 'btn-outline'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.58rem', textTransform: 'capitalize' }}>
                {c}
              </button>
            </a>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {lista.map(p => <ProductCard key={p.id} produto={p} />)}
        </div>

        {lista.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#A89487' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 300, letterSpacing: '0.1em' }}>
              Nenhum produto encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
