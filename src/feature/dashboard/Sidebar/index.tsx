import { RootState } from 'store'
import { connect } from 'react-redux'
import { Button, Flex } from 'antd'

import CurrentUserAvatar from 'common/CurrentUserAvatar'
import { FolderPlus } from '@phosphor-icons/react'
import Router from 'next/router'

interface Props {
  auth: RootState['auth']
}

const Sidebar = ({ auth }: Props) => {
  const handleClickNew = () => {
    Router.push('project/new', '/new')
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Flex align="center" gap={8}>
          <CurrentUserAvatar size={24} textSizeRatio={1.75} />
          <div className="current-user">{auth.username || auth.email}</div>
          <Button type="primary" icon={<FolderPlus />} onClick={handleClickNew}>
            New
          </Button>
        </Flex>
      </div>
      <div className="sidebar-container"></div>
    </aside>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(Sidebar)
