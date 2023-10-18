class MessageManager {

    #messages

    constructor() {
        this.#messages = []
    }

    getMessages() {
        return this.#messages
    }

    #addMessage(msg) {
        this.#messages.push(msg)
    }

    validateMessage(msg) {
        const formattedMsg = msg.trim()

        if (formattedMsg.length > 144) {
            return false
        } else if (formattedMsg.length <= 0) {
            return false
        } else {
            return formattedMsg
        }
    }

    createMessage(user, msg, time) {
        if (this.validateMessage(msg)) {

            const newMessage = {
                user: user,
                message: this.validateMessage(msg),
                time: time
            }

            this.#addMessage(newMessage)
            return newMessage
        }
    }
}

export default MessageManager