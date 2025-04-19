import UserRepository from '../repositories/User.js'

class UserService {

    getAllUsers = async (req, res) => {
        const users = await UserRepository.getAllUsers()
        res.json(users)
    }
    getUserById = async (req, res) => {
        const userId = parseInt(req.params.uid);
        const user = await UserRepository.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("usuario no encontrado");
        }
    }
    createUser = async (req, res) => {
        const newUser = req.body
        const addUser = await UserRepository.createUser(newUser);
        res.status(201).json({ user: addUser, message: "usuario creado" });
    }
    deleteUserById = async (req, res) => {
        const userId = parseInt(req.params.uid)
        const result = await UserRepository.deleteUserById(userId)
        if (!result)
            return res.status(501).send("No se pudo eliminar");
        res.json({ message: "usuario eliminado" });
    };
    updateUserById = async (req, res) => {
        const userId = parseInt(req.params.uid)
        const updatedFields = req.body
        const updatedUser = await UserRepository.updateUserById(userId, updatedFields)
        if (!updatedUser)
            return res.status(404).send("usuario no encontrado");
        res.json({
            user: updatedUser,
            message: "usuario actualizado",
        });
    };


}

export default new UserService();