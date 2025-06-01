import express from 'express'
import CartService from '../services/Cart.js'
import Cart from '../models/Cart.js'

const cartRouter = express.Router()

cartRouter.post("/api/carts", CartService.addCart)
cartRouter.get("/api/carts/:cid", CartService.getCartById)
cartRouter.put("/api/carts/:cid", CartService.updateProductsInCart)
cartRouter.put("/api/carts/:cid/product/:pid", CartService.addProductsToCart)
cartRouter.delete("/api/carts/:cid", CartService.deleteProductsInCart)


export default cartRouter