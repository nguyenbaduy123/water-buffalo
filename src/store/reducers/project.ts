import { createReducer } from '@reduxjs/toolkit'
import { ProjectState, ReducerMap } from './types'
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  SELECT_PROJECT,
} from 'constants/action'

const initialState: ProjectState = {
  fetching: false,
  data: [],
  currentProject: null,
}

const reducerMap: ReducerMap<ProjectState> = {
  [LOAD_PROJECTS_REQUEST]: (state) => {
    return { ...state, fetching: true }
  },
  [LOAD_PROJECTS_SUCCESS]: (state, { payload }) => {
    return { ...state, data: payload.projects, fetching: false }
  },
  [SELECT_PROJECT]: (state, { payload }) => {
    return { ...state, currentProject: payload.currentProject }
  },
}

const projectReducer = createReducer(initialState, reducerMap)

export default projectReducer
