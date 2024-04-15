import { IconContext } from '@phosphor-icons/react'
import React from 'react'
import { ProviderFC } from 'types/global'

const PhosphorIconConfig: ProviderFC = ({ children }) => {
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
