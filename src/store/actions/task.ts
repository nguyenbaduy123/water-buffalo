import {
  CREATE_TASK_SUCCESS,
  LOAD_ISSUES_REQUEST,
  LOAD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from 'constants/action'
import { createPlainAction } from 'utils/redux'
import { ActionFunc } from './types'
import LifeApi from 'api/LifeApi'

export const loadTasksSuccess = createPlainAction(LOAD_TASK_SUCCESS)

export const loadTasksRequest = createPlainAction(LOAD_ISSUES_REQUEST)

export const updateTaskSuccess = createPlainAction(UPDATE_TASK_SUCCESS)

export const createTaskSuccess = createPlainAction(CREATE_TASK_SUCCESS)

export const loadTasks: ActionFunc = () => {
  return async (dispatch, getState) => {
    const {
      issue: { currentIssue },
    } = getState()

    if (!currentIssue) return

    const resp = await LifeApi.getTasks(
      currentIssue.project_id,
      currentIssue.id
    )

    if (resp.success) {
      dispatch(loadTasksSuccess({ tasks: resp.tasks }))
    }
  }
}
