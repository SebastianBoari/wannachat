// Import and instance classes
const UserManager = require('../classes/UserManager');
const userManager = new UserManager();
const MessageManager = require('../classes/MessageManager');
const messageManager = new MessageManager();
// Socket server
module.exports = function(socketServer) {

    return function(socket, next) {
        console.log(`New client: ${socket.id}`);

        // Send previous messages
        socket.emit('history', messageManager.getMessages());

        // User handler
        socket.on('username', (user) => {
            try {
                socket.emit('username', userManager.createUser(user));
            } catch (error) {
                socket.emit('username', error.message);
            };
        });

        // Recive messages
        socket.on('message', (res) => {
            // Emite el mensaje a todos los sockets conectados
            socketServer.emit('currentMessage', messageManager.createMessage(res.user, res.message, res.time));
        });

        next();
    };
};