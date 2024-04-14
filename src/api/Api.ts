import axios, { AxiosError, AxiosInstance } from 'axios'
import { RequestParams, WithBaseResponse } from './Api.d'

class Api {
  protected readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  private handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const responseData = error?.response?.data
      if (typeof responseData == 'string') {
        return { success: false, message: responseData, status: error.status }
      } else {
        return { success: false, ...responseData }
      }
    } else return { success: false, message: JSON.stringify(error) }
  }

  public get = async <RT>(endpoint: string, params: RequestParams = {}) => {
    try {
      const call = await this.instance.get<WithBaseResponse<RT>>(endpoint, {
        params,
      })
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  public post = async <RT>(endpoint: string, params: RequestParams = {}) => {
    try {
      const call = await this.instance.post<WithBaseResponse<RT>>(
        endpoint,
        params
      )
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  public put = async <RT>(endpoint: string, params: RequestParams = {}) => {
    try {
      const call = await this.instance.put<WithBaseResponse<RT>>(
        endpoint,
        params
      )
      return call.data
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export default Api
