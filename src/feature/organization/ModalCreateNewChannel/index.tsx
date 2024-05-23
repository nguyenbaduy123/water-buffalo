import { createChannel } from 'actions/channel'
import { Input, Modal } from 'antd'
import { useAppDispatch } from 'hooks'
import React from 'react'

interface Props {
  open: boolean
  onCancel: () => void
  organizationId: string
}

const ModalCreateNewChannel = ({ open, organizationId, onCancel }: Props) => {
  const [name, setName] = React.useState('')

  const dispatch = useAppDispatch()

  const handleCreateChannel = async () => {
    if (!organizationId) return
    dispatch(createChannel(organizationId, { name }))
  }

  return (
    <Modal
      title="Create a new channel"
      onCancel={onCancel}
      open={open}
      okText="Create"
      onOk={handleCreateChannel}
    >
      <div style={{ paddingTop: 24 }}>
        <div className="channel-name">
          <Input
            placeholder="Enter new channel name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalCreateNewChannel
