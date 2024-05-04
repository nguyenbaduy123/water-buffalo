import { createPlainAction } from 'utils/redux'
import { ActionFunc } from './types'
import { LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from 'constants/action'
import LifeApi from 'api/LifeApi'
import { Issue } from 'types/project'

export const loadIssuesRequest = createPlainAction(LOAD_ISSUES_REQUEST)

export const loadIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

export const loadMoreIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

interface LoadIssueArgs {
  status: Issue['status']
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
