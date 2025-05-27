import express from 'express'
import CartService from '../services/Cart.js'

const cartRouter = express.Router()

cartRouter.post("/api/carts", CartService.addCart)
cartRouter.get("/api/carts/:cid", CartService.getCartById)
cartRouter.post("/api/carts/:cid/product/:pid", CartService.addProductsToCart)
cartRouter.delete("/api/carts/:cid", CartService.deleteCartById)

export default cartRouter