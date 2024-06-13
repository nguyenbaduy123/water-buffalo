import { createReducer } from '@reduxjs/toolkit'
import { IssueState, ReducerMap } from './types'
import { SELECT_ISSUE, UPDATE_ISSUE_SUCCESS } from 'constants/action'

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

  [UPDATE_ISSUE_SUCCESS]: (state, { payload }) => {
    const currentIssue = state.currentIssue

    return {
      ...state,
      currentIssue:
        currentIssue && currentIssue.id == payload.issue.id
          ? { ...currentIssue, ...payload.issue }
          : currentIssue,
      data: state.data.map((issue) => {
        if (issue.id === payload.issue.id) {
          return { ...issue, ...payload.issue }
        }
        return issue
      }),
    }
  },

  LOAD_ISSUES_FAILED: (state) => {
    return { ...state, fetching: false }
  },
}

const issueReducer = createReducer(initialState, reducerMap)

export default issueReducer
