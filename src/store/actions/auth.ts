import { AppDispatch, GetStateFunc } from 'store'
import { ActionFunc, LoginSuccessPayload } from './types'

import {
  CONNECT_SOCKET_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SOCKET_CONNECTED,
  SOCKET_CONNECTING,
  USER_AUTH_SUCCESS,
} from 'constants/action'
import LifeApi from 'api/LifeApi'
import { GetAuthResponse } from 'api/LifeApi.d'
import { Socket } from 'phoenix'
import { User } from 'types/global'
import { infoNotification } from 'utils'
import { title } from 'process'

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

export const connectSocketRequest = () => ({
  type: SOCKET_CONNECTING,
})

export const connectSocketSuccess = (socket: Socket) => ({
  type: SOCKET_CONNECTED,
  payload: { socket },
})

export const connectSocketFailure = (error: string) => ({
  type: CONNECT_SOCKET_FAILURE,
  payload: error,
})

export const connectSocket: ActionFunc = () => {
  return (dispatch, getState) => {
    const {
      auth: { accessToken, userId },
    } = getState()
    dispatch(connectSocketRequest())
    // @ts-ignore
    const socket = new Socket(process.env.NEXT_PUBLIC_SOCKET_URL, {
      params: { token: accessToken },
    })

    socket.connect()

    socket.onOpen(() => {
      dispatch(connectSocketSuccess(socket))
      dispatch(connectToChannel(socket, `users:${userId}`, accessToken))
    })

    socket.onError((error: any) => {
      dispatch(connectSocketFailure(error))
      console.log('Socket error:', error)
    })

    socket.onClose(() => {
      console.log('Socket closed!')
    })

    return socket
  }
}

export const connectToChannel = (
  socket: Socket,
  channelName: string,
  accessToken: string
) => {
  const channel = socket.channel(channelName, { token: accessToken })
  channel.join()

  channel.on(
    'new_invitation',
    (payload: { from: User; project_id: number }) => {
      infoNotification(
        'New Invitation',
        `${payload.from.username} invited you to a project.`
      )
    }
  )

  return {
    type: 'CHANNEL_CONNECTED',
    payload: channel,
  }
}
