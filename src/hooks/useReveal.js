import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref and adds
 * `.is-visible` the first time the element enters the viewport.
 * Pairs with the `.reveal` CSS class defined in index.css.
 */
export default function useReveal(threshold = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
