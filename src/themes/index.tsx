import React from 'react'

import AntdConfig from './AntdConfig'
import PhosphorIconConfig from './PhosphorIconConfig'
import { ProviderProps } from 'types/global'

const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <AntdConfig>
      <PhosphorIconConfig>{children}</PhosphorIconConfig>
    </AntdConfig>
  )
}

export default ThemeProvider
