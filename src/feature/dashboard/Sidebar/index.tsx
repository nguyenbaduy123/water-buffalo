import { RootState } from 'store'
import { connect } from 'react-redux'
import { Button, Flex } from 'antd'
import Router from 'next/router'
import { FolderPlus } from '@phosphor-icons/react'

import './index.scss'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import { useAppDispatch } from 'hooks'
import { useEffect } from 'react'
import { loadProjects } from 'actions/project'

interface Props {
  auth: RootState['auth']
}

const Sidebar = ({ auth }: Props) => {
  const handleClickNew = () => {
    Router.push('project/new', '/new')
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadProjects())
  })

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Flex align="center" gap={8}>
          <CurrentUserAvatar size={24} textSizeRatio={1.75} />
          <div className="current-user">{auth.username || auth.email}</div>
        </Flex>
      </div>
      <div className="sidebar-container">
        <Flex align="center" justify="space-between">
          <div className="top-projects">Top Projects</div>
          <Button type="primary" icon={<FolderPlus />} onClick={handleClickNew}>
            New
          </Button>
        </Flex>
      </div>
    </aside>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(Sidebar)
