import LifeApi from 'api/LifeApi'
import TableMemberStatistics from 'feature/project/TableMemberStatistics'
import withAuth from 'hocs/withAuth'
import StatisticsLayout from 'layouts/StatisticsLayout'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { MemberStatistics } from 'types/project'
import { notificationError } from 'utils'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const ProjectMemberStatistic: NextPage<Props> = ({ currentProject }) => {
  const [memberStatistics, setMemberStatistics] =
    React.useState<MemberStatistics | null>(null)

  const getStatistics = async () => {
    if (!currentProject) return
    const resp = await LifeApi.getProjectMembersStatistics(currentProject.id)

    if (resp.success) {
      setMemberStatistics(resp.statistics)
    } else {
      notificationError(resp.message || 'Failed to get member statistics')
      console.error('Failed to get member statistics')
    }
  }

  useEffect(() => {
    getStatistics()
  }, [currentProject?.id])

  return (
    <StatisticsLayout currentTabId="members">
      <TableMemberStatistics
        currentProject={currentProject}
        statistics={memberStatistics}
      />
    </StatisticsLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(ProjectMemberStatistic))
