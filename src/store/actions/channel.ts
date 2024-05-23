import LifeApi from 'api/LifeApi'
import { CreateChannelParams } from 'api/LifeApi.d'
import {
  LOAD_CHANNELS_REQUEST,
  LOAD_CHANNELS_SUCCESS,
  SELECT_CHANNEL,
} from 'constants/action'
import { AppDispatch, GetStateFunc } from 'store'
import { createPlainAction } from 'utils/redux'

export const loadChannelsSuccess = createPlainAction(LOAD_CHANNELS_SUCCESS)

export const loadChannelsRequest = createPlainAction(LOAD_CHANNELS_REQUEST)

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
