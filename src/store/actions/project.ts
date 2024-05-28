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
import { AppDispatch, GetStateFunc } from 'store'

export const loadProjectsRequest = createPlainAction(LOAD_PROJECTS_REQUEST)
export const loadProjectsSuccess = createPlainAction(LOAD_PROJECTS_SUCCESS)

export const selectedProject = createPlainAction(SELECT_PROJECT)

export const updateProjectSuccess = createPlainAction('UPDATE_PROJECT_SUCCESS')

export const selectProject = (projectId: number) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      auth: { userId },
      project: { data: projects },
    } = getState()
    const currentProject = projects.find((project) => project.id === projectId)

    const userProject = currentProject?.users.find((user) => user.id === userId)

    if (!currentProject || !userProject) return

    const resp = await LifeApi.loadProjectSettings(currentProject.id)
    if (resp.success) {
      dispatch(
        selectedProject({
          currentProject: { ...currentProject, settings: resp.settings },
          currentUserProject: userProject,
        })
      )
      dispatch(connectToProjectChannel())
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

    channel.on('projects:updated', (payload: SocketPayload<Project>) => {
      dispatch(updateProjectSuccess({ project: payload.info }))
    })

    channel.on('projects:closed', () => {
      infoNotification('Project closed', 'This project has been closed')
      location.href = '/dashboard'
    })

    return {
      type: 'CHANNEL_CONNECTED',
      payload: { channel },
    }
  }
}
