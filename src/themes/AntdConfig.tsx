import { ConfigProvider } from 'antd'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const AntdConfig: React.FC<Props> = ({ children }) => (
  <ConfigProvider
    theme={{
      hashed: false,
      token: {
        colorPrimary: '#237804',
        borderRadius: 4,
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default AntdConfig
