import LifeApi from 'api/LifeApi'
import { ActionFunc } from './types'
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECT_COMMENTS_SUCCESS,
  PROJECT_NEW_COMMENT,
  SELECT_PROJECT,
  UPDATE_PROJECT_SUCCESS,
} from 'constants/action'
import { createPlainAction } from 'utils/redux'
import { Project, SocketPayload } from 'types/global'
import { channelConnect, infoNotification } from 'utils'
import { AppDispatch, GetStateFunc } from 'store'
import { updateIssueSuccess } from './issue'
import { Issue, Task } from 'types/project'
import { updateTaskSuccess } from './task'
import { Message } from 'types/message'
import { selectOrganization } from './organization'

export const loadProjectsRequest = createPlainAction(LOAD_PROJECTS_REQUEST)
export const loadProjectsSuccess = createPlainAction(LOAD_PROJECTS_SUCCESS)

export const selectedProject = createPlainAction(SELECT_PROJECT)

export const updateProjectSuccess = createPlainAction(UPDATE_PROJECT_SUCCESS)

export const loadProjectCommentsSuccess = createPlainAction(
  LOAD_PROJECT_COMMENTS_SUCCESS
)

export const projectNewComment = createPlainAction(PROJECT_NEW_COMMENT)

export const loadProjectComments = (projectId: number) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      project: { currentProject },
    } = getState()

    if (!currentProject) return

    const resp = await LifeApi.getProjectComments(projectId, {})
    if (resp.success) {
      dispatch(loadProjectCommentsSuccess({ comments: resp.messages }))
    }
  }
}

export const selectProject = (projectId: number) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const {
      auth: { userId },
      project: { data: projects },
      organization: { data: organizations },
    } = getState()
    const currentProject = projects.find((project) => project.id === projectId)

    const userProject = currentProject?.users.find((user) => user.id === userId)

    if (!currentProject || !userProject) return

    const resp = await LifeApi.loadProjectSettings(currentProject.id)
    if (resp.success) {
      if (!currentProject.is_personal) {
        dispatch(selectOrganization(currentProject.owner_id))
      }

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

    channel.on('issues:updated', (payload: SocketPayload<Issue>) => {
      dispatch(updateIssueSuccess({ issue: payload.info }))
    })

    channel.on('tasks:updated', (payload: SocketPayload<Task>) => {
      dispatch(updateTaskSuccess({ task: payload.info }))
    })

    channel.on('projects:commented', (payload: SocketPayload<Message>) => {
      const {
        project: { currentProject },
        auth,
      } = getState()

      if (currentProject) {
        dispatch(projectNewComment({ comment: payload.info }))
      }
    })

    return {
      type: 'CHANNEL_CONNECTED',
      payload: { channel },
    }
  }
}
