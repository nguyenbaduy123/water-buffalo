import { createReducer } from '@reduxjs/toolkit'
import { ChannelState, ReducerMap } from './types'

const initialState: ChannelState = {
  data: [],
  fetching: false,
  currentChannelId: '',
}

const reducerMap: ReducerMap<ChannelState> = {
  LOAD_CHANNELS_REQUEST: (state) => {
    return { ...state, fetching: true }
  },
  LOAD_CHANNELS_SUCCESS: (state, { payload }) => {
    return { ...state, data: payload.channels, fetching: false }
  },
  SELECT_CHANNEL: (state, { payload }) => {
    return { ...state, currentChannelId: payload.currentChannelId }
  },
}

const channelReducer = createReducer(initialState, reducerMap)

export default channelReducer
