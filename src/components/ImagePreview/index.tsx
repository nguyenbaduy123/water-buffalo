import { Eye } from '@phosphor-icons/react'
import { Image } from 'antd'
import React from 'react'

interface Props {
  src: string
  size?: number
}

const ImagePreview = ({ src, size = 60 }: Props) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      preview={{
        mask: <Eye size={20} />,
      }}
    />
  )
}

export default ImagePreview
