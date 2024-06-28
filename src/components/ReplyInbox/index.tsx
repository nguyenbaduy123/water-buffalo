import {
  Images,
  PaperPlaneTilt,
  Paperclip,
  Smiley,
} from '@phosphor-icons/react'
import { Flex, Input, Upload } from 'antd'
import LifeApi from 'api/LifeApi'
import React from 'react'
import { Attachment } from 'types/project'
import { COLORS } from 'utils/css'

interface Props {
  conversationId: string
  userId: string
}

const ReplyInbox: React.FC<Props> = ({ conversationId, userId }) => {
  const [message, setMessage] = React.useState('')
  const [attachments, setAttachments] = React.useState<Attachment[]>([])

  const handleSend = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const resp = await LifeApi.sendMessage(conversationId, {
      message,
      attachments,
    })

    if (resp.success) {
      setMessage('')
      setAttachments([])
    }
  }

  return (
    <div className="reply-inbox">
      <Flex align="center" gap={8}>
        <Upload>
          <div className="upload-attachment-btn">
            <Images size={20} weight="fill" color={COLORS.gray[6]} />
          </div>
        </Upload>
        <div className="input-reply-box">
          <Input.TextArea
            placeholder="Aa"
            autoComplete="off"
            autoSize
            onDrop={(e) => console.log(e)}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={handleSend}
            className="reply-box-input"
          />
          <div className="emoji-popover">
            <Smiley size={24} weight="fill" color={COLORS.gray[6]} />
          </div>
        </div>
      </Flex>
      {/* <Flex gap={4} className="reply-box-footer">
        <Upload fileList={attachments} onChange={handleChangeAttachments}>
      <ImageSquare size={20} />
    </Upload>
      </Flex> */}
    </div>
  )
}

export default ReplyInbox
