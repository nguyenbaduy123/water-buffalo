import { Check, Gear } from '@phosphor-icons/react'
import { updateIssueSuccess } from 'actions/issue'
import { Divider, Dropdown, Flex, Menu } from 'antd'
import LifeApi from 'api/LifeApi'
import RenderUser from 'common/RenderUser'
import UserAvatar from 'common/UserAvatar'
import RenderTag from 'components/RenderTag'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { COLORS } from 'utils/css'
import {
  getProjectPermission,
  hasAdminPermission,
  hasMemberPermission,
  hasModeratorPermission,
} from 'utils/permission'

import './style.scss'
import PriorityTag from 'components/PriorityTag'

interface Props {
  currentProject: RootState['project']['currentProject']
  currentIssue: RootState['issue']['currentIssue']
  auth: RootState['auth']
  dispatch: AppDispatch
  currentUserProject: RootState['project']['currentUserProject']
}

const IssueRightBar = ({
  currentProject,
  currentIssue,
  dispatch,
  currentUserProject,
  auth,
}: Props) => {
  if (!currentIssue || !currentProject) return null
  const assigneeIds = currentIssue.assignee_ids || []
  const tagIds = currentIssue.tag_ids || []
  const projectTags = currentProject.settings?.tags || []
  const projectUsers = currentProject.users
  const referenceIds = currentIssue.reference_ids || []
  const issueReferences = currentProject.users.filter((user) =>
    referenceIds.includes(user.id)
  )

  const permission = getProjectPermission(currentProject, auth.userId)

  const canAssignUser = hasModeratorPermission(permission)
  const canAssignReference = canAssignUser
  const canTag = hasMemberPermission(permission)

  const tags = projectTags.filter((tag) => tagIds.includes(tag.id))
  const assignees = currentProject.users.filter((user) =>
    assigneeIds.includes(user.id)
  )

  const handleUpdatePriority = async (priority: number) => {
    const resp = await LifeApi.updateIssue(currentProject.id, currentIssue.id, {
      priority,
    })
  }

  const handleToggleAssignee = async (userId: string, isAssign: boolean) => {
    const resp = await LifeApi.toggleAssignee(
      currentProject.id,
      currentIssue.id,
      userId
    )

    if (resp.success) {
      dispatch(
        updateIssueSuccess({
          issue: {
            ...currentIssue,
            assignee_ids: isAssign
              ? [...assigneeIds, userId]
              : assigneeIds.filter((id) => id !== userId),
          },
        })
      )
    }
  }

  const handleToggleReference = async (userId: string, isAssign: boolean) => {
    const resp = await LifeApi.toggleReference(
      currentProject.id,
      currentIssue.id,
      userId
    )

    if (resp.success) {
      dispatch(
        updateIssueSuccess({
          issue: {
            ...currentIssue,
            reference_ids: isAssign
              ? [...referenceIds, userId]
              : referenceIds.filter((id) => id !== userId),
          },
        })
      )
    }
  }

  const handleToggleTag = async (tagId: number, isTagged: boolean) => {
    if (!currentIssue) return
    const resp = await LifeApi.toggleTag(
      currentIssue.project_id,
      currentIssue.id,
      tagId
    )

    if (resp.success) {
      dispatch(
        updateIssueSuccess({
          issue: {
            ...currentIssue,
            tag_ids: isTagged
              ? [...tagIds, tagId]
              : tagIds.filter((id) => id !== tagId),
          },
        })
      )
    }
  }

  return (
    <div className="issue-right-bar">
      <div className="issue-assignee">
        <Flex justify="space-between" className="issue-assignee-title mb12">
          Assignees
          {canAssignUser && (
            <Dropdown
              trigger={['click']}
              overlayClassName="issue-assignee-dropdown"
              menu={{
                items: projectUsers.map((user) => {
                  const assigned = !!assignees.find(
                    (assignee) => assignee.id === user.id
                  )
                  return {
                    key: user.id,
                    label: (
                      <Flex
                        className={`issue-assignee-user ${
                          assigned ? 'assigned' : ''
                        }`}
                        gap={16}
                        align="center"
                        justify="space-between"
                        onClick={() => handleToggleAssignee(user.id, !assigned)}
                      >
                        <RenderUser gap={8} user={user} />
                        <div>
                          {assigned ? (
                            <Check size={14} color={COLORS.blue[3]} />
                          ) : (
                            ''
                          )}
                        </div>
                      </Flex>
                    ),
                  }
                }),
              }}
            >
              <Gear size={20} cursor="pointer" />
            </Dropdown>
          )}
        </Flex>
        <Flex gap={8} className="issue-assignee-list" wrap="wrap">
          {assignees.map((assignee) => (
            <div key={assignee.id} className="issue-assignee-item">
              <UserAvatar user={assignee} size={24} round withTooltip />
            </div>
          ))}
        </Flex>
      </div>
      <Divider />
      <div className="issue-priority">
        <Flex justify="space-between" className="issue-assignee-title mb12">
          Priority
          {canAssignUser && (
            <Dropdown
              open={
                hasAdminPermission(currentUserProject?.permission)
                  ? undefined
                  : false
              }
              trigger={['click']}
              menu={{
                items: [3, 2, 1, 0].map((priority) => ({
                  key: priority,
                  label: <PriorityTag priority={priority} />,
                  onClick: () => handleUpdatePriority(priority),
                })),
              }}
            >
              <Gear size={20} cursor="pointer" />
            </Dropdown>
          )}
        </Flex>
        <div className="issue-priority-list">
          <Flex gap={8}>
            <div>
              <PriorityTag priority={currentIssue.priority} />
            </div>
          </Flex>
        </div>
      </div>
      <Divider />
      <div className="issue-tags">
        <Flex justify="space-between" className="issue-assignee-title mb12">
          Tags
          {canTag && (
            <Dropdown
              trigger={['click']}
              overlayClassName="issue-assignee-dropdown"
              menu={{
                items: projectTags.map((tag) => {
                  const tagged = !!tags.find((t) => tag.id == t.id)
                  return {
                    key: tag.id,
                    label: (
                      <Flex
                        className={`issue-assignee-user ${
                          tagged ? 'assigned' : ''
                        }`}
                        gap={16}
                        align="center"
                        justify="space-between"
                        onClick={() => handleToggleTag(tag.id, !tagged)}
                      >
                        <Flex align="center" justify="space-between" gap={24}>
                          <RenderTag tag={tag} />
                          {tagged ? (
                            <Check size={14} color={COLORS.blue[3]} />
                          ) : (
                            ''
                          )}
                        </Flex>
                      </Flex>
                    ),
                  }
                }),
              }}
            >
              <Gear size={20} cursor="pointer" />
            </Dropdown>
          )}
        </Flex>
        <div className="issue-tags-list">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="issue-tag"
              style={{ backgroundColor: tag.color }}
            >
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Divider />

      <div className="issue-references">
        <Flex justify="space-between" className="issue-assignee-title mb12">
          References
          {canAssignReference && (
            <Dropdown
              trigger={['click']}
              overlayClassName="issue-references-dropdown"
              menu={{
                items: projectUsers.map((user) => {
                  const isReference = referenceIds.includes(user.id)
                  return {
                    key: user.id,
                    label: (
                      <Flex
                        className={`issue-reference-user ${
                          isReference ? 'assigned' : ''
                        }`}
                        gap={16}
                        align="center"
                        justify="space-between"
                        onClick={() =>
                          handleToggleReference(user.id, !isReference)
                        }
                      >
                        <RenderUser gap={8} user={user} />
                        <div>
                          {isReference ? (
                            <Check size={14} color={COLORS.blue[3]} />
                          ) : (
                            ''
                          )}
                        </div>
                      </Flex>
                    ),
                  }
                }),
              }}
            >
              <Gear size={20} cursor="pointer" />
            </Dropdown>
          )}
        </Flex>
        <Flex gap={8} className="issue-assignee-list" wrap="wrap">
          {issueReferences.map((assignee) => (
            <div key={assignee.id} className="issue-assignee-item">
              <UserAvatar user={assignee} size={24} round withTooltip />
            </div>
          ))}
        </Flex>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
    currentIssue: state.issue.currentIssue,
    currentUserProject: state.project.currentUserProject,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(IssueRightBar)
