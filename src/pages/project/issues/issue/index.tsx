import { selectIssue, updateIssueSuccess } from 'actions/issue'
import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Flex,
  Row,
  notification,
} from 'antd'
import LifeApi from 'api/LifeApi'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import './index.scss'
import { fromNow, getUserInProject } from 'utils'
import CommentIssueItem from 'components/CommentIssueItem'
import {
  CaretDown,
  CheckCircle,
  PlusCircle,
  XCircle,
} from '@phosphor-icons/react'
import ModalCreateTask from 'feature/issues/ModalCreateTask'
import TaskItem from 'components/TaskItem'
import { loadTasks } from 'actions/task'
import IssueRightBar from 'feature/issues/IssueRightBar'
import Editor from 'components/Editor'
import { COLORS } from 'utils/css'
import { Message } from 'types/message'

interface Props {
  issues: RootState['issue']['data']
  currentProject: RootState['project']['currentProject']
  fetching: RootState['issue']['fetching']
  currentIssue: RootState['issue']['currentIssue']
  task: RootState['task']
  dispatch: AppDispatch
  auth: RootState['auth']
}

const Issue: NextPage<Props> = ({
  currentProject,
  dispatch,
  currentIssue,
  issues,
  task,
  auth,
}) => {
  const router = useRouter()

  const [openModalCreateTask, setOpenModalCreateTask] = React.useState(false)

  const [closeAsCompleted, setCloseAsCompleted] = React.useState(true)

  const { issue_id } = router.query

  const [comment, setComment] = React.useState('')

  const [comments, setComments] = React.useState<Message[]>([])

  const getIssueComments = async () => {
    if (!currentProject || !currentIssue) return
    const resp = await LifeApi.getIssueComments(
      currentProject.id,
      currentIssue.id
    )
    if (resp.success) {
      setComments(resp.messages)
    }
  }

  const getIssue = async () => {
    if (!currentProject) return
    const issue = issues.find((issue) => issue.id === parseInt(`${issue_id}`))
    const resp = await LifeApi.getIssueDetail(
      currentProject.id,
      parseInt(`${issue_id}`)
    )

    if (resp.success) {
      dispatch(selectIssue({ currentIssue: { ...issue, ...resp.issue } }))
    }
  }

  useEffect(() => {
    getIssue()
  }, [currentProject])

  useEffect(() => {
    if (currentIssue) {
      dispatch(loadTasks())
      getIssueComments()
    }
  }, [currentIssue])

  const userCreated = currentProject?.users.find(
    (user) => user.id === currentIssue?.created_by_id
  )

  const creatingNewTask = () => {
    setOpenModalCreateTask(true)
  }

  const handleComment = async () => {
    if (!currentProject || !currentIssue) return
    const resp = await LifeApi.commentOnIssue(
      currentProject.id,
      currentIssue.id,
      comment
    )
    if (resp.success) {
      setComment('')
      setComments([...comments, resp.message])
    }
  }

  const handleCloseIssue = async () => {
    if (!currentProject || !currentIssue) return
    if (closeAsCompleted) {
      if (task.data.some((task) => task.status != 'completed')) {
        notification.error({
          message: 'Cannot close issue',
          description: 'All tasks must be completed',
          placement: 'top',
        })
        return
      }

      const resp = await LifeApi.closeIssue(
        currentProject.id,
        currentIssue.id,
        {
          is_completed: closeAsCompleted,
        }
      )

      if (resp.success) {
        dispatch(
          updateIssueSuccess({
            issue: {
              ...currentIssue,
              status: closeAsCompleted ? 'completed' : 'closed',
            },
          })
        )
      }
    }
  }

  return (
    <ProjectLayout currentTabId="issues">
      {currentIssue && (
        <div className="issue-container">
          <div className="issue-header">
            <div className="issue-title">{currentIssue.title}</div>
            {userCreated && (
              <div className="user-created-issue">
                {`${userCreated.username} created this issue ${fromNow(
                  currentIssue.inserted_at
                )}`}
              </div>
            )}
            <div>
              <Flex justify="end">
                <Button
                  type="primary"
                  icon={<PlusCircle />}
                  onClick={creatingNewTask}
                >
                  New task
                </Button>
              </Flex>
            </div>
          </div>
          <Divider />
          <Flex className="issue-body">
            <div
              style={{ width: '100%', marginRight: 16 }}
              className="issue-main-content"
            >
              <div>
                {userCreated && (
                  <CommentIssueItem
                    id="issueDescription"
                    user={userCreated}
                    content={currentIssue.description}
                    time={fromNow(currentIssue.inserted_at)}
                  />
                )}
              </div>
              <Card className="tasks-card" loading={task.fetching}>
                <div className="list-task">
                  <Flex vertical gap={12}>
                    {task.data.map((task) => (
                      <TaskItem key={task.id} task={task} dispatch={dispatch} />
                    ))}
                  </Flex>
                </div>
              </Card>
              <Flex gap={16} vertical style={{ margin: 24 }}>
                {comments.map((comment) => (
                  <CommentIssueItem
                    key={comment.id}
                    id={comment.id}
                    rightSide={comment.from_id == auth.userId}
                    user={getUserInProject(currentProject, comment.from_id)}
                    content={comment.content}
                    time={fromNow(comment.inserted_at)}
                  />
                ))}
              </Flex>
              <div className="issue-comment-box">
                <h3>Comment</h3>
                <Editor
                  height={200}
                  value={comment}
                  onEditorChange={(value) => setComment(value)}
                />
                <Flex justify="flex-end" style={{ marginTop: 16 }} gap={8}>
                  <Dropdown.Button
                    style={{ width: 'unset' }}
                    icon={<CaretDown size={20} />}
                    onClick={handleCloseIssue}
                    danger={['closed', 'completed'].includes(
                      currentIssue.status
                    )}
                    menu={{
                      items: [
                        {
                          key: '1',
                          label: (
                            <Flex align="center" gap={8}>
                              <CheckCircle color={COLORS.purple[6]} />
                              Close as completed
                            </Flex>
                          ),
                        },
                        {
                          key: '2',
                          label: (
                            <Flex align="center" gap={8}>
                              <XCircle color={COLORS.gray[4]} />
                              Close as not planned
                            </Flex>
                          ),
                        },
                      ],
                      onClick: (key) => setCloseAsCompleted(key.key == '1'),
                    }}
                  >
                    <Flex align="center" gap={4}>
                      {closeAsCompleted ? (
                        <CheckCircle color={COLORS.purple[6]} size={16} />
                      ) : (
                        <XCircle color={COLORS.gray[4]} size={16} />
                      )}{' '}
                      {['closed', 'completed'].includes(currentIssue.status)
                        ? 'Reopen Issue'
                        : 'Close Issue'}
                    </Flex>
                  </Dropdown.Button>
                  <Button onClick={handleComment} type="primary">
                    Comment
                  </Button>
                </Flex>
              </div>
            </div>
            <Col span={8} style={{ maxWidth: '25%' }}>
              <IssueRightBar />
            </Col>
          </Flex>
          <ModalCreateTask
            open={openModalCreateTask}
            onCancel={() => setOpenModalCreateTask(false)}
            issue={currentIssue}
            dispatch={dispatch}
          />
          <div>
            <div data-color-mode="light"></div>
          </div>
        </div>
      )}
    </ProjectLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  issues: state.issue.data,
  task: state.task,
  currentIssue: state.issue.currentIssue,
  currentProject: state.project.currentProject,
  auth: state.auth,
})

export default connect(mapStateToProps)(withAuth(Issue))
