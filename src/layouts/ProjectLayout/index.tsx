import Navbar from 'components/Navbar'
import ProjectNavbar from 'feature/project/ProjectNavbar'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'

import 'css/modules/_project.scss'
interface Props {
  auth: AuthState
  project: ProjectState
  children: React.ReactNode
}
const ProjectLayout = ({ children, auth, project }: Props) => {
  const router = useRouter()

  const { owner_name, project_name } = router.query
  const dispatch = useAppDispatch()

  console.log(router)

  useEffect(() => {
    const currentProject = project.data.find(
      (project) =>
        project.owner.name === owner_name && project.name === project_name
    )

    dispatch({ type: 'SET_CURRENT_PROJECT', payload: currentProject })
  }, [])

  console.log(project.currentProject)

  return (
    <div className="project-layout main-layout">
      <Navbar />
      <ProjectNavbar
        currentTabId="project"
        currentProject={project.currentProject}
      />
      <div className="main-content project-content">{children}</div>
    </div>
  )
}

export default connectAndMapStateToProps(['auth', 'project'])(ProjectLayout)
