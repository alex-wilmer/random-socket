import express from 'express'
import socketIO from 'socket.io'
import { Server } from 'http'

/*----------------------------------------------------------------------------*/

let port = process.env.PORT || 3002
let app = express()
let http = Server(app)
let io = socketIO(http)

/*----------------------------------------------------------------------------*/

io.on(`connection`, socket => {
  console.log(`new connection!`)
  socket.on(`client::note`, data => socket.emit(`server::note`, data))
})

/*----------------------------------------------------------------------------*/

http.listen(port, () => {
  console.log(`☆ listening on localhost:${port}`)
})
