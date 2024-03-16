import axios, { AxiosInstance } from 'axios'

export type RequestParams = Record<string, string | number | boolean | string[]>

class Api {
  protected readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  public get = (endpoint: string, params?: RequestParams) =>
    this.instance.get(endpoint, {
      params: { ...params },
    })

  public post = (endpoint: string, params: RequestParams) =>
    this.instance.post(endpoint, params)
}

const api = new Api('http://localhost:1408')

export default api
