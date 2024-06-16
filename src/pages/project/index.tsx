import { CaretDown } from '@phosphor-icons/react'
import { loadProjectComments } from 'actions/project'
import { Button, Col, Dropdown, Flex, Row } from 'antd'
import LifeApi from 'api/LifeApi'
import Editor from 'components/Editor'
import CommentList from 'feature/project/CommentList'
import RightBar from 'feature/project/RightBar'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import React, { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { AppDispatch } from 'store'
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

  useEffect(() => {
    currentProject && dispatch(loadProjectComments(currentProject.id || 0))
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
            <h2 className="text-center">{project.currentProject?.name}</h2>
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
