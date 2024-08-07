import React from 'react'
import { IssueStatus, ProjectSettings } from './project'
import { Message } from './message'

export interface User {
  id: string
  email: string
  username: string
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

export type Permissions = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'

export interface UserProject extends User {
  permission: 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'
}

export interface Project {
  id: number
  name: string
  description: string
  status: string
  priority: number | null
  owner_id: string
  users: UserProject[]
  issue_open_count: number
  issue_count: number
  settings: ProjectSettings
  comments?: Message[]
  is_personal: boolean
}

export interface NotificationMap {
  PROJECT_INVITATION: {
    project_id: number
    from: User
    invitation_id: string
  }
  'organization:invitation': {
    organization_id: string
    from: User
    invitation_id: string
  }
}

export type NotificationType = keyof NotificationMap
export interface Notification<T extends NotificationType = NotificationType> {
  id: number
  message: string
  type: string
  seen: boolean
  inserted_at: string
  detail: Record<string, any>
}

export interface ProviderProps {
  children: React.ReactNode
}

export type ProviderFC = React.FC<ProviderProps>

export interface FileUploaded {
  id: string
  name: string
  url: string
  type: string
}

export interface SocketPayload<T = Record<string, any>> {
  type: string
  message: string
  info: T
}

export interface UserStatistics {
  projects: number
  issues: {
    status: IssueStatus
    count: number
  }[]
  tasks: number
  owner_projects: number
}
