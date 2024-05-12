import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input, InputProps } from 'antd'
import React from 'react'

interface Props extends InputProps {}

const SearchInput = ({ ...props }: Props) => {
  return <Input prefix={<MagnifyingGlass size={14} />} {...props} />
}

export default SearchInput
