import { createReducer } from '@reduxjs/toolkit'
import { ReducerMap, TaskState } from './types'

const initialState: TaskState = {
  fetching: false,
  data: [],
}

const reducerMap: ReducerMap<TaskState> = {
  LOAD_TASK_REQUEST: (state) => {
    return { ...state, fetching: true }
  },
  LOAD_TASK_SUCCESS: (state, { payload }) => {
    return { ...state, data: payload.tasks, fetching: false }
  },
  UPDATE_TASK_SUCCESS: (state, { payload }) => {
    return {
      ...state,
      data: state.data.map((task) =>
        task.id === payload.task.id ? payload.task : task
      ),
    }
  },
  CREATE_TASK_SUCCESS: (state, { payload }) => {
    return { ...state, data: [...state.data, payload.task] }
  },
}

const taskReducer = createReducer(initialState, reducerMap)

export default taskReducer
