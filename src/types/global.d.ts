export interface User {
  id: string
  email: string
  username: string | null
  locale: Locale
  country: string | null
}

export type Locale = 'vi' | 'en'
