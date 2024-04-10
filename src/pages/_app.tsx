import { Provider } from 'react-redux'
import { store } from 'store'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

import MainLayout from 'layouts/MainLayout'
import 'normalize.css/normalize.css'
import 'css/app.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // @ts-ignore
    window.__reduxStore__ = store
  }, [])

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
