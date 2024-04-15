import { IconContext } from '@phosphor-icons/react'
import React from 'react'
import { ProviderProps } from 'types/global'

const PhosphorIconConfig: React.FC<ProviderProps> = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        color: '#fff',
        size: 24,
      }}
    >
      {children}
    </IconContext.Provider>
  )
}

export default PhosphorIconConfig
