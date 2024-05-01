const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const requestHandler = app.getRequestHandler()

const { WEB_URL } = require('./env-config')

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

  server.get('/dashboard', authenticate, handle)

  server.get('/new', authenticate, (req, res) =>
    app.render(req, res, '/project/new')
  )

  server.get('/:owner_name/:project_name', authenticate, (req, res) => {
    const { owner_name, project_name } = req.params
    return app.render(req, res, '/project', { owner_name, project_name })
  })

  server.get('/:owner_name/:project_name/issues', authenticate, (req, res) => {
    const { owner_name, project_name } = req.params
    return app.render(req, res, '/project/issues', { owner_name, project_name })
  })

  server.get(
    '/:owner_name/:project_name/settings',
    authenticate,
    (req, res) => {
      const { owner_name, project_name } = req.params
      return app.render(req, res, '/project/settings', {
        owner_name,
        project_name,
      })
    }
  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
