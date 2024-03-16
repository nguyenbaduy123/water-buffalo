import { Category } from 'actions/actions.d'

export interface AuthState {
  userId: null | string
  userName: null | string
  accessToken: null | string
  locale: null | string
  group: null | string
}

export interface ClaimsFromToken extends JwtPayload {
  user_id: string
  user_name: string
}

