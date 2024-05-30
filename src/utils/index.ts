import { NotificationArgsProps, notification } from 'antd'
import { Project, User } from 'types/global'
import moment from 'moment'
import { Socket } from 'phoenix'
import { COLORS } from './css'

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

export const infoNotification = (
  message: string,
  description: string,
  onClick?: () => void
) => {
  notification.info({
    message,
    description,
    onClick,
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

export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`

export const channelConnect = (
  socket: Socket,
  channelName: string,
  access_token: string
) => {
  const channel = socket.channel(channelName, { token: access_token })
  channel.join()
  return channel
}

export const fuzzySearch = (pattern: string, string: string) =>
  fuzzyMatch(pattern, string) !== null

export const fuzzyMatch = (pattern: string, string: string) => {
  pattern = convertVN(pattern || '')
  string = convertVN(string || '')
  var patternIdx = 0,
    result = [],
    len = string.length,
    totalScore = 0,
    currScore = 0,
    compareString = string.toLowerCase(),
    ch,
    firstMatchIndex

  pattern = pattern.toLowerCase()

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for (var idx = 0; idx < len; idx++) {
    ch = string[idx]
    if (compareString[idx] === pattern[patternIdx]) {
      ch = ch
      if (patternIdx === 0) firstMatchIndex = idx
      patternIdx += 1

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore
    } else {
      currScore = 0
    }
    totalScore += currScore
    result[result.length] = ch
  }

  // return rendered string if we have a match for every char
  if (patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    totalScore = compareString === pattern ? Infinity : totalScore
    return {
      rendered: result.join(''),
      score: totalScore,
      startIndex: firstMatchIndex,
    }
  }

  return null
}

export const convertVN = (str: string) => {
  str = str.toString()
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  return str
}

export const dummyUser: User = {
  id: '',
  username: 'Anonymous',
  email: '',
  avatar_url: null,
  locale: 'en',
  country: 'US',
  name: '',
}

export const getUserInProject = (project: Project | null, userId: string) => {
  return project?.users.find((user) => user.id == userId) || dummyUser
}

export const notificationSuccess = (
  description: string,
  options: Partial<NotificationArgsProps> = {}
) => {
  notification.success({
    message: 'Success',
    description,
    ...options,
  })
}

export const notificationError = (
  description: string,
  options: Partial<NotificationArgsProps> = {}
) => {
  notification.error({
    message: 'Error',
    description,
    ...options,
  })
}

export const getPriorityData = (priority: number | null) => {
  let text: string, color: string, backgroundColor: string

  switch (priority) {
    case 1:
      text = 'Low'
      color = COLORS.green[6]
      backgroundColor = 'rgba(76, 175, 80, 0.2)'
      break
    case 2:
      text = 'Medium'
      color = COLORS.orange[6]
      backgroundColor = 'rgba(255, 152, 0, 0.2)'
      break
    case 3:
      text = 'High'
      color = COLORS.red[6]
      backgroundColor = 'rgba(244, 67, 54, 0.2)'
      break
    default:
      text = 'None'
      color = COLORS.gray[6]
      backgroundColor = 'rgba(158, 158, 158, 0.2)'
  }

  return { text, color, backgroundColor }
}

export const toCapitalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}
