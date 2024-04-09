const prod = process.env.NODE_ENV === 'production'

module.exports = {
  WEB_URL: prod ? '' : 'http://localhost:2002',
}
