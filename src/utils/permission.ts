import { Project } from 'types/global'

export const OWNER = 'OWNER'
export const ADMIN = 'ADMIN'
export const MODERATOR = 'MODERATOR'
export const MEMBER = 'MEMBER'

export const PROJECT_PERMISSION = [OWNER, ADMIN, MODERATOR, MEMBER]

export const getProjectPermission = (project: Project, userId: string) => {
  const userProject = project.users.find((user) => user.id === userId)
  if (!userProject) return null
  return userProject.permission
}

export const hasAdminPermission = (permission: string | null) => {
  return permission === OWNER || permission === ADMIN
}

export const hasModeratorPermission = (permission: string | null) => {
  return (
    permission === OWNER || permission === ADMIN || permission === MODERATOR
  )
}

export const hasMemberPermission = (permission: string | null) => {
  return (
    permission === OWNER ||
    permission === ADMIN ||
    permission === MODERATOR ||
    permission === MEMBER
  )
}

export const checkHasPermission = (
  permissionCheck: string,
  permission: string | null | undefined
) => {
  switch (permissionCheck) {
    case OWNER:
      return permission === OWNER
    case ADMIN:
      return permission === OWNER || permission === ADMIN
    case MODERATOR:
      return (
        permission === OWNER || permission === ADMIN || permission === MODERATOR
      )
    case MEMBER:
      return (
        permission === OWNER ||
        permission === ADMIN ||
        permission === MODERATOR ||
        permission === MEMBER
      )
    default:
      return false
  }
}
