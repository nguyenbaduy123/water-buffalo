import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../../constants'
import { createReducer } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

import { AuthState, ClaimsFromToken } from './reducers.d'

const initialState: AuthState = {
  userId: null,
  userName: null,
  accessToken: null,
  locale: null,
}

export default createReducer(initialState, {
  [LOGIN_REQUEST]: (state) => {
    return Object.assign({}, state, {
      fetching: true,
    })
  },
  [LOGIN_SUCCESS]: (state, { payload }) => {
    const accessToken = payload.access_token
    Cookies.set('life_jwt', accessToken, { expires: 7776000 })
    try {
      const claims: ClaimsFromToken = jwtDecode(accessToken)
      return Object.assign({}, state, {
        accessToken: accessToken,
        useId: claims.id,
        userName: claims.username,
      })
    } catch (e) {
      return state
    }
  },
})
