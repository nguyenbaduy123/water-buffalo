import { notification } from 'antd'
import { Project } from 'types/global'
import moment from 'moment'

export const successNotification = (message: string, description: string) => {
  notification.success({
    message,
    description,
  })
}

export const errorNotification = (message: string, description: string) => {
  notification.error({
    message,
    description,
  })
}

export const infoNotification = (message: string, description: string) => {
  notification.info({
    message,
    description,
  })
}

export const convertToValidName = (input: string) => {
  return input
    .replace(/[^\w.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getProjectUniqueName = (project: Project | null) =>
  project ? `${project.owner.username}/${project.name}` : ''

export const naiveToUtc = (date: string) => {
  return moment.utc(date).format()
}
