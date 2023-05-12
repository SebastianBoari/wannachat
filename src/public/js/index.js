const socket = io();
// DOM
const form = document.getElementById('chat-form');
const inputTextArea = document.getElementById('textArea');
inputTextArea.disabled = true;
const modalForm = document.getElementById('modal-form');
const inputUsername = document.getElementById('inputNickName');
const modal = document.getElementById('modal-container');
const historyContainer = document.getElementById('chat-history');
// Simple user nickname validation:
const toggleModal = () => {
    modal.classList.toggle('display-none');
};
let username = '';
const sendUser = async (user) => {
    await socket.emit('username', user);
    await socket.on('username', (res) => {
        if(res.includes('Error')){
            alert(`${res}`);
        } else {
            toggleModal();
            username = res;
            inputTextArea.disabled = false;
        };
    });
};
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendUser(inputUsername.value);
    modalForm.reset();
});

// Bring chat history on connection:
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
// Actions
const sendMessage = (username) => {
    const currentMessage = inputTextArea.value;
    socket.emit('message', {
        user: username,
        message: currentMessage
    });
};
// Listeners
// Op1: Submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(username);
    form.reset();
});
// Op2: Press enter
inputTextArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){ 
        e.preventDefault();
        sendMessage(username);
        form.reset();
    };
});
// Recive latest message:
socket.on('currentMessage', (msg) => {
    if(msg.user === username){
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