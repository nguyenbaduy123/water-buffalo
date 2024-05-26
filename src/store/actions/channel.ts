import LifeApi from 'api/LifeApi'
import { CreateChannelParams } from 'api/LifeApi.d'
import {
  CHANNEL_NEW_MESSAGE,
  LOAD_CHANNELS_REQUEST,
  LOAD_CHANNELS_SUCCESS,
  LOAD_CHANNEL_MESSAGES_REQUEST,
  LOAD_CHANNEL_MESSAGES_SUCCESS,
  SELECT_CHANNEL,
} from 'constants/action'
import { AppDispatch, GetStateFunc } from 'store'
import { createPlainAction } from 'utils/redux'

export const loadChannelsSuccess = createPlainAction(LOAD_CHANNELS_SUCCESS)

export const loadChannelsRequest = createPlainAction(LOAD_CHANNELS_REQUEST)

export const loadChannelMessageRequest = createPlainAction(
  LOAD_CHANNEL_MESSAGES_REQUEST
)

export const loadMessageSuccess = createPlainAction(
  LOAD_CHANNEL_MESSAGES_SUCCESS
)

export const channelNewMessage = createPlainAction(CHANNEL_NEW_MESSAGE)

export const selectChannel = (channelId: string) => {
  return {
    type: SELECT_CHANNEL,
    payload: { currentChannelId: channelId },
  }
}

export const loadChannels = (organizationId: string) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const resp = await LifeApi.loadChannels(organizationId)

    if (resp.success) {
      dispatch(loadChannelsSuccess({ channels: resp.channels }))
    }
  }
}

export const createChannel = (
  organizationId: string,
  payload: CreateChannelParams
) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const resp = await LifeApi.createChannel(organizationId, payload)

    if (resp.success) {
      dispatch(loadChannels(organizationId))
    }
  }
}

export const loadMessages = (channelId: string) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      organization: { currentOrganization },
    } = getState()
    if (!currentOrganization) return
    dispatch(loadChannelMessageRequest())
    const resp = await LifeApi.getChannelMessages(
      currentOrganization.id,
      channelId
    )

    if (resp.success) {
      dispatch(loadMessageSuccess({ messages: resp.messages }))
    }
  }
}
