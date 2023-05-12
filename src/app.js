// Dependencies
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
// Handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views',  './src/views');
app.set('view engine', 'handlebars');
// Public directory
app.use(express.static('./src/public'));
// Views middleware
app.use('/', viewsRouter);
// Server config
// Http server
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`Server up on port ${port}`)
});
// Socket server
const socketServer = new Server(httpServer);
const socketMiddleware = require('./middlewares/socket')(socketServer);
socketServer.use(socketMiddleware);