import {
  LOAD_CONVERSATIONS,
  LOAD_CONVERSATIONS_SUCCESS,
  NEW_CONVERSATION,
  NEW_MESSAGE,
  SELECT_CONVERSATION,
  UNSELECT_CONVERSATION,
} from 'constants/action'
import { ConversationState, ReducerMap } from './types'
import { createReducer } from '@reduxjs/toolkit'

const initialState: ConversationState = {
  fetching: false,
  data: [],
  selected: null,
}

const reducerMap: ReducerMap<ConversationState> = {
  [LOAD_CONVERSATIONS]: (state) => {
    return { ...state, fetching: true }
  },

  [LOAD_CONVERSATIONS_SUCCESS]: (state, { payload }) => {
    return { ...state, fetching: false, data: payload.conversations }
  },
  [NEW_CONVERSATION]: (state, { payload }) => {
    const data = state.data.some((c) => c.id == payload.conversation.id)
      ? state.data
      : [payload.conversation, ...state.data]
    return {
      ...state,
      data: data,
      selected: payload.conversation,
    }
  },
  [UNSELECT_CONVERSATION]: (state) => {
    return { ...state, selected: null }
  },

  [SELECT_CONVERSATION]: (state, { payload }) => {
    const idx = state.data.findIndex((c) => c.id == payload.conversation.id)
    let data = state.data
    if (idx == -1) {
      data = [payload.conversation, ...state.data]
    }

    return { ...state, selected: payload.conversation }
  },

  [NEW_MESSAGE]: (state, { payload }) => {
    const selectedConvsation = state.selected || {
      ...payload.conversation,
      messages: [],
    }
    return {
      ...state,
      selected: {
        ...selectedConvsation,
        messages: [...selectedConvsation.messages, payload.message],
      },
    }
  },
}

const conversationReducer = createReducer(initialState, reducerMap)

export default conversationReducer
