import LifeApi from 'api/LifeApi'
import { ActionFunc } from './types'
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  SELECT_PROJECT,
} from 'constants/action'
import { createPlainAction } from 'utils/redux'
import { Project, SocketPayload } from 'types/global'
import { channelConnect, infoNotification } from 'utils'

export const loadProjectsRequest = createPlainAction(LOAD_PROJECTS_REQUEST)
export const loadProjectsSuccess = createPlainAction(LOAD_PROJECTS_SUCCESS)

export const selectedProject = createPlainAction(SELECT_PROJECT)

export const updateProjectSuccess = createPlainAction('UPDATE_PROJECT_SUCCESS')

interface SelectProjectPayload {
  currentProject: Project
}
export const selectProject: ActionFunc<SelectProjectPayload> = (payload) => {
  return async (dispatch, getState) => {
    if (!payload?.currentProject) return
    const currentProject = payload.currentProject

    if (currentProject.settings) {
      dispatch(selectedProject(payload))
    } else {
      const resp = await LifeApi.loadProjectSettings(currentProject.id)
      if (resp.success) {
        await dispatch(
          selectedProject({
            currentProject: { ...currentProject, settings: resp.settings },
          })
        )
        dispatch(connectToProjectChannel())
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

const connectToProjectChannel: ActionFunc = () => {
  return async (dispatch, getState) => {
    const {
      auth: { socket, accessToken },
      project: { currentProject: currentProject },
    } = getState()

    if (!currentProject) return
    if (!socket) return

    const channel = channelConnect(
      socket,
      `projects:${currentProject.id}`,
      accessToken
    )

    channel.on('issue:toggle_tag', (payload: SocketPayload) => {
      infoNotification('Issue updated', payload.message)
    })

    return {
      type: 'CHANNEL_CONNECTED',
      payload: { channel },
    }
  }
}
