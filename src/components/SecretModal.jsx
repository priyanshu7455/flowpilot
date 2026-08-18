import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const LINKEDIN_URL = 'https://linkedin.com/in/priyanshu-raj-2b277a282'

export default function SecretModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-up"
        style={{ animationDuration: '0.3s' }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-modal-title"
        className="relative w-full max-w-sm rounded-2xl border border-border-strong bg-bg-elevated shadow-2xl shadow-black/50 p-7 animate-fade-up"
        style={{ animationDuration: '0.35s' }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-md p-1.5 text-ink-tertiary hover:text-ink-primary hover:bg-bg-panel-2 transition-colors"
        >
          <X size={18} />
        </button>

        <p className="font-mono text-[11px] tracking-widest2 uppercase text-amber mb-4">
          Secret found
        </p>

        <h2 id="secret-modal-title" className="font-display text-xl font-semibold text-ink-primary mb-2">
          You found the secret. 👀
        </h2>

        <p className="text-sm text-ink-secondary leading-relaxed mb-6">
          Like what you see? Let's build something great together.
        </p>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-bg hover:bg-amber-bright transition-colors"
        >
          Hire me →
        </a>
      </div>
    </div>
  )
}
