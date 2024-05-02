import { createReducer } from '@reduxjs/toolkit'
import { IssueState, ReducerMap } from './types'

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
}

const issueReducer = createReducer(initialState, reducerMap)

export default issueReducer
