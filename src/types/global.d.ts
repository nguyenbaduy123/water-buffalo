import React from 'react'

export interface User {
  id: string
  email: string
  username: string | null
  locale: Locale
  country: string | null
  avatar_url: string | null
  name: string
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

export interface ProviderProps {
  children: React.ReactNode
}

export type ProviderFC = React.FC<ProviderProps>
