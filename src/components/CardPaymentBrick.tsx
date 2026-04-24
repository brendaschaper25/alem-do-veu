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
      <div style={{ padding: '1.5rem', background: 'rgba(61,36,100,0.2)', border: '1px solid rgba(196,181,217,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: '#C4B5D9' }}>
          Configure <code style={{ color: '#C9A84C' }}>NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY</code> para ativar cartão.
        </p>
      </div>
    )
  }

  if (!ready) return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#C4B5D9', fontSize: '0.8rem' }}>
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
              theme: 'dark',
              customVariables: {
                baseColor: '#C9A84C',
                baseColorFirstVariant: '#7C5BA8',
                baseColorSecondVariant: '#3D2464',
                errorColor: '#ff6b6b',
                textPrimaryColor: '#F0EAFF',
                textSecondaryColor: '#C4B5D9',
                inputBackgroundColor: 'rgba(61,36,100,0.3)',
                formBackgroundColor: 'transparent',
                inputFocusedBorderColor: '#C9A84C',
              },
            },
          },
        }}
      />
      <p style={{ fontSize: '0.65rem', color: '#C4B5D9', textAlign: 'center', marginTop: '0.5rem', lineHeight: 1.6 }}>
        Pagamento seguro via Mercado Pago · Dados criptografados
      </p>
    </>
  )
}
