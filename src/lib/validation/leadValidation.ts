import type { LeadFormInput } from '../../features/leads/leadsTypes'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface LeadValidationResult {
  errors: Partial<Record<keyof LeadFormInput, string>>
  recommendation?: string
}

export function validateLeadInput(input: LeadFormInput): LeadValidationResult {
  const errors: Partial<Record<keyof LeadFormInput, string>> = {}

  if (!input.fullName.trim()) {
    errors.fullName = 'El nombre es obligatorio.'
  }

  if (!input.email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Ingresa un correo con estructura valida.'
  }

  if (!input.interest.trim()) {
    errors.interest = 'Selecciona un programa o evento de interes.'
  }

  if (input.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(input.phone.trim())) {
    errors.phone = 'El telefono tiene un formato invalido.'
  }

  const emailDomain = input.email.trim().toLowerCase().split('@')[1]
  const recommendation =
    emailDomain && emailDomain !== 'javeriana.edu.co'
      ? 'Recomendacion: si cuentas con correo institucional, usa @javeriana.edu.co.'
      : undefined

  return { errors, recommendation }
}

export function isLeadInputValid(result: LeadValidationResult): boolean {
  return Object.keys(result.errors).length === 0
}
