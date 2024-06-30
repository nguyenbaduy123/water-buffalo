import { Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import { FileUpload } from 'common/UploadButton/UploadButton'
import ReplyBox from 'components/ReplyBox'
import ChannelChatMenu from 'feature/organization/ChannelChatMenu'
import ChannelMessageList from 'feature/organization/ChannelMessageList'
import OrganizationTeams from 'feature/organization/OrganizationTeams'
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

const TABS = [
  {
    key: 'channel',
    label: 'Channel',
  },
  {
    key: 'teams',
    label: 'Teams',
  },
]

const Organization = ({ currentOrganization, channel, dispatch }: Props) => {
  const [message, setMessage] = React.useState('')
  const [files, setFiles] = React.useState<FileUpload[]>([])
  const currentChannel = channel.data.find(
    (c) => c.id == channel.currentChannelId
  )

  const [currentTab, setCurrentTab] = React.useState('channel')

  const handleSendMessage = async () => {
    if (!currentChannel || !currentOrganization) return

    const resp = await LifeApi.sendMessageToChannel(
      currentOrganization.id,
      currentChannel.id,
      {
        message: message,
        attachments: files.map((file) => file.response) as any[],
      }
    )

    if (resp.success) {
      setMessage('')
      setFiles([])
      console.log(resp)
    }
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'teams':
        return renderTeamsTabContent()
      default:
        return renderChannelTabContent()
    }
  }

  const renderChannelTabContent = () => {
    return (
      <Flex gap={12}>
        <OrganizationSidebar />
        <Flex vertical className="w100p ph16" gap={16}>
          <ChannelChatMenu currentChannel={currentChannel} />
          <ChannelMessageList />
          <div className="reply-box-wrapper">
            <ReplyBox
              message={message}
              files={files}
              onMessageChange={setMessage}
              onFileChange={setFiles}
              onSend={handleSendMessage}
            />
          </div>
        </Flex>
      </Flex>
    )
  }

  const renderTeamsTabContent = () => {
    return <OrganizationTeams />
  }

  return (
    <OrganizationLayout>
      <Flex className="organization-tabs">
        {TABS.map((tab) => {
          const selected = tab.key === currentTab
          return (
            <div
              className={`organization-tab-item ${selected ? 'selected' : '≈'}`}
              onClick={() => setCurrentTab(tab.key)}
            >
              {tab.label}
            </div>
          )
        })}
      </Flex>
      <div>{renderContent()}</div>
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
