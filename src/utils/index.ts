import { notification } from 'antd'
import { Project } from 'types/global'
import moment from 'moment'
import { Socket } from 'phoenix'
import { distance } from 'fastest-levenshtein'

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
