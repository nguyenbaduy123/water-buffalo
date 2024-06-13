import { FileUploaded } from './global'

export interface UserProject {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string | null
  permission: string
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
  reference_ids: string[]
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
  attachments: Attachment[]
}

export type Attachment = FileUploaded

export interface UpdateTaskResponse {
  task: Task
}

export interface ProjectStatistics {
  issue_count: number
  issue_open_count: number
  issue_completed_count: number
  issue_not_planned_count: number
  task_count: number
  task_completed_count: number
  task_total_score: number
  issue_total_score: number
  project_progress: number
  project_evaluation: number
}
