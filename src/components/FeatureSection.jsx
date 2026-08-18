import { CheckCircle2, Circle } from 'lucide-react'
import useReveal from '../hooks/useReveal'

function CaptureSnippet() {
  return (
    <div className="rounded-xl border border-border bg-bg-panel p-4 font-mono text-xs text-ink-secondary space-y-2">
      <p className="text-ink-tertiary">— quick capture —</p>
      <p className="text-ink-primary">"follow up with legal re: contract redline"</p>
      <p className="text-ink-primary">"ask design for updated logo files"</p>
      <p className="text-ink-tertiary animate-pulse-soft">sorting into today / this week / later…</p>
    </div>
  )
}

function OneViewSnippet() {
  return (
    <div className="rounded-xl border border-border bg-bg-panel p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 size={15} className="text-signal" />
        <span className="text-ink-tertiary line-through">Draft investor update</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Circle size={15} className="text-amber" />
        <span className="text-ink-primary">Review Q1 pricing tiers</span>
        <span className="ml-auto text-[10px] font-mono text-coral">high</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Circle size={15} className="text-ink-tertiary" />
        <span className="text-ink-secondary">Sync with design on onboarding</span>
      </div>
    </div>
  )
}

function MomentumSnippet() {
  return (
    <div className="rounded-xl border border-border bg-bg-panel p-4">
      <div className="flex items-end gap-1.5 h-16">
        {[30, 45, 38, 60, 52, 74, 68].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-amber/70"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-ink-tertiary tracking-wide">
        Tasks closed, last 7 days
      </p>
    </div>
  )
}

const FEATURES = [
  {
    eyebrow: '01 — Capture',
    title: 'Get it out of your head in one line.',
    body: "No forms, no fields to fill. Type it the way you'd say it, and FlowPilot files it under the right plan automatically — you can always move it later.",
    Snippet: CaptureSnippet,
  },
  {
    eyebrow: '02 — Prioritize',
    title: 'One view of what actually matters today.',
    body: 'Every task lands in a single ranked list instead of six separate apps. Priority is visible at a glance, not buried in a dropdown.',
    Snippet: OneViewSnippet,
  },
  {
    eyebrow: '03 — Track',
    title: 'Watch momentum build, not just tasks pile up.',
    body: 'A running view of what got closed this week keeps the plan honest — no vanity metrics, just the shape of your own output.',
    Snippet: MomentumSnippet,
  },
]

export default function FeatureSection() {
  return (
    <section id="why" className="py-20 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl mb-16 sm:mb-20">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-amber mb-4">
            Why it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary text-balance">
            Three habits, not forty features.
          </h2>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.title} feature={f} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureRow({ feature, reverse }) {
  const ref = useReveal(0.15)
  const { eyebrow, title, body, Snippet } = feature

  return (
    <div
      ref={ref}
      className={`reveal grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-ink-tertiary mb-4">
          {eyebrow}
        </p>
        <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-ink-primary max-w-md text-balance">
          {title}
        </h3>
        <p className="mt-4 text-ink-secondary leading-relaxed max-w-md">{body}</p>
      </div>
      <Snippet />
    </div>
  )
}
