import { User } from './global'

export interface Organization {
  id: string
  name: string
  description: string
  avatar_url: string
  users: User[]
}
