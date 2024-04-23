import { createReducer } from '@reduxjs/toolkit'
import { ProjectPayloadTypes, ProjectState, ReducerMap } from './types'
import { LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS } from 'constants/action'

const initialState: ProjectState = {
  fetching: false,
  data: [],
}

const reducerMap: ReducerMap<ProjectState, ProjectPayloadTypes> = {
  [LOAD_PROJECTS_REQUEST]: (state) => {
    return { ...state, fetching: true }
  },
  [LOAD_PROJECTS_SUCCESS]: (state, { payload }) => {
    return { ...state, data: payload.projects, fetching: false }
  },
}

const projectReducer = createReducer(initialState, reducerMap)

export default projectReducer
