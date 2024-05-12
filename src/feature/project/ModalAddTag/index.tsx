import { updateProjectSuccess } from 'actions/project'
import { ColorPicker, Flex, Input, Modal, ModalProps } from 'antd'
import LifeApi from 'api/LifeApi'
import React, { useEffect } from 'react'
import { AppDispatch, RootState } from 'store'
import { randomColor } from 'utils'

interface Props {
  open: boolean
  onClose: () => void
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const ModalAddTag = ({ open, onClose, currentProject, dispatch }: Props) => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [color, setColor] = React.useState('')

  useEffect(() => {
    open && setColor(randomColor())
  }, [open])

  const handleAddTag = async () => {
    if (!currentProject) return
    const resp = await LifeApi.addTag(currentProject.id, {
      name,
      description,
      color,
    })

    if (resp.success) {
      onClose()
      dispatch(
        updateProjectSuccess({
          project: {
            ...currentProject,
            settings: {
              ...currentProject.settings,
              tags: [...currentProject.settings.tags, resp.tag],
            },
          },
        })
      )
    }
  }

  return (
    <Modal title="Add Tag" open={open} onCancel={onClose} onOk={handleAddTag}>
      <Flex gap={8} vertical>
        <div>
          <div style={{ padding: '4px 0' }}>Tag name</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div style={{ padding: '4px 0' }}>Description</div>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Flex align="center" gap={10}>
          <div>Color</div>
          <ColorPicker
            value={color}
            onChange={(color) => setColor(color.toHex())}
          />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalAddTag
