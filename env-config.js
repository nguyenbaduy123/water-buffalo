const prod = process.env.NODE_ENV === 'production'

module.exports = {
  WEB_URL: prod ? '' : 'http://localhost:2002',
  SOCKET_URL: prod ? '' : 'http://localhost:1408/live',
}
