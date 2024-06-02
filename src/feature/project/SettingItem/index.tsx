import { Flex } from 'antd'
import React from 'react'

interface Props {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

const SettingItem: React.FC<Props> = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <Flex className="setting-item" gap={8}>
      <div className="setting-item-icon">{icon}</div>
      <div className="setting-item-content">
        <div className="setting-item-title">{title}</div>
        <div className="setting-item-description">
          <div className="setting-item-description-text">{description}</div>
          <div className="setting-item-children">{children}</div>
        </div>
      </div>
    </Flex>
  )
}

export default SettingItem
