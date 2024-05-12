import Navbar from 'components/Navbar'
import ProjectNavbar from 'feature/project/ProjectNavbar'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
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
  console.log(router.query)

  const { owner_name, project_name } = router.query
  const dispatch = useAppDispatch()
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
    <div className="project-layout main-layout">
      <Navbar />
      <ProjectNavbar
        currentTabId={currentTabId}
        currentProject={project.currentProject}
      />
      <div className="main-content project-content">{children}</div>
    </div>
  )
}

export default connectAndMapStateToProps(['project'])(ProjectLayout)
