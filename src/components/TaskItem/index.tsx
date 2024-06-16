import React, { useEffect, useState } from 'react'
import { Attachment, Task } from 'types/project'
import './index.scss'
import { Badge, Button, Checkbox, Dropdown, Flex, Tooltip } from 'antd'
import LifeApi from 'api/LifeApi'
import { updateTaskSuccess } from 'actions/task'
import { AppDispatch, RootState } from 'store'
import {
  ArrowClockwise,
  Check,
  CheckCircle,
  Checks,
  File,
  Files,
  Paperclip,
  Pen,
  X,
} from '@phosphor-icons/react'
import UploadButton from 'common/UploadButton'
import {
  errorNotification,
  notificationError,
  successNotification,
} from 'utils'
import ImagePreview from 'components/ImagePreview'
import { FileUploaded } from 'types/global'
import VideoPreview from 'components/VideoPreview'
import { COLORS } from 'utils/css'
import { groupBy } from 'lodash'

const SCORES = [
  {
    value: 'A',
    label: 'A',
    color: COLORS.green[6],
  },
  {
    value: 'B',
    label: 'B',
    color: COLORS.green[4],
  },
  {
    value: 'C',
    label: 'C',
    color: COLORS.yellow[6],
  },
  {
    value: 'D',
    label: 'Unsatisfactory',
    color: COLORS.red[4],
  },
]

interface Props {
  task: Task
  dispatch: AppDispatch
  isAssignee: boolean
  isReference?: boolean
}

const TaskItem = ({ task, dispatch, isAssignee, isReference }: Props) => {
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

  const handleMarkTask = async (taskId: number, score: string) => {
    const resp = await LifeApi.updateTask(
      task.project_id,
      task.issue_id,
      taskId,
      { result: score }
    )

    if (!resp.success) {
      notificationError(resp.message || 'Failed to mark task')
    }
  }

  const renderAttachment = (attachment: Attachment, index: number) => {
    const removeAttachmentButton = () => {
      return (
        <div className="remove-attachment-btn">
          <X
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveAttachment(attachment.id)
            }}
            color="#fff"
            size={10}
            weight="bold"
          />
        </div>
      )
    }
    switch (attachment.type) {
      case 'image':
        return (
          <div key={attachment.id} className="task-attachment">
            {removeAttachmentButton()}
            <ImagePreview src={attachment.url} />
          </div>
        )
      case 'video':
        return (
          <div key={attachment.id} className="task-attachment">
            {removeAttachmentButton()}
            <VideoPreview src={attachment.url} />
          </div>
        )
      case 'file':
        return (
          <a
            key={attachment.id}
            href={attachment.url}
            className="task-attachment"
            target="_blank"
          >
            {removeAttachmentButton()}
            <Flex
              align="center"
              gap={6}
              className="p2 pl4 pr4"
              style={{
                backgroundColor: COLORS.blue[6],
                borderRadius: 10,
              }}
            >
              <Files size={14} />
              <span className="ellipsis" style={{ maxWidth: 120 }}>
                {attachment.name}
              </span>
            </Flex>
          </a>
        )
    }
  }

  const attachmentsGrouped = groupBy(task.attachments, 'type')

  const renderTaskScore = () => {
    let icon: React.ReactNode, title: string, color: string

    switch (task.result) {
      case 'A':
        icon = <Checks size={16} color={COLORS.green[7]} weight="bold" />
        color = COLORS.green[7]
        title = 'Very Good'
        break
      case 'B':
        icon = <Check size={16} color={COLORS.green[6]} weight="bold" />
        color = COLORS.green[6]
        title = 'Good'
        break
      case 'C':
        icon = <Check size={16} color={COLORS.yellow[6]} weight="bold" />
        color = COLORS.yellow[6]
        title = 'Average'
        break
      case 'D':
        icon = <ArrowClockwise size={16} color={COLORS.red[6]} weight="bold" />
        color = COLORS.red[6]
        title = 'Needs Improvement'
        break
      default:
        return null
    }

    return (
      <Tooltip title={title}>
        <Flex
          align="center"
          justify="space-between"
          style={{ color: color, fontSize: 14 }}
          gap={8}
        >
          {icon}
        </Flex>
      </Tooltip>
    )
  }

  return (
    <div className={`task-item task-item-score-${task.result}`}>
      <Flex align="start" gap={12} justify="space-between">
        <Flex align="start" gap={12}>
          <Checkbox
            checked={task.status === 'completed'}
            onClick={toggleComplete}
          />
          <div className="task-item-content">
            <Flex className="task-item-title" align="center" gap={12}>
              {task.title}
              {renderTaskScore()}
            </Flex>
            <div className="task-item-description">{task.description}</div>
          </div>
        </Flex>
        {
          <div className="task-result">
            {isAssignee && (
              <UploadButton onChangeDone={handleAfterUpload} multiple>
                <Button icon={<Paperclip size={14} />} />
              </UploadButton>
            )}
            {isReference && task.status == 'completed' && (
              <Dropdown
                menu={{
                  items: SCORES.map((score) => ({
                    key: score.value,
                    label: (
                      <div
                        className="p4 pl6 pr6"
                        style={{
                          backgroundColor: score.color,
                          borderRadius: 10,
                        }}
                      >
                        {score.label}
                      </div>
                    ),
                    onClick: () => handleMarkTask(task.id, score.value),
                  })),
                }}
              >
                <Button icon={<Pen size={16} />}></Button>
              </Dropdown>
            )}
          </div>
        }
      </Flex>
      {(isAssignee || isReference) && !!task.attachments.length && (
        <div className="mb2 mt12 task-result-list">
          <div>Attachments</div>
          <Flex gap={4} className="mb8" wrap="wrap">
            {attachmentsGrouped.file?.map(renderAttachment)}
          </Flex>
          <Flex gap={4} className="mb8" wrap="wrap">
            {attachmentsGrouped.image?.map(renderAttachment)}
          </Flex>
          <Flex gap={4} className="mb8" wrap="wrap">
            {attachmentsGrouped.video?.map(renderAttachment)}
          </Flex>
        </div>
      )}
    </div>
  )
}

export default TaskItem
