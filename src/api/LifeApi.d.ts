import {
  Project,
  User,
  Notification,
  FileUploaded,
  Permissions,
} from 'types/global.d'
import { Message } from 'types/message'
import { Channel, Organization } from 'types/organization'
import {
  Attachment,
  Issue,
  IssueStatistic,
  ProjectSettings,
  ProjectStatistics,
  Tag,
  Task,
} from 'types/project'

export interface LoginParams {
  username: string
  password: string
}

export interface SignupParams {
  email: string
  password: string
  username: string
}

export interface SignupResponse {
  user: User
}

export interface LoginResponse {
  access_token: string
}

export interface GetAuthParams {
  access_token: string
}

export type ValidateFieldParams = { email: string } | { username: string }

export interface GetAuthResponse {
  user: User
}

export interface GetProjectsParams {
  keyword?: string
}

export interface GetProjectsResponse {
  projects: Project[]
}

export interface CreateProjectParams {
  name: string
  description: string
}

export interface CreateProjectResponse {
  project: Project
}

export interface ValidateProjectNameParams {
  name: string
}

export interface ValidateProjectNameResponse {
  is_valid: boolean
}

export interface GetProjectResponse {
  project: Project
}

export interface SearchUserResponse {
  users: User[]
}

export interface LoadNotificationsResponse {
  notifications: Notification[]
}

export interface LoadIssuesParams {
  current_count?: number
  status?: string
}

export interface LoadIssuesResponse {
  issues: Issue[]
}

export interface SubmitIssueParams {
  title: string
  description: string
  assignee_ids: string[]
  priority: number
  tag_ids: number[]
  tasks: CreateTaskParams[]
  milestone: Date | null
}

export interface SubmitIssueResponse {
  issue: Issue
}

export interface loadProjectSettingsResponse {
  settings: ProjectSettings
}

export interface GetIssueDetailResponse {
  issue: Issue
}

export interface UploadFileResponse {
  file: Attachment
}

export interface CreateTaskParams {
  title: string
  description: string
}

export interface CreateTaskResponse {
  task: Task
}

export interface GetTasksResponse {
  tasks: Task[]
}

export interface UpdateTaskResponse {
  task: Task
}

export interface UpdateIssueResponse {
  issue: Issue
}

export interface ToggleAssigneeResponse {
  issue: Issue
}

export interface ToggleTagResponse {}

export interface AddTagParams {
  name: string
  color: string
  description: string
}

export interface AddTagResponse {
  tag: Tag
}

export interface UpdateTaskParams extends Partial<Task> {}

export interface MessageResponse {
  message: Message
}

export interface MessagesResponse {
  messages: Message[]
}

export interface CreateOrganizationParams {
  name: string
  description: string
  avatar_url: string
}

export interface CreateOrganizationResponse {
  organization: Organization
}

export interface LoadOrganizationsResponse {
  organizations: Organization[]
}

export interface GetOrganizationResponse {
  organization: Organization
}

export interface CloseIssueParams {
  is_completed: boolean
}

export interface UpdateProjectPermissionParams {
  user_id: string
  permission: Permissions | 'remove'
}

export interface LoadChannelsResponse {
  channels: Channel[]
}

export interface CreateChannelParams {
  name: string
}

export interface CreateChannelResponse {
  channel: Channel
}

export interface SendMessageParams {
  message: string
  attachments?: FileUploaded[] | null
}

export interface TransferProjectOwnershipParams {
  email: string
}

export interface SearchIssueParams {
  keyword?: string
  assignee_id?: string
  tag_ids?: number[]
  current_count?: number
  status: Issue['status']
}

export interface UpdateIssueParams extends Partial<Issue> {}

export interface GetProjectCommentsParams {
  current_count?: number
}

export interface GetProjectStatisticsResponse {
  statistic: ProjectStatistics
  issue_statistic: IssueStatistic[]
}
