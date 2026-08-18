import { ArrowRight } from 'lucide-react'
import useReveal from '../hooks/useReveal'

export default function FinalCTA() {
  const ref = useReveal(0.3)

  return (
    <section id="final-cta" className="py-24 sm:py-32 border-t border-border relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] opacity-[0.08] blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFB020 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div ref={ref} className="reveal mx-auto max-w-3xl px-5 sm:px-8 text-center relative">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ink-primary text-balance leading-tight">
          Stop managing your task list.
          <br />
          Start flying your plan.
        </h2>
        <p className="mt-6 text-ink-secondary max-w-md mx-auto">
          FlowPilot is free to try, no credit card required. Bring your first
          three tasks and see the plan take shape in under a minute.
        </p>
        <div className="mt-9 flex items-center justify-center">
          <a
            href="#product"
            className="group inline-flex items-center gap-2 rounded-md bg-amber px-7 py-4 text-sm font-semibold text-bg hover:bg-amber-bright transition-colors"
          >
            Try the live workspace
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
