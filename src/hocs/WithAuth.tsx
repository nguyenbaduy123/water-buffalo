import { useAppDispatch } from 'hooks'
import { NextPage } from 'next'
import React from 'react'
import { getUserAuth } from 'actions/auth'
import { Store } from 'store'

const WithAuth = (store: Store) => (Page: NextPage) => {
  Page.getInitialProps = async (context) => {
    return {}
  }

  return Page
}

export default WithAuth
