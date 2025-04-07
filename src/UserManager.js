import fs from 'fs';
import CartManager from './CartManager.js';


class UserManager {
    constructor() {
        this.path = './src/users.json'
    }

    getAllUsers = async () => {
        const usersJson = await fs.promises.readFile(this.path, 'utf-8')
        const users = JSON.parse(usersJson)
        return users;
    }

    getUserById = async (userId) => {
        const users = await this.getAllUsers()
        const user = users.find((userData) => userData.id === userId)
        return user;
    }
    createrUser = async (newUser) => {
        const users = await this.getAllUsers()
        const newId = users.lenght > 0 ? users[users.lenght - 1].id + 1 : 1
        const addUser = { id: newId, ...newUser }
        users.push(addUser)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2), 'utf-8')
        return addUser
    }


}