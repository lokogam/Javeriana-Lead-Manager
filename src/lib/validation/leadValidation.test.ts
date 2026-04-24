import { isLeadInputValid, validateLeadInput } from './leadValidation'

describe('leadValidation', () => {
  it('marca errores cuando faltan campos obligatorios', () => {
    const result = validateLeadInput({
      fullName: '',
      email: '',
      phone: '',
      interest: '',
    })

    expect(result.errors.fullName).toBeDefined()
    expect(result.errors.email).toBeDefined()
    expect(result.errors.interest).toBeDefined()
    expect(isLeadInputValid(result)).toBe(false)
  })

  it('marca error si el email no tiene estructura valida', () => {
    const result = validateLeadInput({
      fullName: 'Ana Ruiz',
      email: 'ana-ruiz',
      phone: '',
      interest: 'Ingenieria de Software',
    })

    expect(result.errors.email).toBe('Ingresa un correo con estructura valida.')
  })

  it('devuelve recomendacion si el dominio no es javeriana.edu.co', () => {
    const result = validateLeadInput({
      fullName: 'Ana Ruiz',
      email: 'ana@gmail.com',
      phone: '',
      interest: 'Ingenieria de Software',
    })

    expect(result.recommendation).toContain('@javeriana.edu.co')
  })
})
