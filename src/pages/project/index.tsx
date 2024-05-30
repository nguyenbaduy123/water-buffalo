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
            <h2 className="text-center">{project.currentProject?.name}</h2>
            <h3 className="text-center mt8">
              {project.currentProject?.description}
            </h3>
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
