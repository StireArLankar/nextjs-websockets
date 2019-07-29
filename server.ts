const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

import api from './api'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connect', (socket) => {
  socket.emit('hello', { message: 'Hello World' })
  console.count('User connected')

  socket.on('message', (msg: string) => {io.emit('broad', msg)})
})

nextApp.prepare().then(() => {
  app.use('/api', api)

  app.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(process.env.PORT || 3030, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT || 3030}`)
  })
})
.catch((ex:any) => {
  console.error(ex.stack)
  process.exit(1)
})