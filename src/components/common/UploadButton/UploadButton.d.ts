import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { WithBaseResponse } from 'api/Api.d'
import { UploadFileResponse } from 'api/LifeApi.d'

export type OnSuccess = OnChange
export type OnChangeDone = (files: FileUploaded[]) => void

export type UploadChange = UploadChangeParam<
  UploadFile<WithBaseResponse<UploadFileResponse>>
>

export type FileUpload = UploadChange['file']

export type OnChange = (
  file: UploadChange['file'],
  files: UploadChange['fileList']
) => void
