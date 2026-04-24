import type { EventItem } from '../../features/events/eventsTypes'
import { StatePanel } from '../common/StatePanel'
import { EventCard } from './EventCard'

interface EventGridProps {
  items: EventItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  onRetry: () => void
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="surface animate-pulse space-y-4 p-5">
          <div className="h-4 w-1/3 rounded bg-line" />
          <div className="h-8 w-3/4 rounded bg-line" />
          <div className="h-14 rounded bg-line" />
          <div className="h-5 w-1/2 rounded bg-line" />
        </div>
      ))}
    </div>
  )
}

export function EventGrid({ items, status, error, onRetry }: EventGridProps) {
  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton />
  }

  if (status === 'failed') {
    return (
      <StatePanel
        title="No pudimos cargar la oferta"
        message={error ?? 'Ocurrio un problema inesperado al consultar la API.'}
        actionLabel="Reintentar"
        onAction={onRetry}
      />
    )
  }

  if (!items.length) {
    return (
      <StatePanel
        title="Sin resultados"
        message="No hay programas que coincidan con el filtro actual."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  )
}
