import authReducer from './auth'
import projectReducer from './project'
import notificationReducer from './notification'
import issueReducer from './issue'

export default {
  auth: authReducer,
  project: projectReducer,
  notification: notificationReducer,
  issue: issueReducer,
}
