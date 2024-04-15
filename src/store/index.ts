import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action, AnyAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import reducers from './reducers'

export const makeStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware],
    devTools: true,
  })

  // @ts-ignore
  if (typeof window != 'undefined') window.__lifeReduxStore__ = store

  return store
}

// export const store = makeStore()
export type Store = ReturnType<typeof makeStore>
export type RootState = ReturnType<Store['getState']>
export type StateKey = keyof RootState
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>
export type GetStateFunc = Store['getState']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<Store>(makeStore)
