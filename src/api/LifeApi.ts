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
  loadProjectSettingsResponse,
  GetIssueDetailResponse,
  UploadFileResponse,
  CreateTaskParams,
  CreateTaskResponse,
  GetTasksResponse,
  UpdateTaskResponse,
  ToggleAssigneeResponse,
  ToggleTagResponse,
  AddTagParams,
  AddTagResponse,
  UpdateTaskParams,
  MessagesResponse,
  MessageResponse,
  CreateOrganizationParams,
  GetOrganizationResponse,
  LoadOrganizationsResponse,
  CreateOrganizationResponse,
  CloseIssueParams,
  UpdateIssueResponse,
  UpdateProjectPermissionParams,
  CreateChannelParams,
  CreateChannelResponse,
  LoadChannelsResponse,
  SendMessageParams,
  UpdateIssueParams,
  SearchIssueParams,
  GetProjectCommentsParams,
  GetProjectStatisticsResponse,
  GetProjectMembersStatisticsResponse,
  CreateConversationParams,
  ConversationResponse,
} from './LifeApi.d'

const dev = process.env.NODE_ENV !== 'production'
const host = dev ? 'http://localhost:1408/api' : ''

class LifeApi extends Api {
  public constructor() {
    super(host)
  }

  private makeProjectEndpoint = (projectId: number, path: string = '') =>
    `/project/${projectId}${path}`

  private makeIssueEndpoint = (
    projectId: number,
    issueId: number,
    path: string = ''
  ) => `/project/${projectId}/issue/${issueId}${path}`

  private makeTaskEndpoint = (
    projectId: number,
    issueId: number,
    taskId: number,
    path: string = ''
  ) => `/project/${projectId}/issue/${issueId}/task/${taskId}${path}`

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

  public inviteUserToProject = (projectId: number, userId: string) =>
    this.post(`/project/${projectId}/invite`, { user_id: userId })

  public loadNotifications = () =>
    this.get<LoadNotificationsResponse>('/user/notifications')

  public loadProjectSettings = (projectId: number) =>
    this.get<loadProjectSettingsResponse>(`/project/${projectId}/settings`)

  public acceptOrDeclineInvitation = (
    projectId: number,
    invitationId: string,
    isAccept: boolean
  ) =>
    this.post(`/project/${projectId}/invite/${invitationId}`, {
      is_accept: isAccept,
    })

  public loadIssues = (projectId: number, params?: LoadIssuesParams) =>
    this.get<LoadIssuesResponse>(`/project/${projectId}/issue`, params)

  public submitIssue = (projectId: number, params: SubmitIssueParams) =>
    this.post<SubmitIssueResponse>(`/project/${projectId}/issue`, params)

  public getIssueDetail = (projectId: number, issueId: number) =>
    this.get<GetIssueDetailResponse>(`/project/${projectId}/issue/${issueId}`)

  public getTasks = (projectId: number, issueId: number) =>
    this.get<GetTasksResponse>(`/project/${projectId}/issue/${issueId}/task`)

  public uploadFile = (file: File) =>
    this.upload<UploadFileResponse>('/content/upload', file)

  public createTask = (
    projectId: number,
    issueId: number,
    params: CreateTaskParams
  ) =>
    this.post<CreateTaskResponse>(
      `/project/${projectId}/issue/${issueId}/task`,
      params
    )

  public updateTagStatus = (
    projectId: number,
    issueId: number,
    taskId: number,
    status: string
  ) =>
    this.post<UpdateTaskResponse>(
      `/project/${projectId}/issue/${issueId}/task/${taskId}/status`,
      {
        status,
      }
    )

  public toggleAssignee = (
    projectId: number,
    issueId: number,
    userId: string
  ) =>
    this.post<ToggleAssigneeResponse>(
      `/project/${projectId}/issue/${issueId}/assignee/toggle`,
      {
        user_id: userId,
      }
    )

  public toggleTag = (projectId: number, issueId: number, tagId: number) =>
    this.post<ToggleTagResponse>(
      `/project/${projectId}/issue/${issueId}/tag/toggle`,
      {
        tag_id: tagId,
      }
    )

  public addTag = (projectId: number, params: AddTagParams) =>
    this.post<AddTagResponse>(`/project/${projectId}/tag`, params)

  public deleteTags = (projectId: number, tagIds: number[]) =>
    this.post(`/project/${projectId}/tag/delete`, { tag_ids: tagIds })

  public updateTask = (
    projectId: number,
    issueId: number,
    taskId: number,
    params: UpdateTaskParams
  ) =>
    this.post<UpdateTaskResponse>(
      this.makeTaskEndpoint(projectId, issueId, taskId),
      params
    )

  public toggleReference = (
    projectId: number,
    issueId: number,
    userId: string
  ) =>
    this.post(this.makeIssueEndpoint(projectId, issueId, '/reference/toggle'), {
      user_id: userId,
    })

  public commentOnIssue = (
    projectId: number,
    issueId: number,
    message: string
  ) =>
    this.post<MessageResponse>(
      this.makeIssueEndpoint(projectId, issueId, '/comment'),
      {
        message,
      }
    )

  public getIssueComments = (projectId: number, issueId: number) =>
    this.get<MessagesResponse>(
      this.makeIssueEndpoint(projectId, issueId, '/comment')
    )

  public closeIssue = (
    projectId: number,
    issueId: number,
    params: CloseIssueParams
  ) =>
    this.post<UpdateIssueResponse>(
      this.makeIssueEndpoint(projectId, issueId, '/close'),
      params
    )

  public createOrganization = (params: CreateOrganizationParams) =>
    this.post<CreateOrganizationResponse>('/organization', params)

  public loadOrganizations = () =>
    this.get<LoadOrganizationsResponse>('/organization')

  public getOrganization = (id: string) =>
    this.get<GetOrganizationResponse>(`/organization/${id}`)

  public updateProjectPermission = (
    projectId: number,
    params: UpdateProjectPermissionParams
  ) => this.post(`/project/${projectId}/user/permission`, params)

  public loadChannels = (organizationId: string) =>
    this.get<LoadChannelsResponse>(`/organization/${organizationId}/channel`)

  public createChannel = (
    organizationId: string,
    params: CreateChannelParams
  ) =>
    this.post<CreateChannelResponse>(
      `organization/${organizationId}/channel`,
      params
    )

  public getChannelMessages = (organizationId: string, channelId: string) =>
    this.get<MessagesResponse>(
      `/organization/${organizationId}/channel/${channelId}/message`
    )

  public sendMessageToChannel = (
    organizationId: string,
    channelId: string,
    params: SendMessageParams
  ) =>
    this.post<MessageResponse>(
      `/organization/${organizationId}/channel/${channelId}/message`,
      params
    )

  public inviteToOrganization = (organizationId: string, userId: string) =>
    this.post(`/organization/${organizationId}/invite`, { user_id: userId })

  public acceptOrDeclineOrganizationInvitation = (
    organizationId: string,
    invitationId: string,
    isAccept: boolean
  ) =>
    this.post(`/organization/${organizationId}/invite/${invitationId}/status`, {
      is_accept: isAccept,
    })

  public addUserToChannel = (
    organizationId: string,
    channelId: string,
    userId: string
  ) =>
    this.post(`/organization/${organizationId}/channel/${channelId}/user`, {
      user_id: userId,
    })

  public transferProjectOwnership = (projectId: number, email: string) =>
    this.post(`/project/${projectId}/transfer_ownership`, { email })

  public updatePriorityProject = (projectId: number, priority: number) =>
    this.post(`/project/${projectId}/priority`, { priority })

  public closeProject = (projectId: number) =>
    this.post(`/project/${projectId}/close`)

  public updateIssue = (
    projectId: number,
    issueId: number,
    params: UpdateIssueParams
  ) =>
    this.put<UpdateIssueResponse>(
      this.makeIssueEndpoint(projectId, issueId),
      params
    )

  public searchIssues = (projectId: number, params: SearchIssueParams) =>
    this.get<LoadIssuesResponse>(`/project/${projectId}/issue/search`, params)

  public getProjectComments = (
    projectId: number,
    params: GetProjectCommentsParams
  ) => this.get<MessagesResponse>(`/project/${projectId}/comment`, params)

  public commentOnProject = (projectId: number, params: SendMessageParams) =>
    this.post<MessageResponse>(`/project/${projectId}/comment`, params)

  public getProjectStatistics = (projectId: number) =>
    this.get<GetProjectStatisticsResponse>(
      `/project/${projectId}/statistics/project`
    )

  public getProjectMembersStatistics = (projectId: number) =>
    this.get<GetProjectMembersStatisticsResponse>(
      `/project/${projectId}/statistics/members`
    )

  public createConversation = (params: CreateConversationParams) =>
    this.post<ConversationResponse>('/conversations', params)

  public sendMessage = (conversationId: string, params: SendMessageParams) =>
    this.post<MessageResponse>(
      `/conversations/${conversationId}/message`,
      params
    )

  public loadMessages = (conversationId: string) =>
    this.get<MessagesResponse>(`/conversations/${conversationId}/message`)
}

export default new LifeApi()
