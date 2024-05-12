import React from 'react'
import { SketchPicker, SketchPickerProps } from 'react-color'

interface Props extends SketchPickerProps {}
const ColorPicker = ({ ...props }: Props) => {
  return <SketchPicker {...props} />
}

export default ColorPicker
