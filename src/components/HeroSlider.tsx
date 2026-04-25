'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// ── EDITE AQUI: slides do hero (troca de foto automática) ────────────────
// Em breve: imagens virão direto do Sanity — por enquanto são gradientes
const SLIDES = [
  {
    tag: 'Nova Coleção · 2025',
    titulo: 'Rituais que\ntransformam',
    subtitulo: 'Curadoria de velas, incensos e cristais escolhidos com intenção real.',
    cta: { label: 'Explorar coleção', href: '/produtos' },
    bg: 'radial-gradient(ellipse at 65% 55%, #3D2060 0%, #1A0E30 45%, #0B0716 100%)',
    acento: '#C9A84C',
  },
  {
    tag: 'Direto de Teófilo Otoni · MG',
    titulo: 'Cristais que\ncuram',
    subtitulo: 'Direto da capital mundial das pedras preciosas — autenticidade garantida em cada peça.',
    cta: { label: 'Ver cristais', href: '/produtos?categoria=cristais' },
    bg: 'radial-gradient(ellipse at 35% 60%, #3D1808 0%, #1E0C06 45%, #0C0604 100%)',
    acento: '#E8C080',
  },
  {
    tag: 'Kit Ritual Completo',
    titulo: 'Uma intenção,\num ritual',
    subtitulo: 'Vela + incenso + cristal reunidos com propósito. Para cada fase da sua jornada.',
    cta: { label: 'Ver kits', href: '/produtos?categoria=kits' },
    bg: 'radial-gradient(ellipse at 50% 35%, #102818 0%, #071510 45%, #020806 100%)',
    acento: '#8FD4A8',
  },
]
// ─────────────────────────────────────────────────────────────────────────

const INTERVAL = 5500

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused])

  const goTo = useCallback((idx: number) => setCurrent(idx), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])
  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])

  const slide = SLIDES[current]

  return (
    <div
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0B0716' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Backgrounds com crossfade ── */}
      {SLIDES.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          background: s.bg,
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.9s ease',
        }} />
      ))}

      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 0.55,
      }} />

      {/* Ornamentos circulares */}
      <div style={{
        position: 'absolute', right: '-8vw', top: '50%', transform: 'translateY(-50%)',
        width: '60vw', height: '60vw', maxWidth: '680px', maxHeight: '680px',
        borderRadius: '50%', border: `1px solid ${slide.acento}18`,
        pointerEvents: 'none', transition: 'border-color 0.9s',
      }} />
      <div style={{
        position: 'absolute', right: '-4vw', top: '50%', transform: 'translateY(-50%)',
        width: '40vw', height: '40vw', maxWidth: '440px', maxHeight: '440px',
        borderRadius: '50%', border: `1px solid ${slide.acento}28`,
        pointerEvents: 'none', transition: 'border-color 0.9s',
      }} />

      {/* ── Conteúdo (re-anima ao trocar de slide) ── */}
      <div
        key={current}
        className="hero-slide-in"
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          paddingTop: '108px',
          padding: 'calc(108px + 1rem) 2rem 6rem',
        }}
      >
        {/* Tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          border: `1px solid ${slide.acento}45`,
          padding: '0.3rem 0.9rem', marginBottom: '1.75rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-lato), system-ui, sans-serif',
            fontSize: '0.48rem', fontWeight: 300, letterSpacing: '0.22em',
            color: slide.acento, textTransform: 'uppercase',
          }}>
            {slide.tag}
          </span>
        </div>

        {/* Título */}
        <h1 style={{
          fontFamily: 'var(--font-bodoni), Georgia, serif',
          fontSize: 'clamp(2.8rem, 8vw, 7rem)',
          fontWeight: 700, color: '#FFFFFF',
          lineHeight: 1.04, letterSpacing: '0.02em',
          marginBottom: '1.5rem', whiteSpace: 'pre-line',
          textShadow: '0 4px 48px rgba(0,0,0,0.35)',
        }}>
          {slide.titulo}
        </h1>

        {/* Linha ouro */}
        <div style={{
          width: '48px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${slide.acento}, transparent)`,
          marginBottom: '1.5rem', transition: 'background 0.9s',
        }} />

        {/* Subtítulo */}
        <p style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.68)',
          lineHeight: 1.75, marginBottom: '2.5rem',
          maxWidth: '520px',
        }}>
          {slide.subtitulo}
        </p>

        {/* CTA */}
        <Link href={slide.cta.href} style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.9rem 2.25rem',
            background: slide.acento,
            color: '#1A0E1A',
            fontFamily: 'var(--font-lato), system-ui, sans-serif',
            fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.2em',
            textTransform: 'uppercase', border: 'none', cursor: 'pointer',
            transition: 'transform 0.18s, opacity 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}
          >
            {slide.cta.label} <ArrowRight size={12} />
          </button>
        </Link>
      </div>

      {/* ── Seta esquerda ── */}
      <button onClick={prev} aria-label="Slide anterior" style={{
        position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
        width: '42px', height: '42px',
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      >
        <ChevronLeft size={18} />
      </button>

      {/* ── Seta direita ── */}
      <button onClick={next} aria-label="Próximo slide" style={{
        position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
        width: '42px', height: '42px',
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      >
        <ChevronRight size={18} />
      </button>

      {/* ── Dots + barra de progresso ── */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem',
      }}>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Ir para slide ${i + 1}`} style={{
              width: i === current ? '22px' : '6px',
              height: '5px', borderRadius: '3px', border: 'none', cursor: 'pointer',
              background: i === current ? slide.acento : 'rgba(255,255,255,0.28)',
              padding: 0, transition: 'all 0.35s ease',
            }} />
          ))}
        </div>

        {/* Barra de progresso — reset via key */}
        <div style={{ width: '72px', height: '1px', background: 'rgba(255,255,255,0.1)' }}>
          <div
            key={`prog-${current}-${paused}`}
            style={{
              height: '100%', background: slide.acento,
              transformOrigin: 'left',
              animation: paused ? 'none' : `heroProg ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', right: '1.75rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
        opacity: 0.35,
      }}>
        <span style={{
          fontFamily: 'var(--font-lato)', fontSize: '0.42rem',
          letterSpacing: '0.18em', color: '#FFFFFF', textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>
          Role
        </span>
        <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.5)' }} />
      </div>

      <style>{`
        @keyframes heroProg {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .hero-slide-in {
          animation: heroIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide-in { animation: none; }
        }
        @media (max-width: 640px) {
          button[aria-label="Slide anterior"],
          button[aria-label="Próximo slide"] { display: none !important; }
        }
      `}</style>
    </div>
  )
}
