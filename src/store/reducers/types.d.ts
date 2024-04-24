import { JwtPayload } from 'jwt-decode'
import { Locale, Project, User } from 'types/global'
import { HYDRATE } from 'next-redux-wrapper'

export interface Actions<T extends keyof PayloadTypes> {
  type: T
  payload: PayloadTypes[T]
}

export type SingleAction = Actions<keyof PayloadTypes>

export type ReducerMap<S> = Partial<{
  [K in keyof PayloadTypes]: (state: S, action: Actions<K>) => S
}>

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
}
