import React from 'react'
import { Task } from 'types/project'
import './index.scss'
import { Button, Checkbox, Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import { updateTaskSuccess } from 'actions/task'
import { AppDispatch } from 'store'
import { Paperclip } from '@phosphor-icons/react'
import UploadButton from 'common/UploadButton'

interface Props {
  task: Task
  dispatch: AppDispatch
}

const TaskItem = ({ task, dispatch }: Props) => {
  const toggleComplete = async () => {
    const resp = await LifeApi.updateTagStatus(
      task.issue_id,
      task.project_id,
      task.id,
      task.status === 'completed' ? 'open' : 'completed'
    )

    if (resp.success) {
      dispatch(updateTaskSuccess({ task: resp.task }))
    }
  }

  return (
    <div className="task-item">
      <Flex align="start" gap={12} justify="space-between">
        <Flex align="start" gap={12}>
          <Checkbox
            checked={task.status === 'completed'}
            onClick={toggleComplete}
          />
          <div className="task-item-content">
            <div className="task-item-title">{task.title}</div>
            <div className="task-item-description">{task.description}</div>
          </div>
        </Flex>
        <div className="task-result">
          <UploadButton onChange={(url) => console.log(url)} multiple>
            <Button icon={<Paperclip size={14} />} />
          </UploadButton>
        </div>
      </Flex>
    </div>
  )
}

export default TaskItem
