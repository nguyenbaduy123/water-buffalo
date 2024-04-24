import { string } from 'prop-types'
import { Project, User } from 'types/global'

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
