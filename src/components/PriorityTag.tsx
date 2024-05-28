import React from 'react'
import { getPriorityData } from 'utils'

interface Props {
  priority: number | null
  style?: React.CSSProperties
}

const PriorityTag = ({ priority, style }: Props) => {
  const { text, color } = getPriorityData(priority)

  return (
    <div
      className={`priority-tag priority-${text}-level`}
      style={{ backgroundColor: color, color: '#fff', ...style }}
    >
      {text}
    </div>
  )
}

export default PriorityTag
