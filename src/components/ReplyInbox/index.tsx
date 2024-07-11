import {
  Images,
  PaperPlaneTilt,
  Paperclip,
  Smiley,
} from '@phosphor-icons/react'
import { Badge, Flex, Input, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import LifeApi from 'api/LifeApi'
import React, { useEffect } from 'react'
import { Attachment } from 'types/project'
import { COLORS } from 'utils/css'
import EmojiPicker, { SuggestionMode, Theme } from 'emoji-picker-react'

interface Props {
  conversationId: string
  userId: string
  onSend?: (message: string, attachments: Attachment[]) => void
}

const ReplyInbox: React.FC<Props> = ({ conversationId, userId, onSend }) => {
  const [message, setMessage] = React.useState('')
  const [attachments, setAttachments] = React.useState<Attachment[]>([])
  const [emojiOpen, setEmojiOpen] = React.useState(false)

  const handleSend = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (onSend) {
      onSend(message, attachments)
      setMessage('')
      setAttachments([])
      return
    }
    const resp = await LifeApi.sendMessage(conversationId, {
      message,
      attachments,
    })

    if (resp.success) {
      setMessage('')
      setAttachments([])
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setEmojiOpen(false)
    })

    return () => {
      document.removeEventListener('click', () => {
        setEmojiOpen(false)
      })
    }
  }, [])

  const handleUploadAttachments = (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    if (info.file.status === 'done') {
      setAttachments((prev) => [...prev, info.file.response.file])
    }
  }

  return (
    <div className="reply-inbox">
      <Flex align="center" gap={8}>
        <Upload
          onChange={handleUploadAttachments}
          // fileList={[]}
          showUploadList={false}
          multiple
          action={`${process.env.NEXT_PUBLIC_API_URL}/content/upload`}
          withCredentials
        >
          <div className="upload-attachment-btn">
            <Badge count={attachments.length} size="small">
              <Images size={20} weight="fill" color={COLORS.gray[6]} />
            </Badge>
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
          <div
            className="emoji-picker-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <EmojiPicker
              width={300}
              height={400}
              open={emojiOpen}
              theme={Theme.DARK}
              suggestedEmojisMode={SuggestionMode.FREQUENT}
              className="emoji-picker"
              onEmojiClick={(emojiData) => {
                setMessage((prevMessage) => prevMessage + emojiData.emoji)
              }}
            />
          </div>
          <div className="emoji-popover">
            <Smiley
              size={24}
              weight="fill"
              color={COLORS.gray[6]}
              onClick={(e) => {
                e.stopPropagation()
                setEmojiOpen(!emojiOpen)
              }}
            />
          </div>
        </div>
      </Flex>
    </div>
  )
}

export default ReplyInbox
