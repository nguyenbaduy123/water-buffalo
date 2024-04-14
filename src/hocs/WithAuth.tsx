import { getUserAuth, loginSuccess } from 'actions/auth'
import { NextPage } from 'next'
import { wrapper } from 'store'

const withAuth = <P,>(Page: NextPage<P>) => {
  Page.getInitialProps = wrapper.getInitialPageProps((store) => async (ctx) => {
    // @ts-ignore
    const accessToken = ctx?.req?.cookies.life_jwt

    if (accessToken) {
      ctx.store.dispatch(loginSuccess({ access_token: accessToken }))
      await ctx.store.dispatch(getUserAuth())
    }
  })
  return Page
}
export default withAuth
