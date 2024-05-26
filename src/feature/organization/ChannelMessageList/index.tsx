import React, { useEffect } from 'react'
import './style.scss'
import { AppDispatch, RootState } from 'store'
import { connect } from 'react-redux'
import { loadMessages } from 'actions/channel'
import MessageListItem from 'components/MessageListItem'
import { Organization } from 'types/organization'
import { groupBy } from 'lodash'

interface Props {
  channelId: string
  messages: RootState['channel']['messages']
  loading: boolean
  dispatch: AppDispatch
  users: Organization['users'] | undefined
  auth: RootState['auth']
}

const ChannelMessageList = ({
  channelId,
  messages,
  loading,
  dispatch,
  auth,
  users,
}: Props) => {
  useEffect(() => {
    if (!channelId) return
    dispatch(loadMessages(channelId))
  }, [channelId])

  const usersMap = groupBy(users, 'id')
  const ref = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessages = () => {
    return messages.map((message, index) => {
      const fromUser = usersMap[message.from_id]?.[0]
      const prevMsgFromId = messages[index - 1]?.from_id
      const nextMsgFromId = messages[index + 1]?.from_id
      return (
        <MessageListItem
          key={message.id}
          message={message}
          auth={auth}
          fromUser={fromUser}
          prevMsgFromId={prevMsgFromId}
          nextMsgFromId={nextMsgFromId}
        />
      )
    })
  }

  return (
    <div className="channel-message-list h100p" ref={ref}>
      {loading ? <div>Loading...</div> : renderMessages()}
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    channelId: state.channel.currentChannelId,
    messages: state.channel.messages,
    loading: state.channel.fetchingMessages,
    auth: state.auth,
    users: state.organization.currentOrganization?.users,
  }
}

export default connect(mapStateToProps)(ChannelMessageList)
