interface StatePanelProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function StatePanel({ title, message, actionLabel, onAction }: StatePanelProps) {
  return (
    <div className="surface flex flex-col items-start gap-3 p-6 text-left">
      <h3 className="text-2xl text-ink">{title}</h3>
      <p className="text-sm text-muted">{message}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
