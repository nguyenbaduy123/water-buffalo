import { createReducer } from '@reduxjs/toolkit'
import { ProjectState, ReducerMap } from './types'
import {
  CREATE_PROJECT_SUCCESS,
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECT_COMMENTS_SUCCESS,
  PROJECT_NEW_COMMENT,
  SELECT_PROJECT,
  UPDATE_PROJECT_SUCCESS,
} from 'constants/action'

const initialState: ProjectState = {
  fetching: false,
  data: [],
  currentProject: null,
  currentUserProject: null,
}

const reducerMap: ReducerMap<ProjectState> = {
  [LOAD_PROJECTS_REQUEST]: (state) => {
    return { ...state, fetching: true }
  },
  [LOAD_PROJECTS_SUCCESS]: (state, { payload }) => {
    return { ...state, data: payload.projects, fetching: false }
  },
  [SELECT_PROJECT]: (state, { payload }) => {
    return { ...state, ...payload }
  },
  [UPDATE_PROJECT_SUCCESS]: (state, { payload }) => {
    const currentProject = state.currentProject
    return {
      ...state,
      data: state.data.map((project) =>
        project.id == payload.project.id
          ? { ...project, ...payload.project }
          : project
      ),
      currentProject:
        currentProject && currentProject.id == payload.project.id
          ? { ...currentProject, ...payload.project }
          : currentProject,
    }
  },
  [CREATE_PROJECT_SUCCESS]: (state, { payload }) => {
    return { ...state, data: [payload.project, ...state.data] }
  },
  [LOAD_PROJECT_COMMENTS_SUCCESS]: (state, { payload }) => {
    const currentProject = state.currentProject
    return {
      ...state,
      currentProject: currentProject
        ? {
            ...currentProject,
            comments: payload.comments.reverse(),
          }
        : currentProject,
    }
  },
  [PROJECT_NEW_COMMENT]: (state, { payload }) => {
    const currentProject = state.currentProject
    return {
      ...state,
      currentProject:
        currentProject && currentProject.comments
          ? {
              ...currentProject,
              comments: [...currentProject.comments, payload.comment],
            }
          : currentProject,
    }
  },
}

const projectReducer = createReducer(initialState, reducerMap)

export default projectReducer
