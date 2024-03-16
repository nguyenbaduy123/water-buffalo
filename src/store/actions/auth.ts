import { LoginSuccessPayload } from './actions'

import { LOGIN_REQUEST, LOGIN_SUCCESS } from 'constants/index'

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export const loginSuccess = (payload: LoginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
})
