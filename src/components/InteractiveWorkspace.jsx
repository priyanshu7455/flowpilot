import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Circle, Eye, EyeOff, LayoutGrid, List } from 'lucide-react'
import useReveal from '../hooks/useReveal'

const WORKSPACES = {
  launch: {
    name: 'Q1 pricing launch',
    tasks: [
      { id: 'l1', title: 'Finalize copy deck', priority: 'high', done: true },
      { id: 'l2', title: 'Review pricing tiers with design', priority: 'high', done: false },
      { id: 'l3', title: 'Confirm Stripe webhook changes', priority: 'medium', done: false },
      { id: 'l4', title: 'Write release notes', priority: 'low', done: false },
      { id: 'l5', title: 'Ship to staging', priority: 'medium', done: false },
    ],
  },
  design: {
    name: 'Design system sprint',
    tasks: [
      { id: 'd1', title: 'Audit spacing tokens', priority: 'medium', done: true },
      { id: 'd2', title: 'Rebuild button variants', priority: 'high', done: true },
      { id: 'd3', title: 'Document color contrast rules', priority: 'high', done: false },
      { id: 'd4', title: 'Migrate icon set', priority: 'low', done: false },
    ],
  },
  onboarding: {
    name: 'Onboarding rebuild',
    tasks: [
      { id: 'o1', title: 'Map current drop-off points', priority: 'high', done: true },
      { id: 'o2', title: 'Sketch new first-run flow', priority: 'high', done: false },
      { id: 'o3', title: 'Interview 5 recent signups', priority: 'medium', done: false },
      { id: 'o4', title: 'Prototype empty states', priority: 'low', done: false },
      { id: 'o5', title: 'Write handoff doc for eng', priority: 'medium', done: false },
      { id: 'o6', title: 'Schedule review with team', priority: 'low', done: false },
    ],
  },
}

const PRIORITY_STYLE = {
  high: 'text-coral border-coral/30 bg-coral/10',
  medium: 'text-amber border-amber/30 bg-amber/10',
  low: 'text-ink-tertiary border-border-strong bg-bg-panel-2',
}

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

function getSuggestion(tasks, workspaceName) {
  const undone = tasks.filter((t) => !t.done)
  if (undone.length === 0) {
    return `Nothing urgent — ${workspaceName} is fully on track.`
  }
  const top = [...undone].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  )[0]
  return `Your best next step is "${top.title}". It's ${top.priority} priority and currently at the top of the ${workspaceName} plan.`
}

function initialActivity() {
  return [
    { id: 'a1', text: 'You completed "Audit spacing tokens"', time: '1d ago' },
    { id: 'a2', text: 'You moved "Ship to staging" to this week', time: '2d ago' },
  ]
}

export default function InteractiveWorkspace() {
  const ref = useReveal(0.05)
  const [workspaceKey, setWorkspaceKey] = useState('launch')
  const [tasksByWorkspace, setTasksByWorkspace] = useState(() => {
    const init = {}
    Object.entries(WORKSPACES).forEach(([key, ws]) => {
      init[key] = ws.tasks
    })
    return init
  })
  const [filter, setFilter] = useState('all')
  const [focusMode, setFocusMode] = useState(false)
  const [view, setView] = useState('list')
  const [activity, setActivity] = useState(initialActivity)
  const [justToggledId, setJustToggledId] = useState(null)
  const [askOpen, setAskOpen] = useState(false)

  useEffect(() => setAskOpen(false), [workspaceKey])

  const suggestion = useMemo(
    () => getSuggestion(tasksByWorkspace[workspaceKey], WORKSPACES[workspaceKey].name),
    [tasksByWorkspace, workspaceKey]
  )

  const tasks = tasksByWorkspace[workspaceKey]
  const done = tasks.filter((t) => t.done).length
  const total = tasks.length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.done)
    if (filter === 'done') return tasks.filter((t) => t.done)
    return tasks
  }, [tasks, filter])

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id)
    setTasksByWorkspace((prev) => ({
      ...prev,
      [workspaceKey]: prev[workspaceKey].map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }))
    if (task) {
      const verb = task.done ? 'reopened' : 'completed'
      setActivity((prev) => [
        { id: `${id}-${Date.now()}`, text: `You ${verb} "${task.title}"`, time: 'just now' },
        ...prev,
      ].slice(0, 6))
      if (verb === 'completed') {
        setJustToggledId(id)
        setTimeout(() => setJustToggledId((cur) => (cur === id ? null : cur)), 400)
      }
    }
  }

  return (
    <section id="product" className="py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="font-mono text-[11px] tracking-widest2 uppercase text-amber mb-4">
            The workspace
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary text-balance">
            This is a real FlowPilot panel. Try it.
          </h2>
          <p className="mt-4 text-ink-secondary leading-relaxed">
            Check off a task, switch plans, or flip on focus mode — every
            control below actually changes the interface, the same way it
            would in the product.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-bg-elevated overflow-hidden shadow-2xl shadow-black/30">
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5 bg-bg-panel/40">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Task filter">
              {['all', 'active', 'done'].map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                    filter === f
                      ? 'bg-amber text-bg'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-bg-panel-2'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setView((v) => (v === 'list' ? 'board' : 'list'))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-ink-secondary hover:text-ink-primary hover:bg-bg-panel-2 transition-colors border border-border"
                aria-label={`Switch to ${view === 'list' ? 'board' : 'list'} view`}
              >
                {view === 'list' ? <LayoutGrid size={14} /> : <List size={14} />}
                {view === 'list' ? 'Board view' : 'List view'}
              </button>
              <button
                onClick={() => setFocusMode((v) => !v)}
                aria-pressed={focusMode}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                  focusMode
                    ? 'bg-signal/15 text-signal border-signal/30'
                    : 'text-ink-secondary hover:text-ink-primary border-border hover:bg-bg-panel-2'
                }`}
              >
                {focusMode ? <Eye size={14} /> : <EyeOff size={14} />}
                Focus mode
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr_260px]">
            {/* sidebar */}
            <aside
              className={`border-b md:border-b-0 md:border-r border-border p-4 transition-opacity duration-300 ${
                focusMode ? 'opacity-30 pointer-events-none' : 'opacity-100'
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-3 px-1">
                Flight plans
              </p>
              <ul className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
                {Object.entries(WORKSPACES).map(([key, ws]) => {
                  const t = tasksByWorkspace[key]
                  const d = t.filter((x) => x.done).length
                  return (
                    <li key={key} className="shrink-0">
                      <button
                        onClick={() => setWorkspaceKey(key)}
                        aria-current={workspaceKey === key}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                          workspaceKey === key
                            ? 'bg-bg-panel-2 text-ink-primary border border-border-strong'
                            : 'text-ink-secondary hover:bg-bg-panel-2/60 border border-transparent'
                        }`}
                      >
                        <span className="block truncate">{ws.name}</span>
                        <span className="block font-mono text-[10px] text-ink-tertiary mt-0.5">
                          {d}/{t.length} done
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            {/* main panel */}
            <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-ink-primary">
                  {WORKSPACES[workspaceKey].name}
                </h3>
                <span className="font-mono text-xs text-ink-tertiary">{pct}% on plan</span>
              </div>

              {/* signature instrument progress bar */}
              <div className="relative h-2 rounded-full bg-bg-panel-2 overflow-hidden mb-6" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Plan progress">
                <div
                  className="absolute inset-y-0 left-0 bg-amber rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {view === 'list' ? (
                <ul className="space-y-1">
                  {visibleTasks.map((task) => (
                    <li key={task.id}>
                      <button
                        onClick={() => toggleTask(task.id)}
                        aria-checked={task.done}
                        role="checkbox"
                        className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-left hover:bg-bg-panel-2/60 transition-colors"
                      >
                        {task.done ? (
                          <CheckCircle2
                            size={18}
                            className={`text-signal shrink-0 ${task.id === justToggledId ? 'animate-check-pop' : ''}`}
                          />
                        ) : (
                          <Circle size={18} className="text-ink-tertiary shrink-0" />
                        )}
                        <span
                          className={`flex-1 text-sm ${
                            task.done ? 'text-ink-tertiary line-through' : 'text-ink-primary'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`shrink-0 text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded border ${PRIORITY_STYLE[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </button>
                    </li>
                  ))}
                  {visibleTasks.length === 0 && (
                    <li className="text-sm text-ink-tertiary px-2.5 py-6 text-center">
                      Nothing here. Clear runway.
                    </li>
                  )}
                </ul>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visibleTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      aria-checked={task.done}
                      role="checkbox"
                      className={`text-left rounded-lg border p-3.5 transition-colors ${
                        task.done
                          ? 'border-border bg-bg-panel-2/40'
                          : 'border-border-strong bg-bg-panel-2 hover:border-amber/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded border ${PRIORITY_STYLE[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        {task.done ? (
                          <CheckCircle2
                            size={16}
                            className={`text-signal ${task.id === justToggledId ? 'animate-check-pop' : ''}`}
                          />
                        ) : (
                          <Circle size={16} className="text-ink-tertiary" />
                        )}
                      </div>
                      <p className={`text-sm ${task.done ? 'text-ink-tertiary line-through' : 'text-ink-primary'}`}>
                        {task.title}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* activity feed */}
            <div
              className={`p-5 sm:p-6 transition-opacity duration-300 ${
                focusMode ? 'opacity-30 pointer-events-none' : 'opacity-100'
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-3">
                Activity
              </p>
              <ul className="space-y-3.5">
                {activity.map((item) => (
                  <li key={item.id} className="text-sm">
                    <p className="text-ink-secondary leading-snug">{item.text}</p>
                    <p className="font-mono text-[10px] text-ink-tertiary mt-0.5">{item.time}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-border">
                <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-3">
                  Upcoming
                </p>
                <div className="rounded-lg border border-border bg-bg-panel-2/60 p-3">
                  <p className="text-sm text-ink-primary">Design review</p>
                  <p className="font-mono text-[10px] text-ink-tertiary mt-1">Tomorrow, 2:00 PM</p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <p className="font-mono text-[10px] tracking-widest2 uppercase text-ink-tertiary mb-3">
                  Ask FlowPilot
                </p>
                <button
                  type="button"
                  onClick={() => setAskOpen(true)}
                  className="w-full text-left rounded-lg border border-border-strong bg-bg-panel-2 px-3 py-2.5 text-sm text-ink-secondary hover:text-ink-primary hover:border-amber/40 transition-colors"
                >
                  What should I work on next?
                </button>
                {askOpen && (
                  <div
                    className="mt-3 rounded-lg border border-amber/25 bg-amber/5 p-3 text-sm text-ink-primary leading-relaxed animate-fade-up"
                    aria-live="polite"
                  >
                    {suggestion}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
