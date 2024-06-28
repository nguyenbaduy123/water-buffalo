import { connectSocket } from 'actions/auth'
import { getNotifications } from 'actions/notification'
import { loadOrganizations } from 'actions/organization'
import { loadProjects } from 'actions/project'
import ChatBox from 'components/Chatbox'
import { useAppDispatch } from 'hooks'
import MainLayout from 'layouts/MainLayout'
import { useEffect } from 'react'
import { AuthState, ProjectState } from 'reducers/types'
import { RootState } from 'store'
import { connectAndMapStateToProps } from 'utils/redux'

interface LayoutProps {
  children: React.ReactNode
  auth: AuthState
  conversation: RootState['conversation']
}

const RootLayout = ({ children, auth, conversation }: LayoutProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!auth.userId) return
    dispatch(connectSocket())
    dispatch(loadProjects())
    dispatch(getNotifications())
    dispatch(loadOrganizations())
  }, [auth.userId])
  return (
    <main>
      <MainLayout>
        {children}
        {conversation.selected && (
          <div className="chat-boxes">
            <ChatBox />
          </div>
        )}
      </MainLayout>
    </main>
  )
}

export default connectAndMapStateToProps(['auth', 'project', 'conversation'])(
  RootLayout
)
