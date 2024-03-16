import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
