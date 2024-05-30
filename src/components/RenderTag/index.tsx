import React from 'react'
import { Tag } from 'types/project'

interface Props {
  tag: Tag
  width?: number
  fontSize?: number
  radius?: number
}

const RenderTag = ({ tag, width, fontSize = 12, radius }: Props) => {
  const lineHeight = fontSize + 2
  const height = lineHeight + 2
  return (
    <div
      className="tag-item"
      style={{
        backgroundColor: tag.color,
        padding: '1px 4px',
        fontSize: fontSize,
        borderRadius: radius || 6,
        display: 'inline-block',
        height: height,
        lineHeight: `${lineHeight}px`,
      }}
    >
      <span className="tag-name">{tag.name}</span>
    </div>
  )
}

export default RenderTag
