import express from 'express'
import UserService from '../services/User.js'

const userRouter = express.Router()

userRouter.get("/api/users", UserService.getAllUsers)
userRouter.post("/api/users", UserService.createUser)
userRouter.get("/api/users/:uid", UserService.getUserById)
userRouter.delete("/api/users/:uid", UserService.deleteUserById)
userRouter.put("/api/users/:uid", UserService.updateUserById)

export default userRouter