import { JwtPayload } from 'jwt-decode'
import { Locale, Project, User } from 'types/global'
import { HYDRATE } from 'next-redux-wrapper'

export interface Actions<T extends keyof A, A> {
  type: T
  payload: A[T]
}

export type ReducerMap<S, P> = {
  [K in keyof P]: (state: S, payload: Actions<K, P>) => S
}

export interface AuthState {
  userId: string
  username: string | null
  name: string | null
  accessToken: string
  locale: Locale
  country: string | null
  avatar: string | null
  email: string
}

export interface ProjectState {
  fetching: boolean
  data: Project[]
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

export interface ProjectPayloadTypes {
  LOAD_PROJECTS_REQUEST: {}
  LOAD_PROJECTS_SUCCESS: { projects: Project[] }
}
