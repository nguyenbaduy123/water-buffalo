import { Attachment } from './project'

export interface Message {
  id: string
  content: string
  seen: boolean
  attachments: Attachment[]
  from_id: string
  conversation_id: string
  inserted_at: string
}

export interface Conversation {
  id: string
  name: string
  type: string
  snippet: string
  message_count: number
  seen: boolean
  inserted_at: string
}
