import {
  CREATE_ORGANIZATION_SUCCESS,
  LOAD_ORGANIZATIONS_REQUEST,
  LOAD_ORGANIZATIONS_SUCCESS,
  SELECT_ORGANIZATION,
} from 'constants/action'
import { createPlainAction } from 'utils/redux'
import { ActionFunc } from './types'
import LifeApi from 'api/LifeApi'
import { AppDispatch, GetStateFunc } from 'store'

export const loadOrganizationRequest = createPlainAction(
  LOAD_ORGANIZATIONS_REQUEST
)

export const loadOrganizationsSuccess = createPlainAction(
  LOAD_ORGANIZATIONS_SUCCESS
)

export const createOrganizationSuccess = createPlainAction(
  CREATE_ORGANIZATION_SUCCESS
)

export const selectOrganizationSuccess = createPlainAction(SELECT_ORGANIZATION)

export const selectOrganization = (organizationId: string) => {
  return async (dispatch: AppDispatch, getState: GetStateFunc) => {
    const resp = await LifeApi.getOrganization(organizationId)

    const organizations = getState().organization.data

    const currentOrganization = organizations.find(
      (org) => org.id === organizationId
    )

    if (resp.success) {
      dispatch(
        selectOrganizationSuccess({
          organization: { ...currentOrganization, ...resp.organization },
        })
      )
    }
  }
}

export const loadOrganization: ActionFunc = () => {
  return async (dispatch, getState) => {
    dispatch(loadOrganizationRequest())

    const resp = await LifeApi.loadOrganizations()

    if (resp.success) {
      dispatch(loadOrganizationsSuccess({ organizations: resp.organizations }))
    }
  }
}
