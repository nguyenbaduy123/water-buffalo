import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

import { LOGIN_SUCCESS, USER_AUTH_SUCCESS } from 'constants/action'
import { AuthState, ClaimsFromToken, AuthPayloadTypes } from './reducers.d'
import { assignState, createReducer } from 'utils/redux'

const initialState: AuthState = {
  userId: '',
  username: '',
  accessToken: '',
  locale: 'en',
  country: null,
}

type ReducerMap = {
  [K in keyof AuthPayloadTypes]: (
    state: AuthState,
    payload: AuthPayloadTypes[K]
  ) => AuthState
}

const reducerMap: ReducerMap = {
  [LOGIN_SUCCESS]: (state, payload) => {
    const accessToken = payload.access_token
    Cookies.set('life_jwt', accessToken, { expires: 7776000 })
    try {
      const claims: ClaimsFromToken = jwtDecode(accessToken)
      return assignState(state, {
        accessToken: accessToken,
        userId: claims.id,
        username: claims.username,
      })
    } catch (e) {
      return state
    }
  },
  [USER_AUTH_SUCCESS]: (state, payload) => {
    const user = payload.user

    return assignState(state, {
      userId: user.id,
      locale: user.locale,
      username: user.username,
      country: user.country,
    })
  },
}

const authReducer = createReducer(initialState, reducerMap)

export default authReducer
