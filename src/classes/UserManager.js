class UserManager {
	#user

	constructor() {
		this.#user = {}
	}

	getUsers() {
		return this.#user
	}

	#addUser(newUser) {
		this.#user = newUser
	}

	#validateUser(username) {
		const formattedUsername = username.trim()

		if (formattedUsername.length > 24) {
			throw new Error('Error: Nickname too long, not more than 24 characters.')
		} else if (formattedUsername.length < 4) {
			throw new Error('Error: Nickname too short, at least 4 characters.')
		} else {
			return formattedUsername
		}
	}

	createUser(newUser) {
		if (this.#validateUser(newUser.username)) {

			this.#addUser(newUser)
			
			return newUser.username
		} else {
			throw new Error('Error: A fatal error has occurred')
		}
	}
}

export default UserManager