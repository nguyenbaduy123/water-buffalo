import { selectIssue } from 'actions/issue'
import { Button, Card, Col, Divider, Flex, Row } from 'antd'
import LifeApi from 'api/LifeApi'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import './index.scss'
import { fromNow } from 'utils'
import CommentIssueItem from 'components/CommentIssueItem'
import { PlusCircle } from '@phosphor-icons/react'
import ModalCreateTask from 'feature/issues/ModalCreateTask'
import TaskItem from 'components/TaskItem'
import { loadTasks } from 'actions/task'
import IssueRightBar from 'feature/issues/IssueRightBar'

interface Props {
  issues: RootState['issue']['data']
  currentProject: RootState['project']['currentProject']
  fetching: RootState['issue']['fetching']
  currentIssue: RootState['issue']['currentIssue']
  task: RootState['task']
  dispatch: AppDispatch
}

const Issue: NextPage<Props> = ({
  currentProject,
  dispatch,
  currentIssue,
  task,
}) => {
  const router = useRouter()

  const [openModalCreateTask, setOpenModalCreateTask] = React.useState(false)

  const { issue_id } = router.query

  const getIssue = async () => {
    if (!currentProject) return
    const resp = await LifeApi.getIssueDetail(
      currentProject.id,
      parseInt(`${issue_id}`)
    )

    if (resp.success) {
      dispatch(selectIssue({ currentIssue: resp.issue }))
    }
  }

  useEffect(() => {
    getIssue()
  }, [currentProject])

  useEffect(() => {
    dispatch(loadTasks())
  }, [currentIssue])

  const userCreated = currentProject?.users.find(
    (user) => user.id === currentIssue?.created_by_id
  )

  const creatingNewTask = () => {
    setOpenModalCreateTask(true)
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
            <div style={{ width: '100%', marginRight: 16 }}>
              <div>
                {userCreated && (
                  <CommentIssueItem
                    user={userCreated}
                    content={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: currentIssue.description,
                        }}
                      />
                    }
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
            </div>
            <Col span={8} style={{ maxWidth: 300 }}>
              <IssueRightBar />
            </Col>
          </Flex>
          <ModalCreateTask
            open={openModalCreateTask}
            onCancel={() => setOpenModalCreateTask(false)}
            issue={currentIssue}
            dispatch={dispatch}
          />
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
})

export default connect(mapStateToProps)(withAuth(Issue))
