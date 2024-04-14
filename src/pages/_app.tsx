import { Provider } from 'react-redux'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

import MainLayout from 'layouts/MainLayout'
import 'normalize.css/normalize.css'
import 'css/app.scss'
import { usePathname } from 'next/navigation'
import { store } from 'store'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // @ts-ignore
    window.__reduxStore__ = store
  }, [])

  const currentPath = usePathname()

  return (
    <Provider store={store}>
      <MainLayout currentPath={currentPath}>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
