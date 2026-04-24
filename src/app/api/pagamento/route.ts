import { NextRequest, NextResponse } from 'next/server'
import MercadoPagoConfig, { Payment } from 'mercadopago'

interface ItemPedido { nome: string; preco: number; quantidade: number }
interface Frete { nome: string; preco: number; servico: string; prazo: string }
interface Comprador {
  nome: string; email: string; telefone: string
  cep: string; rua: string; numero: string; bairro: string; cidade: string; estado: string
}

export async function POST(req: NextRequest) {
  try {
    const { itens, frete, comprador }: { itens: ItemPedido[]; frete: Frete; comprador: Comprador } = await req.json()

    if (!itens?.length || !frete || !comprador?.email) {
      return NextResponse.json({ erro: 'Dados do pedido incompletos.' }, { status: 400 })
    }

    const token = process.env.MERCADO_PAGO_TOKEN

    // Modo preview: sem token, retorna PIX simulado
    if (!token) {
      const totalSimulado = itens.reduce((s, i) => s + i.preco * i.quantidade, 0) + frete.preco
      return NextResponse.json({
        pixCopiaECola: `00020126580014BR.GOV.BCB.PIX0136simulado-pix-alemdoveu-${Date.now()}5204000053039865406${totalSimulado.toFixed(2).replace('.', '')}5802BR5913Além do Véu6009SAO PAULO62070503***6304ABCD`,
        total: totalSimulado,
      })
    }

    const mp = new MercadoPagoConfig({ accessToken: token })
    const payment = new Payment(mp)

    const totalItens = itens.reduce((s, i) => s + i.preco * i.quantidade, 0)
    const totalFinal = +(totalItens + frete.preco).toFixed(2)

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
            zip_code: comprador.cep.replace(/\D/g, ''),
            street_name: comprador.rua,
            street_number: comprador.numero,
            neighborhood: comprador.bairro,
            city: comprador.cidade,
            federal_unit: comprador.estado,
          },
        },
        additional_info: {
          items: itens.map(i => ({
            id: i.nome.toLowerCase().replace(/\s+/g, '-'),
            title: i.nome,
            quantity: i.quantidade,
            unit_price: i.preco,
          })),
          shipments: {
            receiver_address: {
              zip_code: comprador.cep.replace(/\D/g, ''),
              street_name: comprador.rua,
              street_number: comprador.numero,
              apartment: '',
            },
          },
        },
        description: `Pedido Além do Véu — ${itens.map(i => i.nome).join(', ')}`,
        notification_url: process.env.NEXT_PUBLIC_URL
          ? `${process.env.NEXT_PUBLIC_URL}/api/webhook`
          : undefined,
      },
    })

    const pixCode = result.point_of_interaction?.transaction_data?.qr_code

    if (!pixCode) {
      return NextResponse.json({ erro: 'Não foi possível gerar o PIX. Tente novamente.' }, { status: 502 })
    }

    return NextResponse.json({ pixCopiaECola: pixCode, total: totalFinal, paymentId: result.id })
  } catch (err) {
    console.error('[pagamento]', err)
    return NextResponse.json({ erro: 'Erro ao processar pagamento.' }, { status: 500 })
  }
}
