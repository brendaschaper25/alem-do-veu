'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Clock, Copy } from 'lucide-react'
import { useState } from 'react'

function ConfirmacaoContent() {
  const params = useSearchParams()
  const tipo = params.get('tipo') ?? 'pix'
  const pix = params.get('pix') ?? ''
  const total = params.get('total') ?? '0,00'
  const parcelas = params.get('parcelas') ?? '1'
  const status = params.get('status') ?? 'aprovado'
  const [copiado, setCopiado] = useState(false)

  function copiarPix() {
    navigator.clipboard.writeText(pix)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  const totalFormatado = `R$ ${total.replace('.', ',')}`

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%', padding: '0 2rem', textAlign: 'center' }}>

        <div style={{ marginBottom: '1.5rem' }}>
          {status === 'pendente'
            ? <Clock size={48} strokeWidth={1} color="#C9A84C" />
            : <CheckCircle size={48} strokeWidth={1} color="#6B4E8E" />
          }
        </div>

        <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
          {status === 'pendente' ? 'Pedido em Análise' : 'Pedido Recebido'}
        </h1>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.4rem', color: '#C9A84C', marginBottom: '2rem' }}>
          O que chegou até você não foi por acaso.
        </p>

        {/* PIX */}
        {tipo === 'pix' && (
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '2rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.32em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total a pagar</p>
            <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1E1510', marginBottom: '1.5rem' }}>
              {totalFormatado}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.22em', color: '#A89487', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Pix Copia e Cola
            </p>
            <div style={{ background: '#F8F5F0', border: '1px solid rgba(180,160,140,0.2)', padding: '1rem', marginBottom: '1rem', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.7rem', color: '#7A6355', textAlign: 'left', maxHeight: '80px', overflow: 'hidden' }}>
              {pix || 'Chave PIX não disponível'}
            </div>
            <button onClick={copiarPix} className="btn-primary" style={{ width: '100%', gap: '0.5rem' }}>
              <Copy size={14} />
              {copiado ? 'Copiado!' : 'Copiar código PIX'}
            </button>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 300, color: '#7A6355', lineHeight: 1.9, marginTop: '1.5rem', textAlign: 'left' }}>
              <p>1. Abra o app do seu banco</p>
              <p>2. Escolha pagar com PIX → Copia e Cola</p>
              <p>3. Cole o código acima e confirme</p>
            </div>
            <p style={{ marginTop: '1rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: '#6B4E8E', fontSize: '0.9rem' }}>
              Após confirmação, você receberá um e-mail com os dados de rastreio.
            </p>
          </div>
        )}

        {/* CARTÃO APROVADO */}
        {tipo === 'cartao' && status !== 'pendente' && (
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '2rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.32em', color: '#6B4E8E', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pagamento aprovado</p>
            <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1E1510', marginBottom: '0.5rem' }}>
              {totalFormatado}
            </p>
            {Number(parcelas) > 1 && (
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#7A6355', marginBottom: '1rem' }}>
                em {parcelas}x no cartão de crédito
              </p>
            )}
            <div style={{ background: '#F8F5F0', border: '1px solid rgba(107,78,142,0.12)', padding: '1rem', marginTop: '1rem' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#7A6355', lineHeight: 1.9 }}>
                ✅ Pagamento confirmado<br />
                📦 Seu pedido será preparado em até 1 dia útil<br />
                📧 Você receberá um e-mail com o rastreio
              </p>
            </div>
          </div>
        )}

        {/* CARTÃO EM ANÁLISE */}
        {tipo === 'cartao' && status === 'pendente' && (
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '2rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.52rem', fontWeight: 300, letterSpacing: '0.32em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Aguardando confirmação</p>
            <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '2rem', fontWeight: 700, color: '#1E1510', marginBottom: '1rem' }}>
              {totalFormatado}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '1rem', color: '#7A6355', lineHeight: 1.8 }}>
              Seu pagamento está sendo analisado pela operadora do cartão. Isso pode levar alguns minutos. Você receberá um e-mail assim que for confirmado.
            </p>
          </div>
        )}

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
