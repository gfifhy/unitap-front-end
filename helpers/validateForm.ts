import type { FormError } from '@nuxt/ui/dist/runtime/types'

export const validateForm = (state: any, fields: string[]): FormError[] => {
  const errors = []
  const msg = (v) => {
    if (!state[v]) errors.push({ path: v, message: 'Required' })
  }
  for (let i of fields) msg(i)
  if (errors.length > 0) {
    console.error('Form validation errors:', errors)
  } 
  return errors
}