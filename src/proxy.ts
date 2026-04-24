import { NextRequest, NextResponse } from 'next/server'

// Rate limiter simples em memória por IP
// Em produção com múltiplas instâncias, use Vercel KV ou Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}

// Limpa entradas antigas a cada 1000 requisições para não vazar memória
let reqCount = 0
function cleanupIfNeeded() {
  if (++reqCount % 1000 !== 0) return
  const now = Date.now()
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key)
  }
}

export function proxy(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const { pathname } = req.nextUrl

  cleanupIfNeeded()

  // Pagamento: 5 tentativas por minuto por IP
  if (pathname === '/api/pagamento') {
    if (!rateLimit(ip + ':pagamento', 5, 60_000)) {
      return NextResponse.json(
        { erro: 'Muitas tentativas. Aguarde um momento.' },
        { status: 429 }
      )
    }
  }

  // Frete: 20 consultas por minuto por IP
  if (pathname === '/api/frete') {
    if (!rateLimit(ip + ':frete', 20, 60_000)) {
      return NextResponse.json(
        { erro: 'Muitas consultas de frete. Aguarde um momento.' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/pagamento', '/api/frete'],
}
