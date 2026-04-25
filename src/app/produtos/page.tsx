import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import { getProdutos } from '@/lib/produtos'
import type { Produto } from '@/lib/produtos'

export const metadata = {
  title: 'Produtos | Além do Véu',
  description: 'Velas, incensos e cristais com curadoria e propósito espiritual.',
}

function applyFaixa(lista: Produto[], faixa?: string): Produto[] {
  if (!faixa) return lista
  if (faixa === 'ate30')    return lista.filter(p => p.preco <= 30)
  if (faixa === '30a80')    return lista.filter(p => p.preco > 30 && p.preco <= 80)
  if (faixa === '80a150')   return lista.filter(p => p.preco > 80 && p.preco <= 150)
  if (faixa === 'acima150') return lista.filter(p => p.preco > 150)
  return lista
}

function applyOrdem(lista: Produto[], ordem?: string): Produto[] {
  if (ordem === 'menor') return [...lista].sort((a, b) => a.preco - b.preco)
  if (ordem === 'maior') return [...lista].sort((a, b) => b.preco - a.preco)
  return lista
}

type SearchParams = Promise<{ categoria?: string; faixa?: string; ordem?: string }>

export default async function ProdutosPage({ searchParams }: { searchParams: SearchParams }) {
  const { categoria, faixa, ordem } = await searchParams
  const todos = await getProdutos()

  let lista = categoria ? todos.filter(p => p.categoria === categoria) : todos
  lista = applyFaixa(lista, faixa)
  lista = applyOrdem(lista, ordem)

  return (
    <div style={{ paddingTop: '108px', paddingBottom: '5rem', minHeight: '100vh', background: '#F8F5F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Cabeçalho ── */}
        <div style={{ textAlign: 'center', padding: '3rem 0 2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Curadoria Completa
          </p>
          <h1 style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#1E1510', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Nossos Produtos
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.05rem', fontWeight: 300, color: '#7A6355', maxWidth: '460px', margin: '0 auto', lineHeight: 1.8 }}>
            Cada item foi escolhido com intenção. O que chegou até você não foi por acaso.
          </p>
        </div>

        {/* ── Layout: sidebar + grid ── */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <ProductFilters
            categoriaAtiva={categoria}
            faixaAtiva={faixa}
            ordemAtiva={ordem}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            {lista.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem', color: '#A89487' }}>
                <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', fontWeight: 300, letterSpacing: '0.1em' }}>
                  Nenhum produto encontrado para este filtro.
                </p>
                <a href="/produtos" style={{ display: 'inline-block', marginTop: '1.5rem', fontFamily: 'var(--font-lato)', fontSize: '0.58rem', color: '#6B4E8E', letterSpacing: '0.18em', textDecoration: 'none' }}>
                  Ver todos os produtos
                </a>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-lato)', fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.12em', color: '#A89487', marginBottom: '1.25rem' }}>
                  {lista.length} {lista.length === 1 ? 'produto' : 'produtos'}
                  {categoria ? ` em ${categoria}` : ''}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {lista.map(p => <ProductCard key={p.id} produto={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          aside { display: none !important; }
        }
      `}</style>
    </div>
  )
}
