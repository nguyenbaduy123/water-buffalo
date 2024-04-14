export interface BaseResponse {
  success: boolean
  message?: string
  code?: number
  status?: number
}

export type RequestParams = Record<string, any>

export type WithBaseResponse<T> = T & BaseResponse
