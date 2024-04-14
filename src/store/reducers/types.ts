import { JwtPayload } from 'jwt-decode'
import { Locale, User } from 'types/global'

export interface AuthState {
  userId: string
  username: string | null
  accessToken: string
  locale: Locale
  country: string | null
}

export interface ClaimsFromToken extends JwtPayload {
  id: string
  username: string
}

export interface AuthPayloadTypes {
  LOGIN_SUCCESS: { access_token: string }
  USER_AUTH_SUCCESS: { user: User }
}

export interface AuthActions<T extends keyof AuthPayloadTypes> {
  action: T
  payload: AuthPayloadTypes[T]
}
