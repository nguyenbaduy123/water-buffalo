import { LOAD_USER_NOTIFICATIONS } from 'constants/action'
import { NotificationState, ReducerMap } from './types'
import { createReducer } from '@reduxjs/toolkit'

const initialState: NotificationState = {
  data: [],
  fetching: false,
}

const reducerMap: ReducerMap<NotificationState> = {
  [LOAD_USER_NOTIFICATIONS]: (state, { payload }) => {
    return { ...state, data: payload.notifications, fetching: false }
  },
}

const notificationReducer = createReducer(initialState, reducerMap)

export default notificationReducer
