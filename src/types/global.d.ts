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

export interface UserProject extends User {
  permission: 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'
}

export interface Project {
  id: number | string
  name: string
  description: string
  status: string
  priority: number | null
  owner_id: string
  owner: User
  users: UserProject[]
  issue_open_count: number
  issue_closed_count: number
  issue_completed_count: number
}

export interface NotificationMap {
  PROJECT_INVITATION: {
    project_id: number
    from: User
    invitation_id: string
  }
}

export type NotificationType = keyof NotificationMap
export interface Notification<T extends NotificationType = NotificationType> {
  id: number
  message: string
  type: T
  seen: boolean
  inserted_at: string
  detail: NotificationMap[T]
}

export interface ProviderProps {
  children: React.ReactNode
}

export type ProviderFC = React.FC<ProviderProps>
