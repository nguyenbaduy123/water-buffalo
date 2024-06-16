import React from 'react'
import { IAllProps, Editor as TinyMCE } from '@tinymce/tinymce-react'

export interface Props extends IAllProps {
  height?: number
}

const Editor = ({ height, ...props }: Props) => {
  return (
    <TinyMCE
      apiKey="ivqi9hokaumhx5i0ny058cmxbp7fj6ufrtu66af80osqznkj"
      init={{
        statusbar: false,
        skin: 'oxide-dark',
        content_css: 'dark',
        branding: false,
        menubar: false,
        height: height,
        theme_advanced_toolbar_align: 'left',
        plugins: ['image', 'preview', 'media', 'table', 'link', 'code', 'help'],
        toolbar:
          'preview link | ' +
          'undo redo' +
          'bold italic | ' +
          'removeformat help',
        content_style:
          'body { font-size: 14px; font-family: "Inter", sans-serif;} img {max-height: 120px;}',
      }}
      {...props}
    />
  )
}

export default Editor
