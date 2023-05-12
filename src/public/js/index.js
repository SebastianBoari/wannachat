const socket = io();

// Utils
const getMoment = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10) minutes = '0' + minutes;
    
    const currentMoment = hours + ':' + minutes;
    
    return currentMoment;
};

// Nickname (simple client side validation)
const modal = document.getElementById('modal-container');
const toggleModal = () => {
    modal.classList.toggle('display-none');
};
const modalForm = document.getElementById('modal-form');
const inputNickName = document.getElementById('inputNickName');

let nickName = '';
const setNickName = (nick) => {
    const nickTrim = nick.trim();

    if(nickTrim.length < 24 && nickTrim.length > 0){
        nickName = nickTrim;
        modalForm.reset();
        return true;
    } else {
        alert('Empty nickname or too large. Please, retry');
        return false;
    };
};

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if(setNickName(inputNickName.value)){
        toggleModal();
    } 
});

// Bring chat history on connection:
const historyContainer = document.getElementById('chat-history');

const autoScroll = () => {
    historyContainer.scrollTo({
        top: historyContainer.scrollHeight,
        behavior: 'smooth'
    });
};
  
socket.on('history', (data) => {
    data.forEach((msg) => {
        let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${msg.time}</p>
            </div>
        </div>`;

        historyContainer.innerHTML += currentMsg;
    });
    autoScroll();
});

// Send message workflow:
// DOM
const form = document.getElementById('chat-form');
const inputTextArea = document.getElementById('textArea');

// Validate
const validateMessage = (message) => {
    const formattedMessage  = message.trim();

    if(formattedMessage.length === 0)  return false;

    if(formattedMessage.length > 144) return false;

    return true;
};
// Actions
const sendMessage = (username) => {
    const currentMessage = inputTextArea.value;

    if(validateMessage(currentMessage)){
        socket.emit('message', {
            user: username,
            message: currentMessage,
            time: getMoment(),
        });
    };
};

// Listeners
// Op1: Submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(nickName);
    form.reset();
});

// Op2: Press enter
inputTextArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){ 
        e.preventDefault();
        sendMessage(nickName);
        form.reset();
    };
});

// Recive latest message:
socket.on('currentMessage', (msg) => {
    if(msg.user === nickName){
        let currentMsg = `
        <div class="msg msg-user">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${msg.time}</p>
            </div>
        </div>`;
    
        historyContainer.innerHTML += currentMsg;

        autoScroll();
    } else {

        let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${msg.time}</p>
            </div>
        </div>`;
    
        historyContainer.innerHTML += currentMsg;
    };
});