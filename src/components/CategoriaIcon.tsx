import { Flame, Leaf, Gem, Sparkles, Package } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

const ICONS: Record<string, React.FC<LucideProps>> = {
  velas:    Flame,
  incensos: Leaf,
  cristais: Gem,
  kits:     Sparkles,
}

interface Props extends LucideProps {
  categoria: string
}

export default function CategoriaIcon({ categoria, ...props }: Props) {
  const Icon = ICONS[categoria] ?? Package
  return <Icon {...props} />
}
