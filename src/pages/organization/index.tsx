import { Flex } from 'antd'
import ReplyBox from 'components/ReplyBox'
import ChannelMessageList from 'feature/organization/ChannelMessageList'
import OrganizationSidebar from 'feature/organization/Sidebar'
import withAuth from 'hocs/withAuth'
import OrganizationLayout from 'layouts/OrganizationLayout'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'

interface Props {
  currentOrganization: RootState['organization']['currentOrganization']
  channel: RootState['channel']
  dispatch: AppDispatch
}

const Organization = ({ currentOrganization, channel, dispatch }: Props) => {
  const currentChannel = channel.data.find(
    (c) => c.id === channel.currentChannelId
  )
  return (
    <OrganizationLayout>
      <Flex gap={12}>
        <OrganizationSidebar />
        <Flex vertical className="w100p ph16 pv24" gap={16}>
          <ChannelMessageList />
          <div className="reply-box-wrapper">
            <ReplyBox />
          </div>
        </Flex>
      </Flex>
    </OrganizationLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentOrganization: state.organization.currentOrganization,
    channel: state.channel,
  }
}

export default connect(mapStateToProps)(withAuth(Organization))
