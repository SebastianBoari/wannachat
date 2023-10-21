class UserManager {
	#user

	constructor() {
		this.#user = ''
	}

	getUsers() {
		return this.#user
	}

	#addUser(user) {
		this.#user = user
	}

	#validateUser(username) {
		const formattedUsername = username.trim()

		if (formattedUsername.length > 24) {
			return { 'status': 'error', 'message': 'nickname too long' }
		} else if (formattedUsername.length < 4) {
			return { 'status': 'error', 'message': 'nickname too short, at least 4 characters.' }
		} else {
			return { 'status': 'success' }
		}
	}

	createUser(username) {
		const validation = this.#validateUser(username)

		if (validation.status === 'success') {
			this.#addUser(username)
			return username
		} else {
			throw new Error(validation.message)
		}
	}
}

export default UserManager