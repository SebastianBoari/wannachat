class UserManager {
    #users

    constructor() {
        this.#users = []
    }

    getUsers() {
        return this.#users
    }

    #addUser(username) {
        this.#users.push(username)
    }

    #validateUser(username) {
        const formattedUsername = username.trim()

        if (formattedUsername.length > 24) {
            throw new Error('Error: Nickname too long, not more than 24 characters.')
        } else if (formattedUsername.length < 4) {
            throw new Error('Error: Nickname too short, at least 4 characters.')
        } else {
            return formattedUsername;
        }
    };
    createUser(username) {
        if (this.#validateUser(username)) {
            this.#addUser(username)
            return this.#validateUser(username)
        } else {
            throw new Error('Error: A fatal error has occurred')
        }
    };
};

export default UserManager