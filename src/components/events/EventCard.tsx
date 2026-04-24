import { motion } from 'framer-motion'
import type { EventItem } from '../../features/events/eventsTypes'
import { formatEventDate } from '../../lib/utils/formatters'

interface EventCardProps {
  event: EventItem
  index: number
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.article
      className="surface relative overflow-hidden p-5"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
    >
      <div className="absolute -right-8 -top-8 size-20 rounded-full bg-primary/10" aria-hidden="true" />
      <div className="relative space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{event.category}</span>
          <span className="rounded-full bg-accent/20 px-2.5 py-1 text-[#8a5a17] dark:text-accent">
            {event.modality}
          </span>
        </div>

        <h3 className="text-2xl leading-tight text-ink">{event.name}</h3>
        <p className="text-sm text-muted">{event.summary}</p>

        <dl className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="label">Fecha</dt>
            <dd className="text-sm font-semibold text-ink">{formatEventDate(event.date)}</dd>
          </div>
          <div>
            <dt className="label">Cupos</dt>
            <dd className="text-sm font-semibold text-ink">{event.seats}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  )
}
