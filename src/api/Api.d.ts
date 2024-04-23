export interface BaseResponse {
  message?: string
  code?: number
  status?: number
}

export interface SuccessResponse extends BaseResponse {
  success: true
}

export interface ErrorResponse extends BaseResponse {
  success: false
}

export type RequestParams = Record<string, any>

export type WithBaseResponse<T> = (T & SuccessResponse) | ErrorResponse
