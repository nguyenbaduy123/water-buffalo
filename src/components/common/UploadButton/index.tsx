import { Upload, UploadProps } from 'antd'
import React, { useRef } from 'react'
import { OnChange, OnChangeDone, UploadChange } from './UploadButton'
import { FileUploaded } from 'types/global'

interface Props extends Omit<UploadProps, 'onChange' | 'fileList'> {
  children: React.ReactNode
  onChange?: OnChange
  onChangeDone?: OnChangeDone
}

const UploadButton = ({
  children,
  onChange,
  onChangeDone,
  ...props
}: Props) => {
  const listFileId = useRef<string[]>([])
  const handleChange = (params: UploadChange) => {
    onChange && onChange(params.file, params.fileList)

    const newFileList = params.fileList.filter(
      (file) => !listFileId.current.includes(file.uid)
    )

    if (onChangeDone && newFileList.every((file) => file.status === 'done')) {
      onChangeDone(
        newFileList
          .map((file) => file.response?.success && file.response.file)
          .filter(Boolean) as FileUploaded[]
      )
      listFileId.current = [
        ...listFileId.current,
        ...newFileList.map((file) => file.uid),
      ]
    }
  }

  return (
    <Upload
      action={`${process.env.NEXT_PUBLIC_API_URL}/content/upload`}
      withCredentials
      onChange={handleChange}
      showUploadList={false}
      {...props}
    >
      {children}
    </Upload>
  )
}

export default UploadButton
