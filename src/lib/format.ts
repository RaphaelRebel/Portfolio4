export const padNumber = (value: number) => String(value).padStart(2, '0')

export const formatIndex = (value: number) => `( ${padNumber(value)} )`

export const formatCounter = (position: number, total: number) => `( ${padNumber(position)}/${padNumber(total)} )`

export const isExternalHref = (href: string) => /^https?:\/\//.test(href)

export const toPhoneHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return `tel:${digits}`
  if (digits.startsWith('0')) return `tel:+31${digits.slice(1)}`
  return `tel:${digits}`
}
