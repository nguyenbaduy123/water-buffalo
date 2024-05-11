import { notification } from 'antd'
import { Project } from 'types/global'
import moment from 'moment'
import { Socket } from 'phoenix'

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

export const getProjectRoute = (project: Project | null, route: string) =>
  `/${getProjectUniqueName(project)}${route}`

export const naiveToUtc = (date: string) => {
  return moment.utc(date).format()
}

export const fromNow = (naiveString: string) => {
  return moment(naiveToUtc(naiveString)).fromNow()
}

export const redirectGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth`
}

export const channelConnect = (
  socket: Socket,
  channelName: string,
  access_token: string
) => {
  const channel = socket.channel(channelName, { token: access_token })
  channel.join()
  return channel
}
