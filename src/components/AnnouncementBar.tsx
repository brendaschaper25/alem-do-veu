// Conteúdo gerenciado via Sanity → Configuração da Loja → Faixa de Anúncio

interface Props {
  promos: string[]
}

export default function AnnouncementBar({ promos }: Props) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 110,
      height: '36px',
      background: '#1E1510',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '0 1rem',
      overflow: 'hidden',
    }}>
      {promos.map((promo, i) => (
        <span key={i} style={{
          fontFamily: 'var(--font-lato), system-ui, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 300,
          letterSpacing: '0.14em',
          color: '#F8F5F0',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          {promo}
          {i < promos.length - 1 && (
            <span style={{ color: '#C9A84C', marginLeft: '2rem', opacity: 0.5 }}>·</span>
          )}
        </span>
      ))}

      <style>{`
        @media (max-width: 768px) {
          div[style*="position: fixed"][style*="height: 36px"] > span:not(:first-child) { display: none !important; }
        }
      `}</style>
    </div>
  )
}
