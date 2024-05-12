import { Upload, UploadProps } from 'antd'
import LifeApi from 'api/LifeApi'
import React from 'react'

interface Props extends UploadProps {
  children: React.ReactNode
}

const UploadButton = ({ children, ...props }: Props) => {
  return (
    <Upload
      action={`${process.env.NEXT_PUBLIC_API_URL}/content/upload`}
      withCredentials
      {...props}
    >
      {children}
    </Upload>
  )
}

export default UploadButton
