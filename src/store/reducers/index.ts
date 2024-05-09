import authReducer from './auth'
import projectReducer from './project'
import notificationReducer from './notification'
import issueReducer from './issue'
import taskReducer from './task'

export default {
  auth: authReducer,
  project: projectReducer,
  notification: notificationReducer,
  issue: issueReducer,
  task: taskReducer,
}
