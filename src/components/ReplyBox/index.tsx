import { ImageSquare, PaperPlaneTilt, Sticker } from '@phosphor-icons/react'
import { Flex, Input } from 'antd'

const ReplyBox = () => {
  return (
    <div className="reply-box">
      <Flex align="center">
        <Input.TextArea
          placeholder="Type a message"
          autoComplete="off"
          autoSize
        />
        <div className="p8 cpt">
          <PaperPlaneTilt size={24} weight="fill" />
        </div>
      </Flex>
      <Flex gap={4} className="reply-box-footer">
        <ImageSquare size={20} />
        <Sticker size={20} />
      </Flex>
    </div>
  )
}

export default ReplyBox
