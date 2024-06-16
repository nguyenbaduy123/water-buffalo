import { createPlainAction } from 'utils/redux'
import { ActionFunc } from './types'
import {
  LOAD_ISSUES_REQUEST,
  LOAD_ISSUES_SUCCESS,
  LOAD_ISSUES_FAILED,
  SELECT_ISSUE,
  UPDATE_ISSUE_SUCCESS,
} from 'constants/action'
import LifeApi from 'api/LifeApi'
import { Issue } from 'types/project'
import { SearchIssueParams } from 'api/LifeApi.d'
import { AppDispatch, GetStateFunc } from 'store'

export const loadIssuesRequest = createPlainAction(LOAD_ISSUES_REQUEST)

export const loadIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

export const loadMoreIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

export const selectIssue = createPlainAction(SELECT_ISSUE)

export const updateIssueSuccess = createPlainAction(UPDATE_ISSUE_SUCCESS)

export const loadIssuesFailed = createPlainAction(LOAD_ISSUES_FAILED)

export const searchIssues = (params: SearchIssueParams) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      project: { currentProject },
    } = getState()

    if (!currentProject) return
    dispatch(loadIssuesRequest())

    const resp = await LifeApi.searchIssues(currentProject.id, params)

    if (resp.success) {
      dispatch(loadIssuesSuccess({ issues: resp.issues }))
    } else {
      loadIssuesFailed()
    }
  }
}

interface LoadIssueArgs {
  status: string
}
export const loadIssues: ActionFunc<LoadIssueArgs> = (payload) => {
  return async (dispatch, getState) => {
    const {
      project: { currentProject },
    } = getState()

    if (!currentProject) return
    dispatch(loadIssuesRequest())

    const resp = await LifeApi.loadIssues(currentProject.id, {
      status: payload?.status,
    })

    if (resp.success) {
      dispatch(loadIssuesSuccess({ issues: resp.issues }))
    }
  }
}

export const loadMoreIssues: ActionFunc<LoadIssueArgs> = (payload) => {
  return async (dispatch, getState) => {
    const {
      project: { currentProject },
      issue,
    } = getState()

    if (!currentProject) return
    dispatch(loadIssuesRequest())
    const resp = await LifeApi.loadIssues(currentProject.id, {
      current_count: issue.data.length,
      status: payload?.status,
    })
    if (resp.success) {
      dispatch(loadMoreIssuesSuccess({ issues: resp.issues }))
    }
  }
}
