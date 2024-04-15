import AntdConfig from './AntdConfig'
import PhosphorIconConfig from './PhosphorIconConfig'
import { ProviderFC } from 'types/global'

const ThemeProvider: ProviderFC = ({ children }) => {
  return (
    <AntdConfig>
      <PhosphorIconConfig>{children}</PhosphorIconConfig>
    </AntdConfig>
  )
}

export default ThemeProvider
