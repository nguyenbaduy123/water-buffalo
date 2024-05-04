import { createReducer } from '@reduxjs/toolkit'
import { IssueState, ReducerMap } from './types'
import { SELECT_ISSUE } from 'constants/action'

const initialState: IssueState = {
  fetching: false,
  data: [],
  currentIssue: null,
}

const reducerMap: ReducerMap<IssueState> = {
  LOAD_ISSUES_REQUEST: (state) => {
    return { ...state, fetching: true }
  },
  LOAD_ISSUES_SUCCESS: (state, { payload }) => {
    return { ...state, data: payload.issues, fetching: false }
  },
  LOAD_MORE_ISSUES_SUCCESS: (state, { payload }) => {
    return {
      ...state,
      data: [...state.data, ...payload.issues],
      fetching: false,
    }
  },
  [SELECT_ISSUE]: (state, { payload }) => {
    return { ...state, currentIssue: payload.currentIssue }
  },
}

const issueReducer = createReducer(initialState, reducerMap)

export default issueReducer
