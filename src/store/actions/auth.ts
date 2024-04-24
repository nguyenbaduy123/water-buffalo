import { AppDispatch, GetStateFunc } from 'store'
import { ActionFunc, LoginSuccessPayload } from './types'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  USER_AUTH_SUCCESS,
} from 'constants/action'
import LifeApi from 'api/LifeApi'
import { GetAuthResponse } from 'api/LifeApi.d'

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}

export const loginSuccess = (payload: LoginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload: payload,
})

export const userAuthSuccess = (payload: GetAuthResponse) => {
  return {
    type: USER_AUTH_SUCCESS,
    payload,
  }
}

export const getUserAuth: ActionFunc<undefined> = () => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      auth: { accessToken },
    } = getState()
    const resp = await LifeApi.getAuth({ access_token: accessToken })

    if (resp.success) {
      dispatch(userAuthSuccess(resp))
    }
  }
}
