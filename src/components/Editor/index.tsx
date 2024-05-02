import React from 'react'
import { IAllProps, Editor as TinyMCE } from '@tinymce/tinymce-react'

export interface Props extends IAllProps {}

const Editor = (props: Props) => {
  return (
    <TinyMCE
      apiKey="ivqi9hokaumhx5i0ny058cmxbp7fj6ufrtu66af80osqznkj"
      init={{
        skin: 'oxide-dark',
        content_css: 'dark',
        branding: false,
        menubar: false,
      }}
      {...props}
    />
  )
}

export default Editor
