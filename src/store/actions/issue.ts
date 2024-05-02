import { createPlainAction } from 'utils/redux'
import { ActionFunc } from './types'
import { LOAD_ISSUES_REQUEST, LOAD_ISSUES_SUCCESS } from 'constants/action'
import LifeApi from 'api/LifeApi'

export const loadIssuesRequest = createPlainAction(LOAD_ISSUES_REQUEST)

export const loadIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

export const loadMoreIssuesSuccess = createPlainAction(LOAD_ISSUES_SUCCESS)

export const loadIssues: ActionFunc = () => {
  return async (dispatch, getState) => {
    const {
      project: { currentProject },
    } = getState()

    if (!currentProject) return
    dispatch(loadIssuesRequest())

    const resp = await LifeApi.loadIssues(currentProject.id)

    if (resp.success) {
      dispatch(loadIssuesSuccess({ issues: resp.issues }))
    }
  }
}

export const loadMoreIssues: ActionFunc = () => {
  return async (dispatch, getState) => {
    const {
      project: { currentProject },
      issue,
    } = getState()

    if (!currentProject) return
    dispatch(loadIssuesRequest())
    const resp = await LifeApi.loadIssues(currentProject.id, {
      current_count: issue.data.length,
    })
    if (resp.success) {
      dispatch(loadMoreIssuesSuccess({ issues: resp.issues }))
    }
  }
}
