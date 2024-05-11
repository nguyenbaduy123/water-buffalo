const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const requestHandler = app.getRequestHandler()

const handle = (req, res) => requestHandler(req, res)

const port = 2002

const retrieveAccessToken = (req) =>
  req.params.access_token || req.cookies.life_jwt

const authenticate = (req, res, next) => {
  const accessToken = retrieveAccessToken(req)

  if (!accessToken && req.route.path !== '/') res.redirect('/login')

  return next()
}

const isAuthenticated = (req, res, next) => {
  if (retrieveAccessToken(req)) {
    return res.redirect('/dashboard')
  }
  return next()
}

const handleProjectRoute =
  (page = '') =>
  (req, res) => {
    const { owner_name, project_name } = req.params
    return app.render(req, res, `/project${page}`, {
      owner_name,
      project_name,
    })
  }

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())

  server.get('/', isAuthenticated, (req, res) => res.redirect('/login'))

  server.get('/login', isAuthenticated, (req, res) =>
    app.render(req, res, '/auth/login')
  )
  server.get('/signup', isAuthenticated, (req, res) =>
    app.render(req, res, '/auth/signup')
  )

  server.get('/logout', (req, res) => {
    res.clearCookie('life_jwt')
    res.redirect('/login')
  })

  server.get('/dashboard', authenticate, handle)

  server.get('/new', authenticate, (req, res) =>
    app.render(req, res, '/project/new')
  )

  server.get('/:owner_name/:project_name', authenticate, handleProjectRoute())

  server.get(
    '/:owner_name/:project_name/issues',
    authenticate,
    handleProjectRoute('/issues')
  )

  server.get(
    '/:owner_name/:project_name/issues/new',
    authenticate,
    handleProjectRoute('/issues/new')
  )

  server.get(
    '/:owner_name/:project_name/issues/:issue_id',
    authenticate,
    (req, res) => {
      const { owner_name, project_name, issue_id } = req.params
      return app.render(req, res, '/project/issues/issue', {
        owner_name,
        project_name,
        issue_id,
      })
    }
  )

  server.get(
    '/:owner_name/:project_name/settings',
    authenticate,
    handleProjectRoute('/settings')
  )

  server.get(
    '/:owner_name/:project_name/settings/general',
    authenticate,
    handleProjectRoute('/settings/general')
  )

  server.get(
    '/:owner_name/:project_name/settings/members',
    authenticate,
    handleProjectRoute('/settings/members')
  )

  server.get(
    '/:owner_name/:project_name/settings/tags',
    authenticate,
    handleProjectRoute('/settings/tags')
  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
