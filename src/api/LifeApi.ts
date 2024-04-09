import Api from './Api'
import { BaseResponse, LoginParams, LoginResponse } from './LifeApi.d'

const dev = process.env.NODE_ENV !== 'production'
const host = dev ? 'http://localhost:1408/api' : ''

class LifeApi extends Api {
  public constructor() {
    super(host)
  }

  public login = (params: LoginParams) =>
    this.post<LoginResponse>('/login', params)
}

export default new LifeApi() as LifeApi
