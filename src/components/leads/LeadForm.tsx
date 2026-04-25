import { useMemo, useState } from 'react'
import type { LeadEntity, LeadFormInput } from '../../features/leads/leadsTypes'
import { normalizeLeadInput } from '../../lib/normalization/leadNormalization'
import { createClientId } from '../../lib/utils/formatters'
import {
  getEmailRecommendation,
  isLeadInputValid,
  validateLeadInput,
} from '../../lib/validation/leadValidation'

interface LeadFormProps {
  interestOptions: string[]
  onCreateLead: (lead: LeadEntity) => void
}

const INITIAL_FORM: LeadFormInput = {
  fullName: '',
  email: '',
  phone: '',
  interest: '',
}

export function LeadForm({ interestOptions, onCreateLead }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormInput>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormInput, string>>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const sortedOptions = useMemo(() => [...interestOptions].sort((a, b) => a.localeCompare(b)), [
    interestOptions,
  ])
  const recommendation = useMemo(() => getEmailRecommendation(form.email), [form.email])

  const setField = (field: keyof LeadFormInput, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setSuccessMessage('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validateLeadInput(form)
    setErrors(validation.errors)

    if (!isLeadInputValid(validation)) {
      return
    }

    const normalized = normalizeLeadInput(form)

    const lead: LeadEntity = {
      ...normalized,
      id: createClientId('lead'),
      createdAt: new Date().toISOString(),
    }

    onCreateLead(lead)
    setForm(INITIAL_FORM)
    setSuccessMessage('Lead registrado exitosamente. La informacion fue normalizada y guardada.')
  }

  return (
    <section className="surface space-y-4 p-5">
      <div>
        <h2 className="text-2xl text-ink">Captura de leads</h2>
        <p className="text-sm text-muted">Registra interesados y persiste el historial localmente.</p>
      </div>

      {recommendation ? (
        <p className="rounded-lg border border-accent/50 bg-accent/20 px-3 py-2 text-xs text-[#7d5315] dark:text-accent">
          {recommendation}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-xs text-success">
          {successMessage}
        </p>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block space-y-1.5">
          <span className="label">Nombre completo *</span>
          <input
            value={form.fullName}
            onChange={(event) => setField('fullName', event.target.value)}
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName ? <span className="text-xs text-danger">{errors.fullName}</span> : null}
        </label>

        <label className="block space-y-1.5">
          <span className="label">Correo electronico *</span>
          <input
            value={form.email}
            onChange={(event) => setField('email', event.target.value)}
            type="email"
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="text-xs text-danger">{errors.email}</span> : null}
        </label>

        <label className="block space-y-1.5">
          <span className="label">Telefono</span>
          <input
            value={form.phone}
            onChange={(event) => setField('phone', event.target.value)}
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <span className="text-xs text-danger">{errors.phone}</span> : null}
        </label>

        <label className="block space-y-1.5">
          <span className="label">Programa o evento de interes *</span>
          <select
            value={form.interest}
            onChange={(event) => setField('interest', event.target.value)}
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-invalid={Boolean(errors.interest)}
          >
            <option value="">Selecciona una opcion</option>
            {sortedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.interest ? <span className="text-xs text-danger">{errors.interest}</span> : null}
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Guardar lead
        </button>
      </form>
    </section>
  )
}
