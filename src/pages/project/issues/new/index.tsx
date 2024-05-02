import { Col, Flex, Input, Row } from 'antd'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import Editor from 'components/Editor'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import React, { useState } from 'react'
import { connectAndMapStateToProps } from 'utils/redux'
import './index.scss'

const NewIssue = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <ProjectLayout currentTabId="issues">
      <Flex gap={16}>
        <CurrentUserAvatar />
        <Row className="issue-information" gutter={24}>
          <Col span={24}>
            <div className="issue-title">
              <h3 className="label-text">Add a title</h3>
              <Input placeholder="Title" />
            </div>

            <div className="issue-description">
              <h3 className="label-text">Add a description</h3>
              <Editor />
            </div>
          </Col>
        </Row>
      </Flex>
    </ProjectLayout>
  )
}

export default connectAndMapStateToProps(['auth', 'issue'])(withAuth(NewIssue))
