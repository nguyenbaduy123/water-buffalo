import { Col, Row } from 'antd'
import RightBar from 'feature/project/RightBar'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { useRouter } from 'next/router'
import { AuthState, ProjectState } from 'reducers/types'
import { AppDispatch } from 'store'
import { connectAndMapStateToProps } from 'utils/redux'

interface Props {
  auth: AuthState
  project: ProjectState
  dispatch: AppDispatch
}

const Project = ({ auth, project, dispatch }: Props) => {
  return (
    <ProjectLayout currentTabId="project">
      <div className="project-content">
        <Row gutter={4}>
          <Col span={18}>
            {project.currentProject?.name}
            <div>{project.currentProject?.description}</div>
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
