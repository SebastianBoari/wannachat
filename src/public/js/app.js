const socket = io()

export const form = document.getElementById('chat-form')
export const inputTextArea = document.getElementById('textArea'); inputTextArea.disabled = true
export const historyContainer = document.getElementById('chat-history')

const getMoment = () => {
	const date = new Date()
	let hours = date.getHours()
	let minutes = date.getMinutes()
	if(minutes < 10) minutes = '0' + minutes
	const currentMoment = hours + ':' + minutes
	return currentMoment
}


// TODO: Logic to get username

let username = ''

// Bring chat history on connection:
const autoScroll = () => {
	historyContainer.scrollTo({
		top: historyContainer.scrollHeight,
		behavior: 'smooth'
	})
}
socket.on('history', (data) => {
	data.forEach((msg) => {
		let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${msg.time}</p>
            </div>
        </div>`
		historyContainer.innerHTML += currentMsg
	})
	autoScroll()
})

// Send message workflow:
// Actions
const sendMessage = (username) => {
	const currentMessage = inputTextArea.value
	
	socket.emit('message', {
		user: username,
		message: currentMessage,
		time: getMoment()
	})
}

// Listeners
// Op1: Submit button
form.addEventListener('submit', (e) => {
	e.preventDefault()
	sendMessage(username)
	form.reset()
})

// Op2: Press enter
inputTextArea.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' && !e.shiftKey){ 
		e.preventDefault()
		sendMessage(username)
		form.reset()
	}
})

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
        </div>`
		historyContainer.innerHTML += currentMsg
		autoScroll()
	} else {
		let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${msg.time}</p>
            </div>
        </div>`
		historyContainer.innerHTML += currentMsg
	}
})