import { Car, CaretDown } from '@phosphor-icons/react'
import { loadProjectComments } from 'actions/project'
import { Button, Card, Col, Dropdown, Flex, Row } from 'antd'
import LifeApi from 'api/LifeApi'
import CircleChart from 'components/CircleChart'
import Editor from 'components/Editor'
import CommentList from 'feature/project/CommentList'
import RightBar from 'feature/project/RightBar'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import React, { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { AppDispatch } from 'store'
import { IssueStatistic, ProjectStatistics } from 'types/project'
import { notificationError, notificationSuccess } from 'utils'
import { connectAndMapStateToProps } from 'utils/redux'

interface Props {
  auth: AuthState
  project: ProjectState
  dispatch: AppDispatch
}

const Project = ({ auth, project, dispatch }: Props) => {
  const [comment, setComment] = React.useState('')
  const { currentProject } = project
  const [statistic, setStatistic] = React.useState<ProjectStatistics | null>(
    null
  )

  const getProjectStatistics = async () => {
    if (!currentProject) return
    const resp = await LifeApi.getProjectCurrentStatistics(currentProject.id)

    if (resp.success) {
      setStatistic(resp.statistic)
    } else {
      notificationError(resp.message || 'Failed to get project statistics')
    }
  }

  useEffect(() => {
    currentProject && dispatch(loadProjectComments(currentProject.id || 0))
    getProjectStatistics()
  }, [currentProject?.id])

  const handleComment = async () => {
    if (!currentProject || !comment) return
    const resp = await LifeApi.commentOnProject(currentProject.id, {
      message: comment,
    })
    if (resp.success) {
      setComment('')
      // dispatch(loadProjectComments(currentProject.id))
    } else {
      notificationError(resp.message || 'Comment failed')
    }
  }

  return (
    <ProjectLayout currentTabId="project">
      <div className="project-content">
        <Row gutter={12}>
          <Col span={18}>
            <h2 className="text-center mb16">{project.currentProject?.name}</h2>
            <Row gutter={24} className="mb16">
              <Col span={12}>
                <Card title="Overview" style={{ height: '100%' }}>
                  <Row className="mb24">
                    <Col span={12}>
                      <h3>Issues</h3>
                      <p>{statistic?.issue_count}</p>
                    </Col>
                    <Col span={12}>
                      <h3>Tasks</h3>
                      <p>{statistic?.task_count}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <h3>Members</h3>
                      <p>{currentProject?.users.length}</p>
                    </Col>
                    <Col span={12}>
                      <h3>Tags</h3>
                      <p>{currentProject?.settings.tags.length}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Current Progress">
                  {statistic && (
                    <CircleChart
                      subTitle={`<div style="margin-top: -40px; color: #fff;">
                        <div style="font-size: 40px";>
                          ${
                            (statistic.issue_completed_count /
                              statistic.issue_count) *
                            100
                          }%</div>
                        </div>
                        `}
                      data={[
                        [
                          'Completed',
                          (statistic.issue_completed_count /
                            statistic.issue_count) *
                            100,
                        ],
                        [
                          'In Progress',
                          ((statistic.issue_count -
                            statistic.issue_completed_count) /
                            statistic.issue_count) *
                            100,
                        ],
                      ]}
                    />
                  )}
                </Card>
              </Col>
            </Row>
            {/* <h3 className="text-center mt8">
              {project.currentProject?.description}
            </h3> */}
            <CommentList />
            <div className="issue-comment-box">
              <Editor
                height={150}
                value={comment}
                onEditorChange={(value) => setComment(value)}
              />
              <Flex justify="flex-end" style={{ marginTop: 16 }} gap={8}>
                <Button
                  onClick={handleComment}
                  type="primary"
                  disabled={!comment}
                >
                  Comment
                </Button>
              </Flex>
            </div>
          </Col>
          <Col span={6}>
            <RightBar />
          </Col>
        </Row>
      </div>
    </ProjectLayout>
  )
}

export default withAuth(connectAndMapStateToProps(['auth', 'project'])(Project))
