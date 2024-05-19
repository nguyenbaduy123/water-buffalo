import { NextPage } from 'next'
import { CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { Button, Col, Divider, Flex, Input, Row, Select, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import withAuth from 'hocs/withAuth'
import { AuthState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'
import './index.scss'
import {
  convertToValidName,
  errorNotification,
  successNotification,
} from 'utils'
import { COLORS } from 'utils/css'
import LifeApi from 'api/LifeApi'
import { debounce } from 'lodash'

interface Props {
  auth: AuthState
}

const NewProject: NextPage<Props> = ({ auth }: Props) => {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [validatingName, setValidatingName] = useState(false)
  const [isValidName, setIsValidName] = useState(true)
  const [inValidMessage, setInValidMessage] = useState('')

  useEffect(() => {
    if (projectName) {
      handleValidateName(projectName)
    }
  }, [projectName])

  const handleValidateName = useCallback(
    debounce(async (name: string) => {
      const resp = await LifeApi.validateProjectName({
        name: convertToValidName(name),
      })

      if (resp.success) {
        setIsValidName(resp.is_valid)
        if (!resp.is_valid) {
          console.log(resp)

          setInValidMessage(resp.message || 'Invalid project name')
        }
      } else {
        setIsValidName(false)
        setInValidMessage(resp.message || 'Failed to validate project name')
      }
      setValidatingName(false)
    }, 500),
    []
  )

  const handleCreateProject = async () => {
    const resp = await LifeApi.createProject({
      name: convertToValidName(projectName),
      description: projectDescription,
    })
    if (resp.success) {
      successNotification('Success', 'Project created successfully')
    } else {
      errorNotification('Error', resp.message || 'Failed to create project')
    }
  }

  const handleChangeProjectName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidatingName(true)
    setProjectName(e.target.value)
  }

  const handleChangeProjectDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectDescription(e.target.value)
  }

  return (
    <div>
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
                          {!validatingName ? (
                            isValidName ? (
                              <CheckCircle
                                weight="fill"
                                color={COLORS.green[6]}
                                size={12}
                              />
                            ) : (
                              <WarningCircle
                                weight="fill"
                                color={COLORS.red[6]}
                                size={12}
                              />
                            )
                          ) : null}
                        </div>
                        <div>
                          {validatingName ? (
                            <Spin size="small" />
                          ) : (
                            <div
                              className={`real-name-will-create ${
                                isValidName ? 'valid-name' : 'invalid-name'
                              }`}
                            >
                              {isValidName
                                ? `Your new repository will be created as
                            ${convertToValidName(projectName)}.`
                                : inValidMessage}
                            </div>
                          )}
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
    </div>
  )
}

export default connectAndMapStateToProps(['auth'])(withAuth(NewProject))
