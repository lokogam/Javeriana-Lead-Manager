export interface LeadFormInput {
  fullName: string
  email: string
  phone: string
  interest: string
}

export interface LeadEntity extends LeadFormInput {
  id: string
  createdAt: string
}

export interface LeadsState {
  items: LeadEntity[]
  isHydrated: boolean
}
