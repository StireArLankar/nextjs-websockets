import express, { Request, Response } from 'express'
import http from 'http'
import socketIo, { Socket } from 'socket.io'
import next from 'next'

import api from './api'

const app = express()
const server = new http.Server(app)
const io = socketIo(server)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

io.on('connect', (socket: Socket) => {
  socket.emit('hello', { message: 'Hello World' })
  console.count('User connected')

  socket.on('message', (msg: string) => {io.emit('broad', msg)})
  socket.on('disconnect', () => console.log('User disconnected'))
})

nextApp.prepare().then(() => {
  app.use('/api', api)

  app.get('*', (req: Request, res: Response) => {
    return nextHandler(req, res)
  })

  server.listen(process.env.PORT || 3030, (err: Error) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT || 3030}`)
  })
})
.catch((ex:any) => {
  console.error(ex.stack)
  process.exit(1)
})