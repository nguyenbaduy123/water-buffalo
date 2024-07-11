import LifeApi from 'api/LifeApi'
import {
  LOAD_CONVERSATIONS_SUCCESS,
  NEW_CONVERSATION,
  NEW_MESSAGE,
  SELECT_CONVERSATION,
  UNSELECT_CONVERSATION,
} from 'constants/action'
import { AppDispatch, GetStateFunc } from 'store'
import { Conversation, Message } from 'types/message'
import { createPlainAction } from 'utils/redux'

export const loadConversationsSuccess = createPlainAction(
  LOAD_CONVERSATIONS_SUCCESS
)

export const loadConversations = () => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      auth: { userId },
    } = getState()

    const resp = await LifeApi.loadConversations()

    if (resp.success) {
      dispatch({
        type: LOAD_CONVERSATIONS_SUCCESS,
        payload: { conversations: resp.conversations },
      })
    }
  }
}

export const newConversation = (conversation: Conversation) => {
  return {
    type: NEW_CONVERSATION,
    payload: { conversation },
  }
}

export const unselectConversation = () => {
  return {
    type: UNSELECT_CONVERSATION,
  }
}

export const newMessage = (conversation: Conversation, message: Message) => {
  return {
    type: NEW_MESSAGE,
    payload: { conversation, message },
  }
}

export const selectConversation = (conversation: Conversation) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const resp = await LifeApi.loadMessages(conversation.id)

    if (resp.success) {
      dispatch({
        type: SELECT_CONVERSATION,
        payload: { conversation: { ...conversation, messages: resp.messages } },
      })
    }
  }
}
