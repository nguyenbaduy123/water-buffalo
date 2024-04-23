import { jwtDecode } from 'jwt-decode'
import { HYDRATE } from 'next-redux-wrapper'
import Cookies from 'js-cookie'
import { createReducer } from '@reduxjs/toolkit'

import { LOGIN_SUCCESS, USER_AUTH_SUCCESS } from 'constants/action'
import {
  AuthState,
  ClaimsFromToken,
  AuthPayloadTypes,
  ReducerMap,
} from './types'
import { assignState } from 'utils/redux'

const initialState: AuthState = {
  userId: '',
  username: null,
  name: null,
  accessToken: '',
  locale: 'en',
  country: null,
  avatar: null,
  email: '',
}

const reducerMap: ReducerMap<AuthState, AuthPayloadTypes> = {
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
}

const authReducer = createReducer(initialState, reducerMap)

export default authReducer
