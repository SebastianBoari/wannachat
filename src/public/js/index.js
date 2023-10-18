const socket = io()

// DOM
const form = document.getElementById('chat-form')
const inputTextArea = document.getElementById('textArea')
inputTextArea.disabled = true
const modalForm = document.getElementById('modal-form')
const inputUsername = document.getElementById('inputNickName')
const modal = document.getElementById('modal-container')
const historyContainer = document.getElementById('chat-history')

// Utils
const getMoment = () => {
	const date = new Date()

	let hours = date.getHours()

	let minutes = date.getMinutes()

	if(minutes < 10) minutes = '0' + minutes

	const currentMoment = hours + ':' + minutes

	return currentMoment
}

const toggleModal = () => {
	modal.classList.toggle('display-none')
}

// Simple user nickname validation:
let username = JSON.parse(localStorage.getItem('wannauser')) || ''

const sendUser = async (user) => {
	await socket.emit('username', user)

	await socket.on('username', (response) => {

		if(response.includes('Error')){
			alert(`${response}`)
		} else {
			toggleModal()

			username = response
			
			localStorage.setItem('wannauser', JSON.stringify(username))

			inputTextArea.disabled = false
		}
	})
}

if(username.length > 0){
	sendUser(username)
}

modalForm.addEventListener('submit', (e) => {
	e.preventDefault()

	sendUser(inputUsername.value)
	
	modalForm.reset()
})

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