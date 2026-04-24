import type { LeadEntity } from '../../features/leads/leadsTypes'

interface LeadsListProps {
  leads: LeadEntity[]
}

export function LeadsList({ leads }: LeadsListProps) {
  return (
    <section className="surface p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-2xl text-ink">Leads registrados</h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {leads.length} total
        </span>
      </div>

      {!leads.length ? (
        <p className="text-sm text-muted">Aun no hay leads registrados en localStorage.</p>
      ) : (
        <ul className="space-y-3">
          {leads.slice(0, 6).map((lead) => (
            <li key={lead.id} className="rounded-xl border border-line bg-canvas/30 p-3">
              <p className="text-sm font-semibold text-ink">{lead.fullName}</p>
              <p className="text-xs text-muted">{lead.email}</p>
              <p className="text-xs text-muted">Interes: {lead.interest}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
