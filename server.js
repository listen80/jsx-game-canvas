const hs = require('http-server')

hs.createServer({ root: 'public' }).listen(8010, () => {
  console.log('ok')
})
