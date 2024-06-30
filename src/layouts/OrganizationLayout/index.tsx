import { loadChannels } from 'actions/channel'
import { selectOrganization } from 'actions/organization'
import withAuth from 'hocs/withAuth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'

interface Props {
  organization: RootState['organization']
  dispatch: AppDispatch
  children: React.ReactNode
}

const OrganizationLayout = ({ organization, dispatch, children }: Props) => {
  const router = useRouter()

  const { organization_id } = router.query

  useEffect(() => {
    if (organization.fetching) {
      return
    }
    dispatch(selectOrganization(organization_id as string))
  }, [organization.fetching])

  useEffect(() => {
    if (!organization.currentOrganization) {
      return
    }
    dispatch(loadChannels(organization.currentOrganization.id))
  }, [organization.currentOrganization])

  return <div className="organization-view">{children}</div>
}

const mapStateToProps = (state: RootState) => {
  return {
    organization: state.organization,
  }
}

export default connect(mapStateToProps)(withAuth(OrganizationLayout))
