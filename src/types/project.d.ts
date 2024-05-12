export interface UserProject {
  id: number
  name: string
  username: string
  email: string
  avatar_url: string | null
  role: string
}

export type IssueStatus = 'open' | 'closed' | 'completed'

export interface Issue {
  id: number
  title: string
  description: string
  status: IssueStatus
  priority: number | null
  inserted_at: string
  assignee_ids: string[]
  created_by_id: string
  project_id: number
  inserted_at: string
  updated_at: string
  assignee_ids: string[]
  tag_ids: number[]
}

export interface Tag {
  id: number
  name: string
  color: string
}
export interface ProjectSettings {
  tags: Tag[]
}

export interface Task {
  id: number
  title: string
  description: string
  inserted_at: string
  updated_at: string
  status: string
  priority: number
  issue_id: number
  project_id: number
  result: string
  attachments: Record<string, any>[]
}
