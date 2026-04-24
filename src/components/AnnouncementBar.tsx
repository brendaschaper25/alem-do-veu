// ═══════════════════════════════════════════════════════════
//  EDITE AQUI para mudar o texto da faixa de promoção no topo
// ═══════════════════════════════════════════════════════════
const PROMOS = [
  '⚡ 5% de desconto no PIX',
  '🌿 Frete grátis acima de R$ 150',
  '💎 Cristais direto de Teófilo Otoni — MG',
]
// ═══════════════════════════════════════════════════════════

export default function AnnouncementBar() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
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
      {PROMOS.map((promo, i) => (
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
          {i < PROMOS.length - 1 && (
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
