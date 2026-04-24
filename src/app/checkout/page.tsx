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
        <p style={{ fontFamily: 'Cinzel, serif', color: '#C4B5D9', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Seu carrinho está vazio.</p>
        <a href="/produtos" className="btn-outline" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>Ver Produtos</a>
      </div>
    )
  }

  const inputStyle = { background: 'rgba(61,36,100,0.3)', border: '1px solid rgba(196,181,217,0.2)', color: '#F0EAFF', fontFamily: 'Lato, sans-serif', fontSize: '0.85rem', padding: '0.65rem 1rem', width: '100%', outline: 'none', transition: 'border-color 0.2s' }
  const labelStyle = { fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase' as const, display: 'block', marginBottom: '0.4rem' }
  const totalFinal = total + (freteSelecionado?.preco ?? 0)

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#F0EAFF', letterSpacing: '0.1em', marginBottom: '2.5rem', textAlign: 'center' }}>Finalizar Pedido</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>

          {/* Formulário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Dados pessoais */}
            <div style={{ background: 'rgba(61,36,100,0.25)', border: '1px solid rgba(196,181,217,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Dados Pessoais</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[['nome', 'Nome completo'], ['email', 'E-mail'], ['telefone', 'WhatsApp']].map(([k, l]) => (
                  <div key={k} style={{ gridColumn: k === 'nome' ? '1 / -1' : 'auto' }}>
                    <label style={labelStyle}>{l}</label>
                    <input style={inputStyle} value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)} placeholder={l} />
                  </div>
                ))}
              </div>
            </div>

            {/* Endereço */}
            <div style={{ background: 'rgba(61,36,100,0.25)', border: '1px solid rgba(196,181,217,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Endereço de Entrega</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>CEP</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input style={{ ...inputStyle, flex: 1 }} value={form.cep} onChange={e => set('cep', e.target.value)} placeholder="00000-000" maxLength={9} />
                    <button onClick={calcularFrete} disabled={loadingFrete} className="btn-primary" style={{ padding: '0.65rem 1rem', fontSize: '0.6rem', whiteSpace: 'nowrap' }}>
                      {loadingFrete ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : 'Calcular'}
                    </button>
                  </div>
                </div>
                {[['rua', 'Rua'], ['numero', 'Número'], ['bairro', 'Bairro'], ['cidade', 'Cidade'], ['estado', 'UF']].map(([k, l]) => (
                  <div key={k}>
                    <label style={labelStyle}>{l}</label>
                    <input style={inputStyle} value={form[k as keyof typeof form]} onChange={e => set(k, e.target.value)} placeholder={l} />
                  </div>
                ))}
              </div>
            </div>

            {/* Frete */}
            {fretes.length > 0 && (
              <div style={{ background: 'rgba(61,36,100,0.25)', border: '1px solid rgba(196,181,217,0.1)', padding: '1.5rem' }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Opções de Frete</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {fretes.map(f => (
                    <label key={f.servico} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', border: `1px solid ${freteSelecionado?.servico === f.servico ? '#C9A84C' : 'rgba(196,181,217,0.12)'}`, cursor: 'pointer', transition: 'border-color 0.2s' }}>
                      <input type="radio" name="frete" value={f.servico} onChange={() => setFreteSelecionado(f)} style={{ accentColor: '#C9A84C' }} />
                      <span style={{ flex: 1, fontSize: '0.82rem', color: '#F0EAFF' }}>{f.nome} — {f.prazo}</span>
                      <span style={{ fontFamily: 'Cinzel, serif', color: '#C9A84C', fontSize: '0.85rem' }}>R$ {f.preco.toFixed(2).replace('.', ',')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Forma de pagamento */}
            <div style={{ background: 'rgba(61,36,100,0.25)', border: '1px solid rgba(196,181,217,0.1)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Forma de Pagamento</h2>

              {/* Abas */}
              <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', border: '1px solid rgba(196,181,217,0.15)' }}>
                {([['pix', '⚡ PIX'], ['cartao', '💳 Cartão de Crédito']] as [Aba, string][]).map(([id, label]) => (
                  <button key={id} onClick={() => setAba(id)} style={{
                    flex: 1, padding: '0.75rem', fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                    background: aba === id ? '#C9A84C' : 'transparent',
                    color: aba === id ? '#2D1B54' : '#C4B5D9',
                    fontWeight: aba === id ? 700 : 400,
                    transition: 'all 0.2s',
                  }}>
                    {label}
                  </button>
                ))}
              </div>

              {aba === 'pix' && (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: '#F0EAFF', marginBottom: '0.5rem' }}>Pague com PIX</p>
                  <p style={{ fontSize: '0.8rem', color: '#C4B5D9', lineHeight: 1.7 }}>
                    Após confirmar, você receberá o código PIX para copiar e colar no seu banco.
                    <br /><span style={{ color: '#C9A84C' }}>Aprovação imediata.</span>
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
          <div style={{ background: 'rgba(61,36,100,0.35)', border: '1px solid rgba(196,181,217,0.12)', padding: '1.5rem', position: 'sticky', top: '6rem' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.2em', color: '#F0EAFF', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Resumo</h2>

            {itens.map(({ produto, quantidade }) => (
              <div key={produto.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                <span style={{ color: '#C4B5D9' }}>{produto.nome} ×{quantidade}</span>
                <span style={{ color: '#F0EAFF' }}>R$ {(produto.preco * quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}

            <div className="linha-ouro" style={{ margin: '1rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#C4B5D9' }}>Subtotal</span>
              <span style={{ color: '#F0EAFF' }}>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              <span style={{ color: '#C4B5D9' }}>Frete</span>
              <span style={{ color: '#F0EAFF' }}>{freteSelecionado ? `R$ ${freteSelecionado.preco.toFixed(2).replace('.', ',')}` : '—'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#C9A84C' }}>
                R$ {totalFinal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {erro && <p style={{ fontSize: '0.75rem', color: '#ff6b6b', marginBottom: '1rem' }}>{erro}</p>}

            {aba === 'pix' && (
              <button onClick={finalizarPix} disabled={loadingPagamento} className="btn-primary" style={{ width: '100%', opacity: loadingPagamento ? 0.7 : 1 }}>
                {loadingPagamento ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Processando...</> : '⚡ Gerar PIX'}
              </button>
            )}

            {aba === 'cartao' && (
              <p style={{ fontSize: '0.7rem', color: '#C4B5D9', textAlign: 'center', lineHeight: 1.6 }}>
                Preencha os dados do cartão ao lado e clique em "Pagar".
              </p>
            )}

            <p style={{ fontSize: '0.65rem', color: '#C4B5D9', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.6 }}>
              Pagamento seguro via Mercado Pago
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 380px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
