import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CEP_ORIGEM = '39800000'

const FreteInputSchema = z.object({
  cepDestino: z.string().regex(/^\d{8}$/, 'CEP deve ter exatamente 8 dígitos'),
  peso: z.number().min(1).max(30000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = FreteInputSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ erro: 'CEP inválido.' }, { status: 400 })
    }

    const { cepDestino, peso } = parsed.data
    const token = process.env.MELHOR_ENVIO_TOKEN

    if (!token) {
      return NextResponse.json({
        fretes: [
          { servico: 'pac', nome: 'PAC (Correios)', prazo: '5–8 dias úteis', preco: 18.50 },
          { servico: 'sedex', nome: 'SEDEX (Correios)', prazo: '2–4 dias úteis', preco: 32.90 },
        ]
      })
    }

    const res = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AlemDoVeu contato@alemdoveu.com.br',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        from: { postal_code: CEP_ORIGEM },
        to: { postal_code: cepDestino },
        package: {
          height: 15, width: 15, length: 15,
          weight: Math.max(0.1, peso / 1000),
        },
        services: '1,2',
      }),
    })

    const data = await res.json()

    const fretes = (Array.isArray(data) ? data : [])
      .filter((f: Record<string, unknown>) => !f.error && f.price)
      .map((f: Record<string, unknown>) => ({
        servico: String(f.id),
        nome: String(f.name),
        prazo: `${f.delivery_time} dias úteis`,
        preco: Number(f.price),
      }))

    if (fretes.length === 0) {
      return NextResponse.json(
        { erro: 'Nenhuma opção de frete disponível para este CEP.' },
        { status: 422 }
      )
    }

    return NextResponse.json({ fretes })
  } catch {
    return NextResponse.json({ erro: 'Erro interno ao calcular frete.' }, { status: 500 })
  }
}
