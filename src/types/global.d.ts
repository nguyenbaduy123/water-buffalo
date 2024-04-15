export interface User {
  id: string
  email: string
  username: string | null
  locale: Locale
  country: string | null
}

export type Locale = 'vi' | 'en'

export interface Workspace {
  id: number
  name: string
  owner_id: string
}

export interface Project {
  id: number
  name: string
  description: string
  status: string
  priority: number | null
  owner_id: string
}
