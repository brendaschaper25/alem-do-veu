'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { HeroSlide } from '@/lib/configuracao'
import { TEMAS } from '@/lib/configuracao'

interface Props {
  slides: HeroSlide[]
}

const INTERVAL = 5500

export default function HeroSlider({ slides }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Garante que current não fique fora do range se slides mudar
  useEffect(() => {
    if (current >= slides.length) setCurrent(0)
  }, [slides.length, current])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % slides.length), INTERVAL)
    return () => clearInterval(id)
  }, [paused, slides.length])

  const goTo = useCallback((idx: number) => setCurrent(idx), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])

  const slide = slides[current] ?? slides[0]
  const tema = TEMAS[slide.tema] ?? TEMAS.violeta

  return (
    <div
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0B0716' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backgrounds com crossfade */}
      {slides.map((s, i) => {
        const t = TEMAS[s.tema] ?? TEMAS.violeta
        return (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            background: t.bg,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
          }} />
        )
      })}

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 0.55,
      }} />

      {/* Ornamentos */}
      <div style={{
        position: 'absolute', right: '-8vw', top: '50%', transform: 'translateY(-50%)',
        width: '60vw', height: '60vw', maxWidth: '680px', maxHeight: '680px',
        borderRadius: '50%', border: `1px solid ${tema.acento}18`,
        pointerEvents: 'none', transition: 'border-color 0.9s',
      }} />
      <div style={{
        position: 'absolute', right: '-4vw', top: '50%', transform: 'translateY(-50%)',
        width: '40vw', height: '40vw', maxWidth: '440px', maxHeight: '440px',
        borderRadius: '50%', border: `1px solid ${tema.acento}28`,
        pointerEvents: 'none', transition: 'border-color 0.9s',
      }} />

      {/* Conteúdo — key reseta animação a cada slide */}
      <div
        key={current}
        className="hero-slide-in"
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: 'calc(108px + 1rem) 2rem 6rem',
        }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          border: `1px solid ${tema.acento}45`,
          padding: '0.3rem 0.9rem', marginBottom: '1.75rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-lato), system-ui, sans-serif',
            fontSize: '0.48rem', fontWeight: 300, letterSpacing: '0.22em',
            color: tema.acento, textTransform: 'uppercase',
          }}>
            {slide.tag}
          </span>
        </div>

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

        <div style={{
          width: '48px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${tema.acento}, transparent)`,
          marginBottom: '1.5rem', transition: 'background 0.9s',
        }} />

        <p style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.68)',
          lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '520px',
        }}>
          {slide.subtitulo}
        </p>

        <Link href={slide.ctaHref} style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.9rem 2.25rem', background: tema.acento, color: '#1A0E1A',
              fontFamily: 'var(--font-lato), system-ui, sans-serif',
              fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.2em',
              textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              transition: 'transform 0.18s, opacity 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}
          >
            {slide.ctaLabel} <ArrowRight size={12} />
          </button>
        </Link>
      </div>

      {/* Seta esquerda */}
      <button onClick={prev} aria-label="Slide anterior" style={{
        position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
        width: '42px', height: '42px',
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Seta direita */}
      <button onClick={next} aria-label="Próximo slide" style={{
        position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
        width: '42px', height: '42px',
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots + progresso */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem',
      }}>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
              width: i === current ? '22px' : '6px', height: '5px',
              borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
              background: i === current ? tema.acento : 'rgba(255,255,255,0.28)',
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>
        <div style={{ width: '72px', height: '1px', background: 'rgba(255,255,255,0.1)' }}>
          <div
            key={`p-${current}-${paused}`}
            style={{
              height: '100%', background: tema.acento, transformOrigin: 'left',
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
        <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.42rem', letterSpacing: '0.18em', color: '#FFFFFF', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
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
        @media (prefers-reduced-motion: reduce) { .hero-slide-in { animation: none; } }
        @media (max-width: 640px) {
          button[aria-label="Slide anterior"],
          button[aria-label="Próximo slide"] { display: none !important; }
        }
      `}</style>
    </div>
  )
}
