import { notification } from 'antd'

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

export const convertToValidName = (input: string) => {
  return input
    .replace(/[^\w.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}
