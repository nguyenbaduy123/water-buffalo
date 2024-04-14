import 'normalize.css/normalize.css'
import App from 'next/app'

import RootLayout from 'layouts/RootLayout'
import { wrapper } from 'store'
import 'css/app.scss'

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
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    )
  }
}

export default wrapper.withRedux(MyApp)
