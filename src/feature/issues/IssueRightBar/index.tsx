import { Check, Gear } from '@phosphor-icons/react'
import { updateIssueSuccess } from 'actions/issue'
import { Divider, Dropdown, Flex, Menu } from 'antd'
import LifeApi from 'api/LifeApi'
import RenderUser from 'common/RenderUser'
import UserAvatar from 'common/UserAvatar'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { COLORS } from 'utils/css'

interface Props {
  currentProject: RootState['project']['currentProject']
  currentIssue: RootState['issue']['currentIssue']
  dispatch: AppDispatch
}

const IssueRightBar = ({ currentProject, currentIssue, dispatch }: Props) => {
  if (!currentIssue || !currentProject) return null
  const assigneeIds = currentIssue.assignee_ids || []
  const tagIds = currentIssue.tag_ids || []
  const projectTags = currentProject.settings?.tags || []
  const projectUsers = currentProject.users

  const tags = projectTags.filter((tag) => tagIds.includes(tag.id))
  const assignees = currentProject.users.filter((user) =>
    assigneeIds.includes(user.id)
  )

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

  return (
    <div className="issue-right-bar">
      <div className="issue-assignee">
        <Flex justify="space-between" className="issue-assignee-title">
          Assignees
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
            <Gear cursor="pointer" />
          </Dropdown>
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
      <div className="issue-tags">
        <div className="issue-tags-title">Tags</div>
        <div className="issue-tags-list">
          {tags.map((tag) => (
            <div key={tag.id} className="issue-tag">
              <div
                className="issue-tag-color"
                style={{ backgroundColor: tag.color }}
              />
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
    currentIssue: state.issue.currentIssue,
  }
}

export default connect(mapStateToProps)(IssueRightBar)
