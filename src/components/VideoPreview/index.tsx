import { Image } from 'antd'
import React from 'react'

interface Props {
  src: string
}

const VideoPreview = ({ src }: Props) => {
  return (
    <Image
      width={60}
      preview={{
        width: 400,
        destroyOnClose: true,
        imageRender: () => <video width={400} controls src={src} />,
        toolbarRender: () => null,
      }}
      src="/video_player.jpeg"
    />
  )
}

export default VideoPreview
