// ── ProductFilters — sidebar de filtros (server component) ────────────────
// Renderiza links <a> que atualizam a URL. Nenhum JS client-side necessário.

interface Props {
  categoriaAtiva?: string
  faixaAtiva?: string
  ordemAtiva?: string
}

const cats = [
  { slug: 'velas',    label: 'Velas',    icon: '🕯️' },
  { slug: 'incensos', label: 'Incensos', icon: '🌿' },
  { slug: 'cristais', label: 'Cristais', icon: '💎' },
  { slug: 'kits',     label: 'Kits',     icon: '✨' },
]

const faixas = [
  { slug: 'ate30',     label: 'Até R$ 30' },
  { slug: '30a80',     label: 'R$ 30 – R$ 80' },
  { slug: '80a150',    label: 'R$ 80 – R$ 150' },
  { slug: 'acima150',  label: 'Acima de R$ 150' },
]

const ordens = [
  { slug: 'relevancia', label: 'Relevância' },
  { slug: 'menor',      label: 'Menor preço' },
  { slug: 'maior',      label: 'Maior preço' },
]

function buildHref(base: Record<string, string | undefined>, key: string, value: string) {
  const params = new URLSearchParams()
  Object.entries({ ...base, [key]: value }).forEach(([k, v]) => {
    if (v) params.set(k, v)
  })
  return `/produtos?${params.toString()}`
}

function clearHref(base: Record<string, string | undefined>, key: string) {
  const params = new URLSearchParams()
  Object.entries(base).forEach(([k, v]) => {
    if (v && k !== key) params.set(k, v)
  })
  const qs = params.toString()
  return `/produtos${qs ? `?${qs}` : ''}`
}

const linkBase: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-lato), system-ui, sans-serif',
  fontSize: '0.62rem',
  fontWeight: 300,
  letterSpacing: '0.12em',
  textDecoration: 'none',
  padding: '0.45rem 0.75rem',
  borderRadius: '2px',
  transition: 'background 0.18s, color 0.18s',
  color: '#7A6355',
}

const linkActive: React.CSSProperties = {
  ...linkBase,
  background: 'rgba(107,78,142,0.08)',
  color: '#6B4E8E',
  fontWeight: 400,
}

export default function ProductFilters({ categoriaAtiva, faixaAtiva, ordemAtiva }: Props) {
  const base = { categoria: categoriaAtiva, faixa: faixaAtiva, ordem: ordemAtiva }
  const temFiltro = categoriaAtiva || faixaAtiva || ordemAtiva

  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      background: '#FFFFFF',
      border: '1px solid rgba(180,160,140,0.18)',
      padding: '1.5rem',
      alignSelf: 'flex-start',
      position: 'sticky',
      top: '120px',
    }}>

      {/* Título + limpar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase' }}>
          Filtros
        </span>
        {temFiltro && (
          <a href="/produtos" style={{ fontFamily: 'var(--font-lato)', fontSize: '0.52rem', color: '#A89487', textDecoration: 'none', letterSpacing: '0.08em' }}>
            Limpar
          </a>
        )}
      </div>

      {/* ── Categoria ────────────────────────────── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.72rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.12em', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          Categoria
        </p>

        <a href={clearHref(base, 'categoria')}
           style={!categoriaAtiva ? linkActive : linkBase}>
          Todos
        </a>

        {cats.map(c => (
          <a key={c.slug}
             href={buildHref(base, 'categoria', c.slug)}
             style={categoriaAtiva === c.slug ? linkActive : linkBase}>
            {c.icon} {c.label}
          </a>
        ))}
      </div>

      <div style={{ height: '1px', background: 'rgba(180,160,140,0.15)', marginBottom: '1.5rem' }} />

      {/* ── Faixa de Preço ───────────────────────── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.72rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.12em', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          Faixa de Preço
        </p>

        <a href={clearHref(base, 'faixa')}
           style={!faixaAtiva ? linkActive : linkBase}>
          Qualquer preço
        </a>

        {faixas.map(f => (
          <a key={f.slug}
             href={buildHref(base, 'faixa', f.slug)}
             style={faixaAtiva === f.slug ? linkActive : linkBase}>
            {f.label}
          </a>
        ))}
      </div>

      <div style={{ height: '1px', background: 'rgba(180,160,140,0.15)', marginBottom: '1.5rem' }} />

      {/* ── Ordenar ──────────────────────────────── */}
      <div>
        <p style={{ fontFamily: 'var(--font-bodoni), Georgia, serif', fontSize: '0.72rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.12em', marginBottom: '0.65rem', textTransform: 'uppercase' }}>
          Ordenar
        </p>

        {ordens.map(o => (
          <a key={o.slug}
             href={buildHref(base, 'ordem', o.slug)}
             style={ordemAtiva === o.slug ? linkActive : linkBase}>
            {o.label}
          </a>
        ))}
      </div>
    </aside>
  )
}
