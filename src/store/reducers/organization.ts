import {
  CREATE_ORGANIZATION_SUCCESS,
  LOAD_ORGANIZATIONS_REQUEST,
  LOAD_ORGANIZATIONS_SUCCESS,
  SELECT_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from 'constants/action'
import { OrganizationState, ReducerMap } from './types'
import { createReducer, current } from '@reduxjs/toolkit'

const initialState: OrganizationState = {
  fetching: false,
  data: [],
  currentOrganization: null,
  currentUserOrganization: null,
}

const reducerMap: ReducerMap<OrganizationState> = {
  [LOAD_ORGANIZATIONS_REQUEST]: (state) => {
    return { ...state, fetching: true }
  },
  [LOAD_ORGANIZATIONS_SUCCESS]: (state, { payload }) => {
    return { ...state, fetching: false, data: payload.organizations }
  },
  [SELECT_ORGANIZATION]: (state, { payload }) => {
    return { ...state, currentOrganization: payload.organization }
  },
  [CREATE_ORGANIZATION_SUCCESS]: (state, { payload }) => {
    return { ...state, data: [...state.data, payload.organization] }
  },
  [UPDATE_ORGANIZATION]: (state, { payload }) => {
    return {
      ...state,
      currentOrganization:
        state.currentOrganization?.id == payload.organization.id
          ? payload.organization
          : state.currentOrganization,
      data: state.data.map((o) =>
        o.id === payload.organization.id ? payload.organization : o
      ),
    }
  },
}

const organizationReducer = createReducer(initialState, reducerMap)

export default organizationReducer
