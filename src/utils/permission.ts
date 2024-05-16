import { Project } from 'types/global'

export const PROJECT_PERMISSION = ['OWNER', 'ADMIN', 'MODERATOR', 'MEMBER']

export const getProjectPermission = (project: Project, userId: string) => {
  const userProject = project.users.find((user) => user.id === userId)
  if (!userProject) return null
  return userProject.permission
}

export const hasAdminPermission = (permission: string | null) => {
  return permission === 'OWNER' || permission === 'ADMIN'
}

export const hasModeratorPermission = (permission: string | null) => {
  return (
    permission === 'OWNER' ||
    permission === 'ADMIN' ||
    permission === 'MODERATOR'
  )
}

export const hasMemberPermission = (permission: string | null) => {
  return (
    permission === 'OWNER' ||
    permission === 'ADMIN' ||
    permission === 'MODERATOR' ||
    permission === 'MEMBER'
  )
}
