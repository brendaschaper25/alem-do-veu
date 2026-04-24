'use client'
import { useState } from 'react'
import { useCarrinho, totalCarrinho } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

const CardPaymentBrick = dynamic(() => import('@/components/CardPaymentBrick'), { ssr: false })

interface Frete { nome: string; prazo: string; preco: number; servico: string }
type Aba = 'pix' | 'cartao'

export default function CheckoutPage() {
  const { itens, limpar } = useCarrinho()
  const router = useRouter()
  const total = totalCarrinho(itens)

  const [form, setForm] = useState({ nome: '', email: '', telefone: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' })
  const [fretes, setFretes] = useState<Frete[]>([])
  const [freteSelecionado, setFreteSelecionado] = useState<Frete | null>(null)
  const [loadingFrete, setLoadingFrete] = useState(false)
  const [loadingPagamento, setLoadingPagamento] = useState(false)
  const [erro, setErro] = useState('')
  const [aba, setAba] = useState<Aba>('pix')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function calcularFrete() {
    if (form.cep.replace(/\D/g, '').length !== 8) return
    setLoadingFrete(true)
    setErro('')
    try {
      const peso = itens.reduce((a, i) => a + i.produto.peso * i.quantidade, 0)
      const res = await fetch('/api/frete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cepDestino: form.cep.replace(/\D/g, ''), peso }),
      })
      const data = await res.json()
      if (data.fretes) setFretes(data.fretes)
      else setErro('Não foi possível calcular o frete.')
    } catch {
      setErro('Erro ao calcular frete.')
    } finally {
      setLoadingFrete(false)
    }
  }

  function validarFormulario() {
    if (!freteSelecionado) { setErro('Selecione uma opção de frete.'); return false }
    if (!form.nome || !form.email || !form.cep) { setErro('Preencha todos os campos obrigatórios.'); return false }
    return true
  }

  async function finalizarPix() {
    if (!validarFormulario()) return
    setLoadingPagamento(true)
    setErro('')
    try {
      const res = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'pix',
          itens: itens.map(i => ({ produtoId: i.produto.id, quantidade: i.quantidade })),
          frete: freteSelecionado,
          comprador: form,
        }),
      })
      const data = await res.json()
      if (data.pixCopiaECola) {
        limpar()
        router.push(`/confirmacao?tipo=pix&pix=${encodeURIComponent(data.pixCopiaECola)}&total=${(total + freteSelecionado!.preco).toFixed(2)}`)
      } else {
        setErro(data.erro ?? 'Erro ao processar pagamento.')
      }
    } catch {
      setErro('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoadingPagamento(false)
    }
  }

  async function finalizarCartao(cardData: {
    token: string; installments: number; payment_method_id: string
    issuer_id: string; payer: { email: string; identification: { type: string; number: string } }
  }) {
    if (!validarFormulario()) return
    setLoadingPagamento(true)
    setErro('')
    try {
      const res = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'cartao',
          itens: itens.map(i => ({ produtoId: i.produto.id, quantidade: i.quantidade })),
          frete: freteSelecionado,
          comprador: form,
          cartao: {
            token: cardData.token,
            installments: cardData.installments,
            payment_method_id: cardData.payment_method_id,
            issuer_id: cardData.issuer_id,
            identificationType: cardData.payer.identification.type,
            identificationNumber: cardData.payer.identification.number,
          },
        }),
      })
      const data = await res.json()
      if (data.status === 'approved') {
        limpar()
        router.push(`/confirmacao?tipo=cartao&parcelas=${cardData.installments}&total=${(total + freteSelecionado!.preco).toFixed(2)}`)
      } else if (data.status === 'in_process') {
        limpar()
        router.push(`/confirmacao?tipo=cartao&status=pendente&total=${(total + freteSelecionado!.preco).toFixed(2)}`)
      } else {
        setErro(data.erro ?? 'Pagamento recusado. Verifique os dados do cartão.')
      }
    } catch {
      setErro('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoadingPagamento(false)
    }
  }

  if (itens.length === 0) {
    return (
      <div style={{ paddingTop: '8rem', textAlign: 'center', minHeight: '100vh' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: '#A89487', letterSpacing: '0.1em', fontSize: '1rem' }}>
          Seu carrinho está vazio.
        </p>
        <a href="/produtos" className="btn-outline" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
          Ver Produtos
        </a>
      </div>
    )
  }

  const labelStyle = {
    fontFamily: "'Lato', sans-serif" as const,
    fontSize: '0.52rem',
    fontWeight: 300 as const,
    letterSpacing: '0.25em',
    color: '#A89487',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '0.4rem',
  }
  const totalFinal = total + (freteSelecionado?.preco ?? 0)

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '5rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1.7rem', fontWeight: 700, color: '#1E1510', letterSpacing: '0.06em', marginBottom: '2.5rem', textAlign: 'center' }}>
          Finalizar Pedido
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>

          {/* Formulário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Dados pessoais */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                Dados Pessoais
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[['nome', 'Nome completo'], ['email', 'E-mail'], ['telefone', 'WhatsApp']].map(([k, l]) => (
                  <div key={k} style={{ gridColumn: k === 'nome' ? '1 / -1' : 'auto' }}>
                    <label style={labelStyle}>{l}</label>
                    <input
                      className="input-marca"
                      value={form[k as keyof typeof form]}
                      onChange={e => set(k, e.target.value)}
                      placeholder={l}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Endereço */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                Endereço de Entrega
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>CEP</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      className="input-marca"
                      style={{ flex: 1 }}
                      value={form.cep}
                      onChange={e => set('cep', e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                    <button
                      onClick={calcularFrete}
                      disabled={loadingFrete}
                      className="btn-primary"
                      style={{ padding: '0.75rem 1.25rem', fontSize: '0.58rem', whiteSpace: 'nowrap' }}
                    >
                      {loadingFrete ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : 'Calcular'}
                    </button>
                  </div>
                </div>
                {[['rua', 'Rua'], ['numero', 'Número'], ['bairro', 'Bairro'], ['cidade', 'Cidade'], ['estado', 'UF']].map(([k, l]) => (
                  <div key={k}>
                    <label style={labelStyle}>{l}</label>
                    <input className="input-marca" value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)} placeholder={l} />
                  </div>
                ))}
              </div>
            </div>

            {/* Frete */}
            {fretes.length > 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1.75rem' }}>
                <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                  Opções de Frete
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {fretes.map(f => (
                    <label
                      key={f.servico}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        padding: '0.85rem 1rem',
                        border: `1px solid ${freteSelecionado?.servico === f.servico ? 'rgba(107,78,142,0.4)' : 'rgba(180,160,140,0.2)'}`,
                        background: freteSelecionado?.servico === f.servico ? 'rgba(107,78,142,0.04)' : 'transparent',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      <input type="radio" name="frete" value={f.servico} onChange={() => setFreteSelecionado(f)} style={{ accentColor: '#6B4E8E' }} />
                      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, flex: 1, fontSize: '1rem', color: '#1E1510' }}>
                        {f.nome} — {f.prazo}
                      </span>
                      <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 700, color: '#1E1510', fontSize: '0.95rem' }}>
                        R$ {f.preco.toFixed(2).replace('.', ',')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Pagamento */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                Forma de Pagamento
              </h2>

              {/* Abas */}
              <div style={{ display: 'flex', marginBottom: '1.5rem', border: '1px solid rgba(180,160,140,0.2)' }}>
                {([['pix', '⚡ PIX'], ['cartao', '💳 Cartão de Crédito']] as [Aba, string][]).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setAba(id)}
                    style={{
                      flex: 1, padding: '0.75rem',
                      fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 300,
                      letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                      background: aba === id ? '#6B4E8E' : 'transparent',
                      color: aba === id ? '#F8F5F0' : '#A89487',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {aba === 'pix' && (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <p style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>⚡</p>
                  <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 700, fontSize: '0.95rem', color: '#1E1510', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    Pague com PIX
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '1rem', color: '#7A6355', lineHeight: 1.75 }}>
                    Após confirmar, você receberá o código PIX para copiar e colar no seu banco.
                    <br /><span style={{ color: '#6B4E8E' }}>Aprovação imediata.</span>
                  </p>
                </div>
              )}

              {aba === 'cartao' && (
                <CardPaymentBrick
                  total={totalFinal}
                  email={form.email}
                  onSubmit={finalizarCartao}
                  onError={() => setErro('Erro no formulário de cartão. Tente novamente.')}
                />
              )}
            </div>
          </div>

          {/* Resumo */}
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(180,160,140,0.2)', padding: '1.75rem', position: 'sticky', top: '6rem' }}>
            <h2 style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.28em', color: '#6B4E8E', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Resumo
            </h2>

            {itens.map(({ produto, quantidade }) => (
              <div key={produto.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#7A6355' }}>
                  {produto.nome} ×{quantidade}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#1E1510' }}>
                  R$ {(produto.preco * quantidade).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}

            <div className="linha-ouro" style={{ margin: '1rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#A89487' }}>Subtotal</span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#1E1510' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#A89487' }}>Frete</span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.95rem', color: '#1E1510' }}>
                {freteSelecionado ? `R$ ${freteSelecionado.preco.toFixed(2).replace('.', ',')}` : '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.2em', color: '#A89487', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#1E1510' }}>
                R$ {totalFinal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {erro && (
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.9rem', color: '#c0392b', marginBottom: '1rem', lineHeight: 1.5 }}>
                {erro}
              </p>
            )}

            {aba === 'pix' && (
              <button
                onClick={finalizarPix}
                disabled={loadingPagamento}
                className="btn-primary"
                style={{ width: '100%', opacity: loadingPagamento ? 0.7 : 1 }}
              >
                {loadingPagamento
                  ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Processando...</>
                  : '⚡ Gerar PIX'}
              </button>
            )}

            {aba === 'cartao' && (
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '0.9rem', color: '#A89487', textAlign: 'center', lineHeight: 1.6 }}>
                Preencha os dados do cartão ao lado e clique em "Pagar".
              </p>
            )}

            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.1em', color: '#A89487', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Pagamento seguro via Mercado Pago
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 360px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
