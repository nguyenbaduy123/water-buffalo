import { createReducer } from '@reduxjs/toolkit'
import { ChannelState, ReducerMap } from './types'
import {
  LOAD_CHANNELS_REQUEST,
  LOAD_CHANNELS_SUCCESS,
  SELECT_CHANNEL,
  LOAD_CHANNEL_MESSAGES_REQUEST,
  LOAD_CHANNEL_MESSAGES_SUCCESS,
  CHANNEL_NEW_MESSAGE,
} from 'constants/action'

const initialState: ChannelState = {
  data: [],
  fetching: false,
  currentChannelId: '',
  messages: [],
  fetchingMessages: false,
}

const reducerMap: ReducerMap<ChannelState> = {
  [LOAD_CHANNELS_REQUEST]: (state) => {
    return { ...state, fetching: true }
  },
  [LOAD_CHANNELS_SUCCESS]: (state, { payload }) => {
    return { ...state, data: payload.channels, fetching: false }
  },
  [SELECT_CHANNEL]: (state, { payload }) => {
    return { ...state, currentChannelId: payload.currentChannelId }
  },
  [LOAD_CHANNEL_MESSAGES_REQUEST]: (state) => {
    return { ...state, fetchingMessages: true }
  },
  [LOAD_CHANNEL_MESSAGES_SUCCESS]: (state, { payload }) => {
    return { ...state, messages: payload.messages, fetchingMessages: false }
  },
  [CHANNEL_NEW_MESSAGE]: (state, { payload }) => {
    return { ...state, messages: [...state.messages, payload.message] }
  },
}

const channelReducer = createReducer(initialState, reducerMap)

export default channelReducer
