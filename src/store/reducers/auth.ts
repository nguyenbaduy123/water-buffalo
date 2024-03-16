import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../../constants'
import { createReducer } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

import { AuthState, ClaimsFromToken } from './reducers.d'

const initialState: AuthState = {
  userId: null,
  userName: null,
  accessToken: null,
  locale: null,
  group: null,
}

export default createReducer(initialState, {
  [LOGIN_REQUEST]: (state) => {
    return Object.assign({}, state, {
      fetching: true,
    })
  },
  [LOGIN_SUCCESS]: (state, { payload }) => {
    const accessToken = payload.access_token
    try {
      const claims: ClaimsFromToken = jwtDecode(accessToken)
      return Object.assign({}, state, {
        accessToken: accessToken,
        userName: claims.user_name,
        useId: claims.user_id,
      })
    } catch (e) {
      return state
    }
  },
})
