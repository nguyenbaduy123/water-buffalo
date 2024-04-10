import { AnyAction } from 'redux'
import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

export const store = configureStore({
  // @ts-ignore
  reducer: reducers,
  middleware: [thunkMiddleware],
})

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

export type RootState = ReturnType<typeof store.getState>
export type GetStateFunc = typeof store.getState
