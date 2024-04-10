import { AnyAction } from 'redux'

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
