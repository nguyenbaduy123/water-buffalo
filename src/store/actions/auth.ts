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
import { SocketPayload, User } from 'types/global'
import { channelConnect, getProjectRoute, infoNotification } from 'utils'
import Router from 'next/router'
import { notification } from 'antd'

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
      dispatch(connectToChannel(`users:${userId}`))
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

export const connectToChannel = (channelName: string) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      auth: { socket, accessToken },
    } = getState()
    if (!socket) return

    const channel = channelConnect(socket, channelName, accessToken)

    channel.on(
      'new_invitation',
      (payload: { from: User; project_id: number }) => {
        infoNotification(
          'New Invitation',
          `${payload.from.username} invited you to a project.`
        )
      }
    )

    channel.on('issue:toggle_assign', (payload: SocketPayload) => {
      infoNotification('New comment', payload.message)
    })

    channel.on('issue:toggle_reference', (payload: SocketPayload) => {
      infoNotification('New comment', payload.message)
    })

    channel.on('messages:new_comment', (payload: SocketPayload) => {
      const {
        project: { data: projects },
      } = getState()
      const detail = payload.detail
      const { project_id } = detail
      const project = projects.find((p) => p.id == project_id)

      notification.info({
        message: 'New comment',
        description: payload.message,
        style: { cursor: 'pointer' },
        onClick: () => {
          if (!project) return
          Router.push(
            `/project/issues/issue?owner_name=${project?.owner.id}&project_name=${project?.name}&issue_id=${detail.issue_id}`,
            `${getProjectRoute(project, `/issues/${detail.issue_id}`)}`
          )
          notification.destroy()
        },
      })
    })

    return {
      type: 'CHANNEL_CONNECTED',
      payload: channel,
    }
  }
}
