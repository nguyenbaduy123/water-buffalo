import React from 'react'
import { getPriorityData } from 'utils'

interface Props {
  priority: number | null
  style?: React.CSSProperties
}

const PriorityTag = ({ priority, style }: Props) => {
  const { text, color, backgroundColor } = getPriorityData(priority)

  return (
    <div
      className={`priority-tag priority-${text}-level`}
      style={{
        border: `1px dashed ${color}`,
        color: color,
        backgroundColor: backgroundColor,
        ...style,
      }}
    >
      {text}
    </div>
  )
}

export default PriorityTag
