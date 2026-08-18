import { ArrowRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'
import HeroPlanDemo from './HeroPlanDemo'

function InstrumentLine() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="relative h-4 w-32 sm:w-40 instrument-ticks">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-border-strong" />
        <div className="absolute left-[62%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(255,176,32,0.7)]" />
      </div>
      <span className="font-mono text-[11px] tracking-widest2 uppercase text-ink-tertiary">
        62% on plan
      </span>
    </div>
  )
}

export default function Hero() {
  const ref = useReveal(0.1)

  return (
    <section id="top" className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      {/* ambient background: quiet, not a blob */}
      <div
        className="pointer-events-none absolute inset-0 grain"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-[42rem] h-[42rem] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFB020 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div ref={ref} className="reveal mx-auto max-w-7xl px-5 sm:px-8 relative grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-10 items-center">
        <div>
          <InstrumentLine />

          <h1 className="mt-6 font-display font-semibold text-[2.5rem] leading-[1.08] sm:text-[3.25rem] sm:leading-[1.06] text-ink-primary max-w-xl text-balance">
            Turn scattered work into clear execution.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ink-secondary max-w-md leading-relaxed">
            FlowPilot pulls your tasks, notes, and half-formed ideas into one
            plan you can actually fly by — so every day starts with a clear
            answer to "what's next," not a search for it.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#product"
              className="group inline-flex items-center gap-2 rounded-md bg-amber px-6 py-3.5 text-sm font-semibold text-bg hover:bg-amber-bright transition-colors"
            >
              Start your flight plan
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              See how it works
            </a>
          </div>

          <p className="mt-8 font-mono text-[11px] tracking-wide text-ink-tertiary">
            No credit card. No onboarding call. Just a plan.
          </p>
        </div>

        <HeroPlanDemo />
      </div>
    </section>
  )
}
