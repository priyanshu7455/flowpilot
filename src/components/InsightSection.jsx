import useReveal from '../hooks/useReveal'

export default function InsightSection() {
  const ref = useReveal(0.3)

  return (
    <section className="border-y border-border bg-bg-elevated/40">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-28 text-center">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-amber mb-6">
          The actual problem
        </p>
        <p className="font-display text-2xl sm:text-4xl leading-snug text-ink-primary text-balance">
          Work rarely stalls from a lack of effort.
          <br className="hidden sm:block" />
          It stalls because <span className="text-ink-tertiary">nobody can see</span> what
          matters next.
        </p>
        <p className="mt-6 text-ink-secondary max-w-xl mx-auto">
          Tasks live in five apps, ideas live in your head, and priorities
          shift in meetings nobody wrote down. FlowPilot exists to close that
          gap — one visible plan, always current.
        </p>
      </div>
    </section>
  )
}
