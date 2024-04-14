import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import reducers from './reducers'
import { AnyAction, configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: reducers,
//   middleware: [thunkMiddleware],
//   devTools: true,
// })

export const makeStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware],
    devTools: true,
  })

  // @ts-ignore
  if (typeof window != 'undefined') window.__reduxStore__ = store

  return store
}

export const store = makeStore()
export type Store = typeof store
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>
export type GetStateFunc = Store['getState']
