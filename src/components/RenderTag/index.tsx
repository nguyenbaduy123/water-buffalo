import React from 'react'
import { Tag } from 'types/project'

interface Props {
  tag: Tag
  width?: number
  fontSize?: number
  radius?: number
}

const RenderTag = ({ tag, width, fontSize, radius }: Props) => {
  return (
    <div
      className="tag-item"
      style={{
        backgroundColor: tag.color,
        padding: '2px 4px',
        width: width || 100,
        fontSize: fontSize || 12,
        borderRadius: radius || 6,
      }}
    >
      <span className="tag-name">{tag.name}</span>
    </div>
  )
}

export default RenderTag
