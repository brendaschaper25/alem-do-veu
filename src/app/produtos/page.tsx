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
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Curadoria Completa</p>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#F0EAFF', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>
            Nossos Produtos
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#C4B5D9', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Cada item foi escolhido com intenção. O que chegou até você não foi por acaso.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="/produtos" style={{ textDecoration: 'none' }}>
            <button className={!cat ? 'btn-primary' : 'btn-outline'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.6rem' }}>
              Todos
            </button>
          </a>
          {categorias.map(c => (
            <a key={c} href={`/produtos?categoria=${c}`} style={{ textDecoration: 'none' }}>
              <button className={cat === c ? 'btn-primary' : 'btn-outline'} style={{ padding: '0.5rem 1.25rem', fontSize: '0.6rem', textTransform: 'capitalize' }}>
                {c}
              </button>
            </a>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {lista.map(p => <ProductCard key={p.id} produto={p} />)}
        </div>

        {lista.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#C4B5D9' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.2em' }}>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
