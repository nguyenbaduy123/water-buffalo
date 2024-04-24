import { NextPage } from 'next'
import { CheckCircle } from '@phosphor-icons/react'
import { Button, Col, Divider, Flex, Input, Row, Select } from 'antd'
import { useState } from 'react'

import withAuth from 'hocs/withAuth'
import MainLayout from 'layouts/MainLayout'
import { AuthState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'
import './index.scss'
import { convertToValidName, successNotification } from 'utils'
import { COLORS } from 'utils/css'
import LifeApi from 'api/LifeApi'

interface Props {
  auth: AuthState
}

const NewProject: NextPage<Props> = ({ auth }: Props) => {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const handleCreateProject = async () => {
    const resp = await LifeApi.createProject({
      name: convertToValidName(projectName),
      description: projectDescription,
    })
    if (resp.success) {
      successNotification('Success', 'Project created successfully')
    } else {
      successNotification('Error', resp.message || 'Failed to create project')
    }
  }

  const handleChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  const handleChangeProjectDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectDescription(e.target.value)
  }

  return (
    <MainLayout>
      <div className="new-project-page">
        <div className="new-project-header">
          <h3 className="new-pj-header">Create a new project</h3>
        </div>
        <div className="new-project-container">
          <div>
            <Row gutter={12}>
              <Col span={12}>
                <label htmlFor="owner-name">
                  <div className="label-info">Owner*</div>
                  <Select
                    style={{ width: '100%' }}
                    id="owner-name"
                    value={auth.username || auth.email}
                    disabled
                  />
                </label>
              </Col>
              <Col span={12}>
                <label htmlFor="project-name">
                  <div className="label-info">Project Name*</div>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={handleChangeProjectName}
                    autoComplete="off"
                  />

                  {projectName && (
                    <div className="real-project-name">
                      <Flex gap={8}>
                        <div>
                          <CheckCircle
                            weight="fill"
                            color={COLORS.green[6]}
                            size={12}
                          />
                        </div>
                        <div>
                          <div className="real-name-will-create">
                            Your new repository will be created as{' '}
                            {convertToValidName(projectName)}.
                          </div>
                          <div className="guild-name-project">
                            The repository name can only contain ASCII letters,
                            digits, and the characters ., -, and _.
                          </div>
                        </div>
                      </Flex>
                    </div>
                  )}
                </label>
              </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <label htmlFor="project-description">
              <div className="label-info">Description(Optional)</div>
              <Input.TextArea
                id="project-description"
                onChange={handleChangeProjectDescription}
              />
            </label>
          </div>
        </div>
        <Divider />
        <div className="new-project-footer">
          <Flex justify="flex-end" className="create-project-button">
            <Button onClick={handleCreateProject} type="primary">
              Create project
            </Button>
          </Flex>
        </div>
      </div>
    </MainLayout>
  )
}

export default connectAndMapStateToProps(['auth'])(withAuth(NewProject))
