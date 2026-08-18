export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#1F252D" />
            <path
              d="M6 20 L14 12 L18 16 L26 8"
              stroke="#FFB020"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="26" cy="8" r="2" fill="#FFB020" />
          </svg>
          <span className="font-display font-semibold text-sm text-ink-primary">FlowPilot</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
          <a href="#product" className="hover:text-ink-primary transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-ink-primary transition-colors">How it works</a>
          <a href="#why" className="hover:text-ink-primary transition-colors">Why FlowPilot</a>
        </nav>

        <p className="font-mono text-[11px] text-ink-tertiary">
          Concept product, built as a design exercise · © 2026
        </p>
      </div>
    </footer>
  )
}
