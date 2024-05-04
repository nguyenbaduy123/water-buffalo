import LifeApi from 'api/LifeApi'
import { ActionFunc } from './types'
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  SELECT_PROJECT,
} from 'constants/action'
import { createPlainAction } from 'utils/redux'
import { Project } from 'types/global'

export const loadProjectsRequest = createPlainAction(LOAD_PROJECTS_REQUEST)
export const loadProjectsSuccess = createPlainAction(LOAD_PROJECTS_SUCCESS)

export const selectedProject = createPlainAction(SELECT_PROJECT)

interface SelectProjectPayload {
  currentProject: Project
}
export const selectProject: ActionFunc<SelectProjectPayload> = (payload) => {
  return async (dispatch, getState) => {
    if (!payload?.currentProject) return
    const currentProject = payload.currentProject
    console.log(currentProject.settings)

    if (currentProject.settings) {
      dispatch(selectedProject(payload))
    } else {
      const resp = await LifeApi.loadProjectSettings(currentProject.id)
      if (resp.success) {
        dispatch(
          selectedProject({
            currentProject: { ...currentProject, settings: resp.settings },
          })
        )
      }
    }
  }
}

export const loadProjects: ActionFunc = () => {
  return async (dispatch, getState) => {
    dispatch(loadProjectsRequest())

    try {
      const resp = await LifeApi.getProjects({})

      if (resp.success) {
        dispatch(loadProjectsSuccess({ projects: resp.projects }))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
