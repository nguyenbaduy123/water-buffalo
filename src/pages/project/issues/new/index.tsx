import { Button, Col, Flex, Input, Row } from 'antd'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import Editor from 'components/Editor'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import React, { useState } from 'react'
import './index.scss'
import LifeApi from 'api/LifeApi'
import { RootState } from 'store'
import { connect } from 'react-redux'
import Router from 'next/router'
import { getProjectUniqueName } from 'utils'

export interface Props {
  auth: RootState['auth']
  currentProject: RootState['project']['currentProject']
}

const NewIssue = ({ auth, currentProject }: Props) => {
  if (!currentProject) {
    return null
  }
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeDescription = (text: string) => {
    setDescription(text)
  }

  const submitIssue = async () => {
    const resp = await LifeApi.submitIssue(currentProject.id, {
      title,
      description,
    })

    if (resp.success) {
      Router.push(
        '/project/issues',
        `/${getProjectUniqueName(currentProject)}/issues`
      )
    }
  }

  return (
    <ProjectLayout currentTabId="issues">
      <Flex gap={16}>
        <CurrentUserAvatar />
        <Row className="issue-information" gutter={24}>
          <Col span={24}>
            <div className="issue-title">
              <h3 className="label-text">Add a title</h3>
              <Input
                placeholder="Title"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>

            <div className="issue-description">
              <h3 className="label-text">Add a description</h3>
              <Editor onEditorChange={handleChangeDescription} />
            </div>
            <Flex justify="flex-end" style={{ marginTop: 12 }}>
              <Button type="primary" onClick={submitIssue}>
                Submit
              </Button>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </ProjectLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(withAuth(NewIssue))
