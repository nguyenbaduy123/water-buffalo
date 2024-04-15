import withAuth from 'hocs/withAuth'
import MainLayout from 'layouts/MainLayout'
import { NextPage } from 'next'
import { AuthState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'

import './index.scss'

interface Props {
  auth: AuthState
}

const NewProject: NextPage<Props> = ({ auth }: Props) => {
  return (
    <MainLayout>
      <div className="new-project-page">
        <h3 className="new-pj-header">Create a new project</h3>
      </div>
    </MainLayout>
  )
}

export default connectAndMapStateToProps(['auth'])(withAuth(NewProject))
