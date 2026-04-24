'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Copy } from 'lucide-react'
import { useState } from 'react'

function ConfirmacaoContent() {
  const params = useSearchParams()
  const pix = params.get('pix') ?? ''
  const total = params.get('total') ?? '0,00'
  const [copiado, setCopiado] = useState(false)

  function copiarPix() {
    navigator.clipboard.writeText(pix)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%', padding: '0 2rem', textAlign: 'center' }}>

        <div style={{ marginBottom: '1.5rem' }}>
          <CheckCircle size={48} strokeWidth={1} color="#C9A84C" />
        </div>

        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#F0EAFF', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          Pedido Recebido
        </h1>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.3rem', color: '#C9A84C', marginBottom: '2rem' }}>
          O que chegou até você não foi por acaso.
        </p>

        <div style={{ background: 'rgba(61,36,100,0.4)', border: '1px solid rgba(201,168,76,0.2)', padding: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total a pagar</p>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#F0EAFF', marginBottom: '1.5rem' }}>
            R$ {total.replace('.', ',')}
          </p>

          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C4B5D9', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Pix Copia e Cola
          </p>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', marginBottom: '1rem', wordBreak: 'break-all', fontSize: '0.7rem', color: '#E0D3F5', fontFamily: 'monospace', textAlign: 'left', maxHeight: '80px', overflow: 'hidden' }}>
            {pix || 'Chave PIX não disponível'}
          </div>

          <button onClick={copiarPix} className="btn-primary" style={{ width: '100%', gap: '0.5rem' }}>
            <Copy size={14} />
            {copiado ? 'Copiado!' : 'Copiar código PIX'}
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#C4B5D9', lineHeight: 1.8, marginBottom: '2rem' }}>
          <p>1. Abra o app do seu banco</p>
          <p>2. Escolha pagar com PIX → Copia e Cola</p>
          <p>3. Cole o código acima e confirme</p>
          <p style={{ marginTop: '0.75rem', color: '#C9A84C', fontSize: '0.75rem' }}>
            Após confirmação, você receberá um e-mail com os dados de rastreio.
          </p>
        </div>

        <a href="/produtos" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Continuar Comprando
        </a>
      </div>
    </div>
  )
}

export default function ConfirmacaoPage() {
  return (
    <Suspense>
      <ConfirmacaoContent />
    </Suspense>
  )
}
