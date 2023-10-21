import express from 'express'
import handlebars from 'express-handlebars'

import { Server } from 'socket.io'
import { createSocketMiddleware } from './middlewares/socket.js'

import viewsRouter from './routes/views.routes.js'

const app = express()

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// Public directory
app.use(express.static('./src/public'))

// Views middleware
app.use('/', viewsRouter)

// Http server
const httpServer = app.listen(8080, () => console.log('server up on port 8080'))

// Socket server
const socketServer = new Server(httpServer)
socketServer.use(createSocketMiddleware(socketServer))