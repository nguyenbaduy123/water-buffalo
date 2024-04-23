import Api from './Api'
import {
  GetAuthParams,
  GetAuthResponse,
  LoginParams,
  LoginResponse,
  GetProjectsResponse,
  GetProjectsParams,
  ValidateFieldParams,
  SignupParams,
} from './LifeApi.d'

const dev = process.env.NODE_ENV !== 'production'
const host = dev ? 'http://localhost:1408/api' : ''

class LifeApi extends Api {
  public constructor() {
    super(host)
  }

  public login = (params: LoginParams) =>
    this.post<LoginResponse>('/login', params)

  public getAuth = (params: GetAuthParams) =>
    this.get<GetAuthResponse>('/user/auth', params)

  public validateField = (params: ValidateFieldParams) =>
    this.get('/validate_field', params)

  public signup = (params: SignupParams) => this.post('/signup', params)

  public getProjects = (params: GetProjectsParams) =>
    this.get<GetProjectsResponse>('/projects', params)
}

export default new LifeApi() as LifeApi
