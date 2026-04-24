import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import MercadoPagoConfig, { Payment } from 'mercadopago'
import { produtos } from '@/lib/produtos'

// Validação Zod — só aceita o que esperamos, sem preço vindo do cliente
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

const PedidoSchema = z.object({
  itens: z.array(ItemSchema).min(1).max(20),
  frete: FreteSchema,
  comprador: CompradorSchema,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Valida estrutura do body
    const parsed = PedidoSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { erro: 'Dados do pedido inválidos.' },
        { status: 400 }
      )
    }

    const { itens, frete, comprador } = parsed.data

    // Busca preços no servidor — nunca usa preço enviado pelo cliente
    const itensComPreco = itens.map(item => {
      const produto = produtos.find(p => p.id === item.produtoId)
      if (!produto) return null
      if (produto.estoque < item.quantidade) return null
      return {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco, // ← fonte confiável: servidor
        quantidade: item.quantidade,
        subtotal: produto.preco * item.quantidade,
      }
    })

    if (itensComPreco.some(i => i === null)) {
      return NextResponse.json(
        { erro: 'Um ou mais produtos não estão disponíveis.' },
        { status: 422 }
      )
    }

    const itensValidos = itensComPreco as NonNullable<typeof itensComPreco[0]>[]
    const totalItens = itensValidos.reduce((s, i) => s + i.subtotal, 0)
    const totalFinal = +(totalItens + frete.preco).toFixed(2)

    const token = process.env.MERCADO_PAGO_TOKEN

    // Modo preview sem token
    if (!token) {
      return NextResponse.json({
        pixCopiaECola: `00020126580014BR.GOV.BCB.PIX0136simulado-pix-alemdoveu-${Date.now()}5204000053039865406${String(totalFinal.toFixed(2)).replace('.', '')}5802BR5913Além do Véu6009TEOFILO62070503***6304ABCD`,
        total: totalFinal,
      })
    }

    const mp = new MercadoPagoConfig({ accessToken: token })
    const payment = new Payment(mp)

    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 24)

    const [firstName, ...rest] = comprador.nome.trim().split(' ')

    const result = await payment.create({
      body: {
        transaction_amount: totalFinal,
        payment_method_id: 'pix',
        date_of_expiration: expiration.toISOString(),
        payer: {
          email: comprador.email,
          first_name: firstName,
          last_name: rest.join(' ') || firstName,
          address: {
            zip_code: comprador.cep,
            street_name: comprador.rua,
            street_number: comprador.numero,
            neighborhood: comprador.bairro,
            city: comprador.cidade,
            federal_unit: comprador.estado,
          },
        },
        additional_info: {
          items: itensValidos.map(i => ({
            id: i.id,
            title: i.nome,
            quantity: i.quantidade,
            unit_price: i.preco,
          })),
          shipments: {
            receiver_address: {
              zip_code: comprador.cep,
              street_name: comprador.rua,
              street_number: comprador.numero,
              apartment: '',
            },
          },
        },
        description: `Pedido Além do Véu — ${itensValidos.map(i => i.nome).join(', ')}`,
        notification_url: process.env.NEXT_PUBLIC_URL
          ? `${process.env.NEXT_PUBLIC_URL}/api/webhook`
          : undefined,
      },
    })

    const pixCode = result.point_of_interaction?.transaction_data?.qr_code

    if (!pixCode) {
      return NextResponse.json(
        { erro: 'Não foi possível gerar o PIX. Tente novamente.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ pixCopiaECola: pixCode, total: totalFinal, paymentId: result.id })
  } catch {
    return NextResponse.json({ erro: 'Erro ao processar pagamento.' }, { status: 500 })
  }
}
