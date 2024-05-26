import { ImageSquare, PaperPlaneTilt, Paperclip } from '@phosphor-icons/react'
import { Flex, Input, Upload } from 'antd'
import { FileUpload } from 'common/UploadButton/UploadButton.d'

interface Props {
  onSend: () => void
  message: string
  files?: FileUpload[]
  onFileChange: (files: FileUpload[]) => void
  onMessageChange: (message: string) => void
}

const ReplyBox = ({
  files,
  onSend,
  onFileChange,
  onMessageChange,
  message,
}: Props) => {
  const handleSend = () => {
    onSend()
  }

  const handleChangeFile = (info: { fileList: FileUpload[] }) => {
    onFileChange(info.fileList)
  }

  return (
    <div className="reply-box">
      <Flex align="center">
        <Input.TextArea
          placeholder="Type a message"
          autoComplete="off"
          autoSize
          onDrop={(e) => console.log(e)}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onPressEnter={handleSend}
          className="reply-box-input"
        />
        <div className="p8 cpt" onClick={handleSend}>
          <PaperPlaneTilt size={24} weight="fill" />
        </div>
      </Flex>
      <Flex gap={4} className="reply-box-footer">
        <Upload fileList={files} onChange={handleChangeFile}>
          <ImageSquare size={20} />
        </Upload>
        <Paperclip size={20} />
      </Flex>
    </div>
  )
}

export default ReplyBox
