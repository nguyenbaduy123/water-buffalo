import { JwtPayload } from 'jwt-decode'
import { Locale, Notification, Project, User } from 'types/global'
import { HYDRATE } from 'next-redux-wrapper'
import { Socket } from 'phoenix'
import { Issue, Task } from 'types/project'

export interface Actions<T extends keyof PayloadTypes> {
  type: T
  payload: PayloadTypes[T]
}

export type SingleAction = Actions<keyof PayloadTypes>

export type ReducerMap<S> = Partial<{
  [K in keyof PayloadTypes]: (state: S, action: Actions<K>) => S
}>

export interface AuthState {
  fetching: boolean
  userId: string
  username: string | null
  name: string | null
  accessToken: string
  locale: Locale
  country: string | null
  avatar: string | null
  email: string
  socket: Socket | null
}

interface ProjectDetail extends Project {
  users: User[]
  issues: Issue[]
}

export interface ProjectState {
  fetching: boolean
  data: Project[]
  currentProject: Project | null
}

export type Payload = PayloadTypes[keyof PayloadTypes]

export interface ClaimsFromToken extends JwtPayload {
  id: string
  username: string
}

export interface PayloadTypes {
  [HYDRATE]: { auth: AuthState }
  LOGIN_SUCCESS: { access_token: string }
  USER_AUTH_SUCCESS: { user: User }

  LOAD_PROJECTS_REQUEST: undefined
  LOAD_PROJECTS_SUCCESS: { projects: Project[] }
  SELECT_PROJECT: { currentProject: Project }

  SOCKET_CONNECTING: undefined
  SOCKET_CONNECTED: { socket: Socket }
  CONNECT_SOCKET_FAILURE: { error: string }

  LOAD_USER_NOTIFICATIONS: { notifications: Notification[] }

  LOAD_ISSUES_REQUEST: undefined
  LOAD_ISSUES_SUCCESS: { issues: Issue[] }
  LOAD_MORE_ISSUES_SUCCESS: { issues: Issue[] }
  SELECT_ISSUE: { currentIssue: Issue }

  LOAD_TASK_REQUEST: undefined
  LOAD_TASK_SUCCESS: { tasks: Task[] }
  UPDATE_TASK_SUCCESS: { task: Task }
  CREATE_TASK_SUCCESS: { task: Task }
}

export interface NotificationState {
  data: Notification[]
  fetching: boolean
}

export interface IssueState {
  data: Issue[]
  fetching: boolean
  currentIssue: Issue | null
}

export interface TaskState {
  data: Task[]
  fetching: boolean
}
