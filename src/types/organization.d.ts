import { User } from './global'

export interface Channel {
  id: string
  name: string
  organization_id: string
  users: User[]
}

export interface OrganizationUser {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string | null
  permission: string
}

export interface Organization {
  id: string
  name: string
  description: string
  avatar_url: string
  username: string
  users: User[]
  channels: Channel[]
  user_permission: string
  teams: Team[]
}

export interface Team {
  id: string
  name: string
  description: string
  user_ids: string[]
}
