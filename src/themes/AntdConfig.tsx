import { ConfigProvider, theme } from 'antd'
import React from 'react'
import { COLORS } from 'utils/css'

interface Props {
  children: React.ReactNode
}

const AntdConfig: React.FC<Props> = ({ children }) => (
  <ConfigProvider
    theme={{
      hashed: false,
      algorithm: theme.darkAlgorithm,
      components: {
        Button: {
          colorPrimary: COLORS.green[8],
          colorPrimaryHover: COLORS.green[7],
          colorPrimaryActive: COLORS.green[9],
          lineWidth: 0,
          paddingInline: 10,
          algorithm: false,
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
)

export default AntdConfig
