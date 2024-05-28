import { Button, Flex, Input, Modal } from 'antd'
import LifeApi from 'api/LifeApi'
import React from 'react'
import { notificationSuccess } from 'utils'

interface Props {
  open: boolean
  onCancel: () => void
  projectId: number
}

const ModalTransferProject: React.FC<Props> = ({
  open,
  onCancel,
  projectId,
}) => {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleTransfer = async () => {
    setLoading(true)
    const resp = await LifeApi.transferProjectOwnership(projectId, email)

    if (resp.success) {
      notificationSuccess('Project ownership has been transferred.')
      location.href = '/dashboard'
      onCancel()
    }

    setLoading(false)
  }

  const confirmTransfer = () => {
    Modal.confirm({
      title: 'Transfer Ownership',
      content: `Are you sure you want to transfer ownership to ${email}? This action cannot be undone.`,
      onOk: handleTransfer,
    })
  }

  return (
    <Modal
      title="Transfer Ownership"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <p className="mb12">Transfer project ownership to another user.</p>

        <Input
          placeholder="Enter email address or username"
          className="mb12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <Flex justify="end">
          <Button
            type="primary"
            danger
            onClick={confirmTransfer}
            disabled={!email}
          >
            Transfer
          </Button>
        </Flex>
      </div>
    </Modal>
  )
}

export default ModalTransferProject
