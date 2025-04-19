import fs from 'fs'


class UserRepository {
    constructor() {
        this.path = "./src/db/users.json";
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
    createUser = async (newUser) => {
        const users = await this.getAllUsers()
        const newId = users.lenght > 0 ? users[users.lenght - 1].id + 1 : 1
        const addUser = { id: newId, name: newUser }
        users.push(addUser)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2), 'utf-8')
        return addUser
    }
    deleteUserById = async (userId) => {
        const users = await this.getAllUsers();
        const newUsers = users.filter((u) => u.id !== userId);
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(newUsers, null, 2),
            "utf-8"
        );
        return true
    }
    updateUserById = async (userId, updatedFields) => {
        const users = await this.getAllUsers()
        const user = users.find(userData => userData.id === userId)
        if (!user) {
            return
        }
        if (updatedFields.id) {
            delete updatedFields.id;
        }
        user = {
            ...user,
            ...updatedFields
        };
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(users, null, 2),
            "utf-8"
        );
        return user
    };
}

export default new UserRepository()
