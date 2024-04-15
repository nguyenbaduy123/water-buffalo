import App from 'next/app'
import 'normalize.css/normalize.css'

import RootLayout from 'layouts/RootLayout'
import ThemeProvider from 'themes'
import { wrapper } from 'store'
import 'css/app.scss'
import 'css/modules/_common.scss'

class MyApp extends App {
  static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        return {
          pageProps: {
            ...(Component.getInitialProps
              ? await Component.getInitialProps({ ...ctx, store })
              : {}),
          },
        }
      }
  )

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    )
  }
}

export default wrapper.withRedux(MyApp)
