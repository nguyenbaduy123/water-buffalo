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
  CreateProjectParams,
  CreateProjectResponse,
  ValidateProjectNameParams,
  ValidateProjectNameResponse,
  GetProjectResponse,
  SearchUserResponse,
  LoadNotificationsResponse,
  LoadIssuesResponse,
  SubmitIssueParams,
  SubmitIssueResponse,
  LoadIssuesParams,
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
    this.get<GetProjectsResponse>('/project', params)

  public createProject = (params: CreateProjectParams) =>
    this.post<CreateProjectResponse>('/project', params)

  public validateProjectName = (params: ValidateProjectNameParams) =>
    this.get<ValidateProjectNameResponse>('/project/validate_name', params)

  public getProject = (id: string) =>
    this.get<GetProjectResponse>(`/project/${id}`)

  public searchUser = (query: string) =>
    this.get<SearchUserResponse>('/user/search', { q: query })

  public inviteUserToProject = (projectId: string | number, userId: string) =>
    this.post(`/project/${projectId}/invite`, { user_id: userId })

  public loadNotifications = () =>
    this.get<LoadNotificationsResponse>('/user/notifications')

  public acceptOrDeclineInvitation = (
    projectId: string | number,
    invitationId: string,
    isAccept: boolean
  ) =>
    this.post(`/project/${projectId}/invite/${invitationId}`, {
      is_accept: isAccept,
    })

  public loadIssues = (projectId: string | number, params?: LoadIssuesParams) =>
    this.get<LoadIssuesResponse>(`/project/${projectId}/issue`, params)

  public submitIssue = (
    projectId: string | number,
    params: SubmitIssueParams
  ) => this.post<SubmitIssueResponse>(`/project/${projectId}/issue`, params)
}

export default new LifeApi() as LifeApi
