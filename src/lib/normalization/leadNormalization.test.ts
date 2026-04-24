import { normalizeLeadInput, normalizeWhitespace } from './leadNormalization'

describe('leadNormalization', () => {
  it('normaliza espacios en blanco', () => {
    expect(normalizeWhitespace('  hola   mundo  ')).toBe('hola mundo')
  })

  it('normaliza y capitaliza el input del lead', () => {
    const normalized = normalizeLeadInput({
      fullName: '  maRia   del   cArmen  ',
      email: '  MARIA@MAIL.COM  ',
      phone: '  300  123  4567  ',
      interest: '  Maestria en Ciencia de Datos  ',
    })

    expect(normalized).toEqual({
      fullName: 'Maria Del Carmen',
      email: 'maria@mail.com',
      phone: '300 123 4567',
      interest: 'Maestria en Ciencia de Datos',
    })
  })
})
