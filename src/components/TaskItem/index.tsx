import React, { useEffect, useState } from 'react'
import { Attachment, Task } from 'types/project'
import './index.scss'
import { Badge, Button, Checkbox, Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import { updateTaskSuccess } from 'actions/task'
import { AppDispatch } from 'store'
import { Paperclip, X } from '@phosphor-icons/react'
import UploadButton from 'common/UploadButton'
import { errorNotification, successNotification } from 'utils'
import ImagePreview from 'components/ImagePreview'
import { FileUploaded } from 'types/global'
import VideoPreview from 'components/VideoPreview'

interface Props {
  task: Task
  dispatch: AppDispatch
}

const TaskItem = ({ task, dispatch }: Props) => {
  const toggleComplete = async () => {
    const resp = await LifeApi.updateTagStatus(
      task.project_id,
      task.issue_id,
      task.id,
      task.status === 'completed' ? 'open' : 'completed'
    )

    if (resp.success) {
      dispatch(updateTaskSuccess({ task: resp.task }))
    }
  }

  const handleUpdateAttachments = async (attachments: Attachment[]) => {
    const resp = await LifeApi.updateTask(
      task.project_id,
      task.issue_id,
      task.id,
      { attachments }
    )

    if (resp.success) {
      dispatch(updateTaskSuccess({ task: resp.task }))
      successNotification('Success', 'Task result updated successfully!')
    } else {
      errorNotification('Error', 'Failed to update task result')
    }
  }

  const handleAfterUpload = async (fileList: FileUploaded[]) => {
    handleUpdateAttachments([...task.attachments, ...fileList])
  }

  const handleRemoveAttachment = (attachmentId: string) => {
    handleUpdateAttachments(
      task.attachments.filter((attachment) => attachment.id !== attachmentId)
    )
  }

  const renderAttachment = (attachment: Attachment, index: number) => {
    console.log(attachment)

    switch (attachment.type) {
      case 'image':
        return (
          <div key={attachment.id} className="task-attachment">
            <Badge
              count={
                <X
                  onClick={() => handleRemoveAttachment(attachment.id)}
                  style={{ cursor: 'pointer' }}
                  size={14}
                />
              }
              color="red"
            >
              <ImagePreview src={attachment.url} />
            </Badge>
          </div>
        )
      case 'video':
        return (
          <div key={attachment.id} className="task-attachment">
            <VideoPreview src={attachment.url} />
          </div>
        )
      case 'file':
        return (
          <div key={attachment.id} className="task-attachment">
            <a href={attachment.url}>{attachment.name}</a>
          </div>
        )
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
          <UploadButton onChangeDone={handleAfterUpload} multiple>
            <Button icon={<Paperclip size={14} />} />
          </UploadButton>
        </div>
      </Flex>
      <Flex gap={4} align="end" vertical className="task-result">
        {task.attachments.map(renderAttachment)}
      </Flex>
    </div>
  )
}

export default TaskItem
