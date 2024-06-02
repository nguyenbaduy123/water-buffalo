import CommentIssueItem from 'components/CommentIssueItem'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { fromNow, getUserInProject } from 'utils'
import './style.scss'

interface Props {
  auth: RootState['auth']
  currentProject: RootState['project']['currentProject']
}

const ProjectCommentList: React.FC<Props> = ({ auth, currentProject }) => {
  if (!currentProject) return null
  const listRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [currentProject.comments?.length])

  const comments = currentProject.comments || []
  return (
    <div className="project-comment-list" ref={listRef}>
      {comments.map((comment) => {
        return (
          <CommentIssueItem
            key={comment.id}
            id={comment.id}
            rightSide={comment.from_id == auth.userId}
            user={getUserInProject(currentProject, comment.from_id)}
            content={comment.message}
            time={fromNow(comment.inserted_at)}
          />
        )
      })}
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(ProjectCommentList)
//
