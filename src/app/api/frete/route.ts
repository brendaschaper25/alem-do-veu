import { NextRequest, NextResponse } from 'next/server'

const CEP_ORIGEM = '39800000' // Teófilo Otoni - MG

export async function POST(req: NextRequest) {
  try {
    const { cepDestino, peso } = await req.json()

    if (!cepDestino || cepDestino.length !== 8) {
      return NextResponse.json({ erro: 'CEP inválido' }, { status: 400 })
    }

    const token = process.env.MELHOR_ENVIO_TOKEN

    // Se não há token configurado, retorna fretes simulados para preview
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
        services: '1,2', // PAC e SEDEX
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
      return NextResponse.json({ erro: 'Nenhuma opção de frete disponível para este CEP.' }, { status: 422 })
    }

    return NextResponse.json({ fretes })
  } catch {
    return NextResponse.json({ erro: 'Erro interno ao calcular frete.' }, { status: 500 })
  }
}
