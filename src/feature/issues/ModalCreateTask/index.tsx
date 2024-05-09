import { createTaskSuccess } from 'actions/task'
import { Flex, Input, Modal } from 'antd'
import LifeApi from 'api/LifeApi'
import React from 'react'
import { AppDispatch } from 'store'
import { Issue } from 'types/project'
import { successNotification } from 'utils'

interface Props {
  open: boolean
  onCancel: () => void
  issue: Issue
  dispatch: AppDispatch
}

const ModalCreateTask = ({ open, onCancel, issue, dispatch }: Props) => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [creating, setCreating] = React.useState(false)

  const resetState = () => {
    setTitle('')
    setDescription('')
  }

  const createTask = async () => {
    setCreating(true)
    const resp = await LifeApi.createTask(issue.project_id, issue.id, {
      title,
      description,
    })

    if (resp.success) {
      successNotification('Success', resp.message || 'Create task successfully')
      onCancel()
      resetState()
      dispatch(createTaskSuccess({ task: resp.task }))
    }

    setCreating(false)
  }

  return (
    <div>
      <Modal
        title="Create Task"
        open={open}
        onCancel={onCancel}
        onOk={createTask}
        okButtonProps={{ loading: creating }}
      >
        <Flex vertical gap={16}>
          <div className="title">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="description">
            <Input.TextArea
              placeholder="Description"
              autoSize={{ minRows: 3 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Flex>
      </Modal>
    </div>
  )
}

export default ModalCreateTask
