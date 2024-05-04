import { selectIssue } from 'actions/issue'
import { Divider, Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import './index.scss'
import { fromNow } from 'utils'
import CommentIssueItem from 'components/CommentIssueItem'

interface Props {
  issues: RootState['issue']['data']
  currentProject: RootState['project']['currentProject']
  fetching: RootState['issue']['fetching']
  currentIssue: RootState['issue']['currentIssue']
  dispatch: AppDispatch
}

const Issue: NextPage<Props> = ({ currentProject, dispatch, currentIssue }) => {
  const router = useRouter()

  const { issue_id } = router.query

  const getIssue = async () => {
    if (!currentProject) return
    const resp = await LifeApi.getIssueDetail(
      currentProject.id,
      parseInt(`${issue_id}`)
    )

    if (resp.success) {
      dispatch(selectIssue({ currentIssue: resp.issue }))
    }
  }

  useEffect(() => {
    getIssue()
  }, [currentProject])

  const userCreated = currentProject?.users.find(
    (user) => user.id === currentIssue?.created_by_id
  )

  return (
    <ProjectLayout currentTabId="issues">
      {currentIssue && (
        <div className="issue-container">
          <div className="issue-header">
            <div className="issue-title">{currentIssue.title}</div>
            {userCreated && (
              <div className="user-created-issue">
                {`${userCreated.username} created this issue ${fromNow(
                  currentIssue.inserted_at
                )}`}
              </div>
            )}
          </div>
          <Divider />
          <div>
            {userCreated && (
              <CommentIssueItem
                user={userCreated}
                content={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentIssue.description,
                    }}
                  />
                }
                time={fromNow(currentIssue.inserted_at)}
              />
            )}
          </div>
        </div>
      )}
    </ProjectLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  issues: state.issue.data,
  currentIssue: state.issue.currentIssue,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(withAuth(Issue))
