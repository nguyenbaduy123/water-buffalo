export interface Issue {
  id: number
  title: string
  description: string
  status: string
  priority: number | null
}

export interface UserProject {
  id: number
  name: string
  username: string
  email: string
  avatar_url: string | null
  role: string
}
