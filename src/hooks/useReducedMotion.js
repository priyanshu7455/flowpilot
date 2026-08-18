import { useEffect, useState } from 'react'

/**
 * Tracks the user's prefers-reduced-motion setting so components can
 * skip non-essential motion (staggered reveals, ambient movement) while
 * still keeping state-driven feedback (like a checkbox toggling).
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const handler = (e) => setReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}
