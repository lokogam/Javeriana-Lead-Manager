import type { LeadFormInput } from '../../features/leads/leadsTypes'

export function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

function toTitleCase(value: string): string {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/(^|\s)\p{L}/gu, (char) => char.toUpperCase())
}

export function normalizeLeadInput(input: LeadFormInput): LeadFormInput {
  return {
    fullName: toTitleCase(input.fullName),
    email: normalizeWhitespace(input.email).toLowerCase(),
    phone: normalizeWhitespace(input.phone),
    interest: normalizeWhitespace(input.interest),
  }
}
