'use client'
import { useEffect, useState } from 'react'
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'

interface CardSubmitData {
  token: string
  installments: number
  payment_method_id: string
  issuer_id: string
  payer: { email: string; identification: { type: string; number: string } }
}

interface Props {
  total: number
  email: string
  onSubmit: (data: CardSubmitData) => Promise<void>
  onError?: (err: unknown) => void
}

export default function CardPaymentBrick({ total, email, onSubmit, onError }: Props) {
  const [ready, setReady] = useState(false)
  const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY ?? ''

  useEffect(() => {
    if (!publicKey) return
    initMercadoPago(publicKey, { locale: 'pt-BR' })
    setReady(true)
  }, [publicKey])

  if (!publicKey) {
    return (
      <div style={{ padding: '1.5rem', background: '#F8F5F0', border: '1px solid rgba(180,160,140,0.2)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, fontSize: '0.9rem', color: '#A89487' }}>
          Configure <code style={{ color: '#6B4E8E', fontFamily: 'monospace' }}>NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY</code> para ativar cartão.
        </p>
      </div>
    )
  }

  if (!ready) return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, color: '#A89487', fontSize: '0.9rem' }}>
      Carregando formulário...
    </div>
  )

  return (
    <>
      <CardPayment
        initialization={{ amount: total, payer: { email } }}
        onSubmit={async (data) => { await onSubmit(data as unknown as CardSubmitData) }}
        onError={onError}
        customization={{
          paymentMethods: { maxInstallments: 12 },
          visual: {
            style: {
              theme: 'default',
              customVariables: {
                baseColor: '#6B4E8E',
                baseColorFirstVariant: '#543D72',
                baseColorSecondVariant: '#EFE9DF',
                errorColor: '#c0392b',
                textPrimaryColor: '#1E1510',
                textSecondaryColor: '#7A6355',
                inputBackgroundColor: '#FFFFFF',
                formBackgroundColor: 'transparent',
                inputFocusedBorderColor: '#6B4E8E',
              },
            },
          },
        }}
      />
      <p style={{ fontFamily: 'var(--font-lato), system-ui, sans-serif', fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.1em', color: '#A89487', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.6 }}>
        Pagamento seguro via Mercado Pago · Dados criptografados
      </p>
    </>
  )
}
