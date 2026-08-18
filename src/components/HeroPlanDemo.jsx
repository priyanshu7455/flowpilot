import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Circle, RotateCcw } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

const DEFAULT_GOAL = 'Launch my portfolio website by Friday'

// Deterministic demo plan. This is a frontend simulation only — no model
// call, no real inference. The task list is fixed; only the plan title
// reflects whatever goal was typed in.
const DEMO_TASKS = [
  { id: 'p1', title: 'Finalize homepage', done: true },
  { id: 'p2', title: 'Make mobile layout', done: true },
  { id: 'p3', title: 'Test the mobile layout', done: false },
  { id: 'p4', title: 'Deploy website', done: false },
]

function derivePlanTitle(goal) {
  const trimmed = goal.trim()
  if (!trimmed) return 'Your Plan'
  if (trimmed.toLowerCase().includes('portfolio')) return 'Portfolio Launch'
  const words = trimmed.split(/\s+/).slice(0, 4)
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export default function HeroPlanDemo() {
  const reducedMotion = useReducedMotion()
  const [goal, setGoal] = useState(DEFAULT_GOAL)
  const [stage, setStage] = useState('input') // 'input' | 'thinking' | 'plan'
  const [progress, setProgress] = useState(0)

  const done = DEMO_TASKS.filter((t) => t.done).length
  const finalProgress = done / DEMO_TASKS.length
  const nextStep = DEMO_TASKS.find((t) => !t.done)?.title

  function handleBuildPlan(e) {
    e.preventDefault()
    if (!goal.trim() || stage !== 'input') return
    setStage('thinking')
    const delay = reducedMotion ? 150 : 650
    setTimeout(() => {
      setStage('plan')
      const rampDelay = reducedMotion ? 0 : 100
      setTimeout(() => setProgress(finalProgress), rampDelay)
    }, delay)
  }

  function handleEditGoal() {
    setStage('input')
    setProgress(0)
  }

  return (
    <div className="relative animate-float-soft">
      {/* back panel for depth */}
      <div
        className="absolute -right-4 -bottom-4 w-full h-full rounded-2xl border border-border bg-bg-panel/60 hidden sm:block"
        aria-hidden="true"
      />
      <div className="relative rounded-2xl border border-border bg-bg-elevated shadow-2xl shadow-black/40 p-5 sm:p-6 w-full min-h-[19rem]">
        {stage !== 'plan' ? (
          <form onSubmit={handleBuildPlan}>
            <label
              htmlFor="hero-goal-input"
              className="block font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-2.5"
            >
              What are you trying to accomplish?
            </label>
            <input
              id="hero-goal-input"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              disabled={stage === 'thinking'}
              placeholder="e.g. Launch my portfolio website by Friday"
              className="w-full rounded-lg border border-border-strong bg-bg-panel px-3.5 py-3 text-sm text-ink-primary placeholder:text-ink-tertiary outline-none focus:border-amber/60 disabled:opacity-60 transition-colors"
            />

            <button
              type="submit"
              disabled={!goal.trim() || stage === 'thinking'}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-amber px-4 py-3 text-sm font-semibold text-bg hover:bg-amber-bright transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {stage === 'thinking' ? 'Organizing your plan' : 'Build my plan'}
              {stage !== 'thinking' && (
                <ArrowRight size={15} className="transition-transform" />
              )}
            </button>

            <div className="mt-5 flex items-center gap-2 h-4" aria-live="polite">
              {stage === 'thinking' && (
                <>
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-dot-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-dot-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-dot-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span className="font-mono text-[11px] text-ink-tertiary">
                    Sorting tasks into a plan…
                  </span>
                </>
              )}
            </div>
          </form>
        ) : (
          <div aria-live="polite">
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary">
                Your plan
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-signal">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                Plan ready
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-semibold text-ink-primary truncate pr-3">
                {derivePlanTitle(goal)}
              </h3>
              <div className="relative w-11 h-11 shrink-0">
                <svg viewBox="0 0 44 44" className="w-11 h-11 -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#2B323C" strokeWidth="4" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#FFB020"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={2 * Math.PI * 18 * (1 - progress)}
                    style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-ink-primary">
                  {Math.round(finalProgress * 100)}%
                </span>
              </div>
            </div>

            <ul className="space-y-2">
              {DEMO_TASKS.map((task, i) => (
                <li
                  key={task.id}
                  className="flex items-center gap-2.5 text-sm animate-fade-up"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {task.done ? (
                    <CheckCircle2 size={16} className="text-signal shrink-0" />
                  ) : (
                    <Circle size={16} className="text-ink-tertiary shrink-0" />
                  )}
                  <span className={task.done ? 'text-ink-secondary line-through decoration-ink-tertiary' : 'text-ink-primary'}>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-1">
                  Suggested next step
                </span>
                <span className="block text-sm text-ink-primary truncate">{nextStep}</span>
              </div>
              <button
                type="button"
                onClick={handleEditGoal}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-ink-secondary hover:text-ink-primary hover:border-border-strong transition-colors"
              >
                <RotateCcw size={12} />
                Edit goal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
