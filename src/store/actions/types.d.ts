import { Payload, PayloadTypes, SingleAction } from 'reducers/types'
import { AppDispatch, GetStateFunc } from 'store'

export type ActionFunc<A = {}> = (
  payload?: A
) => SingleAction | ((dispatch: AppDispatch, getState: GetStateFunc) => any)

export type PlainActionFunc<T extends keyof PayloadTypes> = (
  payload?: PayloadTypes[T]
) => {
  type: T
  payload?: PayloadTypes[T]
}

export interface LoginSuccessPayload {
  access_token: string
}
