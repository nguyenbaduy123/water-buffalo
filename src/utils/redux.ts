import { PlainActionFunc } from 'actions/types'
import { pick } from 'lodash'
import { connect } from 'react-redux'
import { PayloadTypes } from 'reducers/types'
import { AnyAction } from 'redux'

import { RootState, StateKey } from 'store'

type ReducerMap<S> = {
  [key: string]: (state: S, payload: any) => S
}

interface Action<A> extends AnyAction {
  type: string
  payload: A
}

export const createReducer =
  <S>(initialState: S, reducerMap: ReducerMap<S>) =>
  <A>(state: S = initialState, action: Action<A>) => {
    const reducer = reducerMap[action.type]

    return reducer ? reducer(state, action) : state
  }

export const assignState = <S extends {}>(
  state: S,
  payload: Partial<S>
): S => ({
  ...state,
  ...payload,
})

export const mapStateToPropsFunc = (keys: StateKey[]) => (state: RootState) =>
  pick(state, keys)

export const connectAndMapStateToProps =
  (keys: StateKey[]) =>
  <T extends React.ComponentType<any>>(Component: T) =>
    connect(mapStateToPropsFunc(keys))(Component)

export const createPlainAction: <T extends keyof PayloadTypes>(
  type: T,
  payload?: PayloadTypes[T]
) => PlainActionFunc<T> = (type) => (payload) => ({
  type,
  payload,
})
