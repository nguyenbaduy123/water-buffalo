import { connectSocket } from 'actions/auth'
import { loadProjects } from 'actions/project'
import { useAppDispatch } from 'hooks'
import { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'

interface LayoutProps {
  children: React.ReactNode
  auth: AuthState
  project: ProjectState
}

const RootLayout = ({ children, auth, project }: LayoutProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connectSocket())
    dispatch(loadProjects())
  }, [])
  return <main>{children}</main>
}

export default connectAndMapStateToProps(['auth', 'project'])(RootLayout)
