import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import 'normalize.css/normalize.css'

import { store } from 'store'
import { useEffect } from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // @ts-ignore
    window.__reduxStore__ = store
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
