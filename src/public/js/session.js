// DOM
const chooseSignIn = document.getElementById('signIn')
const chooseLogIn = document.getElementById('logIn')

const signInToggler = document.getElementById('signInToggler')
const logInToggler = document.getElementById('logInToggler')

const signInForm = document.getElementById('signIn-form')
const logInForm = document.getElementById('logIn-form')

const signInImage = document.getElementById('signIn-image')
const logInImage = document.getElementById('logIn-image')

const signInButton = document.getElementById('signIn-button')
const logInButton = document.getElementById('logIn-button')

const render = (formToRender) => {
	if(formToRender === 'LOG_IN'){
		signInToggler.classList.remove('input_checked')
		logInToggler.classList.add('input_checked')
    
		signInForm.classList.add('display-none')
		logInForm.classList.remove('display-none')

		signInImage.classList.add('display-none')
		logInImage.classList.remove('display-none')
	} else if(formToRender === 'SIGN_IN'){
		logInToggler.classList.remove('input_checked')
		signInToggler.classList.add('input_checked')
        
		logInForm.classList.add('display-none')
		signInForm.classList.remove('display-none')

		logInImage.classList.add('display-none')
		signInImage.classList.remove('display-none')
	}
}

chooseLogIn.addEventListener('change', () => {
	render('LOG_IN')
})

chooseSignIn.addEventListener('change', () => {
	render('SIGN_IN')
})

signInButton.addEventListener('click', (event) => {
	event.preventDefault()
	render('SIGN_IN')
})

logInButton.addEventListener('click', (event) => {
	event.preventDefault()
	render('LOG_IN')
})