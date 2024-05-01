import { selectProject } from 'actions/project'
import { Col, Row } from 'antd'
import RightBar from 'feature/project/RightBar'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { AppDispatch } from 'store'
import { connectAndMapStateToProps } from 'utils/redux'

interface Props {
  auth: AuthState
  project: ProjectState
  dispatch: AppDispatch
}

const Project = ({ auth, project, dispatch }: Props) => {
  const router = useRouter()
  const { owner_name, project_name } = router.query

  useEffect(() => {
    const currentProject = project.data.find(
      (project) =>
        project.owner.username === owner_name && project.name === project_name
    )
    if (currentProject) {
      dispatch(selectProject({ currentProject: currentProject }))
    }
  }, [project.fetching])

  return (
    <ProjectLayout>
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
