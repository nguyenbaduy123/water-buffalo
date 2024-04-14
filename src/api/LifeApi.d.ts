import { User } from 'types/global'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface GetAuthParams {
  access_token: string
}

export interface GetAuthResponse {
  user: User
}
