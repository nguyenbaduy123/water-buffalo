import Navbar from 'components/Navbar'
import ProjectNavbar from 'feature/project/ProjectNavbar'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ProjectState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'
import { ProjectTabs } from 'feature/project/ProjectNavbar/ProjectNavbar'

import 'css/modules/_project.scss'
import { selectProject } from 'actions/project'
interface Props {
  project: ProjectState
  children: React.ReactNode
  currentTabId: ProjectTabs
}
const ProjectLayout = ({ children, project, currentTabId }: Props) => {
  const router = useRouter()

  const { owner_name, project_name } = router.query as {
    owner_name: string
    project_name: string
  }
  const dispatch = useAppDispatch()
  useEffect(() => {
    const currentProject =
      owner_name &&
      project_name &&
      project.data.find(
        (project) =>
          [project.owner.username, project.owner_id].includes(owner_name) &&
          [project.name, project.id].includes(project_name)
      )

    if (currentProject) {
      dispatch(selectProject(currentProject.id))
    }
  }, [project.fetching])

  return (
    <div className="project-layout main-layout">
      <ProjectNavbar
        currentTabId={currentTabId}
        currentProject={project.currentProject}
      />
      <div className="main-content project-content">{children}</div>
    </div>
  )
}

export default connectAndMapStateToProps(['project'])(ProjectLayout)
