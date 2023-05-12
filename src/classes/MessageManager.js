const getMoment = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10) minutes = '0' + minutes;
    const currentMoment = hours + ':' + minutes;
    return currentMoment;
};

class MessageManager {
    
    #messages;

    constructor () {
        this.#messages = [];
    };
    getMessages() {
        return this.#messages;
    };
    #addMessage(msg) {
        this.#messages.push(msg);
    };
    validateMessage(msg){
        const formattedMsg = msg.trim();
        if(formattedMsg.length > 144){
            return false;
        } else if(formattedMsg.length <= 0){
            return false;
        } else {
            return formattedMsg;
        };
    };
    createMessage(user, msg) {
        if (this.validateMessage(msg)) {
            const newMessage = {
                user: user,
                message: this.validateMessage(msg), // Corrección aquí
                time: getMoment()
            };
            this.#addMessage(newMessage);
            return newMessage; 
        };
    };
};

module.exports= MessageManager;