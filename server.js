const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = 2002

const authenticate = (req, res, next) => {
  const accessToken = req.params.access_token || req.cookies.life_jwt

  if (!accessToken && req.route.path !== '/') res.redirect('/login')

  return next()
}

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())

  server.get('/login', (req, res) => app.render(req, res, '/auth/login'))

  server.get('/dashboard', authenticate, handle)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
