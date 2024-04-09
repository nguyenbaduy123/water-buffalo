import axios, { AxiosError, AxiosInstance } from 'axios'

export type RequestParams = Record<string, any>

class Api {
  protected readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  private handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const responseData = error?.response?.data
      if (typeof responseData == 'string') {
        return { success: false, message: responseData }
      } else {
        return { success: false, ...responseData }
      }
    } else return { success: false, message: JSON.stringify(error) }
  }

  public async get<ResponseType>(endpoint: string, params: RequestParams = {}) {
    let resp: ResponseType
    try {
      const call = await this.instance.get<ResponseType>(endpoint, {
        params,
      })
      resp = call.data
    } catch (error) {
      resp = this.handleError(error)
    }

    return resp
  }

  public async post<ResponseType>(
    endpoint: string,
    params: RequestParams = {}
  ) {
    let resp: ResponseType

    try {
      const call = await this.instance.post<ResponseType>(endpoint, params)
      resp = call.data
    } catch (error) {
      resp = this.handleError(error)
    }

    return resp
  }
}

export default Api
