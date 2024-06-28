import { Empty } from 'antd'
import MessageListItem from 'components/MessageListItem'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'

interface Props {
  conversation: RootState['conversation']['selected']
  auth: RootState['auth']
  dispatch: AppDispatch
}

const MessageList: React.FC<Props> = ({ conversation, auth }) => {
  if (!conversation) return null

  const renderBody = () => {
    if (!conversation.messages.length)
      return (
        <div className="p8" style={{ margin: 'auto' }}>
          <Empty description="No messages" />
        </div>
      )

    return conversation.messages.map((message, index) => {
      return (
        <MessageListItem
          key={message.id}
          message={message}
          auth={auth}
          fromUser={conversation.users.find(
            (user) => user.id === message.from_id
          )}
          prevMsgFromId={conversation.messages[index - 1]?.from_id}
          nextMsgFromId={conversation.messages[index + 1]?.from_id}
        />
      )
    })
  }

  return <div className="message-list">{renderBody()}</div>
}

const mapStateToProps = (state: RootState) => {
  return {
    conversation: state.conversation.selected,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(MessageList)
