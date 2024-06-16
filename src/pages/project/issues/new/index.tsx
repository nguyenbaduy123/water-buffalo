import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  Row,
  Select,
} from 'antd'
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
import UserAvatar from 'common/UserAvatar'
import PriorityTag from 'components/PriorityTag'
import RenderTag from 'components/RenderTag'
import { Task } from 'types/project'
import { PlusCircle } from '@phosphor-icons/react'

export interface Props {
  auth: RootState['auth']
  currentProject: RootState['project']['currentProject']
}

interface NewTask {
  title: string
  description: string
}

const NewIssue = ({ auth, currentProject }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignees, setAssignees] = useState<string[]>([])
  const [priority, setPriority] = useState<number>(0)
  const [tags, setTags] = useState<number[]>([])
  const [tasks, setTasks] = useState<NewTask[]>([])
  const [milestone, setMilestone] = useState<Date | null>(null)

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleChangeDescription = (text: string) => {
    setDescription(text)
  }

  const submitIssue = async () => {
    if (!currentProject) return
    const resp = await LifeApi.submitIssue(currentProject.id, {
      title,
      description,
      assignee_ids: assignees,
      priority: priority,
      tag_ids: tags,
      tasks,
    })

    if (resp.success) {
      Router.push(
        '/project/issues',
        `/${getProjectUniqueName(currentProject)}/issues`
      )
    }
  }

  const renderTasks = () => {
    const onChangeTask = (index: number, changes: Partial<NewTask>) => {
      const newTasks = [...tasks]
      newTasks[index] = { ...newTasks[index], ...changes }
      setTasks(newTasks)
    }
    return tasks.map((task, index) => (
      <div
        key={index}
        style={{ borderBottom: '1px solid var(--gray-8)' }}
        className="pb16"
      >
        <Input
          value={task.title}
          onChange={(e) =>
            onChangeTask(index, {
              title: e.target.value,
            })
          }
          className="mb16"
          placeholder="Task title"
        />
        <Input.TextArea
          value={task.description}
          onChange={(e) =>
            onChangeTask(index, {
              description: e.target.value,
            })
          }
          placeholder="Task description"
        />
      </div>
    ))
  }

  return (
    <ProjectLayout currentTabId="issues">
      {currentProject && (
        <Row gutter={24}>
          <Col span={16}>
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

                  <div className="issue-description mb24">
                    <h3 className="label-text">Add a description</h3>
                    <Editor
                      height={200}
                      onEditorChange={handleChangeDescription}
                    />
                  </div>
                  <div className="issue-tasks mt24">
                    <Flex align="center" className="mb8" gap={16}>
                      <h3>Tasks</h3>
                      <Button
                        type="primary"
                        style={{
                          width: 32,
                          height: 32,
                          padding: 6,
                        }}
                        onClick={() =>
                          setTasks([...tasks, { title: '', description: '' }])
                        }
                      >
                        <PlusCircle size={20} />
                      </Button>
                    </Flex>
                    <Flex vertical gap={16}>
                      {renderTasks()}
                    </Flex>
                    <div className="issue-tasks-create"></div>
                  </div>
                  <Flex justify="flex-end" style={{ marginTop: 12 }}>
                    <Button type="primary" onClick={submitIssue}>
                      Submit
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col
            span={8}
            style={{ maxWidth: '25%', borderLeft: '1px solid var(--gray-7)' }}
          >
            <Flex vertical gap={24} className="issue-more-infos">
              <div className="issue-assignee">
                <h3 className="label-text">Assignees</h3>
                <div className="assignee-content">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select assignees"
                    options={currentProject.users.map((user) => ({
                      label: (
                        <Flex align="center" gap={8}>
                          <UserAvatar user={user} size={16} />
                          {user.name || user.username}
                        </Flex>
                      ),
                      value: user.id,
                    }))}
                    onChange={(values) => setAssignees(values)}
                  />
                </div>
              </div>
              <div className="issue-priority">
                <h3 className="label-text">Priority</h3>
                <Flex align="center" gap={8}>
                  {[0, 1, 2, 3].map((p) => (
                    <div
                      key={p}
                      style={{
                        opacity: priority == p ? 1 : 0.2,
                        cursor: 'pointer',
                      }}
                      onClick={() => setPriority(p)}
                    >
                      <PriorityTag priority={p} />
                    </div>
                  ))}
                </Flex>
              </div>
              <div className="issue-tags">
                <h3 className="label-text">Tags</h3>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Select tags"
                  options={currentProject.settings.tags.map((tag) => ({
                    label: <RenderTag tag={tag} />,
                    value: tag.id,
                  }))}
                  onChange={(values) => setTags(values)}
                />
              </div>
              <div className="issue-milestone">
                <h3 className="label-text">Milestone</h3>
                <DatePicker
                  style={{ width: '100%' }}
                  value={milestone}
                  onChange={setMilestone}
                />
              </div>
            </Flex>
          </Col>
        </Row>
      )}
    </ProjectLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(withAuth(NewIssue))
