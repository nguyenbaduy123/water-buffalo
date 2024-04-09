import { Category } from 'actions/actions.d'

export interface AuthState {
  userId: null | string
  userName: null | string
  accessToken: null | string
  locale: null | string
}

export interface ClaimsFromToken extends JwtPayload {
  id: string
  username: string
}
