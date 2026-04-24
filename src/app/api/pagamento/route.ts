import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import MercadoPagoConfig, { Payment } from 'mercadopago'
import { produtosEstaticos } from '@/lib/produtos'

const ItemSchema = z.object({
  produtoId: z.string().min(1).max(50),
  quantidade: z.number().int().min(1).max(99),
})

const FreteSchema = z.object({
  servico: z.string().min(1).max(30),
  nome: z.string().min(1).max(100),
  prazo: z.string().min(1).max(50),
  preco: z.number().min(0).max(500),
})

const CompradorSchema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email(),
  telefone: z.string().min(8).max(20),
  cep: z.string().regex(/^\d{8}$/),
  rua: z.string().min(2).max(200),
  numero: z.string().min(1).max(20),
  bairro: z.string().min(2).max(100),
  cidade: z.string().min(2).max(100),
  estado: z.string().min(2).max(2),
})

const PedidoPixSchema = z.object({
  tipo: z.literal('pix'),
  itens: z.array(ItemSchema).min(1).max(20),
  frete: FreteSchema,
  comprador: CompradorSchema,
})

const PedidoCartaoSchema = z.object({
  tipo: z.literal('cartao'),
  itens: z.array(ItemSchema).min(1).max(20),
  frete: FreteSchema,
  comprador: CompradorSchema,
  cartao: z.object({
    token: z.string().min(1),
    installments: z.number().int().min(1).max(12),
    payment_method_id: z.string().min(1),
    issuer_id: z.string(),
    identificationType: z.string(),
    identificationNumber: z.string().min(3).max(20),
  }),
})

const PedidoSchema = z.discriminatedUnion('tipo', [PedidoPixSchema, PedidoCartaoSchema])

function resolverItens(itens: { produtoId: string; quantidade: number }[]) {
  const resolvidos = itens.map(item => {
    const produto = produtosEstaticos.find(p => p.id === item.produtoId)
    if (!produto || produto.estoque < item.quantidade) return null
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: item.quantidade,
      subtotal: produto.preco * item.quantidade,
    }
  })
  if (resolvidos.some(i => i === null)) return null
  return resolvidos as NonNullable<typeof resolvidos[0]>[]
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = PedidoSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ erro: 'Dados do pedido inválidos.' }, { status: 400 })
    }

    const pedido = parsed.data
    const itensValidos = resolverItens(pedido.itens)

    if (!itensValidos) {
      return NextResponse.json({ erro: 'Um ou mais produtos não estão disponíveis.' }, { status: 422 })
    }

    const totalItens = itensValidos.reduce((s, i) => s + i.subtotal, 0)
    const totalFinal = +(totalItens + pedido.frete.preco).toFixed(2)
    const token = process.env.MERCADO_PAGO_TOKEN

    // Modo preview — sem token configurado
    if (!token) {
      if (pedido.tipo === 'pix') {
        return NextResponse.json({
          pixCopiaECola: `00020126580014BR.GOV.BCB.PIX0136simulado-${Date.now()}5204000053039865406${String(totalFinal.toFixed(2)).replace('.', '')}5802BR5913Além do Véu6009TEOFILO62070503***6304ABCD`,
          total: totalFinal,
        })
      }
      return NextResponse.json({ status: 'approved', total: totalFinal })
    }

    const mp = new MercadoPagoConfig({ accessToken: token })
    const payment = new Payment(mp)
    const [firstName, ...rest] = pedido.comprador.nome.trim().split(' ')

    const basePayerInfo = {
      email: pedido.comprador.email,
      first_name: firstName,
      last_name: rest.join(' ') || firstName,
      address: {
        zip_code: pedido.comprador.cep,
        street_name: pedido.comprador.rua,
        street_number: pedido.comprador.numero,
        neighborhood: pedido.comprador.bairro,
        city: pedido.comprador.cidade,
        federal_unit: pedido.comprador.estado,
      },
    }

    const additionalInfo = {
      items: itensValidos.map(i => ({
        id: i.id, title: i.nome, quantity: i.quantidade, unit_price: i.preco,
      })),
      shipments: {
        receiver_address: {
          zip_code: pedido.comprador.cep,
          street_name: pedido.comprador.rua,
          street_number: pedido.comprador.numero,
          apartment: '',
        },
      },
    }

    const description = `Pedido Além do Véu — ${itensValidos.map(i => i.nome).join(', ')}`

    // ── PIX ──────────────────────────────────────────────────────
    if (pedido.tipo === 'pix') {
      const expiration = new Date()
      expiration.setHours(expiration.getHours() + 24)

      const result = await payment.create({
        body: {
          transaction_amount: totalFinal,
          payment_method_id: 'pix',
          date_of_expiration: expiration.toISOString(),
          payer: basePayerInfo,
          additional_info: additionalInfo,
          description,
          notification_url: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/webhook` : undefined,
        },
      })

      const pixCode = result.point_of_interaction?.transaction_data?.qr_code
      if (!pixCode) {
        return NextResponse.json({ erro: 'Não foi possível gerar o PIX. Tente novamente.' }, { status: 502 })
      }

      return NextResponse.json({ pixCopiaECola: pixCode, total: totalFinal, paymentId: result.id })
    }

    // ── CARTÃO ───────────────────────────────────────────────────
    const { cartao } = pedido

    const result = await payment.create({
      body: {
        transaction_amount: totalFinal,
        token: cartao.token,
        installments: cartao.installments,
        payment_method_id: cartao.payment_method_id,
        issuer_id: cartao.issuer_id ? Number(cartao.issuer_id) : undefined,
        payer: {
          ...basePayerInfo,
          identification: {
            type: cartao.identificationType,
            number: cartao.identificationNumber,
          },
        },
        additional_info: additionalInfo,
        description,
        notification_url: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/webhook` : undefined,
      },
    })

    if (result.status === 'approved') {
      return NextResponse.json({ status: 'approved', paymentId: result.id, total: totalFinal })
    }

    if (result.status === 'in_process' || result.status === 'pending') {
      return NextResponse.json({ status: 'in_process', paymentId: result.id, total: totalFinal })
    }

    return NextResponse.json(
      { erro: 'Pagamento recusado. Verifique os dados e tente novamente.' },
      { status: 422 }
    )
  } catch {
    return NextResponse.json({ erro: 'Erro ao processar pagamento.' }, { status: 500 })
  }
}
