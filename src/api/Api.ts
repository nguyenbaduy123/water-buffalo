import axios, { AxiosError, AxiosInstance } from 'axios'
import { ErrorResponse, RequestParams, WithBaseResponse } from './Api.d'
import Cookies from 'js-cookie'

class Api {
  protected readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  private getAccessToken = () => {
    return Cookies.get('life_jwt')
  }

  private makeUrl = (endpoint: string) => {
    const accessToken = this.getAccessToken()
    if (accessToken) return `${endpoint}?access_token=${this.getAccessToken()}`
    return endpoint
  }

  private handleError = (error: unknown): ErrorResponse => {
    if (error instanceof AxiosError) {
      const responseData = error?.response?.data
      if (typeof responseData == 'string') {
        return { success: false, message: responseData, status: error.status }
      } else {
        return { success: false, ...responseData }
      }
    } else return { success: false, message: JSON.stringify(error) }
  }

  get = async <RT>(
    endpoint: string,
    params: RequestParams = {}
  ): Promise<WithBaseResponse<RT>> => {
    try {
      const call = await this.instance.get<WithBaseResponse<RT>>(
        this.makeUrl(endpoint),
        {
          params,
        }
      )
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  post = async <RT>(
    endpoint: string,
    params: RequestParams = {}
  ): Promise<WithBaseResponse<RT>> => {
    try {
      const call = await this.instance.post<WithBaseResponse<RT>>(
        this.makeUrl(endpoint),
        params
      )
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  put = async <RT>(
    endpoint: string,
    params: RequestParams = {}
  ): Promise<WithBaseResponse<RT>> => {
    try {
      const call = await this.instance.put<WithBaseResponse<RT>>(
        this.makeUrl(endpoint),
        params
      )
      return call.data
    } catch (error) {
      console.error('ApiError:', endpoint, params, error)
      return this.handleError(error)
    }
  }

  upload = async <RT>(
    endpoint: string,
    file: File
  ): Promise<WithBaseResponse<RT>> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const call = await this.instance.post<WithBaseResponse<RT>>(
        this.makeUrl(endpoint),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export default Api
