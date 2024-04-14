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

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())

  server.get('/login', isAuthenticated, (req, res) =>
    app.render(req, res, '/auth/login')
  )
  server.get('/signup', isAuthenticated, (req, res) =>
    app.render(req, res, '/auth/signup')
  )

  server.get('/dashboard', authenticate, handle)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
