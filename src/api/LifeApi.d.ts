import { User } from 'types/global'

export interface BaseResponse {
  success: boolean
  message?: string
  code?: number
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse extends BaseResponse {
  access_token: string
}

export interface GetAuthParams {
  access_token: string
}

export interface GetAuthResponse extends BaseResponse {
  user: User
}
