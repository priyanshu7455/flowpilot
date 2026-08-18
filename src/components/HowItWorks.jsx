import useReveal from '../hooks/useReveal'

const STEPS = [
  {
    n: '01',
    title: 'Capture',
    body: 'Drop in a task, a note, or a half-formed idea the moment it happens. No sorting required yet.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'FlowPilot ranks everything against your active plans, so priority is a byproduct, not a chore.',
  },
  {
    n: '03',
    title: 'Execute',
    body: 'Open the day with one ordered list. Check things off, watch the plan move with you.',
  },
]

export default function HowItWorks() {
  const ref = useReveal(0.15)

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-border bg-bg-elevated/40">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl mb-16">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-amber mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary text-balance">
            The whole loop, every day.
          </h2>
        </div>

        <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-8">
          <div
            className="hidden sm:block absolute top-6 left-0 right-0 h-px bg-border-strong"
            aria-hidden="true"
          />
          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div className="relative z-10 w-12 h-12 rounded-full border border-border-strong bg-bg-panel flex items-center justify-center font-mono text-sm text-amber mb-5">
                {step.n}
              </div>
              <h3 className="font-display text-xl font-semibold text-ink-primary mb-2">
                {step.title}
              </h3>
              <p className="text-ink-secondary leading-relaxed max-w-xs">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
