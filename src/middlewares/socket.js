// Import and instance classes
import UserManager from '../classes/UserManager.js'
const userManager = new UserManager()

import MessageManager from '../classes/MessageManager.js'
const messageManager = new MessageManager()

// Socket server
function createSocketMiddleware(socketServer) {

	return function (socket, next) {
		// Send previous messages
		socket.emit('history', messageManager.getMessages())

		// User handler
		socket.on('username', (user) => {
			try {
				if(userManager.createUser(user).status === 'errror'){
					socket.emit('username', userManager.createUser(user).message)
				}
				
				socket.emit('username', userManager.createUser(user))
			} catch (error) {
				socket.emit('username', error.message)
			}
		})

		// Recive messages
		socket.on('message', async (res) => {
			socketServer.emit('currentMessage', messageManager.createMessage(res.user, res.message, res.time))
		})
		
		next()
	}
}

export { createSocketMiddleware }