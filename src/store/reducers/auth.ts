import { jwtDecode } from 'jwt-decode'
import { HYDRATE } from 'next-redux-wrapper'
import Cookies from 'js-cookie'
import { createReducer } from '@reduxjs/toolkit'

import {
  LOGIN_SUCCESS,
  SOCKET_CONNECTED,
  SOCKET_CONNECTING,
  USER_AUTH_SUCCESS,
} from 'constants/action'
import { AuthState, ClaimsFromToken, ReducerMap } from './types'
import { assignState } from 'utils/redux'

const initialState: AuthState = {
  fetching: false,
  userId: '',
  username: '',
  name: null,
  accessToken: '',
  locale: 'en',
  country: null,
  avatar: null,
  email: '',
  socket: null,
}

const reducerMap: ReducerMap<AuthState> = {
  [HYDRATE]: (state, { payload }) => {
    return { ...state, ...payload.auth }
  },

  [LOGIN_SUCCESS]: (state, { payload }) => {
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

  [USER_AUTH_SUCCESS]: (state, { payload }) => {
    const user = payload.user

    return assignState(state, {
      userId: user.id,
      locale: user.locale,
      username: user.username,
      country: user.country,
      avatar: user.avatar_url,
      name: user.name,
      email: user.email,
    })
  },

  [SOCKET_CONNECTING]: (state) => {
    return assignState(state, { fetching: true })
  },

  [SOCKET_CONNECTED]: (state, { payload }) => {
    return assignState(state, { socket: payload.socket, fetching: false })
  },
}

const authReducer = createReducer(initialState, reducerMap)

export default authReducer
