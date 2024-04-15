import { JwtPayload } from 'jwt-decode'
import { Locale, User } from 'types/global'
import { HYDRATE } from 'next-redux-wrapper'

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
  [HYDRATE]: { auth: AuthState }
  LOGIN_SUCCESS: { access_token: string }
  USER_AUTH_SUCCESS: { user: User }
}

export interface AuthActions<T extends keyof AuthPayloadTypes> {
  action: T
  payload: AuthPayloadTypes[T]
}
