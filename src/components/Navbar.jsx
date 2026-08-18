import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import SecretModal from './SecretModal'

const LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why FlowPilot', href: '#why' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [secretOpen, setSecretOpen] = useState(false)
  const resetTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogoClick() {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    setLogoClicks((count) => {
      const next = count + 1
      if (next >= 5) {
        setSecretOpen(true)
        return 0
      }
      return next
    })

    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setLogoClicks(0), 1500)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between" aria-label="Primary">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group"
          aria-label="FlowPilot, back to top"
        >
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#1F252D" />
            <path
              d="M6 20 L14 12 L18 16 L26 8"
              stroke="#FFB020"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <circle cx="26" cy="8" r="2" fill="#FFB020" />
          </svg>
          <span className="font-display font-semibold text-[15px] tracking-tight text-ink-primary">
            FlowPilot
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#product"
            className="inline-flex items-center rounded-md bg-amber px-4 py-2 text-sm font-semibold text-bg hover:bg-amber-bright transition-colors"
          >
            Start your plan
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-ink-secondary hover:text-ink-primary"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-bg border-t border-border px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-ink-secondary hover:text-ink-primary border-b border-border/60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#product"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-amber px-4 py-3 text-sm font-semibold text-bg"
          >
            Start your plan
          </a>
        </div>
      )}

      <SecretModal open={secretOpen} onClose={() => setSecretOpen(false)} />
    </header>
  )
}
